import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit } from "@tabler/icons-react";
import {
  MyButton,
  MyCheckbox,
  MySelect
} from "aq-fe-framework/components";
import { useMemo } from "react";
import { IPreliminaryCheckOfRawDeliverables } from "./interface/PreliminaryCheckOfRawDeliverablesViewModel";
import { sampleData } from "./PreliminaryCheckOfRawDeliverablesTable";

export default function DeliverRawDeliverablesButtonUpdate({
  values,
}: {
  values: IPreliminaryCheckOfRawDeliverables;
}) {
  const form = useForm<IPreliminaryCheckOfRawDeliverables>({
    initialValues: values,
    validate: {

    },
  });
  const [opened, { open, close }] = useDisclosure(false);
  const stateOptions = useMemo(() => {
    const state = Array.from(new Set(sampleData.map(item => item.preliminaryApprovalStatus)));
    return state.map(chosenState => ({ value: chosenState as string, label: chosenState as string }));

  }, [sampleData]);
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
        // leftIcon={<IconEdit />}
        leftSection={<IconEdit />}
        style={{ backgroundColor: '#F28C38', color: 'white' }} // Orange color
      >
        Kiểm tra
      </MyButton>
      <Modal
        opened={opened}
        onClose={close}
        title="Chi tiết kiểm tra"
        size="40%"
      >
        <MySelect
          label="Trạng thái kiểm duyệt"
          data={stateOptions}
          {...form.getInputProps("preliminaryApprovalStatus")}
        />
        <MyTextArea
          label="Thông tin nhận xét duyệt"
          {...form.getInputProps("approvalComments")}
          placeholder="Thông tin nhận xét duyệt"
        />
        <MyCheckbox
          mt={'xs'}
          label="Gửi thông báo"
          {...form.getInputProps("hasNotificationSent")}
          checked={form.values.hasNotificationSent}
        />
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



