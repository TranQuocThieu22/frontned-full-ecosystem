import { SRMTrainingOutcome } from "@/shared/interfaces/SRMTrainingOutcome";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";
const exportConfig: IExportConfig<SRMTrainingOutcome> = {
    fields: [
        {
            header: "Họ và tên",
            fieldName: "fullName"
        },
        {
            header: "Thời gian bắt đầu",
            fieldName: "startDate",
            formatFunction: (value, row) => dateUtils.toMMYYYY(row.startDate)
        },
        {
            header: 'Thời gian kết thúc',
            fieldName: "endDate",
            formatFunction: (value, row) => dateUtils.toMMYYYY(row.endDate)
        },
        {
            header: "Đã bảo vệ",
            fieldName: "degree",
            formatFunction: (value, row) => row.degree && "Đã bảo vệ"
        },
        {
            header: "Tình trạng",
            fieldName: "status"
        },
        {
            header: "Minh chứng",
            fieldName: "attachmentPath",
        }
    ]
}

export default function TrainingResultsExport({ table }: { table: MRT_TableInstance<SRMTrainingOutcome> }) {
    const { data } = useExportData(table)
    return (
        <AQButtonExportData
            objectName="Danh sách sản phẩm hoàn thành"
            data={data}
            exportConfig={exportConfig}
        />
    )
}
