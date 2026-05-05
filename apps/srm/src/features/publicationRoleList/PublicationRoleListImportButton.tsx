"use client";

import { titleService } from "@/shared/APIs/titleService";
import { SRMTitle } from "@/shared/interfaces/SRMTitle";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from "exceljs";

const mainConfig: IExcelColumnConfig<SRMTitle>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã vai trò",
        isRequired: true,
    },
    {
        fieldKey: "name",
        fieldName: "Tên vai trò",
        isRequired: true,
    },
    {
        fieldKey: "isDeactivateValue",
        fieldName: "Không sử dụng",
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú",
    }
];

interface I_IsDeactivateValueConfig {
    isDeactivateValue: number,
    label: string
}

const isDeactivateConfig: IExcelColumnConfig<I_IsDeactivateValueConfig>[] = [
    {
        fieldKey: "isDeactivateValue",
        fieldName: "Giá trị",
        isRequired: false,
    },
    {
        fieldKey: "label",
        fieldName: "Tên giá trị",
        isRequired: false,
    },
];

export default function PublicationRoleListImportButton() {

    const importMutation = useCustomReactMutation({
        axiosFn: (body: SRMTitle[]) =>
            titleService.createOrUpdateList(body),
        mutationType: "import", // Setting ở đây sẽ tự notification nếu import thành công
    });

    const stack = useModalsStack<ModalImportId>([]);

    const handleExport = async () => {
        const workbook = new ExcelJS.Workbook();
        excelUtils.addSheet<SRMTitle>({
            workbook: workbook,
            sheetName: "Danh sách vai trò thực hiện công bố",
            data: [],
            config: mainConfig,
        });

        excelUtils.addSheet<I_IsDeactivateValueConfig>({
            workbook: workbook,
            sheetName: "Danh sách giá trị Không sử dụng",
            data: [
                {
                    isDeactivateValue: 0,
                    label: "Sử dụng",
                },
                {
                    isDeactivateValue: 1,
                    label: "Không sử dụng",
                },
            ],
            config: isDeactivateConfig,
        });

        excelUtils.download({
            name: "Danh sách vai trò thực hiện công bố",
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
                onExecute={(finalValues: SRMTitle[]) => {

                    const mappedValues: SRMTitle[] = finalValues.map((item) => {
                        return {
                            ...item,
                            type: 2,
                            isDeactivate: item.isDeactivateValue === 1
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