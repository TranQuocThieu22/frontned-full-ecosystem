"use client"
import { service_event } from "@/api/services/service_event";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { usePermissionStore } from "@aq-fe/core-ui/shared/stores/usePermissionStore";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface F_8zyxe8t6gn_ApproveProps {
  eventId: number;
  onApproveSuccess?: () => void;
}

export default function ButtonApprove({ eventId, onApproveSuccess }: F_8zyxe8t6gn_ApproveProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const permissionStore = usePermissionStore()

  return (
    <CustomButtonModal
      buttonProps={{
        disabled: permissionStore.state.currentPermissionPage?.isUpdate === false,
        actionType: "default",
        children: "Duyệt"
      }}
      modalProps={{
        title: "Xác nhận duyệt"

      }}
      disclosure={[opened, { open, close, toggle: () => open() }]}
    >
      <Text mb="md">Xác nhận duyệt dữ liệu?</Text>
      <CustomButton actionType="create" onClick={async () => {
        try {
          await service_event.eventCompleted({ eventId: eventId });
          close();
          onApproveSuccess?.();
        } catch (error) {
          console.error(error);
        }
      }}>
        Xác nhận
      </CustomButton>
    </CustomButtonModal>
  );
}
