"use client";
import baseAxios from "@/api/config/baseAxios";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { ENUM_GENDER } from "@/constants/enum/global";
import { ICourseSectionSchedule } from "@/interfaces/CourseSectionSchedule";
import { IstudentAttendence } from "@/interfaces/studentAttendence";
import { utils_date_getWeekDay } from "@/utils/date";
import { utils_notification_show } from "@/utils/notification";
import { Button, Grid, Select, Table, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

export default function F_oc0wdxytwk_attendanceTake({
  courseData,
  totalDate,
}: {
  courseData: ICourseSectionSchedule;
  totalDate: string;
}) {
  const dis = useDisclosure();
  const QueryClient = useQueryClient();
  const [Attendance, setAttendance] = useState<IstudentAttendence[]>([]);
  const [lecturerReview, setLecturerReview] = useState<string | null>(null);
  const studentData = useQuery<IstudentAttendence[]>({
    queryKey: ["F_oc0wdxytwk_attendanceTake_studentData", courseData.id],
    queryFn: async () => {
      const PARAM = `courseSectionScheduleId=${courseData.id}`;
      const response = await baseAxios.post(`/CourseSection/StudentAttendenceProcess?${PARAM}`);
      const result = response.data.data;
      if (response.data.data) {
        let updatedData = response.data.data.map((item: IstudentAttendence) => {
          const { user, ...rest } = item;
          return {
            ...rest,
          };
        });
        setAttendance(updatedData);
      }
      return result;
    },
    enabled: dis[0],
  });

  const columns = useMemo<MRT_ColumnDef<IstudentAttendence>[]>(
    () => [
      {
        header: "Họ tên",
        accessorKey: "user.fullName",
      },
      {
        header: "Giới tính",
        accessorFn: (row) => {
          return ENUM_GENDER[row.user?.gender!]
        }
      },
      {
        header: "Ngày sinh",
        accessorKey: "user.dateOfBirth",
        accessorFn: (originalRow) => (originalRow.user?.dateOfBirth ? utils_date_dateToDDMMYYYString(new Date(originalRow.user.dateOfBirth)) : ""),
      },
      {
        header: "Số điện thoại",
        accessorKey: "user.phoneNumber",
      },
      {
        header: "Email",
        accessorKey: "user.email",
      },
      // {
      //   header: "Trạng thái học viên",
      //   accessorKey: "status",
      // },
      {
        header: "Hiện diện",
        accessorKey: "hienDien",
        Cell: ({ row }) => (
          <Select
            variant="unstyled"
            data={[
              {
                value: "1",
                label: "Có mặt",
              },
              {
                value: "2",
                label: "Vắng có lý do",
              },
              {
                value: "3",
                label: "Vắng không lý do",
              },
            ]}
            clearable={false}
            defaultValue={row.original.status?.toString()}
            onChange={(value) => {
              handleFieldChange(row.original as any, "status", parseInt(value ?? "0"));
            }}
          />
        ),
      },
      {
        header: "Giảng viên nhận xét",
        accessorKey: "lecturerNote",
        Cell: ({ row }) => (
          <Textarea
            variant="unstyled"
            onFocus={(event) => (event.currentTarget.style.border = "1px solid #000")}
            onBlur={(event) => {
              handleFieldChange(row.original as any, "lecturerReview", event.currentTarget.value);
              return (event.currentTarget.style.border = "none");
            }}
            defaultValue={row.original.lecturerReview || ""}
          />
        ),
      },
    ],
    [studentData.data]
  );
  const handleFieldChange = (row: IstudentAttendence, fieldName: keyof IstudentAttendence, fieldValue: any) => {
    if (fieldValue === undefined || fieldValue === null || fieldValue === "") fieldValue = null;
    setAttendance((prev) => {
      const existingIndex = prev.findIndex((item: any) => item.id === row.id);
      const updatedExams = [...prev];
      updatedExams[existingIndex] = {
        ...updatedExams[existingIndex],
        [fieldName]: fieldValue,
      };
      return updatedExams;
    });
  };

  // Kiểm tra trạng thái của query
  if (studentData.isLoading) return "Đang tải dữ liệu...";
  if (studentData.isError) return "Không có dữ liệu...";

  return (
    <MyButtonModal disclosure={dis} title="Danh sách sinh viên" label="Điểm danh" modalSize="70%">
      <MyFlexColumn>
        <MyFlexRow>
          <Grid>
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <Table
                // mt={{ base: 0, lg: 16 }}
                w={"100%"}
                variant="vertical"
                layout="fixed">
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Th w={160}>Mã lớp</Table.Th>
                    <Table.Td>{courseData.courseSection?.code!}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>Tên khóa học</Table.Th>
                    <Table.Td>{courseData.courseSection?.courseTimeCluster?.name}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>Lịch học</Table.Th>
                    <Table.Td>
                      {utils_date_getWeekDay(new Date(courseData.startDate!), "vi")}, Ngày{" "}
                      {utils_date_dateToDDMMYYYString(new Date(courseData.startDate!))}
                    </Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>Tiết bắt đầu</Table.Th>
                    <Table.Td>{courseData.classPeriodStart}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>Số tiết</Table.Th>
                    <Table.Td>{courseData.classPeriodEnd! - courseData.classPeriodStart! + 1}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>Thời gian học</Table.Th>
                    <Table.Td>{courseData.totalMinute!} phút</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Textarea
                label="Nhận xét của giảng viên"
                minRows={5}
                placeholder="Nhập nhận xét của giảng viên"
                defaultValue={courseData.lecturerReview || ""}
                onBlur={(e) => setLecturerReview(e.currentTarget.value)}
              />
            </Grid.Col>
          </Grid>
        </MyFlexRow>
      </MyFlexColumn>

      <MyDataTable enableRowSelection columns={columns} data={studentData.data ?? []} />
      <Button
        color="green"
        onClick={async () => {
          console.log("lecturerReview", lecturerReview);
          const CourseSectionScheduleBody = {
            id: courseData.id,
            code: "string",
            name: "string",
            concurrencyStamp: courseData.concurrencyStamp,
            isEnabled: true,
            subjectName: courseData.subjectName,
            courseSectionId: courseData.courseSection?.id,
            addressId: courseData.address?.id,
            classPeriodStart: courseData.classPeriodStart,
            classPeriodEnd: courseData.classPeriodEnd,
            lecturerReview: lecturerReview,
            startDate: courseData.startDate,
            endDate: courseData.endDate,
            courseSectionScheduleLecturer: [],
          };
          try {
            // Execute both API calls concurrently
            await Promise.all([
              baseAxios.put("/CourseSection/UpdateStudentAttendence", Attendance),
              baseAxios.post("/CourseSection/UpdateSectionSchedule", CourseSectionScheduleBody)
            ]); // Await until *both* promises resolve

            // These actions run only after *both* API calls complete successfully
            utils_notification_show({ crudType: "update" });
            await QueryClient.invalidateQueries({ queryKey: ['F_oc0wdxytwk_Read'] })
            await studentData.refetch();
            await dis[1].close();

          } catch (error) {
            // Catches if *either* of the promises in Promise.all rejects, or if refetch/close rejects
            utils_notification_show({ crudType: "error" });
          }

          // baseAxios.put("/CourseSection/UpdateStudentAttendence", Attendance)
          //   .then(() => { // Wait for the first call to resolve
          //     return baseAxios.post("/CourseSection/UpdateSectionSchedule", CourseSectionScheduleBody); // Return the promise of the second call
          //   })
          //   .then(() => { // Wait for the second call to resolve
          //     utils_notification_show({ crudType: "update" });
          //     return studentData.refetch(); // Return the refetch promise
          //   })
          //   .then(() => { // Wait for refetch to resolve
          //     return dis[1].close(); // Return the close promise
          //   })
          //   .catch((error) => { // Catch any error in the chain
          //     utils_notification_show({ crudType: "error" });
          //   });

        }}>
        Lưu
      </Button>
    </MyButtonModal>
  );
}
