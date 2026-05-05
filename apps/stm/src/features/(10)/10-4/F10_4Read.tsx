"use client";
import { utils_date_getWeekDay } from "@/utils/date";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString, utils_notification_show } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F10_4EnterClassScoreButton from "./F10_4EnterClassScoreButton";

export default function F10_4Read() {
  const query = useQuery<ICourseSection[]>({
    queryKey: [`F10_4Read`],
    queryFn: async () => {
      const body = {
        "courseTimeClusterIds": [
        ],
        "courseSectionId": 0,
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
      const response = await baseAxios.post("/courseSection/get", body);
      // const response = await baseAxios.get("/exam/getexam");

      const result = response.data.data;
      return result;
    },
  });

  const columns = useMemo<MRT_ColumnDef<ICourseSection>[]>(
    () => [
      {
        header: "Mã khóa thi",
        accessorKey: "exam.code",
      },
      {
        header: "Tên khóa thi",
        accessorKey: "exam.name",
      },
      {
        header: "Mã nhóm thi",
        accessorKey: "code",
      },
      // {
      //   header: "Phòng",
      //   accessorKey: "phong",
      //      accessorFn: (row) =>
      //     {
      //       if (row.room) {

      //       }
      //     }
      // },

      {
        header: "Ngày",
        accessorKey: "ngay",
        accessorFn: (row) =>
          utils_date_dateToDDMMYYYString(new Date(row.exam?.officialExamDate)),
      },
      {
        header: "Thứ",
        accessorKey: "thu",
        accessorFn: (row) =>
          utils_date_getWeekDay(new Date(row.exam?.officialExamDate), "vi"),
      },
      {
        header: "Tiết bắt đầu",
        accessorKey: "tietBatDau",
      },
      {
        header: "Số tiết",
        accessorKey: "exam.classPeriod",
      },
      {
        header: "Số phút",
        accessorKey: "soPhut",
      },
      // {
      //   header: "Trạng thái thi",
      //   accessorKey: "trangThaiThi",
      //   accessorFn: (row) => <Anchor>{row.trangThaiThi}</Anchor>,
      // },
      {
        header: "Số lượng điểm đã nhập",
        accessorKey: "soLuongDiemDaNhap",
      },
      {
        header: "Đạt",
        accessorKey: "dat",
      },
      {
        header: "Trạng thái chứng chỉ",
        accessorKey: "trangThaiChungChi",
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
    ],
    [],
  );

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <MyDataTable
      columns={columns}
      data={query.data!}
      enableRowSelection={true}

      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F10_4EnterClassScoreButton data={row.original} />
          </MyCenterFull>
        );

      }}
      renderTopToolbarCustomActions={({ table }) => (
        <Group>
          <Button

            onClick={async () => {
              const selectedRowData = table.getSelectedRowModel().flatRows.map((row) => row.original)
              const courseSectionIds = selectedRowData.map((item) => item.id).join(",");
              const PARAM = `?CourseSectionIds= ${courseSectionIds}`
              const result = await baseAxios.post("/Exam/SummaryScoreExam" + PARAM)

              if (!result.data.data || result.data.data.length === 0) {
                return utils_notification_show({ crudType: "error", message: "Có lỗi" });
              }
              return utils_notification_show({ crudType: "update", message: "Dữ liệu được lưu thành công!" })

            }}>Tổng kết điểm</Button>
        </Group >
      )
      }
    />
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

interface User {
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

interface User {
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
  user: User;
  exam: IExam | null;
  courseSection: ICourseSection;
  id: number;
  code: string;
  name: string;
  concurrencyStamp: string;
  isEnabled: boolean;
}
