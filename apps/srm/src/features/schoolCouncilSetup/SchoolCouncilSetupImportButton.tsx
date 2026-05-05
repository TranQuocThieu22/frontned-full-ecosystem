"use client";

import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { EnumAcceptanceCouncilType } from "@/shared/consts/enum/EnumAcceptanceCouncilType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const mainConfig: IExcelColumnConfig<SRMAcceptanceCouncil>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã hội đồng",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên hội đồng",
        isRequired: true,
    },
    {
        fieldKey: "meetingDateValue",
        fieldName: "Ngày họp dự kiến (dd/MM/yyyy)",
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
        fieldName: "Trạng thái Hội đồng",
    }
];

interface I_CouncilStatusConfig {
    councilStatus: number,
    label: string
}

const statusConfig: IExcelColumnConfig<I_CouncilStatusConfig>[] = [
    {
        fieldKey: "councilStatus",
        fieldName: "Giá trị",
        isRequired: false,
    },
    {
        fieldKey: "label",
        fieldName: "Tên giá trị",
        isRequired: false,
    },
];

export default function SchoolCouncilSetupImportButton() {

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMAcceptanceCouncil[]) =>
            acceptanceCouncilService.createOrUpdateList(body),
        mutationType: "import", // Setting ở đây sẽ tự notification nếu import thành công
    });

    const stack = useModalsStack<ModalImportId>([]);
    const academicYearStore = useAcademicYearStore();

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        excelUtils.addSheet<SRMAcceptanceCouncil>({
            workbook: workbook,
            sheetName: "Danh sách Hội đồng nghiệm thu cấp Trường",
            data: [],
            config: mainConfig,
        });

        excelUtils.addSheet<I_CouncilStatusConfig>({
            workbook: workbook,
            sheetName: "Danh sách trạng thái Hội đồng",
            data: [
                {
                    councilStatus: 1,
                    label: "Chờ họp",
                },
                {
                    councilStatus: 2,
                    label: "Hoàn thành",
                },
            ],
            config: statusConfig,
        });

        excelUtils.download({
            name: "Danh sách hội đồng nghiệm thu cấp Trường",
            workbook,
        });
    };


    return (
        <>
            <MyModalImport
                isLoading={importMutation.isPending}
                fieldDefinition={mainConfig.map((item) => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                }))}
                stack={stack}
                onExportStructure={handleExport}
                onExecute={(finalValues: SRMAcceptanceCouncil[]) => {

                    const mappedValues: SRMAcceptanceCouncil[] = finalValues.map((item) => {
                        return {
                            ...item,
                            meetingDate: item.meetingDateValue,
                            type: EnumAcceptanceCouncilType.University,
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