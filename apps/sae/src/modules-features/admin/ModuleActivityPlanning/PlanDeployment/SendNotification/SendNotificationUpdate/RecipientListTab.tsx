import { ENUM_GENDER } from "@/constants/enum/global";
import { CommonNotification, UserNotification } from "@/interfaces/commonNotification";
import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Group, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import RecipientAddButton from "./RecipientAddButton";
import RecipientDeleteButton from "./RecipientDeleteButton";
import RecipientDeleteListButton from "./RecipientDeleteListButton";
import RecipientExportButton from "./RecipientExportButton";

interface IProps {
  form: UseFormReturnType<CommonNotification>;
  values: CommonNotification;
}

export default function RecipientListTab({ form, values }: IProps) {
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
        type: "ddMMyyyy",
      },
      {
        header: "Giới tính",
        accessorKey: "user.gender",
        type: "gender"
      },
      {
        header: "Mã lớp",
        accessorKey: "user.classCode",
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
        type: "ddMMyyyy",
      },
      {
        header: "Giới tính",
        accessorKey: "user.gender",
        type: "gender",
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
                <RecipientAddButton values={values} form={form} />
                <RecipientDeleteListButton
                  form={form}
                  values={table.getSelectedRowModel().flatRows.map((item) => item.original)}
                />
                <RecipientExportButton
                  table={table}
                  objectName="dsGiangVienNhanThongBao"
                  allData={form.values.userNotifications || []}
                  userType="lecturer"
                />
              </Group>
            )}
            renderRowActions={({ row }) => {
              return (
                <CustomCenterFull>
                  <RecipientDeleteButton form={form} code={row.original.user?.code!} />
                </CustomCenterFull>
              );
            }}
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
                <RecipientAddButton values={values} form={form} />
                <RecipientDeleteListButton
                  form={form}
                  values={table.getSelectedRowModel().flatRows.map((item) => item.original)}
                />
                <RecipientExportButton
                  table={table}
                  objectName="dsSinhVienNhanThongBao"
                  allData={form.values.userNotifications || []}
                  userType="student"
                />
              </Group>
            )}
            renderRowActions={({ row }) => {
              return (
                <CustomCenterFull>
                  <RecipientDeleteButton form={form} code={row.original.user?.code!} />
                </CustomCenterFull>
              );
            }}
          />
        )}
      </CustomFieldset>
    </Stack>
  );
}
