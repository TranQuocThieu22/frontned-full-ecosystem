import { utils_notification_show } from "@/shared/utils/notification";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { Group, Highlight } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  code?: string,
  handleDelete: () => void,
  handlResetSelection: Function
}

export default function DeleteOnClientButton({ code, handleDelete, handlResetSelection }: Props) {
  const disc = useDisclosure();
  const [timeoutDelete, setTimeoutDelete] = useState(false);

  return (
    <CustomButtonModal
      isActionIcon={true}
      disclosure={disc}
      modalProps={{
        title: ""
      }}
      actionIconProps={{
        children: <IconX stroke={3} />,
        color: "red"
      }}
    >
      <Highlight
        highlight={code || []}
        color="red.6"
        highlightStyles={{
          fontWeight: 700,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {`Bạn sắp xóa dữ liệu ${code || ""}. Bạn có chắc chắn muốn tiếp tục?`}
      </Highlight>

      <Group grow>
        <CustomButton
          actionType="delete"
          loading={timeoutDelete}
          onClick={() => {
            handlResetSelection();
            setTimeoutDelete(true);
            handleDelete();
            setTimeout(() => {
              setTimeoutDelete(false);
            }, 1000);
            disc[1].close();
            utils_notification_show({ crudType: "delete" });
          }}
        />
        <CustomButton
          actionType="cancel"
          onClick={disc[1].close}
        />
      </Group>
    </CustomButtonModal>
  )
}
