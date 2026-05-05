import { CustomButtonExportData } from "@aq-fe/core-ui/shared/components/button/CustomButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { Page } from "@aq-fe/core-ui/shared/interfaces/Page";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";

const config: IExportConfig<Page> = {
    fields: [
        {
            fieldName: "name",
            header: "Dashboard"
        },
        {
            fieldName: "description",
            header: "Mô tả"
        },
        {
            fieldName: "link",
            header: "Url video hướng dẫn"
        },
        {
            fieldName: "documentFilePath",
            header: "File tài liệu hướng dẫn"
        }
    ]
}

export default function PageContentExport({ table }: { table: MRT_TableInstance<Page> }) {
    const { data } = useExportData(table)
    return (
        <CustomButtonExportData exportConfig={config} objectName="Danh sách Page content" data={data} />
    )
}
