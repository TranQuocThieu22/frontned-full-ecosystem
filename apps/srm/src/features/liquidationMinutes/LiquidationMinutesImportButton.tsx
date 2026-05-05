"use client";

import { contractService } from "@/shared/APIs/contractService";
import { liquidationMinuteService } from "@/shared/APIs/liquidationMinuteService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMLiquidationMinute } from "@/shared/interfaces/SRMLiquidationMinute";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

type ImportRow = SRMLiquidationMinute & { contractCode?: string };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "contractCode", fieldName: "Mã đề tài thanh lý", isRequired: true },
    { fieldKey: "minuteNumber", fieldName: "Số biên bản", isRequired: true },
    { fieldKey: "liquidationDate", fieldName: "Ngày biên bản", isRequired: true, parseType: "date" },
    { fieldKey: "proposedBudget", fieldName: "Kinh phí đề nghị", parseType: "number" },
    { fieldKey: "refundedBudget", fieldName: "Kinh phí hoàn trả", parseType: "number" },
    { fieldKey: "centralBudget", fieldName: "Kinh phí TW (Thanh toán)", parseType: "number" },
    { fieldKey: "provincialBudget", fieldName: "Kinh phí Tỉnh (Thanh toán)", parseType: "number" },
    { fieldKey: "universityBudget", fieldName: "Kinh phí Trường (Thanh toán)", parseType: "number" },
    { fieldKey: "otherBudget", fieldName: "Kinh phí Khác (Thanh toán)", parseType: "number" },
];

export default function LiquidationMinutesImportButton() {
    const academicYearStore = useAcademicYearStore();

    const contractQuery = useCustomReactQuery({
        queryKey: ["liquidation_contracts", academicYearStore?.state?.academicYear?.id],
        axiosFn: () =>
            contractService.GetAllByAcademicYear({
                AcademicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
            }),
        options: {
            enabled: !!academicYearStore?.state?.academicYear?.id,
        },
    });

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu Import biên bản thanh lý"
            buttonProps={{ loading: contractQuery.isLoading }}
            onSubmit={(finalValues) => {
                const contracts = contractQuery.data ?? [];
                const mapped = (finalValues ?? []).map((item) => {
                    return {
                        ...item,
                        minuteNumber: item.minuteNumber?.toString() ?? "",
                        proposedBudget: item.proposedBudget,
                        refundedBudget: item.refundedBudget,
                        centralBudget: item.centralBudget,
                        provincialBudget: item.provincialBudget,
                        universityBudget: item.universityBudget,
                        otherBudget: item.otherBudget,
                        totalCost: item.totalCost,
                        academicYearId: academicYearStore?.state?.academicYear?.id ?? 0,
                        srmContractId: contracts.find(c => c.code === item.contractCode)?.id,
                    } as SRMLiquidationMinute;
                });

                return liquidationMinuteService.createList(mapped);
            }}
        />
    );
}
