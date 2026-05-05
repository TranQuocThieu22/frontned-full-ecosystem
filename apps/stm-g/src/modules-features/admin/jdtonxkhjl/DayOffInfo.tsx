import { utils_date_dateToDDMMYYYString } from '@/utils/date';
import { Grid, Table } from '@mantine/core';
import { MyFieldset } from 'aq-fe-framework/components';

export default function DayOffInfo(
  { dayOffDetailQuery }: { dayOffDetailQuery: any }
) {
  const heNhapDiem = {
    TRONG_SO: 1,
    TRUNG_BINH_CONG: 2,
    TONG_CONG: 3,
    DIEM_DANH: 4
  }
  return (
    <MyFieldset title="Lịch nghỉ dạy cần xử lý" mb={20} mt={20}>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 1212, lg: 6 }}>

          <Table w="100%" variant="vertical" layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w={160}>Giảng viên</Table.Th>
                <Table.Td>{dayOffDetailQuery.courseSectionScheduleLecturer?.[0]?.user?.fullName || ''}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th w={160}>Mã lớp</Table.Th>
                <Table.Td>{dayOffDetailQuery.courseSection?.code || ''}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Phòng</Table.Th>
                <Table.Td>{dayOffDetailQuery.address?.name || ''}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 6 }}>

          <Table w="100%" variant="vertical" layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Table.Th w={160}>Ngày dạy</Table.Th>
                <Table.Td>{utils_date_dateToDDMMYYYString(new Date(dayOffDetailQuery.startDate)) || ''}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Tiết bắt đầu</Table.Th>
                <Table.Td>{dayOffDetailQuery.classPeriodStart || ''}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>số tiết</Table.Th>
                <Table.Td>{dayOffDetailQuery.classPeriodEnd - dayOffDetailQuery.classPeriodStart || ''}</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </MyFieldset>
  )
}


interface IClassScoreEntry {
  id?: number;
  code?: string;
  courseName?: string;
  startDateRegistration?: Date | undefined;
  totalClassPeriodNumber?: number;
  totalHours?: number;
  timeClusterDetails?: ItimeClusterDetails[];
  quantityStudent?: number;
  dsHocVien?: number;
  status?: number
  ngayCapNhat?: Date;
  nguoiCapNhat?: string;
  course: ICourse
  courseTimeCluster: ICourseTimeCluster
  courseSectionLecturer?: CourseSectionLecturer[]
}

interface ItimeClusterDetails {
  id?: number,
  code?: string,
  name?: string,
  timeClusterId?: number,
  dayOfWeek?: number,
  startTime?: Date,
  endTime?: Date,
  classPeriodStart?: number,
  classPeriodEnd?: number,

}
interface CourseSectionLecturer {
  userId: number;
  courseId: number | null;
  user: any | null; // Consider using a specific type instead of 'any' if possible
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}


interface IRole {
  aqModuleId: number | null;
  code: string;
  name: string;
  id: number;
  createdWhen: string | null;
  createdBy: string | null;
  modifiedWhen: string | null;
  modifiedBy: string | null;
  concurrencyStamp: string | null;
  isEnabled: boolean;
}

interface IUser {
  id: number;
  isBlocked: boolean;
  roleId: number;
  userName: string;
  code: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatarPath: string;
  fullName: string;
  facultyId: number | null;
  facultyName: string | null;
  classId: number | null;
  majorsId: number | null;
  workingUnitId: number | null;
  workingUnitName: string | null;
  gender: number | null;
  dateOfBirth: Date | null;
  educationLevel: number | null;
  modifiedBy: number;
  modifiedWhen: string;
  roles: IRole[];
}

interface ITimeCluster {
  timeTypeId: number;
  timeClusterDetails: any[];
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface ICourseTimeCluster {
  courseId: number;
  timeClusterId: number;
  maxStudent: number;
  timeCluster: ITimeCluster;
  id: number;
  code: string | null;
  name: string | null;
  concurrencyStamp: string | null;
  isEnabled: boolean;
  course: ICourse
}

interface ICourse {
  status: number;
  programId: number;
  startDateRegistration: string;
  endDateRegistration: string;
  testDate: string;
  studyDate: string;
  endDate: string | null;
  price: number;
  branchId: number;
  skillCenterId: number;
  skillCenter: any | null;
  branch: any | null;
  program: any | null;
  courseTimeClusters: ICourseTimeCluster[];
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface ICourseSection {
  courseId: number;
  timeClusterId: number;
  quantityStudent: number;
  course: ICourse;
  timeCluster: ITimeCluster;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IEnrollment {
  userId: number;
  courseTimeClusterId: number;
  courseSectionId: number;
  user: IUser;
  courseTimeCluster: ICourseTimeCluster;
  courseSection: ICourseSection;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string | null;
  isEnabled: boolean;
}

interface ICertificate {
  type: number;
  link: string;
  note: string;
  skillCenterId: number;
  skillCenter: ISkillCenter | null;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface ISkillCenter {
  note: string;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IRoomType {
  note: string | null;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface ISubject {
  classPeriodNumber: number;
  hours: number;
  note: string;
  roomTypeId: number;
  roomType: IRoomType;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IProgramSubject {
  programId: number;
  subjectId: number;
  subject: ISubject;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IScoreConfig {
  programId: number;
  scoreType: number;
  percentScore: number;
  scoreMax: number;
  scoreMin: number;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IProgramType {
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IProgram {
  skillCenterId: number;
  programTypeId: number;
  totalClassPeriodNumber: number;
  totalHours: number;
  isTesting: boolean;
  certificateId: number;
  isCancel: boolean;
  note: string;
  price: number;
  scoreSystem: number;
  scoreFormula: number;
  scorePass: number;
  testScoreSystem: number | null;
  testScoreFormula: number | null;
  testScorePass: number | null;
  certificate: ICertificate;
  skillCenter: ISkillCenter;
  subjects: ISubject[] | null;
  programType: IProgramType;
  programSubjects: IProgramSubject[];
  scoreConfigs: IScoreConfig[];
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}
