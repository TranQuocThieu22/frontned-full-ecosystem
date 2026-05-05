import { ClassActivityPlan } from '@/interfaces/shared-interfaces/ClassActivityPlan';
import { CustomButtonExportData } from '@aq-fe/core-ui/shared/components/button/CustomButtonExportData';
import { useExportData } from '@aq-fe/core-ui/shared/hooks/useExportData';
import { MRT_TableInstance } from "mantine-react-table";

interface ClassActivityPlanExportButtonProps {
    table: MRT_TableInstance<ClassActivityPlan>;
    loading: boolean;
}

export default function ClassActivityPlanExportButton({ loading, table }: ClassActivityPlanExportButtonProps) {
    const { data } = useExportData(table);

    const classActivityPlanExportConfig = {
        fields: [
            {
                header: 'Mã lớp',
                fieldName: 'class.code',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.class?.code,
            },
            {
                header: 'Tên lớp',
                fieldName: 'class.name',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.class?.name,
            },
            {
                header: 'Mã khóa',
                fieldName: 'class.coeGrade.code',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.class?.coeGrade?.code,
            },
            {
                header: 'Mã chương trình',
                fieldName: 'class.coeGrade.coeProgram.code',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.class?.coeGrade?.coeProgram?.code,
            },
            {
                header: 'Mã bậc hệ',
                fieldName: 'class.coeGrade.coeDegreeLevelCode',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.class?.coeGrade?.coeDegreeLevelCode,
            },
            {
                header: 'Năm học - Học kỳ vào',
                fieldName: 'class.coeGrade.activityPlanStart.name',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.class?.coeGrade?.activityPlanStart?.name,
            },
            {
                header: 'Năm học - Học kỳ ra',
                fieldName: 'class.coeGrade.activityPlanEnd.name',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.class?.coeGrade?.activityPlanEnd?.name,
            },
            {
                header: 'Sĩ số lớp',
                fieldName: 'studentCount',
                formatFunction: (_: any, row: ClassActivityPlan) => row?.studentCount,
            },
        ],
    };

    return (
        <CustomButtonExportData
            loading={loading}
            objectName="Danh sách lớp học kỳ"
            data={data}
            exportConfig={classActivityPlanExportConfig}
        />
    )
}
