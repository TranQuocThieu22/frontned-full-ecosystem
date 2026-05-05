import { service_studentsActivityParticipation } from "@/api/services/service_studentsActivityParticipation";
import { StudentEvent } from "@/interfaces/StudentEvent";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Checkbox, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import StudentsActivityParticipationButtonCreate from "./StudentsActivityParticipationButtonCreate";
import StudentsActivityParticipationButtonDelete from "./StudentsActivityParticipationButtonDelete";

interface StudentsActivityParticipationModalProps {
  eventId: number;
  value: number;
  completedByUserId: number | null;
  userWorkingUnitId: number | null;
  userRoleIds: number[] | null;
}

export default function StudentsActivityParticipationButtonModal({ eventId, value, completedByUserId, userWorkingUnitId, userRoleIds }: StudentsActivityParticipationModalProps) {
  const disclosure = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const permissionStore = usePermissionStore();
  const currentLoginUser = useAuthenticateStore();

  const studentDataQuery = useCustomReactQuery({
    queryKey: ["F_8zyxe8t6gn_StudentsActivityParticipationModal_GetBy", eventId],
    axiosFn: () => service_studentsActivityParticipation.getBy(
      `?eventId=${eventId}`
    ),
    options: {
      enabled: opened
    }
  });

  useEffect(() => {
    setOpened(disclosure[0]);
  }, [disclosure[0]]);

  const refreshData = () => {
    if (opened) {
      studentDataQuery.refetch();
    }
  };

  const columns = useMemo<MRT_ColumnDef<StudentEvent>[]>(
    () => [
      {
        accessorKey: "studentName",
        header: "Họ và tên",
        enableSorting: true,
      },
      {
        accessorKey: "point",
        header: "Điểm",
        enableSorting: true,
      },
      {
        accessorKey: "isRegistration",
        header: "Đăng ký",
        Cell: ({ row }) => (
          <CustomCenterFull>
            <Checkbox checked={row.original.isRegistration} readOnly />
          </CustomCenterFull>
        ),
        enableSorting: true,
      },
    ],
    []
  );

  return (
    <>
      <CustomButtonModal
        modalProps={{
          title: "Danh sách sinh viên tham gia",
          size: "xl"
        }}
        buttonProps={{
          variant: "transparent",
          actionType: "default",
          children: value.toString()
        }}
        disclosure={disclosure}
      >
        {(permissionStore.state.currentPermissionPage?.isCreate ||
          permissionStore.state.currentPermissionPage?.isUpdate) &&
          ((completedByUserId !== null && userWorkingUnitId !== null &&
            completedByUserId === userWorkingUnitId) || (userRoleIds?.some(item => item === 2)) || currentLoginUser.state.userId?.toString() === '1') ?
          <>
            <StudentsActivityParticipationButtonCreate
              eventId={eventId}
              onSuccess={refreshData}
            />
          </>
          :
          <Text c="dimmed" fz={"sm"}>Đơn vị của bạn không có quyền cập nhật điểm cho hoạt động này</Text>
        }
        <CustomDataTable
          columns={columns}
          data={studentDataQuery.data || []}
          enableRowNumbers
          enableColumnFilters
          enableGlobalFilter
          enablePagination
          rowActionSize={120}
          renderRowActions={({ row }) => (
            <CustomCenterFull>
              <StudentsActivityParticipationButtonDelete id={row.original.id!} name={row.original.studentName!} />
            </CustomCenterFull>
          )}
        />
      </CustomButtonModal >
    </>
  );
}
