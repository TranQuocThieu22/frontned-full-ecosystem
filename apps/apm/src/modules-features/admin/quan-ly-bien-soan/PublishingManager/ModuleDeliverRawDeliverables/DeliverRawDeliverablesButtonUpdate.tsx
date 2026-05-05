
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  MyButton,
  MyDateInput,
  MyFileInput,
  MyTextArea
} from "aq-fe-framework/components";
import { IdeliverRawDeliverables } from "./interface/deliverRawDeliverablesViewModel";
import { notifications } from "@mantine/notifications";
import { IconEdit } from "@tabler/icons-react";

export default function DeliverRawDeliverablesButtonUpdate({
  values,
}: {
  values: IdeliverRawDeliverables;
}) {
  const form = useForm<IdeliverRawDeliverables>({
    initialValues: values,
    validate: {

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
        title="Chi tiết giao nộp"
        size={'40%'}
      >
        <MyDateInput label="Ngày giao nộp thực tế" {...form.getInputProps("actualSubmissionDate")} />
        <MyFileInput label="File đính kèm sản phẩm thô" {...form.getInputProps("rawProductFileName")} />
        <MyTextArea minRows={4} label="Ghi chú khi giao nộp " {...form.getInputProps("submissionNotes")} placeholder="Ghi chú khi giao nộp"></MyTextArea>
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



