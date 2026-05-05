"use client"
import { MyButton } from "@/core";
import { ModalImportId, MyModalImport } from "@/core/overlays/MyModalStackImport/MyModalImport";
import { IExcelColumnConfig, utils_excel } from "@/utils-v2/utils_excel";
import { useModalsStack } from "@mantine/core";
import { Workbook } from "exceljs";

interface I { id: string, code: string, date: string }
const columnsConfig: IExcelColumnConfig<I>[] = [
    {
        fieldKey: "code",
        fieldName: "Mã thông báo",
        isRequired: true
    },
    {
        fieldKey: "name",
        fieldName: "Tiêu đề thông báo",
        isRequired: true
    },
    {
        fieldKey: "description",
        fieldName: "Nội dung chính"
    },
    {
        fieldKey: "targetAudience",
        fieldName: "Đối tượng áp dụng"
    },
    {
        fieldKey: "issuedDate",
        fieldName: "Ngày ban hành",
    },
    {
        fieldKey: "startDate",
        fieldName: "Ngày bắt đầu nhận đề xuất"
    },
    {
        fieldKey: "endDate",
        fieldName: "Ngày kết thúc nhận đề xuất"
    },

]

export default function TaskProposalNoticeImport() {
    const stack = useModalsStack<ModalImportId>([]);

    const handleExport = async () => {
        const workbook = new Workbook()
        await utils_excel.addSheet({
            sheetName: "Danh sách đề xuất khoa học",
            workbook,
            data: [],
            config: columnsConfig
        })
        await utils_excel.download({ workbook, name: "Cấu trúc import thông báo đề xuất nhiệm vụ khoa học" })
    }

    return (
        <>
            <MyButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
            <MyModalImport
                onExportStructure={handleExport}
                stack={stack}
                onExecute={(values) => {
                    console.log(values);
                }}
                fieldDefinition={columnsConfig.map(item => ({
                    key: item.fieldKey,
                    label: item.fieldName,
                    isRequired: item.isRequired
                }))}
            />
        </>
    )
}
