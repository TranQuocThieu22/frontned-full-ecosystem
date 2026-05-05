import { AQButtonExportData } from "@/components/Button/ButtonCRUD/AQButtonExportData";
import { useExportData } from "@/hooks";
import { IPage } from "@/interfaces";
import { IExportConfig } from "@/utils";
import { MRT_TableInstance } from "mantine-react-table";

const config: IExportConfig<IPage> = {
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

export default function PageContentExport({ table }: { table: MRT_TableInstance<IPage> }) {
    const { data } = useExportData(table)
    return (
        <AQButtonExportData exportConfig={config} objectName="Danh sách Page content" data={data} />
    )
}
