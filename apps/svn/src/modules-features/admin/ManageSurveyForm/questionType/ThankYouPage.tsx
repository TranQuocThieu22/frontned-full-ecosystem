import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Group,
  Text,
  Stack,
} from "@mantine/core";
import { MyFileInput, MyTextInput, MyButton, MyTextArea } from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IThankYouPageInfoViewModel,
  ThankYouPageSetting,
} from "./interfaces/IThankYouPageInfoViewModel";
import { QuestionPaperBox } from "./QuestionPaperBox";

const defaultData: IThankYouPageInfoViewModel = {
  title: "Nhập tiêu đề kết thúc cho phiếu khảo sát",
  description: "Nhập nội dung mô tả",
  buttonName: "Nhập tên nút bắt đầu 'Kết thúc'",
  image: null,
};
export default function ThankYouPage({
  setting,
  data,
  onChange,
}: {
  readonly setting: ThankYouPageSetting;
  readonly data?: IThankYouPageInfoViewModel;
  readonly onChange?: (data: IThankYouPageInfoViewModel) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [displayData, setDisplayData] = useState<IThankYouPageInfoViewModel>(data ?? defaultData);

  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);

  const form = useForm<IThankYouPageInfoViewModel>({
    initialValues: {
      title: "",
      description: "",
      buttonName: "",
      image: null as File | null,
    },
    validate: {
      title: (value) => (value ? null : "Vui lòng nhập tiêu đề"),
      description: (value) => (value ? null : "Vui lòng nhập mô tả"),
      buttonName: (value) => (value ? null : "Vui lòng nhập tên nút"),
    },
  });
  const isMock =
    displayData.title == defaultData.title &&
    displayData.description == defaultData.description &&
    displayData.buttonName == defaultData.buttonName;
  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        title: "",
        description: "",
        buttonName: "",
        image: null,
      });
    } else {
      form.setValues(displayData);
    }
    open();
  };

  return (
    <>
      <QuestionPaperBox onClick={handleOpen}>
        <Text size="sm" ta="center">
          {displayData.title}
        </Text>
        {setting.isHasImage && displayData.image && (
          <img
            src={URL.createObjectURL(displayData.image)}
            alt="survey"
            style={{
              display: "block",
              margin: "8px auto",
              maxWidth: 120,
              maxHeight: 120,
            }}
          />
        )}
        <Text size="sm" mt={4} ta="center" c="dimmed">
          {displayData.description}
        </Text>
        <Group mt={8} justify="center">
          <Button size="xs" variant="outline">
            {displayData.buttonName}
          </Button>
        </Group>
      </QuestionPaperBox>

      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa thông tin kết thúc"
        centered
        size="xl"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            setDisplayData(values);
            onChange?.(values);
            close();
          })}
        >
          <Stack>
            <MyTextArea
              minRows={4}
              label="Tiêu đề"
              placeholder="Nhập tiêu đề kết thúc cho phiếu khảo sát"
              {...form.getInputProps("title")}
              withAsterisk
            />
            <MyFileInput
              onChange={(file) => form.setFieldValue("image", file)}
              accept="image/*"
            />
            <MyTextArea
              minRows={4}
              label="Mô tả"
              placeholder="Nhập nội dung mô tả"
              {...form.getInputProps("description")}
              withAsterisk
            />
            <MyTextArea
              minRows={4}
              label="Tên nút bắt đầu"
              placeholder="Nhập tên nút bắt đầu 'Kết thúc'"
              {...form.getInputProps("buttonName")}
              withAsterisk
            />
            <Group mt="md" justify="flex-end">
              <MyButton type="submit">Lưu</MyButton>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
