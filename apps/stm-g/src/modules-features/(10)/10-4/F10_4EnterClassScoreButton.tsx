"use client";
import baseAxios from "@/api/config/baseAxios";
import { Button, Checkbox, Grid, Group, Table } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButtonModal, MyDataTable, MyNumberInput } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString, utils_notification_show } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";


export default function F10_4EnterClassScoreButton({ data }: { data: ICourseSection }) {
  const form = useForm()
  const disc = useDisclosure();
  const queryClient = useQueryClient();
  const [studentConfigScore, setStudentConfigScore] = useState<{ userId: number; scoreConfigId: number; CourseSectionId: number; point: number; test?: number }[]>([]);
  const [importData, setImportData] = useState(false);

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: []
    },
  })

  const updateStudentConfigScore = (
    prev: typeof studentConfigScore,
    userId: number,
    scoreConfigId: number,
    courseSectionId: number,
    point: number,
    testId?: number
  ) => {
    const existingIndex = prev.findIndex(
      (item) => item.userId === userId && item.scoreConfigId === scoreConfigId
    );

    if (existingIndex !== -1) {
      return prev.map((item, index) =>
        index === existingIndex ? { ...item, point } : item
      );
    }

    return [
      ...prev,
      {
        id: testId,
        userId: userId,
        scoreConfigId: scoreConfigId,
        CourseSectionId: courseSectionId,
        point: point,
      },
    ];
  };

  const studentListQuery = useQuery<ExamRegistration[]>({
    queryKey: [`F10_4StudentListByClassId`, data.id],
    queryFn: async () => {
      const body =
      {
        "courseTimeClusterIds": [
        ],
        "courseSectionId": data.id,
        "programId": 0,
        "status": 0,
        "type": 2,
        "courseIds": [
        ],
        "examIds": [

        ],
        "pageSize": 0,
        "pageNumber": 0
      }

      const response = await baseAxios.post("/Exam/GetStudent", body);

      const result: any = (response.data.data ?? []).filter((item: any) => item !== null);
      return result
    },
    enabled: disc[0]
  });

  const programDetailQuery = useQuery<IProgram>({
    queryKey: [`F10_4ProgramDetail`, data.id],
    queryFn: async () => {
      const response = await baseAxios.get(
        `/Program/ProgramDetail?programId=${data.exam.programId}`,
      );
      const result = response.data.data;

      return result ?? {};
    },
    enabled: disc[0],
  });

  function updateRow(id?: number, updatedFields?: Partial<any>) {

    const rootData = queryClient.getQueryData<any[]>([`F10_4StudentListByClassId`, data.id,]);

    const updatedData = rootData?.map((item) =>
      item.id == id ? { ...item, ...updatedFields } : item,
    );

    queryClient.setQueryData([`F10_4StudentListByClassId`, data.id], updatedData,);
  }

  const columns = useMemo<MRT_ColumnDef<ExamRegistration>[]>(
    () => {
      return [
        {
          header: "Mã học viên",
          accessorKey: "user.code",
        },
        {
          header: "Họ tên",
          accessorKey: "user.fullName",
        },
        {
          header: "Giới tính",
          accessorKey: "user.gender",
        },

        // {
        //   header: "Trạng thái học viên",
        //   accessorKey: "trangThaiHocVien",
        // },
        ...(programDetailQuery.data?.scoreConfigs
          ?.filter((config) => {
            return config.scoreType === 2;
          })
          ?.map((config, index) => ({
            header: config.code,
            accessorKey: `${config.id}`,
            accessorFn: (row: any) => {
              if (!row) return null;
              const tmp = row.user?.courseSectionStudentPoints || []
              const pointConfig = tmp.filter((item: any) => item.userId == row.user.id)
                .filter((item: any) => item.scoreConfigId == config.id)
                .filter((item: any) => item.courseSectionId == row.courseSectionId)
                .map((item: any) => item.point)[0]
              console.info("🚀 ~ F10_4EnterClassScoreButton.tsx:166 ~ pointConfig:", pointConfig)

              return (
                <MyNumberInput
                  hideControls
                  value={pointConfig}
                  defaultValue={pointConfig}
                  clampBehavior="strict"
                  allowNegative={false}
                  onBlur={(event) => {
                    const inputValue = (event.target as HTMLInputElement).value;
                    const parsedValue = parseInt(inputValue, 10);
                    updateRow(row.id, { [config.id]: parsedValue });
                    const test = tmp.find((item: any) => item.userId === row.userId && item.scorescoreConfigId === config.id);
                    setStudentConfigScore(prev =>
                      updateStudentConfigScore(prev, row.user.id, config.id, row.courseSectionId, parsedValue, test?.id)
                    );
                  }}

                />
              );
            },
          })) ?? []),
        {
          header: "Điểm thi",
          accessorKey: "totalPoint",
        },
        {
          header: "Đạt",
          accessorKey: "dat",
          Cell: ({ cell }) => (
            <Checkbox checked={cell.getValue<boolean>()} readOnly />
          ),
        },
        // {
        //   header: "Ngày cập nhật",
        //   accessorKey: "ngayCapNhat",
        //   accessorFn: (row) =>
        //     utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat!)),
        // },
        // {
        //   header: "Người cập nhật",
        //   accessorKey: "nguoiCapNhat",
        // },
      ]
    },
    [programDetailQuery.data],
  );

  if (studentListQuery.isLoading) return "Đang tải dữ liệu...";
  if (studentListQuery.isError) return "Không có dữ liệu...";
  if (programDetailQuery.isLoading) return "Đang tải dữ liệu...";
  if (programDetailQuery.isError) return "Không có dữ liệu...";

  return (
    <MyButtonModal
      title="Danh sách học viên"
      modalSize={"80%"}
      disclosure={disc}
      label="Nhập điểm"

    >
      <form onSubmit={form.onSubmit((values) => {
        // todo

        disc[1].close()
      })}>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Table w={"100%"} variant="vertical" layout="fixed">
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th w={160}>Mã nhóm thi</Table.Th>
                  <Table.Td>{data.code}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Ngày thi</Table.Th>
                  <Table.Td>{utils_date_dateToDDMMYYYString(new Date(data.exam?.officialExamDate))}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Tiết bắt đầu</Table.Th>
                  <Table.Td>1</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Số tiết</Table.Th>
                  <Table.Td>{data.exam.classPeriod}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Thời gian</Table.Th>
                  <Table.Td>90</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Grid.Col>
          {/* <Grid.Col span={{ base: 12, lg: 12 }}>
                        <Text><strong>Người cập nhật:</strong> GV. Lê Thị C</Text>
                    </Grid.Col> */}
        </Grid>
        {studentListQuery.data &&
          <MyDataTable
            columns={columns}
            data={studentListQuery.data!}
            exportAble
            renderTopToolbarCustomActions={() => (
              <Group>
                <Button onClick={async (value) => {

                  const result = await baseAxios.put("/CourseSection/StudentPointResult", studentConfigScore)

                  utils_notification_show({ crudType: "update", message: "Dữ liệu được lưu thành công!" })
                }}>Lưu và tổng kết</Button>
                <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} setImportedData={setImportData} />
              </Group>
            )}
          />}
      </form>

    </MyButtonModal>
  );
}


