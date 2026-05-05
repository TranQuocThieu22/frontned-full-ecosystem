import { publicationService } from "@/shared/APIs/publicationService";
import { SRMPublication } from "@/shared/interfaces/SRMPublication";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { Workbook } from "exceljs";

const config: IExcelColumnConfig<SRMPublication>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã nhóm công bố",
        isRequired: true
    },
    {
        fieldKey: "name",
        fieldName: "Tên nhóm công bố",
        isRequired: true
    },
    {
        fieldKey: "note",
        fieldName: "Ghi chú"
    }
]

export default function PublicationGroupImport() {
    const stack = useModalsStack<ModalImportId>([])
    const handleExport = async () => {
        const workbook = new Workbook();
        await excelUtils.addSheet({ workbook, sheetName: "Danh sách nhóm công bố", config: config, data: [] })
        await excelUtils.download({ workbook, name: "Danh sách nhóm công bố" })
    }
    const importMutation = useCustomReactMutation({
        mutationType: "import",
        axiosFn: (values: SRMPublication[]) => publicationService.createList(values)
    })
    return (
        <>
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <MyModalImport
                stack={stack}
                onExportStructure={handleExport}
                fieldDefinition={config.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                onExecute={(finalValues) => {
                    importMutation.mutate(finalValues)
                }}
            />
        </>
    )
}
