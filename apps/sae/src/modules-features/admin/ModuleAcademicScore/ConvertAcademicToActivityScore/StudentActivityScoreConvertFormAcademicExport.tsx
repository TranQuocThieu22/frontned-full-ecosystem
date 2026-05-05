import { MRT_TableInstance } from "mantine-react-table";
import { useExportData } from "@aq-fe/core-ui/shared/hooks/useExportData";
import { AQButtonExportData } from "@aq-fe/core-ui/shared/components/button/AQButtonExportData";
import { StudentActivityScore } from "@/interfaces/studentActivityScore";

interface Props {
    table: MRT_TableInstance<StudentActivityScore>;
    loading?: boolean;
}

export default function StudentActivityScoreConvertFormAcademicExport({ loading, table }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã sinh viên',
                fieldName: 'user?.code',
                formatFunction: (_: any, row: StudentActivityScore) => row?.user?.code || '',
            },
            {
                header: 'Điểm rèn luyện quy đổi',
                fieldName: 'point',
                formatFunction: (_: any, row: StudentActivityScore) => row?.point || '',
            },

        ],
    };


    return (
        <AQButtonExportData
            loading={loading}
            objectName="Danh sách điểm rèn luyện quy đổi của sinh viên"
            data={data}
            exportConfig={exportConfig}
        />
    );
}
