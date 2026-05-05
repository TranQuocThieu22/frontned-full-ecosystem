import { CommonNotification, UserNotification } from "@/interfaces/commonNotification";
import {
  CustomColumnDef,
  CustomDataTable,
} from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useMemo } from "react";
import RecipientAddButton from "./RecipientAddButton";
import RecipientDeleteButton from "./RecipientDeleteButton";
import RecipientDeleteListButton from "./RecipientDeleteListButton";
import { ENUM_GENDER } from "@/constants/enum/global";

interface IProps {
  form: UseFormReturnType<CommonNotification>;
}

export default function RecipientList({ form }: IProps) {
  const studentColumns = useMemo<CustomColumnDef<UserNotification>[]>(
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

  const teacherColumns = useMemo<CustomColumnDef<UserNotification>[]>(
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
    <CustomFieldset title="Danh sách người nhận">
      {form.values?.recipientType === 1 ? (
        <CustomDataTable
          enableColumnFilters
          enableColumnResizing
          enableRowSelection
          enableRowNumbers
          columns={teacherColumns}
          data={form.values.userNotifications || []}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <RecipientAddButton form={form} />
              <RecipientDeleteListButton
                form={form}
                values={table.getSelectedRowModel().flatRows.map((item) => item.original)}
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
          columns={studentColumns}
          data={form.values.userNotifications || []}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <RecipientAddButton form={form} />
              <RecipientDeleteListButton
                form={form}
                values={table.getSelectedRowModel().flatRows.map((item) => item.original)}
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
  );
}
