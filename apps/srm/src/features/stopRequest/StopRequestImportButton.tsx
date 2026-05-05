"use client";

import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { EnumContractSuppendType, EnumLabelContractSuppendType } from "@/shared/consts/enum/EnumContractSuppendType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { notifications } from "@mantine/notifications";
import { Workbook } from "exceljs";

type ImportRow = SRMContractSuspend & { contractCode?: string };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "contractCode", fieldName: "Mã đề tài", isRequired: true },
    { fieldKey: "type", fieldName: "Loại yêu cầu dừng thực hiện", isRequired: true, parseType: "number" },
    { fieldKey: "reason", fieldName: "Lý do", isRequired: true },
];

const config3: IExcelColumnConfig<{ value: string; label: string }>[] = [
    { fieldKey: "value", fieldName: "ID trạng thái" },
    { fieldKey: "label", fieldName: "Tên trạng thái" },
];

export default function StopRequestImportButton() {
    const academicYearStore = useAcademicYearStore();

    const academicYearId = academicYearStore?.state?.academicYear?.id ?? 0;

    const contractAmendmentQuery = useCustomReactQuery({
        queryKey: ["StopRequest_Contracts", academicYearId],
        axiosFn: () =>
            contractSuspendService.GetContractAmendment({
                academicYearId,
            }),
        options: {
            enabled: !!academicYearId,
        },
    });

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu import yêu cầu dừng thực hiện đề tài"
            buttonProps={{ loading: contractAmendmentQuery.isLoading }}
            onPrepareWorkbook={async (workbook: Workbook) => {
                excelUtils.addSheet({
                    workbook,
                    sheetName: "Danh sách trạng thái",
                    data: converterUtils.mapEnumToSelectData(EnumContractSuppendType, EnumLabelContractSuppendType),
                    config: config3,
                });
            }}
            onSubmit={(finalValues) => {
                const contracts = contractAmendmentQuery.data ?? [];

                const mappedWithContract = (finalValues ?? []).map((item) => {
                    const code = String(item.contractCode ?? "").trim();
                    const contract = contracts.find(
                        (c) => String((c as any).code ?? "").trim() === code,
                    );
                    return { item, code, contract };
                });

                const notFoundCodes = mappedWithContract
                    .filter((x) => !x.contract && x.code)
                    .map((x) => x.code);

                if (notFoundCodes.length > 0) {
                    notifications.show({
                        title: "Lỗi Import",
                        message: `Không tìm thấy mã đề tài: ${notFoundCodes.join(", ")}`,
                        color: "red",
                    });
                    return false;
                }

                const rowsWithId: (ImportRow & { srmContractId: number })[] = mappedWithContract.map(
                    ({ item, contract }) => ({
                        ...item,
                        srmContractId: contract!.id!,
                    }),
                );

                const invalidItems = rowsWithId.filter((item) => !item.type);
                if (invalidItems.length > 0) {
                    notifications.show({
                        title: "Thông báo",
                        message: `Đề tài ${invalidItems[0]?.contractCode} chưa được chọn loại yêu cầu. Vui lòng kiểm tra lại dữ liệu.`,
                        color: "red",
                    });
                    return false;
                }

                return contractSuspendService.createList(
                    rowsWithId.map((item) => ({
                        ...item,
                        academicYearId,
                    })),
                );
            }}
        />
    );
}
