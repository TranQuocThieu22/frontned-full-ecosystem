"use client";

import { CommonNotification } from "@/interfaces/commonNotification";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { UseFormReturnType } from "@mantine/form";
import { AxiosHeaders } from "axios";

interface IProps {
  code: string;
  form: UseFormReturnType<CommonNotification>;
}

export default function RecipientDeleteButton({ form, code }: IProps) {

  return (
    <CustomActionIconDelete
      contextData={code}
      onSubmit={async () => {
        const targetItem = (form.values?.userNotifications ?? []).find(
          (item) => item.user?.code === code
        );
        let updatedUserNotifications;
        if (!targetItem || targetItem.isEnabled === undefined) {
          updatedUserNotifications = (form.values?.userNotifications ?? []).filter(
            (item) => item.user?.code !== code
          );
          form.setFieldValue("userNotifications", updatedUserNotifications);
        } else {
          updatedUserNotifications = form.values.userNotifications?.map((item) =>
            item.user?.code === code ? { ...item, isEnabled: false } : item
          );
          form.setFieldValue("userNotifications", updatedUserNotifications);
        }
        // // Trả về một Promise thành công
        return Promise.resolve({
          data: {
            isSuccess: 1,
            message: "",
            data: {},
          },
          status: 200,
          statusText: "OK",
          headers: new AxiosHeaders(),
          config: { headers: new AxiosHeaders() },
        });
      }}
    />
  );
}
