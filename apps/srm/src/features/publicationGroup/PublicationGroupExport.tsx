import { SRMPublication } from "@/shared/interfaces/SRMPublication";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { IExportConfig } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { MRT_TableInstance } from "mantine-react-table";

const config: IExportConfig<SRMPublication> = {
    fields: [
        {
            fieldName: "code",
            header: "Mã nhóm công bố"
        },
        {
            fieldName: "name",
            header: "Tên nhóm công bố"
        },
        {
            fieldName: "note",
            header: "Ghi chú"
        }
    ]
}

export default function PublicationGroupExport({ table }: { table: MRT_TableInstance<SRMPublication> }) {
    const { data } = useExportData(table)
    return (
        <AQButtonExportData data={data} exportConfig={config} objectName="Nhóm công bố" />
    )
}