interface IExamCourse {
  examId: number;
  courseId: number;
  courseName: string;
  courseCode: string;
  courseTestDate: string;
  courseStatus: number;
  programName: string;
  quantity: number;
  reserveQuantity: number;
  status: number;
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
interface Role {
  aqModuleId: number | null;
  code: string;
  name: string;
  id: number;
  createdWhen: string | null;
  createdBy: number | null;
  modifiedWhen: string | null;
  modifiedBy: number | null;
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
  gender: number;
  dateOfBirth: string | null;
  educationLevel: number;
  modifiedBy: number;
  modifiedWhen: string;
  roles: Role[];
}



interface IAddress {
  location: string | null;
  isInsiteSchool: boolean | null;
  capacity: number;
  testCapacity: number;
  block: string;
  roomTypeId: number;
  branchId: number;
  roomType: IRoomType | null; // adjust type if available
  branch: any | null;         // adjust type if available
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IRoomPriority {
  addressId: number;
  courseSectionId: number;
  address: IAddress;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IExam {
  programId: number;
  examDate: string; // ISO date string
  roomTypeId: number | null;
  status: number;
  startRegistrationDate: string;
  endRegistrationDate: string;
  maxStudent: number;
  branchId: number;
  skillCenterId: number;
  courseSectionNumberTotal: number;
  courseSectionNumber: number;
  officialExamDate: string;
  classPeriod: number;
  examCourses: IExamCourse[] | null;
  certificateReviewBatchId: number | null;
  program: IProgram;
  branch: any | null; // Replace with specific type if known
  skillCenter: any | null; // Replace with specific type if known
  certificateReviewBatch: any | null;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface IExamCourse {
  examId: number;
  courseId: number;
  courseName: string;
  courseCode: string;
  courseTestDate: string;
  courseStatus: number;
  programName: string;
  quantity: number;
  reserveQuantity: number;
  status: number;
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
  certificate: ICertificate | null;
  skillCenter: ISkillCenter | null;
  subjects: ISubject[] | null;
  programType: IProgramType | null;
  programSubjects: IProgramSubject[];
  scoreConfigs: IScoreConfig[] | null;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface Role {
  aqModuleId: number | null;
  code: string;
  name: string;
  id: number;
  createdWhen: string | null;
  createdBy: number | null;
  modifiedWhen: string | null;
  modifiedBy: number | null;
  concurrencyStamp: string | null;
  isEnabled: boolean;
}
export interface ICourseSectionStudentPoint {
  userId: number;
  courseSectionId: number;
  scorescoreConfigId: number;
  point: number | null;
  id: number;
  code: string | null;
  name: string | null;
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
  gender: number;
  dateOfBirth: string | null;
  educationLevel: number;
  modifiedBy: number;
  modifiedWhen: string;
  roles: Role[];
  courseSectionStudentPoints: ICourseSectionStudentPoint[]
}

interface ICourseSection {
  quantityStudent: number;
  quantityStudentActual: number;
  courseTimeClusterId: number | null;
  isScheduled: boolean;
  status: number | null;
  type: number;
  examId: number;
  certificateReviewBatchId: number | null;
  exam: IExam;
  courseTimeCluster: any | null;
  certificateReviewBatch: any | null;
  roomPriority: IRoomPriority[];
  courseSectionLecturer: any[];
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}

interface ExamRegistration {
  userId: number;
  examId: number;
  courseSectionId: number;
  receiptType: string | null;
  receiptCode: string | null;
  receiptPrice: number | null;
  receiptLink: string | null;
  receiptNote: string | null;
  note: string | null;
  isCheck: boolean | null;
  user: IUser;
  exam: IExam | null;
  courseSection: ICourseSection;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}
