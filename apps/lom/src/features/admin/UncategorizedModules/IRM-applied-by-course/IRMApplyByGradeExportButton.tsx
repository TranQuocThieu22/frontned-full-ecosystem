import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData"
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData"

interface GradeExportProps {
    table: any
    loading?: boolean
    disabled?: boolean
}

export default function IRMApplyByGradeExportButton({ table, loading, disabled }: GradeExportProps) {
    const { data } = useExportData(table);

    const exportConfig = {
        fields: [
            {
                fieldName: "code",
                header: "Mã khóa"
            },
            {
                fieldName: "name",
                header: "Tên khóa"
            },
            {
                fieldName: "programName",
                header: "Chương trình",
                formatFunction: (value: any, row: any) => row.coeProgram?.name ?? ""
            },
            {
                fieldName: "departmentName",
                header: "Khoa",
                formatFunction: (value: any, row: any) => row.coeProgram?.department?.name ?? ""
            },
            {
                fieldName: "IRMCode",
                header: "Mã thang do IRM",
                formatFunction: (value: any, row: any) => row.coeirm?.code ?? ""
            },
            {
                fieldName: "IRMName",
                header: "Tên thang đo IRM",
                formatFunction: (value: any, row: any) => row.coeirm?.name ?? ""
            },
        ],
    };

    return <AQButtonExportData
        data={data}
        objectName="Danh sách thang đo IRM"
        exportConfig={exportConfig}
        loading={loading}
        disabled={disabled}
    />
};
