import { ICriteria } from "@/shared/interfaces/criteria/Criteria";
import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";

export default function StandardStructure_ExportCriterias({ table }: { table: MRT_TableInstance<ICriteria> }) {
    const { data } = useExportData(table)
    const exportConfig = {
        fields: [
            { fieldName: "eaqStandardCode", header: "Mã tiêu chuẩn" },
            { fieldName: "code", header: "Mã tiêu chí" },
            { fieldName: "name", header: "Tên tiêu chí" },
            { fieldName: "evidence", header: "Minh chứng gợi ý" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };
    const values = data.map((item) => {
        return {
            ...item,
            eaqStandardCode: item.eaqStandard?.code || "",
        } as any;
    });
    return (
        <AQButtonExportData
            objectName="Export danh sách tiêu chí"
            data={values || []}
            exportConfig={exportConfig}
        />
    );
}
