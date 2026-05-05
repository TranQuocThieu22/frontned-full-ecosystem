import { SRMMainTask } from "@/shared/interfaces/SRMMainTask";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import { Workbook } from "exceljs";

const columnsConfig: IExcelColumnConfig<SRMMainTask>[] = [
    {
        fieldName: 'Nội dung công việc (Theo thuyết minh)',
        fieldKey: "content",
        isRequired: true
    },
    {
        fieldName: "Kết quả sản phẩm (Theo thuyết minh)",
        fieldKey: "plannedOutcome",
        isRequired: true
    },
    {
        fieldName: "Thời gian bắt đầu",
        fieldKey: "startDate",
        isRequired: true
    },
    {
        fieldName: "Thời gian kết thúc",
        fieldKey: "endDate",
        isRequired: true
    },
    {
        fieldName: "Kết quả sản phẩm đạt được",
        fieldKey: "actualOutcome",
        isRequired: true
    },
    {
        fieldName: "Dự toán kinh phí thực hiện (đồng)",
        fieldKey: "estimatedBudget",
        isRequired: true
    },
    {
        fieldName: "Ghi chú",
        fieldKey: "note"
    },
    {
        fieldName: "Minh chứng file",
        fieldKey: "attachmentPath",
    }
]

export default function ProgressReportMainJobsImport() {
    const stack = useModalsStack<ModalImportId>([])
    const handleExportStructure = async () => {
        const workbook = new Workbook()
        await excelUtils.addSheet({ workbook, config: columnsConfig, sheetName: "Danh sách công việc", data: [] })
        await excelUtils.download({ workbook: workbook, name: "Danh sách công việc" })
    }
    return (
        <>
            <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <MyModalImport
                fieldDefinition={columnsConfig.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
                onExportStructure={handleExportStructure}
                stack={stack}
                onExecute={() => {

                }}
            />
        </>
    )
}
