"use client";

import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumEvaluationCommitteeType } from "@/shared/consts/enum/EnumEvaluationCommitteeType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const mainConfig: IExcelColumnConfig<SRMEvaluationCommittee>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã tổ thẩm định",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên tổ thẩm định",
        isRequired: true,
    },
    {
        fieldKey: "meetingDateValue",
        fieldName: "Ngày họp (dd/MM/yyyy)",
    },
    {
        fieldKey: "meetingLocation",
        fieldName: "Địa điểm họp",
    },
    {
        fieldKey: "meetingTime",
        fieldName: "Thời gian họp",
    },
    {
        fieldKey: "status",
        fieldName: "Trạng thái tổ",
    }
];

interface I_CouncilStatusConfig {
    status: number,
    label: string
}

const statusConfig: IExcelColumnConfig<I_CouncilStatusConfig>[] = [
    {
        fieldKey: "status",
        fieldName: "Giá trị",
        isRequired: false,
    },
    {
        fieldKey: "label",
        fieldName: "Tên giá trị",
        isRequired: false,
    },
];

export default function CostReviewSetupImportButton() {

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMEvaluationCommittee[]) =>
            evaluationCommitteeService.createOrUpdateList(body),
        mutationType: "import", // Setting ở đây sẽ tự notification nếu import thành công
    });

    const stack = useModalsStack<ModalImportId>([]);
    const academicYearStore = useAcademicYearStore();

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        excelUtils.addSheet<SRMEvaluationCommittee>({
            workbook: workbook,
            sheetName: "Danh sách tổ thẩm định",
            data: [],
            config: mainConfig,
        });

        excelUtils.addSheet<I_CouncilStatusConfig>({
            workbook: workbook,
            sheetName: "Danh sách trạng thái tổ",
            data: [
                {
                    status: 1,
                    label: "Chờ họp",
                },
                {
                    status: 2,
                    label: "Hoàn thành",
                },
            ],
            config: statusConfig,
        });

        excelUtils.download({
            name: "Danh sách tổ thẩm định kinh phí",
            workbook,
        });
    };


    return (
        <>
            <MyModalImport
                fieldDefinition={mainConfig.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: SRMEvaluationCommittee[]) => {

                    const mappedValues: SRMEvaluationCommittee[] = finalValues.map((item) => {
                        return {
                            ...item,
                            meetingDate: item.meetingDateValue,
                            type: EnumEvaluationCommitteeType.CostAppraisal,
                            academicYearId: academicYearStore?.state?.academicYear?.id
                        };
                    });

                    importMutation.mutate(mappedValues, {
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