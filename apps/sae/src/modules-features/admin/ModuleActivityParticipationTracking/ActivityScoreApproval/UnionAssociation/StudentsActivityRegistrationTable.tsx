"use client"
import { service_studentsActivityRegistration } from '@/api/services/service_studentsActivityRegistration';
import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserPlus } from '@tabler/icons-react';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import StudentsActivityRegistrationButtonDeleteList from './StudentsActivityRegistrationButtonDeleteList';
import { CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';


type IconType = "number" | "icon";

export default function StudentsActivityRegistrationTable({ eventValue, iconType = "number" }: { eventValue: Event, iconType?: IconType }) {
  const disc = useDisclosure();

  const studentEventQuery = useCustomReactQuery({
    queryKey: ["StudentsActivityRegistrationTable_GetByEvent", eventValue.id],
    axiosFn: () => service_studentsActivityRegistration.getByEvent({
      eventId: eventValue.id
    }),
    options: { enabled: disc[0] },
  });

  const originalData = studentEventQuery.data || [];
  const totalPoint = originalData.reduce((sum, curr) => sum + (Number(curr.point) || 0), 0);
  const totalRow = {
    studentName: `${originalData.length} Sinh viên tham gia`,
    point: totalPoint,
    isTotalRow: true,
  };
  const displayData: (StudentEvent & { isTotalRow?: boolean })[] = [...originalData, totalRow];

  const columns = useMemo<MRT_ColumnDef<StudentEvent & { isTotalRow?: boolean }>[]>(() => [
    {
      header: "STT",
      Cell: ({ row }) => row.original.isTotalRow ? <Text fw={500} fz='sm' c='red'>Tổng:</Text> : row.index + 1,
      size: 60,
    },
    {
      header: "Họ và tên",
      accessorKey: "studentName",
      Cell: ({ row }) =>
        row.original.isTotalRow
          ? <Text fw={500} fz='sm' c='red'>{row.original.studentName}</Text>
          : row.original.studentName,
    },
    {
      header: "Điểm",
      accessorKey: "point",
      size: 80,
      Cell: ({ row }) =>
        row.original.isTotalRow
          ? <CustomCenterFull > <Text fw={500} fz='sm' c='red'>{row.original.point}</Text></CustomCenterFull>
          : row.original.point,
    },
  ], []);

  if (studentEventQuery.isLoading) return "Loading...";

  return (
    <Group>
      <CustomButtonModal
        isActionIcon
        modalProps={{
          size: '70%',
          title: "Danh sách sinh viên đăng ký"

        }}
        actionIconProps={{
          variant: "transparent",
          children:
            iconType === "number"
              ? <Text fz={"sm"} fw={400} span c={(eventValue?.registrationCount ?? 0) > 0 ? "blue" : "black"}>
                {eventValue.registrationCount ?? 0}
              </Text>
              : <IconUserPlus color="blue" />
        }}
        disclosure={disc}
      >
        <CustomDataTable
          enableRowNumbers={false}
          enableColumnFilterModes={true}
          enableColumnFilters={true}
          columns={columns}
          data={displayData}
          renderRowActions={({ row }) => {
            if (row.original.isTotalRow) return null;
            return (
              <CustomCenterFull>
                <StudentsActivityRegistrationButtonDeleteList id={row.original.id!} name={row.original.studentName!} />
              </CustomCenterFull>
            );
          }}
        />
      </CustomButtonModal>
    </Group>
  );
}
