import { IRequirement } from "@/shared/interfaces/requirement/Requirement";
import { MRT_TableInstance } from "mantine-react-table";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";

export default function StandardStructure_ExportRequirements({ table }: { table: MRT_TableInstance<IRequirement> }) {
    const { data } = useExportData(table)
    const exportConfig = {
        fields: [
            { fieldName: "eaqStandardCode", header: "Mã tiêu chuẩn" },
            { fieldName: "eaqCriteriaCode", header: "Mã tiêu chí" },
            { fieldName: "eaqCriteriaName", header: "Tên tiêu chí" },
            { fieldName: "code", header: "Mã yêu cầu/ mốc chuẩn" },
            { fieldName: "name", header: "Tên yêu cầu/ mốc chuẩn" },
            { fieldName: "description", header: "Mô tả" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };

    const values = data.map((item) => {
        return {
            ...item,
            eaqStandardCode: item.eaqCriteria?.eaqStandard?.code || "",
            eaqCriteriaCode: item.eaqCriteria?.code || "",
            eaqCriteriaName: item.eaqCriteria?.name || "",
        } as any;
    });

    return (
        <AQButtonExportData
            objectName="Export danh sách yêu càu"
            data={values || []}
            exportConfig={exportConfig}
        />
    );
}
