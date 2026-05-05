import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconEdit } from "@tabler/icons-react";
import { MyButton, MyDateInput, MyFlexRow, MySelect } from "aq-fe-framework/components";
import { useMemo } from "react";
import { ITechnicalQualityControl } from "./interface/TechnicalQualityControlViewModel";
import { sampleData } from "./TechnicalQualityControlTable";

export default function TechnicalQualityControlButtonUpdate({
  values,
}: {
  values: ITechnicalQualityControl;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<ITechnicalQualityControl>({
    initialValues: values,
    validate: {

    },
  });
  const stateOptions = useMemo(() => {
    const state = Array.from(new Set(sampleData.map(item => item.technicalChecker)));
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
        leftSection={<IconEdit />}
        style={{ backgroundColor: '#F28C38', color: 'white' }} // Orange color
      >
        Cập nhật
      </MyButton>
      <Modal
        opened={opened}
        onClose={close}
        title="Chi tiết kiểm tra kỹ thuật"
        size="40%"
      >
        <MyFlexRow>

          <MyDateInput
            label="Ngày kiểm tra"
            flex={1}
            {...form.getInputProps("checkDate")}
          />
          <MySelect
            label="Người kiểm tra"
            data={stateOptions}
            flex={1}
            {...form.getInputProps("technicalChecker")}
          />
        </MyFlexRow>
        <MyFlexRow>

          <MyTextArea
            flex={1}
            label="Kết quả kiểm tra chi tiết"
            {...form.getInputProps("detailedCheckResult")}
            placeholder="Kết quả kiểm tra chi tiết"
          />
          <MyTextArea
            flex={1}
            label="Đề xuất kiểm tra kỹ thuật"
            {...form.getInputProps("technicalConclusionProposal")}
            placeholder="Đề xuất kiểm tra kỹ thuật"
          />
        </MyFlexRow>
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



