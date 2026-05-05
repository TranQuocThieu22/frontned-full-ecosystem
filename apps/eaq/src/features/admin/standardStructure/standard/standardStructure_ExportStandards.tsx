import { IStandard } from "@/shared/interfaces/standard/Standard";
import { MRT_TableInstance } from "mantine-react-table";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";

export default function StandardStructure_ExportStandards({ table }: { table: MRT_TableInstance<IStandard> }) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã tiêu chuẩn" },
            { fieldName: "name", header: "Tên tiêu chuẩn" },
            { fieldName: "nameEg", header: "Tên tiêu chuẩn Eg" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };

    return (
        <AQButtonExportData
            objectName="Export danh sách tiêu chuẩn"
            data={data || []}
            exportConfig={exportConfig}
        />
    );
}
