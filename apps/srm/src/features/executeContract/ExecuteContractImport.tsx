"use client";

import { contractService } from "@/shared/APIs/contractService";
import { SRMTypeService } from "@/shared/APIs/SRMTypeService";
import { topicService } from "@/shared/APIs/topicService";
import { EnumContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { ISigningContractImport, SRMContract } from "@/shared/interfaces/SRMContract";
import { CustomButtonImport } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomButtonImport";
import { FieldOption } from "@aq-fe/core-ui/shared/components/button/CustomButtonImport/CustomMappingDataModal/CustomMappingFormatDataModal";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

type ImportRow = ISigningContractImport & { topicCode?: string; srmTypeCode?: string };

const fields: FieldOption<ImportRow>[] = [
    { fieldKey: "topicCode", fieldName: "Mã đăng ký", isRequired: true },
    { fieldKey: "code", fieldName: "Mã đề tài", isRequired: true },
    { fieldKey: "name", fieldName: "Tên đề tài" },
    { fieldKey: "contractNumber", fieldName: "Số hợp đồng" },
    { fieldKey: "srmTypeCode", fieldName: "Loại đề tài (Mã loại đề tài)" },
    { fieldKey: "signingDate", fieldName: "Ngày ký (Định dạng DD/MM/YYYY)", parseType: "date" },
    { fieldKey: "duration", fieldName: "Thời gian thực hiện" },
    { fieldKey: "fromDate", fieldName: "Từ tháng/năm (Định dạng MM/YYYY)", parseType: "date" },
    { fieldKey: "toDate", fieldName: "Đến tháng/năm (Định dạng MM/YYYY)", parseType: "date" },
    { fieldKey: "centralBudget", fieldName: "Kinh phí TW (dự toán)", parseType: "number" },
    { fieldKey: "provincialBudget", fieldName: "Kinh phí Tỉnh (dự toán)", parseType: "number" },
    { fieldKey: "universityBudget", fieldName: "Kinh phí Trường (dự toán)", parseType: "number" },
    { fieldKey: "otherBudget", fieldName: "Kinh phí khác (dự toán)", parseType: "number" },
];

export default function ExecuteContractImport({ loading }: { loading?: boolean }) {
    const store = useAcademicYearStore();
    const academicYearId = store.state.academicYear?.id;

    const topicQuery = useCustomReactQuery({
        queryKey: ["ExecuteContractImport_Topics", academicYearId],
        axiosFn: () =>
            topicService.getAllByAcademicYear({
                AcademicYearId: academicYearId || -1,
            }),
        options: {
            enabled: !!academicYearId,
        },
    });

    const typeQuery = useCustomReactQuery({
        queryKey: ["ExecuteContractImport_Types"],
        axiosFn: () => SRMTypeService.getAllIsActive(),
    });

    return (
        <CustomButtonImport<ImportRow>
            fields={fields}
            fileName="Mẫu import danh sách ký hợp đồng"
            buttonProps={{ loading: loading || topicQuery.isLoading || typeQuery.isLoading }}
            onSubmit={async (finalValues) => {
                return contractService.createList(finalValues.map((value) => {
                    return {
                        ...value,
                        srmTopicId: topicQuery.data?.find(t => t.code === value.topicCode)?.id,
                        srmTypeId: typeQuery.data?.find(t => t.code === value.srmTypeCode)?.id,
                        code: value.code?.toString(),
                        name: value.name?.toString(),
                        contractNumber: value.contractNumber?.toString(),
                        signingDate: value.signingDate ? new Date(value.signingDate as any) : undefined,
                        duration: value.duration?.toString(),
                        fromDate: value.fromDate ? new Date(value.fromDate as any) : undefined,
                        toDate: value.toDate ? new Date(value.toDate as any) : undefined,
                        academicYearId,
                        executionStatus: EnumContractExecutionStatus.InProgress,
                        totalCost:
                            (Number(value.centralBudget) ?? 0) +
                            (Number(value.provincialBudget) ?? 0) +
                            (Number(value.universityBudget) ?? 0) +
                            (Number(value.otherBudget) ?? 0),
                        centralBudget: value.centralBudget,
                        provincialBudget: value.provincialBudget,
                        universityBudget: value.universityBudget,
                        otherBudget: value.otherBudget,
                    } as SRMContract;
                }));
            }}
        />
    );
}
