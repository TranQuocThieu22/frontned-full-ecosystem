"use client";

import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { EnumContractSuppendType, EnumLabelContractSuppendType } from "@/shared/consts/enum/EnumContractSuppendType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ExcelJS from "exceljs";

const config: IExcelColumnConfig<SRMContractSuspend>[] = [
    {
        fieldKey: "srmContractId",
        fieldName: "ID đề tài",
        isRequired: true,
    },
    {
        fieldKey: 'type',
        fieldName: "Loại yêu cầu dừng thực hiện",
        isRequired: true,
    },
    {
        fieldKey: 'reason',
        fieldName: "Lý do",
        isRequired: true,
    }
];

const config2: IExcelColumnConfig<{ value: string, label: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "ID đề tài",
    },
    {
        fieldKey: "label",
        fieldName: "Tên đề tài",
    },
];

const config3: IExcelColumnConfig<{ value: string, label: string }>[] = [
    {
        fieldKey: "value",
        fieldName: "ID trạng thái",
    },
    {
        fieldKey: "label",
        fieldName: "Tên trạng thái",
    },
];

export default function StopRequestImportButton() {
    const academicYearStore = useAcademicYearStore();

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMContractSuspend[]) => {
            return contractSuspendService.createOrUpdateList(body.map((item) => ({
                ...item,
                academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
            })));
        },
        mutationType: "import",
    });

    const stack = useModalsStack<ModalImportId>([]);

    const contractSuspenAmendmentQuery = useCustomReactQuery({
        queryKey: ['contractSuspenAmendmentQuery', academicYearStore?.state?.academicYear?.id],
        axiosFn: () => {
            return contractSuspendService.GetContractAmendment({
                academicYearId: academicYearStore?.state?.academicYear?.id ?? 0
            });
        },
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id
        }
    });

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        await excelUtils.addSheet<SRMContractSuspend>({
            workbook: workbook,
            sheetName: "Danh sách đề tài yêu cầu dừng thực hiện",
            data: [],
            config: config,
        });
        await excelUtils.addSheet<{ value: string, label: string }>({
            workbook: workbook,
            sheetName: "Danh sách đề tài",
            data: contractSuspenAmendmentQuery.data?.map((item) => ({
                value: item.id?.toString() ?? "",
                label: item.name ?? "",
            })) || [],
            config: config2,
        });
        await excelUtils.addSheet<{ value: string, label: string }>({
            workbook: workbook,
            sheetName: "Danh sách trạng thái",
            data: converterUtils.mapEnumToSelectData(EnumContractSuppendType, EnumLabelContractSuppendType),
            config: config3,
        });
        excelUtils.download({ name: "Mẫu import yêu cầu dừng thực hiện đề tài", workbook });
    };

    return (
        <>
            <MyModalImport
                fieldDefinition={config.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: SRMContractSuspend[]) => {
                    // Lọc bỏ các dòng có srmContractId rỗng
                    let validValues = finalValues?.filter(item =>
                        item.srmContractId && item.srmContractId > 0
                    ) || [];

                    const invalidItems = validValues.filter(item => !item.type);

                    if (invalidItems.length > 0) {
                        notifications.show({
                            title: 'Thông báo',
                            message: `Đề tài ${invalidItems[0]?.srmContractId} chưa được chọn loại yêu cầu. Vui lòng kiểm tra lại dữ liệu.`,
                            color: 'red',
                        });
                        return; // Dừng xử lý ngay lập tức
                    }

                    importMutation.mutate(validValues, {
                        onSuccess: () => {
                            stack.closeAll();
                        },
                    });
                }}
            />
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
        </>
    );
}
