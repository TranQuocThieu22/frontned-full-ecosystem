import MyButtonImport from '@/components/ButtonImport/MyButtonImport';
import useS_ButtonImport from '@/components/ButtonImport/useS_ButtonImport';
import { IUtils_Excel_ColumnConfig, utils_excel_download, utils_excel_exportExcel } from '@/utils/excel';
import ExcelJS from "exceljs";

interface I {
    userId?: number,
    coeCourseSectionId?: number,
}

const config: IUtils_Excel_ColumnConfig<I>[] = [
    {
        fieldKey: "userId",
        fieldName: "Mã người dùng",
        isRequired: true
    },
    {
        fieldKey: "coeCourseSectionId",
        fieldName: "Mã môn đăng ký",
        isRequired: true
    },
]
export default function F1_1Import() {
    const store = useS_ButtonImport()
    function handleExportStructure() {

        async function handleExportStructure() {
            const workbook = new ExcelJS.Workbook();
            await utils_excel_exportExcel<I>({
                workbook: workbook,
                sheetName: "Sinh viên",
                data: [],
                config: config
            })
            // Generate and download the Excel file
            utils_excel_download({ name: "Sinh viên", workbook })
        }
        // useEffect(() => {
        //     store.setProperty("fieldConfig", config)
        // }, [])
    }
    return (
        <MyButtonImport onExportStructure={handleExportStructure} onImport={(values) => {
            console.log(values);

        }} />
    )
}
