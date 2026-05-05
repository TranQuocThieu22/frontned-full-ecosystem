import React, { useState, useEffect } from "react";
import { Button, Modal, Group, Text, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyFileInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { QuestionPaperBox } from "./QuestionPaperBox";
import {
  IPassageQuestionInfoViewModel,
  TextareaQuestionSetting,
} from "./interfaces/IPassageQuestionInfoViewModel";

const defaultData: IPassageQuestionInfoViewModel = {
  question: "Nhập nội dung câu hỏi",
  guide: "Nhập nội dung hướng dẫn",
  image: null,
  passage: "",
};

export default function PassageQuestion({
  setting,
  data,
  onChange,
}: {
  readonly setting: TextareaQuestionSetting;
  readonly data?: IPassageQuestionInfoViewModel;
  readonly onChange?: (data: IPassageQuestionInfoViewModel) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [displayData, setDisplayData] = useState<IPassageQuestionInfoViewModel>(data ?? defaultData);

  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);

  const form = useForm<IPassageQuestionInfoViewModel>({
    initialValues: {
      question: "",
      guide: "",
      image: null,
      passage: "",
    },
    validate: {
      question: (value) => (!value ? "Vui lòng nhập nội dung câu hỏi" : null),
    },
  });

  const isMock =
    displayData.question === defaultData.question &&
    displayData.guide === defaultData.guide &&
    displayData.passage === defaultData.passage;

  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        question: "",
        guide: "",
        image: null,
        passage: "",
      });
    } else {
      form.setValues(displayData);
    }
    open();
  };

  return (
    <>
      <QuestionPaperBox
        onClick={handleOpen}
        isAnswerRequired={setting.isAnswerRequired}
      >
        <Text size="sm" ta="left" fw={500}>
          {displayData.question}
        </Text>
        {setting.isHasGuide && (
          <Text size="sm" mt={4} ta="left" c="dimmed">
            {displayData.guide}
          </Text>
        )}
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
        <Textarea mt={8} minRows={3} value={displayData.passage} readOnly />
      </QuestionPaperBox>
      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa nội dung câu hỏi"
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
              label="Nội dung câu hỏi"
              placeholder="Nhập nội dung câu hỏi"
              {...form.getInputProps("question")}
              withAsterisk={setting.isAnswerRequired}
            />
            {setting.isHasGuide && (
              <MyTextArea
                minRows={4}
                label="Hướng dẫn"
                placeholder="Nhập nội dung hướng dẫn"
                {...form.getInputProps("guide")}
              />
            )}
            {setting.isHasImage && (
              <MyFileInput
                onChange={(file) => form.setFieldValue("image", file)}
                accept="image/*"
              />
            )}
            <Textarea
              label="Đoạn văn"
              {...form.getInputProps("passage")}
              minRows={3}
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
