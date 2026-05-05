import { Class } from '@/interfaces/shared-interfaces/Class';
import { ClassStudent } from '@/interfaces/shared-interfaces/ClassStudent';
import { AQButtonExportData } from '@aq-fe/core-ui/shared/components/button/AQButtonExportData';
import { useExportData } from '@aq-fe/core-ui/shared/hooks/useExportData';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { MRT_TableInstance } from 'mantine-react-table';

interface Props {
    table: MRT_TableInstance<ClassStudent>;
    data_classes: Class;
    loading?: boolean;
}
export default function StudentExportButton({ loading, table, data_classes }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã SV',
                fieldName: 'code',
                formatFunction: (value: any, row: ClassStudent) => row?.code,
            },
            {
                header: 'Họ và Tên',
                fieldName: 'fullName',
                formatFunction: (value: any, row: ClassStudent) => row?.fullName,
            },
            {
                header: 'Ngày sinh',
                fieldName: 'dateOfBirth',
                formatFunction: (value: any, row: ClassStudent) => row?.dateOfBirth ? dateUtils.toDDMMYYYY(new Date(row.dateOfBirth)) : "",
            },
            {
                header: 'Giới tính',
                fieldName: 'gender',
                formatFunction: (value: any, row: ClassStudent) => row?.gender === 1 ? "Nam" : "Nữ",
            },
            {
                header: 'Mã lớp',
                fieldName: 'coeCourseSection.code',
                formatFunction: (value: any, row: ClassStudent) => data_classes?.code,
            },
            {
                header: 'Tên lớp',
                fieldName: 'coeCourseSection.name',
                formatFunction: (value: any, row: ClassStudent) => data_classes?.name,
            },
            {
                header: 'Mã khóa',
                fieldName: 'coeCourseSection.coeGrade.code',
                formatFunction: (value: any, row: ClassStudent) => data_classes?.coeGrade?.code,
            },
            {
                header: 'Tên khóa',
                fieldName: 'coeCourseSection.coeGrade.name',
                formatFunction: (value: any, row: ClassStudent) => data_classes?.coeGrade?.name,
            },
        ],
    };
    return (
        <AQButtonExportData
            loading={loading}
            objectName="DanhSachSinhVienCuaLop"
            data={data}
            exportConfig={exportConfig}
        />
    )
}
