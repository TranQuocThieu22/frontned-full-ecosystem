import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Group,
  Text,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyFileInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IIntroductionPageQuestionInfoViewModel, IntroductionPageQuestionSetting } from "./interfaces/IIntroductionPageQuestionInfoViewModel";
import { QuestionPaperBox } from "./QuestionPaperBox";

const defaultData: IIntroductionPageQuestionInfoViewModel = {
  title: "Nhập tiêu đề kết thúc cho phiếu khảo sát",
  description: "Nhập nội dung mô tả",
  image: null,
};

export default function IntroductionPageQuestion({
  setting,
  data,
  onChange,
}: {
  readonly setting: IntroductionPageQuestionSetting;
  readonly data?: IIntroductionPageQuestionInfoViewModel;
  readonly onChange?: (data: IIntroductionPageQuestionInfoViewModel) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [displayData, setDisplayData] = useState<IIntroductionPageQuestionInfoViewModel>(data ?? defaultData);

  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);

  const form = useForm<IIntroductionPageQuestionInfoViewModel>({
    initialValues: {
      title: "",
      description: "",
      image: null,
    },
    validate: {
      title: (value) => (value ? null : "Vui lòng nhập tiêu đề"),
      description: (value) => (value ? null : "Vui lòng nhập mô tả"),
    },
  });
  const isMock = (
    displayData.title === defaultData.title &&
    displayData.description === defaultData.description
  );
  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        title: "",
        description: "",
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
            style={{ display: "block", margin: "8px auto", maxWidth: 120, maxHeight: 120 }}
          />
        )}
        <Text size="sm" mt={4} ta="center" c="dimmed">
          {displayData.description}
        </Text>
      </QuestionPaperBox>
      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa thông tin bắt đầu"
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
              placeholder="Nhập tiêu đề bắt đầu cho phiếu khảo sát"
              {...form.getInputProps("title")}
              withAsterisk
            />
            {setting.isHasImage && (
              <MyFileInput
                onChange={(file) => form.setFieldValue("image", file)}
                accept="image/*"
              />
            )}
            <MyTextArea
              minRows={4}
              label="Mô tả"
              placeholder="Nhập nội dung mô tả"
              {...form.getInputProps("description")}
              withAsterisk
            />
            <Group mt="md" justify="flex-end">
              <Button type="submit">Lưu</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
