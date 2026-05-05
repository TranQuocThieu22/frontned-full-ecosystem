import { service_commonNotification } from "@/api/services/service_commonNotification";
import { CommonNotification } from "@/interfaces/commonNotification";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import InformationTab from "./InformationTab";
import RecipientList from "./RecipientListTab";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { IconMail } from "@tabler/icons-react";

interface IProps {
  value: CommonNotification;
}
export default function SendNotificationButton({ value }: IProps) {
  const disc = useDisclosure();
  const queryClient = useQueryClient();
  const form = useForm<CommonNotification>({
    initialValues: value,
    validate: {},
  });

  const mutation = useMutation({
    mutationFn: async (body: CommonNotification) => {
      const res = await service_commonNotification.sendMailNotification(body?.id || 0);
      return res;
    },
    onSuccess: () => {
      utils_notification_show({ crudType: "create", message: "Gửi Mail thông báo thành công!" });
      queryClient.invalidateQueries({
        queryKey: ["sendNotificationTable_commonNotificationGetList"],
      });
    },
    onError: () => {
      utils_notification_show({ crudType: "error", message: "Gửi Mail thông báo thất bại!" });
    },
  });

  const handleSendNotification = async () => {
    mutation.mutate(form.values);
  };

  useEffect(() => {
    if (value) {
      form.setValues({
        ...value,
      });
    }
  }, [value]);
  return (
    <CustomButtonModal
      isActionIcon
      actionIconProps={{
        actionType: 'update',
        color: 'blue',
        children: <IconMail />,
        toolTipProps: {
          label: "gửi thông báo"
        }
      }}
      modalProps={{
        title: "Chi tiết thông báo",
        size: "80vw",
      }}
      // buttonProps={{
      //   children: "Gửi thông báo",
      // }}
      disclosure={disc}
    >
      <CustomTabs
        tabs={[
          {
            label: "Thông tin chung",
            children: <InformationTab form={form} />,
          },
          {
            label: "Danh sách người nhận",
            children: <RecipientList form={form} />,
          },
        ]}
      />
      <Group justify="flex-end">
        {!form.values.isSendEduGo && <CustomButton>Gửi lên EduGo</CustomButton>}
        {!form.values.isSendMail && (
          <CustomButton onClick={handleSendNotification}>Gửi Mail thông báo</CustomButton>
        )}
      </Group>
    </CustomButtonModal>
  );
}
