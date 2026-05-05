import React, { useState, useEffect } from "react";
import { Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyFileInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { QuestionPaperBox } from "./QuestionPaperBox";
import { IStringQuestionInfoViewModel } from "./interfaces/IStringQuestionInfoViewModel";
const defaultData: IStringQuestionInfoViewModel = {
  question: "Nhập nội dung câu hỏi",
  guide: "Nhập nội dung hướng dẫn",
  image: null,
  string: "",
};

export default function StringQuestion({
  data,
  onChange,
}: {
  readonly data?: IStringQuestionInfoViewModel;
  readonly onChange?: (data: IStringQuestionInfoViewModel) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [displayData, setDisplayData] = useState<IStringQuestionInfoViewModel>(
    data ?? defaultData
  );

  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);

  const form = useForm<IStringQuestionInfoViewModel>({
    initialValues: {
      question: "",
      guide: "",
      image: null,
      string: "",
    },
    validate: {
      question: (value) =>
        value && value.trim() ? null : "Vui lòng nhập câu hỏi",
    },
  });

  const isMock =
    displayData.question === defaultData.question &&
    displayData.guide === defaultData.guide &&
    displayData.string === defaultData.string;

  const handleOpen = () => {
    if (isMock) {
      form.setValues({ question: "", guide: "", image: null, string: "" });
    } else {
      form.setValues(displayData);
    }
    open();
  };

  return (
    <>
      <QuestionPaperBox onClick={handleOpen} isAnswerRequired={true}>
        <Stack gap={4}>
          <Text fw={700} size="sm" c="red">
            <span style={{ color: "black", fontWeight: 500 }}>
              {displayData.question}
            </span>
          </Text>
          <Text size="sm" mt={4} ta="left" c="dimmed">
            {displayData.guide}
          </Text>
          {displayData.image && (
            <img
              src={URL.createObjectURL(displayData.image)}
              alt="survey"
              style={{
                display: "block",
                margin: "16px auto",
                maxWidth: 120,
                maxHeight: 120,
              }}
            />
          )}
          <MyTextInput
            placeholder={displayData.string}
            readOnly
            style={{ marginTop: "1rem" }}
          />
        </Stack>
      </QuestionPaperBox>

      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa câu hỏi văn bản ngắn"
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
          <Stack gap="md">
            <MyTextArea
              minRows={4}
              label="Nội dung câu hỏi"
              placeholder="Nhập nội dung câu hỏi"
              withAsterisk
              {...form.getInputProps("question")}
            />
            <MyTextArea
              minRows={4}
              label="Hướng dẫn"
              placeholder="Nhập nội dung hướng dẫn"
              {...form.getInputProps("guide")}
            />
            <MyFileInput
              label="Hình ảnh"
              onChange={(file) => form.setFieldValue("image", file)}
              accept="image/*"
            />
            <MyTextArea
              minRows={4}
              label="Chuỗi đơn"
              placeholder="Nhập chuỗi đơn"
              {...form.getInputProps("string")}
            />

            <Group justify="flex-end" mt="md">
              <MyButton type="submit">Lưu</MyButton>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
