import { service_studentsActivityRegistration } from "@/api/services/service_studentsActivityRegistration";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";

export default function ActivityPlanningBtnCancel({
  id,
  code,
}: {
  id: number;
  code: string;
}) {
  const disc = useDisclosure();
  const queryClient = useQueryClient();

  return (
    <CustomButtonModal
      buttonProps={{
        children: "Hủy",
        bg: 'red'

      }}
      modalProps={{
        title: "Xác nhận hủy đăng ký hoạt động"
      }}
      disclosure={disc}
    >
      <Highlight
        highlight={code || []}
        color="red.6"
        highlightStyles={{
          fontWeight: 700,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {`Bạn sắp hủy tham gia hoạt động ${code || ""
          }. Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?`}
      </Highlight>
      <Group grow>
        <CustomButton
          actionType="delete"
          onClick={() => {
            const res = service_studentsActivityRegistration.delete(id);
            queryClient.invalidateQueries({
              queryKey: ["Q_StudentsActivityRegistration_GetByStudent"],
            });
            disc[1].close();
            utils_notification_show({ crudType: "delete", color: "green" });
            return res;
          }}
        />
        <CustomButton actionType="cancel" onClick={disc[1].close} />
      </Group>
    </CustomButtonModal>
  );
}
