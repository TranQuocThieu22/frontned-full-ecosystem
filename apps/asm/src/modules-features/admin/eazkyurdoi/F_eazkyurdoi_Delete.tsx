"use client";
import baseAxios from "@/api/baseAxios";
import { MyActionIcon } from "@/components/ActionIcons/ActionIcon/MyActionIcon";
import MyActionIconDelete from "@/components/ActionIcons/ActionIconCRUD/MyActionIconDelete";
import { MyActionIconModal } from "@/components/ActionIcons/ActionIconModal/MyActionIconModal";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";

export default function F_eazkyurdoi_Delete({ id }: { id?: number }) {
  const [opened, { open, close }] = useDisclosure();
  return (
    // <>
    //   <Button onClick={open} variant="subtle" color="red">
    //     Xóa
    //   </Button>

    //   <Modal
    //     opened={opened}
    //     onClose={close}
    //     title="Xác nhận xóa dữ liệu ?"
    //     centered
    //   >
    //     <Group align="start">
    //       <IconAlertCircle size={32} color="orange" />
    //       <Text>
    //         "Bạn sắp xóa dữ liệu <b>[Mã của đối tượng]</b>. Hành động này không
    //         thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?"
    //       </Text>
    //     </Group>

    //     <Group  mt="md">
    //       <Button color="red">
    //         Xác nhận xóa
    //       </Button>
    //       <Button variant="outline" color="dark" onClick={close}>
    //         Hủy thao tác
    //       </Button>
    //     </Group>
    //   </Modal>
    // </>
    <MyActionIconDelete
      deleteKey="Mã của đối tượng"
      size={"lg"}
      title="Xác nhận xoá dữ liệu"
      onSubmit={() => {}}
    ></MyActionIconDelete>
  );
}
