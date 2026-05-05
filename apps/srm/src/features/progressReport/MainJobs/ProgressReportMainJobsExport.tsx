import { SRMMainTask } from "@/shared/interfaces/SRMMainTask";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { currencyUtils } from "@aq-fe/core-ui/shared/utils/currencyUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";
const exportConfig: IExportConfig<SRMMainTask> = {
    fields: [
        {
            header: 'Nội dung công việc (Theo thuyết minh)',
            fieldName: "content"
        },
        {
            header: "Kết quả sản phẩm (Theo thuyết minh)",
            fieldName: "plannedOutcome"
        },
        {
            header: "Thời gian bắt đầu",
            fieldName: "startDate",
            formatFunction: (value, row) => dateUtils.toMMYYYY(row.startDate)
        },
        {
            header: "Thời gian kết thúc",
            fieldName: "endDate",
            formatFunction: (value, row) => dateUtils.toMMYYYY(row.endDate)
        },
        {
            header: "Kết quả sản phẩm đạt được",
            fieldName: "actualOutcome"
        },
        {
            header: "Dự toán kinh phí thực hiện (đồng)",
            fieldName: "estimatedBudget",
            formatFunction: (value, row) => currencyUtils.formatWithSuffix(row.estimatedBudget)
        },
        {
            header: "Ghi chú",
            fieldName: "note"
        },
        {
            header: "Minh chứng file",
            fieldName: "attachmentPath",
        }
    ]
}

export default function ProgressReportMainJobsExport({ table }: { table: MRT_TableInstance<SRMMainTask> }) {
    const { data } = useExportData(table)
    return (
        <AQButtonExportData
            objectName="Danh sách công việc"
            data={data}
            exportConfig={exportConfig}
        />
    )
}
