import { service_account } from "@/api/services/service_account";
import { service_studentActivityPlan } from "@/api/services/service_studentActivityPlan";
import { ENUM_GENDER } from "@/constants/enum/global";
import { Account } from "@/interfaces/account";
import { CommonNotification, UserNotification } from "@/interfaces/commonNotification";
import { StudentActivityPlan } from "@/interfaces/StudentActivityPlan";
import useS_Shared_ActivityPlan from "@/shared/features/ActivityPlan/useS_Shared_ActivityPlan";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import {
  CustomColumnDef,
  CustomDataTable,
} from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { Button, Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ENUM_RECIPIENT_TYPE } from "../SendNotificationTable";

interface IProps {
  form: UseFormReturnType<CommonNotification>;
  values: CommonNotification;
}

export default function RecipientAddButton({ form, values }: IProps) {
  const activityPlanStore = useS_Shared_ActivityPlan();
  const queryClient = useQueryClient();
  const disc = useDisclosure();

  const studentsQuery = useCustomReactQuery({
    queryKey: ["recipientAddButton_studentActivityPlan", activityPlanStore.state.ActivityPlan?.id],
    axiosFn: async () => {
      return await service_studentActivityPlan.findbyActivityPlan({
        activityPlanId: activityPlanStore.state.ActivityPlan?.id,
      });
    },
    options: {
      enabled: disc[0] && form.values.recipientType == 2,
    },
  });

  const lecturersQuery = useCustomReactQuery({
    queryKey: ["recipientAddButton_lecturers"],
    axiosFn: () =>
      service_account.getAllLecturer({
        // pageNumber: 1,
        // pageSize: 100,
      }),
    options: {
      enabled: disc[0] && form.values.recipientType == 1,
    },
  });

  const studentColumns = useMemo<MRT_ColumnDef<StudentActivityPlan>[]>(
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
        type: "gender",
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

  const lecturerColumns = useMemo<CustomColumnDef<Account>[]>(
    () => [
      {
        header: "Mã viên chức",
        accessorKey: "code",
      },
      {
        header: "Họ tên",
        accessorKey: "fullName",
      },
      {
        header: "Ngày sinh",
        accessorKey: "dateOfBirth",
        type: "ddMMyyyy",
      },
      {
        header: "Giới tính",
        accessorKey: "gender",
        type: "gender",
      },
      {
        header: "Đơn vị",
        accessorKey: "workingUnitName",
      },
      {
        header: "Chức vụ",
        accessorKey: "jobTitle",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Số điện thoại",
        accessorKey: "phoneNumber",
      },
    ],
    []
  );

  return (
    <CustomButtonModal
      modalProps={{
        size: "80vw",
        title: "Danh sách đối tượng nhận thông báo",
      }}
      buttonProps={{
        actionType: "update",
        type: "button",
      }}
      disclosure={disc}
    >
      <Group>
        <CustomSelect
          label="Chọn đối tượng áp dụng"
          data={converterUtils.enumToSelectOptions(ENUM_RECIPIENT_TYPE)}
          defaultValue="2"
          value={form.values.recipientType?.toString()!}
          onChange={(value) => {
            form.setFieldValue("recipientType", value ? Number(value) : undefined);
            if (value == values.recipientType?.toString()) {
              form.setFieldValue("userNotifications", values.userNotifications);
            } else {
              form.setFieldValue("userNotifications", []);
            }
          }}
          clearable={false}
        />
      </Group>
      {form.values.recipientType === 2 ? (
        <CustomDataTable
          isLoading={studentsQuery.isLoading}
          isError={studentsQuery.isError}
          enableRowSelection={true}
          enableRowNumbers={true}
          columns={studentColumns}
          data={studentsQuery.data || []}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Group>
                <Button
                  onClick={async () => {
                    const selectedRows = table
                      .getSelectedRowModel()
                      .rows.map((row) => row.original); //read entire rows
                    const existingIds = (form.values.userNotifications || []).map((u) => u.userId);
                    form.setFieldValue("userNotifications", [
                      ...(form.values.userNotifications || []),
                      ...selectedRows
                        .filter((row) => !existingIds.includes(row.userId))
                        .map(
                          (row) =>
                            ({
                              userId: row.userId,
                              commonNotificationId: form.values.id,
                              user: {
                                id: row.user?.id,
                                code: row.user?.code,
                                fullName: row.user?.fullName,
                                dateOfBirth: row.user?.dateOfBirth,
                                gender: row.user?.gender,
                                classCode: row.user?.classCode,
                                email: row.user?.email,
                              },
                            }) as UserNotification
                        ),
                    ]);
                    queryClient.invalidateQueries({
                      queryKey: ["sendNotificationTable_commonNotificationGetList"],
                    });
                    disc[1].close();
                  }}
                >
                  Chọn
                </Button>
              </Group>
            );
          }}
        />
      ) : (
        <CustomDataTable
          isLoading={lecturersQuery.isLoading}
          isError={lecturersQuery.isError}
          enableRowSelection={true}
          enableRowNumbers={true}
          columns={lecturerColumns}
          data={lecturersQuery.data || []}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <Group>
                <Button
                  onClick={async () => {
                    const selectedRows = table
                      .getSelectedRowModel()
                      .rows.map((row) => row.original); //read entire rows
                    const existingIds = (form.values.userNotifications || []).map((u) => u.userId);
                    form.setFieldValue("userNotifications", [
                      ...(form.values.userNotifications || []),
                      ...selectedRows
                        .filter((row) => !existingIds.includes(row.id))
                        .map(
                          (row) =>
                            ({
                              userId: row.id,
                              commonNotificationId: form.values.id,
                              user: {
                                id: row.id,
                                code: row.code,
                                fullName: row.fullName,
                                dateOfBirth: row.dateOfBirth,
                                gender: row.gender,
                                classCode: row.classCode,
                                email: row.email,
                                phoneNumber: row.phoneNumber,
                                workingUnitName: row.workingUnitName,
                                jobTitle: row.jobTitle,
                              },
                            }) as UserNotification
                        ),
                    ]);
                    queryClient.invalidateQueries({
                      queryKey: ["sendNotificationTable_commonNotificationGetList"],
                    });
                    disc[1].close();
                  }}
                >
                  Chọn
                </Button>
              </Group>
            );
          }}
        />
      )}
    </CustomButtonModal>
  );
}
