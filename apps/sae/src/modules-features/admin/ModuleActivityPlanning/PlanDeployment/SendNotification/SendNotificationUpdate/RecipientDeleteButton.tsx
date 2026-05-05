import { service_commonNotification } from "@/api/services/service_commonNotification";
import { CommonNotification } from "@/interfaces/commonNotification";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { UseFormReturnType } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  code: string;
  form: UseFormReturnType<CommonNotification>;
}
export default function RecipientDeleteButton({ form, code }: IProps) {
  const queryClient = useQueryClient();
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
        }

        const res = await service_commonNotification.update({
          ...form.values,
          userNotifications: updatedUserNotifications
        });

        queryClient.invalidateQueries({
          queryKey: ["sendNotificationTable_commonNotificationGetList"],
        });
        return res;
      }}
    />
  );
}
