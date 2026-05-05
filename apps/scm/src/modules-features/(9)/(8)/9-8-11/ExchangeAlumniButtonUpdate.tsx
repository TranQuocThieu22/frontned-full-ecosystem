import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit } from "@tabler/icons-react";
import {
  MyButton,
  MyCheckbox,
  MyTextArea,
  MyTextInput
} from "aq-fe-framework/components";
import { IExchangeAlumni } from "./interface/ExchangeAlumniViewModel";

export default function ExchangeAlumniButtonUpdate({
  values,
}: {
  values: IExchangeAlumni;
}) {

  // form
  const form = useForm<IExchangeAlumni>({
    initialValues: values,
    validate: {
      userName: (value) => (value ? null : "Vui lòng nhập người dùng"),
    },
  });
  const [opened, { open, close }] = useDisclosure(false);

  const handleSave = () => {
    if (form.validate().hasErrors) {
      return;
    }
    close();
    notifications.show({
      title: 'Thành công',
      message: 'Cập nhật thành công',
      color: 'green',
      autoClose: 3000,
    });
    console.log("Form values:", form.values);
  };
  return (
    <>
      <MyButton
        onClick={open}
        leftSection={<IconEdit />}
        style={{ backgroundColor: '#F28C38', color: 'white' }} // Orange color
      >
        Cập nhật
      </MyButton>
      <Modal
        opened={opened}
        onClose={close}
        title="Chi tiết cựu trao đổi"
        size={'40%'}
      >
        <MyTextInput
          label="Người dùng"
          placeholder="Nhập người dùng"
          style={{ flex: 1 }}
          {...form.getInputProps("userName")}
        />
        <MyCheckbox
          mt={'md'}
          mb={'md'}

          label="Có sẵn sàng hỗ trợ thế hệ sau: "
          checked={form.values.isWillingToSupport === "Có" ? true : false}
          onChange={(event) => form.setFieldValue("isWillingToSupport", event.currentTarget.checked ? "Có" : "Không áp dụng")}

        />
        <MyTextArea label="Ghi chú" placeholder="Nhập ghi chú" {...form.getInputProps("notes")} />

        <MyButton

          crudType="save"
          w={'100%'}
          onClick={handleSave}
          style={{ marginTop: '1rem' }}
        >
          Lưu
        </MyButton>
      </Modal >
    </>

  );
}



