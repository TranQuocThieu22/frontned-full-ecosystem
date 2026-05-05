import { ENUM_GENDER } from "@/constants/enum/global";
import { CommonNotification, UserNotification } from "@/interfaces/commonNotification";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RecipientExportButton from "../SendNotificationUpdate/RecipientExportButton";

interface IProps {
  form: UseFormReturnType<CommonNotification>;
}

export default function RecipientListTab({ form }: IProps) {
  const permissionStore = usePermissionStore();
  const columnsSinhVien = useMemo<MRT_ColumnDef<UserNotification>[]>(
    () => [
      {
        header: "Mã sinh viên",
        accessorKey: "user.code",
      },
      {
        header: "Họ tên",
        accessorKey: "user.fullName",
      },
      {
        header: "Ngày sinh",
        accessorKey: "user.dateOfBirth",
        accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.user?.dateOfBirth || "")),
      },
      {
        header: "Giới tính",
        accessorKey: "user.gender",
        accessorFn: (row) => ENUM_GENDER[row?.user?.gender as keyof typeof ENUM_GENDER] || "",
      },
      {
        header: "Mã lớp",
        accessorKey: "user.classCode", // sửa lại sau
      },
      {
        header: "Email",
        accessorKey: "user.email",
      },
    ],
    []
  );

  const columnsGiangVien = useMemo<MRT_ColumnDef<UserNotification>[]>(
    () => [
      {
        header: "Mã viên chức",
        accessorKey: "user.code",
        size: 120,
      },
      {
        header: "Họ tên",
        accessorKey: "user.fullName",
      },
      {
        header: "Ngày sinh",
        accessorKey: "user.dateOfBirth",
        accessorFn: (row) => dateUtils.toDDMMYYYY(new Date(row.user?.dateOfBirth || "")),
      },
      {
        header: "Giới tính",
        accessorKey: "user.gender",
        accessorFn: (row) => ENUM_GENDER[row.user?.gender! as keyof typeof ENUM_GENDER] || "",
      },
      {
        header: "Đơn vị",
        accessorKey: "user.workingUnitName",
      },
      {
        header: "Chức vụ",
        accessorKey: "user.jobTitle",
      },
      {
        header: "Email",
        accessorKey: "user.email",
      },
      {
        header: "Số điện thoại",
        accessorKey: "user.phoneNumber",
      },
    ],
    []
  );

  return (
    <Stack>
      <CustomFieldset title="Danh sách người nhận">
        {form.values?.recipientType === 1 ? (
          <CustomDataTable
            enableColumnFilters
            enableColumnResizing
            enableRowSelection
            enableRowNumbers
            columns={columnsGiangVien}
            data={form.values.userNotifications || []}
            renderTopToolbarCustomActions={({ table }) => (
              <Group>
                {permissionStore.state.currentPermissionPage?.isExport && (
                  <RecipientExportButton
                    table={table}
                    objectName="dsGiangVienNhanThongBao"
                    allData={form.values.userNotifications || []}
                    userType="lecturer"
                  />
                )}
              </Group>
            )}
          />
        ) : (
          <CustomDataTable
            enableColumnFilters
            enableColumnResizing
            enableRowSelection
            enableRowNumbers
            columns={columnsSinhVien}
            data={form.values.userNotifications || []}
            renderTopToolbarCustomActions={({ table }) => (
              <Group>
                {permissionStore.state.currentPermissionPage?.isExport && (
                  <RecipientExportButton
                    table={table}
                    objectName="dsSinhVienNhanThongBao"
                    allData={form.values.userNotifications || []}
                    userType="student"
                  />
                )}
              </Group>
            )}
          />
        )}
      </CustomFieldset>
    </Stack>
  );
}
