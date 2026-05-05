import { MyButton } from "@/components/Buttons/Button/MyButton";
import { U0MyShowNotification } from "@/utils/notification";
import { Button, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentProps, useState } from "react";
import { MyActionIconModal } from "../ActionIconModal/MyActionIconModal";

interface IActionIconDelete
  extends Omit<ComponentProps<typeof MyActionIconModal>, "disclosure"> {
  onSubmit: () => void;
  onSuccess?: () => void; // Custom callback for success handling
  onError?: () => void; // Custom callback for error handling
  deleteKey?: string;
}

export default function MyActionIconDelete({
  onSubmit,
  onSuccess,
  onError,
  deleteKey,
  ...rest
}: IActionIconDelete) {
  const queryClient = useQueryClient();
  const disc = useDisclosure();
  const [loading, setLoading] = useState(false);

  // Mutation hook for delete operation
  const mutation = useMutation({
    mutationFn: async () => {
      await onSubmit();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      U0MyShowNotification({ crudType: "delete" });
      setLoading(false);
      disc[1].close();
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return (
    <MyActionIconModal disclosure={disc} crudType="delete" {...rest}>
      Bạn sắp xóa dữ liệu{deleteKey && ` "${deleteKey}"`}. Hành động này không
      thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?
      <SimpleGrid cols={2}>
        <MyButton
          crudType="delete"
          onClick={() => {
            setLoading(true);
            mutation.mutate();
          }}
          loading={loading}
        >
          Xác nhận xóa
        </MyButton>
        <Button
          color="gray"
          leftSection={<IconX />}
          onClick={() => {
            disc[1].close();
          }}
        >
          Hủy thao tác
        </Button>
      </SimpleGrid>
    </MyActionIconModal>
  );
}
