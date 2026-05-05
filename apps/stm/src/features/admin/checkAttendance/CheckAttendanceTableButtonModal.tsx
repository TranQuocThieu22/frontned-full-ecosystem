"use client"
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_date_dateToDDMMYYYString, utils_date_getWeekDay } from "@/utils/date";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomColumnDef, CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Button, Grid, Group, Select, SelectProps, Stack, Table, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMemo, useState } from "react";
import {
  ICourseSectionSchedule,
  ICsScheduleUpdateModel,
  IStudentAttendanceUpdateModel,
  IStudentByCsScheduleId,
} from "./interfaces";

export default function CheckAttendanceTableButtonModal({
  csScheduleValues,
}: {
  csScheduleValues: ICourseSectionSchedule;
}) {
  const disc = useDisclosure(false);
  const [csValues, setCsValues] = useState<ICsScheduleUpdateModel>({
    id: csScheduleValues.id,
    code: csScheduleValues.code,
    name: csScheduleValues.name,
    concurrencyStamp: csScheduleValues.concurrencyStamp,
    isEnabled: csScheduleValues.isEnabled,
    subjectName: csScheduleValues.subjectName,
    courseSectionId: csScheduleValues.courseSectionId,
    addressId: csScheduleValues.addressId,
    classPeriodStart: csScheduleValues.classPeriodStart,
    classPeriodEnd: csScheduleValues.classPeriodEnd,
    lecturerReview: csScheduleValues.lecturerReview,
    startDate: csScheduleValues.startDate,
    endDate: csScheduleValues.endDate,
    courseSectionScheduleLecturer: [],
  });
  const [studentAttendanceList, setStudentAttendanceList] = useState<IStudentAttendanceUpdateModel[]>([]);

  const ClassParticipantByScheduleId = useCustomReactQuery<IStudentByCsScheduleId[], unknown, IStudentByCsScheduleId[]>({
    queryKey: ["ClassParticipantByScheduleId", csScheduleValues.id],
    axiosFn: async () =>
      baseAxios.post(
        `/CourseSection/StudentAttendenceProcess?courseSectionScheduleId=${csScheduleValues.id}`,
      ),
    options: {
      enabled: disc[0],
      select: (raw) => {
        const data = (raw ?? []) as IStudentByCsScheduleId[];
        const updatedData = data.map((item) => {
          const { user, ...rest } = item;
          return rest;
        });
        setStudentAttendanceList(updatedData);
        return updatedData;
      },
    },
  });

  const getColorByValue = (value: string | null): string => {
    switch (value) {
      case "1":
        return "#4CAF50";
      case "2":
        return "#F44336";
      case "3":
        return "#FF9800";
      case "4":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  const icons: Record<string, React.ReactNode> = {
    1: <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: getColorByValue("1"), marginRight: 8 }} />,
    2: <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: getColorByValue("2"), marginRight: 8 }} />,
    3: <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: getColorByValue("3"), marginRight: 8 }} />,
    4: <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: getColorByValue("4"), marginRight: 8 }} />,
  };

  const renderSelectOption: SelectProps["renderOption"] = ({ option }) => (
    <Group flex="1" style={{ padding: "4px 4px", borderRadius: "4px" }}>
      <Group wrap="nowrap">
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: getColorByValue(option.value),
            marginRight: 8,
          }}
        />
        <Group wrap="nowrap">{option.label}</Group>
      </Group>
    </Group>
  );

  const columns = useMemo<CustomColumnDef<IStudentByCsScheduleId>[]>(() => [
    {
      header: "Họ tên",
      accessorKey: "user.fullName",
    },
    {
      header: "Giới tính",
      accessorFn: (row) => (row.user?.gender == null ? "" : ENUM_GENDER[row.user.gender]),
      size: 80,
    },
    {
      header: "Ngày sinh",
      accessorFn: (row) =>
        row.user?.dateOfBirth == null
          ? ""
          : utils_date_dateToDDMMYYYString(new Date(row.user.dateOfBirth)),
      size: 100,
    },
    {
      header: "Số điện thoại",
      accessorKey: "user.phoneNumber",
      size: 120,
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
    {
      header: "Trạng thái học viên",
      accessorFn: () => "Chưa có dữ liệu",
      size: 150,
    },
    {
      header: "Hiện diện",
      accessorKey: "status",
      accessorFn: (row) => (row.status == null ? "" : row.status.toString()),
      Cell: ({ row }) => (
        <Select
          clearable={false}
          searchable={false}
          allowDeselect={false}
          variant="unstyled"
          leftSection={row.original.status != null ? icons[row.original.status.toString()] : undefined}
          rightSection={<></>}
          renderOption={renderSelectOption}
          placeholder="điểm danh"
          data={[
            { value: "1", label: "Hiện diện" },
            { value: "2", label: "Vắng mặt" },
            { value: "3", label: "Đi trễ" },
            { value: "4", label: "Về sớm" },
          ]}
          defaultValue={row.original.status == null ? null : row.original.status.toString()}
          onChange={(value) => {
            const parsed = value == null ? null : parseInt(value, 10);
            handleFieldChange(row.original, "status", parsed);
            row.original.status = parsed ?? undefined;
          }}
        />
      ),
      size: 160,
    },
    {
      header: "Giảng viên đánh giá",
      accessorKey: "lecturerReview",
      Cell: ({ row }) => (
        <Textarea
          minRows={3}
          placeholder="nhập đánh giá"
          defaultValue={row.original.lecturerReview ?? ""}
          onBlur={(e) => handleFieldChange(row.original, "lecturerReview", e.currentTarget.value)}
        />
      ),
      size: 300,
    },
    { header: "Người cập nhật", accessorKey: "modifiedFullName" },
    {
      header: "Ngày cập nhật",
      accessorFn: (row) =>
        row.modifiedWhen ? utils_date_dateToDDMMYYYString(new Date(row.modifiedWhen)) : "",
    },
  ], [ClassParticipantByScheduleId.data]);

  const handleFieldChange = (
    row: IStudentByCsScheduleId,
    fieldName: keyof IStudentByCsScheduleId,
    fieldValue: any,
  ) => {
    const normalized = fieldValue === undefined || fieldValue === "" ? null : fieldValue;
    setStudentAttendanceList((prev) => {
      const existingIndex = prev.findIndex((item: any) => item.id === row.id);
      const updated = [...prev];
      if (existingIndex === -1) {
        updated.push({ ...(row as any), [fieldName]: normalized });
      } else {
        updated[existingIndex] = {
          ...updated[existingIndex],
          [fieldName]: normalized,
        };
      }
      return updated;
    });
  };

  const handleCallAPICheckAttendance = async () => {
    const response1 = await baseAxios.put("/CourseSection/UpdateStudentAttendence", studentAttendanceList);
    const response2 = await baseAxios.post("/CourseSection/UpdateSectionSchedule", csValues);

    if (response1.data.isSuccess === 1 && response2.data.isSuccess === 1) {
      ClassParticipantByScheduleId.refetch();
      notifications.show({
        title: "Thao tác thành công",
        message: "Dữ liệu đã được lưu",
        color: "green",
      });
    } else {
      notifications.show({
        title: "Thao tác thất bại",
        message: "Dữ liệu chưa được lưu",
        color: "red",
      });
    }
  };

  return (
    <CustomButtonModal
      disclosure={disc}
      modalProps={{ size: "90%", title: "Điểm danh buổi học" }}
      buttonProps={{ children: "Điểm danh", variant: "light", color: "lime" }}
    >
      <Stack>
        <Grid>
          <Grid.Col span={{ base: 12, lg: 7 }}>
            <Table w="100%" variant="vertical" layout="fixed">
              <Table.Tbody>
                <Table.Tr>
                  <Table.Th w={160}>Mã lớp</Table.Th>
                  <Table.Td>{csScheduleValues.courseSection?.code}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Tên khóa học</Table.Th>
                  <Table.Td>{csScheduleValues.courseSection?.course?.name}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Lịch học</Table.Th>
                  <Table.Td>
                    {utils_date_getWeekDay(new Date(csScheduleValues.startDate!), "vi")},{" "}
                    Ngày {utils_date_dateToDDMMYYYString(new Date(csScheduleValues.startDate!))}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Tiết bắt đầu</Table.Th>
                  <Table.Td>{csScheduleValues.classPeriodStart}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Số tiết</Table.Th>
                  <Table.Td>
                    {(csScheduleValues.classPeriodEnd! - csScheduleValues.classPeriodStart!) + 1}
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>Thời gian học</Table.Th>
                  <Table.Td>{csScheduleValues.totalMinute} phút</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 5 }}>
            <Textarea
              label="Nhận xét của giảng viên"
              minRows={5}
              placeholder="Nhập nhận xét của giảng viên"
              defaultValue={csValues.lecturerReview ?? ""}
              onBlur={(e) => setCsValues({ ...csValues, lecturerReview: e.currentTarget.value })}
            />
            <Group justify="flex-end" mt={24}>
              <Button onClick={handleCallAPICheckAttendance}>Lưu</Button>
            </Group>
          </Grid.Col>
        </Grid>

        <CustomDataTable
          enableRowNumbers
          columns={columns}
          data={(ClassParticipantByScheduleId.data ?? []) as IStudentByCsScheduleId[]}
          state={{ isLoading: ClassParticipantByScheduleId.isLoading }}
          initialState={{
            density: "xs",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: {
              right: ["mrt-row-actions", "status", "lecturerReview"],
            },
            columnVisibility: {
              modifiedFullName: false,
              modifiedWhen: false,
            },
          }}
        />
      </Stack>
    </CustomButtonModal>
  );
}

