"use client";

import { service_commonNotification } from "@/api/services/service_commonNotification";
import { ENUM_DEPARTMENT_TYPE } from "@/constants/enum/global";
import { CommonNotification } from "@/interfaces/commonNotification";
import {
  CustomDataTable,
  CustomColumnDef,
} from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Box, Group } from "@mantine/core";
import { useMemo } from "react";
import SendNotificationButton from "./SendNotification/SendNotificationButton";
import SendNotificationCreateButton from "./SendNotificationCreate/SendNotificationCreateButton";
import SendNotificationDeleteButton from "./SendNotificationDeleteButton";
import SendNotificationDeleteListButton from "./SendNotificationDeleteListButton";
import SendNotificationDetailButton from "./SendNotificationDetail/SendNotificationDetailButton";
import SendNotificationUpdateButton from "./SendNotificationUpdate/SendNotificationUpdateButton";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";

export enum ENUM_RECIPIENT_TYPE {
  "Giảng viên" = 1,
  "Sinh viên" = 2,
}

export default function SendNotificationTable() {
  const permissionStore = usePermissionStore();
  const notificationQuery = useCustomReactQuery({
    queryKey: ["sendNotificationTable_commonNotificationGetList"],
    axiosFn: () => service_commonNotification.commonNotificationGetList(),
  });

  const columns = useMemo<CustomColumnDef<CommonNotification>[]>(
    () => [
      {
        header: "Mã thông báo",
        accessorKey: "code",
        type: "html",
      },
      {
        header: "Tiêu đề thông báo",
        accessorKey: "name",
        size: 250,
        type: "html",
      },
      {
        header: "Nội dung chính",
        accessorKey: "content",
        size: 400,
        type: "html",
      },
      {
        header: "Đối tượng",
        accessorKey: "recipientType",
        accessorFn: (row) => ENUM_RECIPIENT_TYPE[row.recipientType!] || "",
      },
      {
        header: "Phân loại",
        accessorKey: "type",
        accessorFn: (row) => ENUM_DEPARTMENT_TYPE[row.type!] || "",
      },
      {
        header: "Người gửi",
        accessorKey: "sender",
      },
      {
        header: "Ngày gửi",
        accessorKey: "sendTime",
        type: "ddMMyyyy",
      },
      {
        header: "Số người nhận",
        accessorKey: "sentMailCount",
      },
      {
        header: "Gửi Mail thông báo",
        accessorKey: "isSendMail",
        size: 150,
        type: "squareCheck",
      },
      {
        header: "Gửi lên EduGo",
        accessorKey: "isSendEduGo",
        size: 150,
        type: "squareCheck",
      },
    ],
    []
  );

  return (
    <CustomFieldset title={"Danh sách thông báo"}>
      <CustomFlexColumn>
        <CustomDataTableAPI
          enableRowSelection={true}
          enableRowNumbers={true}
          initialState={{
            columnPinning: { right: ["isSendMail", "isSendEduGo"] },
          }}
          exportProps={{
            fileName: "Danh sách thông báo"
          }}
          renderTopToolbarCustomActions={({ table }) => {
            const selectedRows =
              table.getSelectedRowModel().flatRows.map((item) => item.original) || [];
            return (
              <Group>
                <SendNotificationCreateButton />
                <SendNotificationDeleteListButton values={selectedRows} />
              </Group>
            );
          }}
          renderRowActions={({ row }) => {
            return (
              <Group justify="space-between">
                {row.original.isSendMail && row.original.isSendEduGo ? (
                  <SendNotificationDetailButton value={row.original} />
                ) : (
                  <Group>
                    <SendNotificationButton value={row.original} />
                    <SendNotificationUpdateButton value={row.original} />
                    <SendNotificationDeleteButton
                      isSendMail={row.original.isSendMail}
                      code={row.original.code!}
                      id={row.original.id!}
                    />
                  </Group>
                )}
              </Group>
            );
          }}
          columns={columns}
          query={notificationQuery}
        />
      </CustomFlexColumn>
    </CustomFieldset>
  );
}
