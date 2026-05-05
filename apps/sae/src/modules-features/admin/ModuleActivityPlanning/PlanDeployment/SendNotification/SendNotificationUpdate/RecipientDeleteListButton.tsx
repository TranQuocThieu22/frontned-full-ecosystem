import { service_commonNotification } from "@/api/services/service_commonNotification";
import { CommonNotification, UserNotification } from "@/interfaces/commonNotification";
import { CustomButtonDeleteList } from "@aq-fe/core-ui/shared/components/button/CustomButtonDeleteList";
import { UseFormReturnType } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  form: UseFormReturnType<CommonNotification>;
  values: UserNotification[];
}

export default function RecipientDeleteListButton({ form, values }: IProps) {
  const queryClient = useQueryClient();

  return (
    <CustomButtonDeleteList
      contextData={values.map((item) => item.user?.code).join(", ")}
      onSubmit={async () => {
        const selectedCodes = values.map((item) => item.user?.code).filter(Boolean) as string[];
        let updatedUserNotifications = [...(form.values?.userNotifications || [])];

        selectedCodes.forEach((code) => {
          const targetItem = updatedUserNotifications.find((item) => item.user?.code === code);

          if (!targetItem || targetItem.isEnabled === undefined) {
            updatedUserNotifications = updatedUserNotifications.filter(
              (item) => item.user?.code !== code
            );
          } else {
            updatedUserNotifications = updatedUserNotifications.map((item) =>
              item.user?.code === code ? { ...item, isEnabled: false } : item
            );
          }
        });

        form.setFieldValue("userNotifications", updatedUserNotifications);

        const res = await service_commonNotification.update({
          ...form.values,
          userNotifications: updatedUserNotifications,
        });

        queryClient.invalidateQueries({
          queryKey: ["sendNotificationTable_commonNotificationGetList"],
        });
        return res;
      }}
    />
  );
}
