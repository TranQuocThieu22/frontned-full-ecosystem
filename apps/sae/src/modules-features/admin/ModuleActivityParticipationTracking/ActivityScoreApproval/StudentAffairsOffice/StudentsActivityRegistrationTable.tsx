"use client"
import { service_studentsActivityRegistration } from '@/api/services/service_studentsActivityRegistration';
import { Event } from '@/interfaces/event';
import { StudentEvent } from '@/interfaces/StudentEvent';
import { useAuthenticateStore } from '@aq-fe/core-ui/features/authenticate/useAuthenticateStore';
import { CustomButtonModal } from '@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal';
import { CustomColumnDef, CustomDataTable } from '@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable';
import { CustomCenterFull } from '@aq-fe/core-ui/shared/components/layout/CustomCenterFull';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { usePermissionStore } from '@aq-fe/core-ui/shared/stores/usePermissionStore';
import { Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUserPlus } from '@tabler/icons-react';
import { useMemo } from 'react';
import StudentsActivityRegistrationButtonDeleteList from './StudentsActivityRegistrationButtonDeleteList';


type IconType = "number" | "icon";

export default function StudentsActivityRegistrationTable({ eventValue, iconType = "number", completedByUserId, userWorkingUnitId, userRoleIds }:
  { eventValue: Event, iconType?: IconType, completedByUserId: number | null, userWorkingUnitId: number | null, userRoleIds: number[] | null }) {
  const disc = useDisclosure();
  const permissionStore = usePermissionStore()
  const currentLoginUser = useAuthenticateStore()

  const studentEventQuery = useCustomReactQuery({
    queryKey: ["FStudentsActivityRegistrationTable_GetByEvent", eventValue.id],
    axiosFn: () => service_studentsActivityRegistration.getByEvent({
      eventId: eventValue.id
    }),
    options: { enabled: disc[0] },
  });

  const originalData = studentEventQuery.data || [];
  const totalPoint = originalData?.reduce((sum, curr) => sum + (Number(curr.point) || 0), 0);
  const totalRow = {
    studentName: `${originalData.length} Sinh viên tham gia`,
    point: totalPoint,
    isTotalRow: true,
  };
  const displayData: (StudentEvent & { isTotalRow?: boolean })[] = [...originalData, totalRow];

  const columns = useMemo<CustomColumnDef<StudentEvent & { isTotalRow?: boolean }>[]>(() => [
    {
      header: "STT",
      Cell: ({ row }) => row.original.isTotalRow ? <Text fw={500} fz='sm' c='red'>Tổng:</Text> : row.index + 1,
      size: 60,
    },
    {
      header: "Mã sinh viên",
      accessorKey: "studentCode",
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
          : <CustomCenterFull > {row.original.point}</CustomCenterFull>,

    },
  ], []);

  if (studentEventQuery.isLoading) return "Loading...";

  return (
    <Group>
      <CustomButtonModal
        modalProps={{
          size: "70%",
          title: "Danh sách sinh viên đăng ký"
        }}
        buttonProps={{
          variant: iconType === "number" ? 'transparent' : 'filled',
          children: iconType === "number" ? `${eventValue.registrationCount ?? 0}`
            : <IconUserPlus />
        }}

        disclosure={disc}
      >
        {(permissionStore.state.currentPermissionPage?.isDelete) &&
          ((completedByUserId !== null && userWorkingUnitId !== null &&
            completedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
          <></>
          :
          <Text c="dimmed" fz={"sm"}>Đơn vị của bạn không có quyền cập nhật điểm cho hoạt động này</Text>
        }
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
                {(permissionStore.state.currentPermissionPage?.isDelete) &&
                  ((completedByUserId !== null && userWorkingUnitId !== null &&
                    completedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
                  <>
                    <StudentsActivityRegistrationButtonDeleteList id={row.original.id!} name={row.original.studentName!} />
                  </>
                  :
                  <></>
                }
              </CustomCenterFull>
            );
          }}
        />
      </CustomButtonModal>
    </Group>
  );
}
