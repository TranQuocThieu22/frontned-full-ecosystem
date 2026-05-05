"use client";
import { service_account } from "@/api/services/service_account";
import { service_event } from "@/api/services/service_event";
import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import { EnumLabelRegisterType, EnumRegisterType } from "@/enum/EnumEventRegisterType";
import { Event } from "@/interfaces/event";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { Badge, Box, Divider, Flex, Group, Paper, Text, ThemeIcon, Title } from "@mantine/core";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ActivityInfoBarChart from "./ActivityInfoBarChart";
import ActivityPlanningBtnCancel from "./ActivityPlanningBtnCancel";
import RegisterActivityButton from "./RegisterActivityButton";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomHtmlWrapper } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomHtmlWrapper";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { IconUser } from "@tabler/icons-react";
import StundentInfoDisplay from "@/components/StudentInfo/StundentInfoDisplay";

export default function ActivityPlanningLayout() {
  const currentUserQuery = useCustomReactQuery({
    queryKey: ["Q_StudentInfo"],
    axiosFn: () => service_account.getCurrentUser(),
  });

  const currentUser = useMemo(() => {
    if (!currentUserQuery.data) return {};
    return currentUserQuery.data;
  }, [currentUserQuery.data]);

  const activityRegistration = useCustomReactQuery({
    queryKey: ["Q_StudentsActivityRegistration_GetByStudent", currentUser.id],
    axiosFn: () =>
      service_studentsActivityRegistration.getByStudent({
        studentId: currentUser.id,
      }),
    options: {
      enabled: !!currentUser.id,
    },
  });

  const studentRegisQuery = useCustomReactQuery({
    queryKey: ["Q_GetStudentRegis"],
    axiosFn: () => service_event.getStudentRegis({
      standardid: 0
    }),
  });

  const studentRegisList = useMemo(() => {
    if (!studentRegisQuery.data || !activityRegistration.data) return [];

    // Lấy danh sách eventId đã đăng ký
    const registeredEventIds = activityRegistration.data.map(
      (item) => item.eventId
    );

    // Lọc ra những item chưa đăng ký
    return studentRegisQuery.data.filter(
      (row) => !registeredEventIds.includes(row.id)
    );
  }, [studentRegisQuery.data, activityRegistration.data]);

  const eventQuantityCount = useMemo(() => {
    if (!activityRegistration.data) return 0;
    return activityRegistration.data.filter((row) => row.event?.name).length;
  }, [activityRegistration.data]);

  const eventTotalScoreArchived = useMemo(() => {
    if (!activityRegistration.data) return 0;

    return activityRegistration.data.reduce((total, row) => {
      // chỉ cộng nếu có tên sự kiện và có điểm hợp lệ
      if (typeof row.point === "number") {
        return total + row.point;
      }
      return total;
    }, 0);
  }, [activityRegistration.data]);
  // Cột dữ liệu cho bảng hoạt động
  const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(
    () => [
      { header: "Điều", accessorKey: "event.standardCode", size: 50 },
      {
        header: "Hoạt động ngoại khóa",
        size: 700,
        accessorFn: (row) =>
          row.event?.name ? <CustomHtmlWrapper html={row.event.name} /> : "",
      },
      { header: "Đơn vị tổ chức", accessorKey: "event.hostName" },
      {
        header: "Đơn vị ghi nhận",
        accessorKey: "event.reviewedName",
        size: 190,
      },
      {
        header: "Đơn vị công nhận",
        accessorKey: "event.completedName",
        size: 210,
      },
      { header: "Địa điểm tổ chức", accessorKey: "event.location" },
      {
        header: "Từ ngày",
        accessorKey: "event.startDate",
        accessorFn: (row) =>
          row.event?.startDate
            ? dateUtils.toDDMMYYYY(new Date(row.event.startDate))
            : "",
      },
      {
        header: "Đến ngày",
        accessorKey: "event.endDate",
        accessorFn: (row) =>
          row.event?.endDate
            ? dateUtils.toDDMMYYYY(new Date(row.event.endDate))
            : "",
      },
      { header: "SLSV dự kiến", accessorKey: "event.quantity" },
      { header: "Điểm tối thiểu", accessorKey: "event.minPoint", size: 160 },
      { header: "Điểm tối đa", accessorKey: "event.maxPoint", size: 160 },
      {
        header: "Đối tượng tham gia",
        accessorKey: "registerType",
        accessorFn: (row) => EnumLabelRegisterType[row.event?.registerType as EnumRegisterType],
      },
    ],
    []
  );
  // Cột dữ liệu cho bảng hoạt động đã đăng ký
  const columnsStudentRegis = useMemo<MRT_ColumnDef<Event>[]>(
    () => [
      { header: "Điều", accessorKey: "standardCode", size: 50 },
      {
        header: "Hoạt động ngoại khóa",
        size: 350,
        accessorFn: (row) =>
          row.name ? <CustomHtmlWrapper html={row.name} /> : "",
      },
      { header: "Đơn vị tổ chức", accessorKey: "hostName" },
      { header: "Đơn vị ghi nhận", accessorKey: "reviewedName", size: 190 },
      { header: "Đơn vị công nhận", accessorKey: "completedName", size: 210 },
      { header: "Địa điểm tổ chức", accessorKey: "location" },
      {
        header: "Từ ngày",
        accessorKey: "startDate",
        accessorFn: (row) =>
          row.startDate
            ? dateUtils.toDDMMYYYY(new Date(row.startDate))
            : "",
      },
      {
        header: "Đến ngày",
        accessorKey: "endDate",
        accessorFn: (row) =>
          row.endDate
            ? dateUtils.toDDMMYYYY(new Date(row.endDate))
            : "",
      },
      { header: "SLSV dự kiến", accessorKey: "quantity" },
      { header: "Điểm tối thiểu", accessorKey: "minPoint", size: 160 },
      { header: "Điểm tối đa", accessorKey: "maxPoint", size: 160 },
      {
        header: "Đối tượng tham gia",
        accessorKey: "registerType",
        accessorFn: (row) => EnumLabelRegisterType[row.registerType as EnumRegisterType],
      },

    ],
    []
  );

  if (activityRegistration.isLoading) return "Loading...";
  return (
    <Box>
      <StundentInfoDisplay
        currentUser={currentUser}
        eventQuantityCount={eventQuantityCount}
        eventTotalScoreArchived={eventTotalScoreArchived}
      />
      <Box>
        <CustomFieldset title="Danh sách hoạt động tùy chọn">
          <CustomDataTable
            isLoading={studentRegisQuery.isLoading}
            isError={studentRegisQuery.isError}
            enableRowNumbers={true}
            columns={columnsStudentRegis}
            data={studentRegisList || []}
            renderRowActions={({ row }) => {
              return (
                <CustomCenterFull>
                  <RegisterActivityButton data={row.original} />
                </CustomCenterFull>
              );
            }}
          ></CustomDataTable>
        </CustomFieldset>
      </Box>
      <Box mt={20}>
        <CustomFieldset title="Danh sách hoạt động đã đăng ký">
          <CustomDataTable
            isLoading={activityRegistration.isLoading}
            isError={activityRegistration.isError}
            enableRowNumbers={true}
            columns={columns}
            data={activityRegistration.data || []}
            renderRowActions={({ row }) => {
              if (row.original?.id == 0) return null;
              return (
                <CustomCenterFull>
                  <ActivityPlanningBtnCancel
                    id={row.original?.id!}
                    code={row?.original?.code!}
                  />
                </CustomCenterFull>
              );
            }}
          ></CustomDataTable>
          {/* <Group mt="lg" justify="flex-end">
            <Paper withBorder p="xs" radius="sm" bg="blue.0" style={{ borderColor: 'var(--mantine-color-blue-2)' }}>
              <Group gap="xl">
                <Text fw={600} size="sm" c="blue.9">
                  Số lượng hoạt động: <Text span fw={800}>{eventQuantityCount}</Text>
                </Text>
                <Text fw={600} size="sm" c="blue.9">
                  Tổng điểm tích lũy: <Text span fw={800}>0</Text>
                </Text>
              </Group>
            </Paper>
          </Group> */}
        </CustomFieldset>
      </Box>
      <ActivityInfoBarChart />
    </Box>
  );
}
