import MyButtonImport from "@/components/Buttons/ButtonImport/MyButtonImport";
interface ReceiptData {
    userId?: string;
    courseTimeClusterId?: string;
    receiptType?: string;
    receiptCode?: string;
    receiptPrice?: number;
    receiptNote?: string;
}

export default function F_s5dibenvwp_Import() {
    function handleExportStructure() {
        // // Export to Excel with Vietnamese headers
        // utils_excel.addSheet<ReceiptData>({
        //     dataSheets: [
        //         {
        //             name: "Phiếu Thu",
        //             data: [],

        //         },
        //     ],
        //     headerMappings: {
        //         "userId": "Id học viên",
        //         "courseTimeClusterId": "Id khóa cụm",
        //         "receiptType": "Loại thu",
        //         "receiptCode": "Số phiếu thu",
        //         "receiptPrice": "Đã thu",
        //         "receiptNote": "Ghi chú phiếu thu"
        //     },
        //     markedColumns: ["userId", "courseTimeClusterId"]
        // });
        // utils_notification_show({ crudType: "export_structure" })
    }
    return (
        <MyButtonImport onExportStructure={handleExportStructure} />
    )
}
