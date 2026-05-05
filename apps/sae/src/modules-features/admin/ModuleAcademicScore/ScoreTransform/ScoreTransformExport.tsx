import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { ScoreTransform } from "@/interfaces/scoreTransform";

interface Props {
    table: MRT_TableInstance<ScoreTransform>;
    loading?: boolean;
}

export default function ScoreTransformExport({ loading, table }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Ngưỡng điểm học tập >=',
                fieldName: 'averageScore',
            },
            {
                header: 'Điểm rèn luyện quy đổi',
                fieldName: 'point',
            },

        ],
    };


    return (
        <AQButtonExportData
            loading={loading}
            objectName="Export Danh sách thang đo điểm học tập và quy đổi điểm rèn luyện"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
