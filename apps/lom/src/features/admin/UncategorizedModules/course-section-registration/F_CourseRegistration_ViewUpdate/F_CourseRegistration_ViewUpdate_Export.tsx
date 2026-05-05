import { COECourseSectionStudent } from '@/interfaces/shared-interfaces/COECourseSectionStudent';
import { AQButtonExportData } from '@aq-fe/core-ui/shared/components/button/AQButtonExportData';
import { useExportData } from '@aq-fe/core-ui/shared/hooks/useExportData';
import { dateUtils } from '@aq-fe/core-ui/shared/utils/dateUtils';
import { MRT_TableInstance } from 'mantine-react-table';
interface Props {
    table: MRT_TableInstance<COECourseSectionStudent>;
    FilterGradeStore?: any;
    store?: any;
    loading?: boolean;
}
export default function F_CourseRegistration_ViewUpdate_Export({ loading, table, FilterGradeStore, store }: Props) {
    const { data } = useExportData(table);
    const exportConfig = {
        fields: [
            {
                header: 'Mã môn học',
                fieldName: 'code',
                formatFunction: (value: any, row: COECourseSectionStudent) => store.state?.subject?.code,
            },
            {
                header: 'Tên môn học',
                fieldName: 'fullName',
                formatFunction: (value: any, row: COECourseSectionStudent) => store.state?.subject?.name,
            },
            {
                header: 'Mã sinh viên',
                fieldName: 'dateOfBirth',
                formatFunction: (value: any, row: COECourseSectionStudent) => row?.user?.code,
            },
            {
                header: 'Họ tên',
                fieldName: 'gender',
                formatFunction: (value: any, row: COECourseSectionStudent) => row?.user?.fullName,
            },
            {
                header: 'Ngày sinh',
                fieldName: 'coeCourseSection.code',
                formatFunction: (value: any, row: COECourseSectionStudent) =>
                    dateUtils.toDDMMYYYY(new Date(row.user?.dateOfBirth!)),
            },
            {
                header: 'Giới tính',
                fieldName: 'coeCourseSection.name',
                formatFunction: (value: any, row: COECourseSectionStudent) =>
                    row?.user?.gender === 1 ? 'Nam' : row.user?.gender === 2 ? 'Nữ' : '',
            },
            {
                header: 'Mã lớp',
                fieldName: 'coeCourseSection_code',
                formatFunction: (value: any, row: COECourseSectionStudent) => row?.coeCourseSection?.code,
            },
            {
                header: 'Tên lớp',
                fieldName: 'coeCourseSection_name',
                formatFunction: (value: any, row: COECourseSectionStudent) => row?.coeCourseSection?.name,
            },
            {
                header: 'Mã khóa',
                fieldName: 'coeCourseSection.coeGrade.code',
                formatFunction: (value: any, row: COECourseSectionStudent) => FilterGradeStore?.state.grade?.code,
            },
            {
                header: 'Tên khóa',
                fieldName: 'coeCourseSection.coeGrade.name',
                formatFunction: (value: any, row: COECourseSectionStudent) => FilterGradeStore?.state.grade?.name,
            },
        ],
    };

    return (
        <AQButtonExportData
            loading={loading}
            objectName="DanhSachSinhVienDangKyMonHoc"
            data={data}
            exportConfig={exportConfig}
        />
    )
}
