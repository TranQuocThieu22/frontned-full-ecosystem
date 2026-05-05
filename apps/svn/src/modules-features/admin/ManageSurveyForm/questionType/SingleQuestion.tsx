// components/Survey/NumberQuestion.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Text,
  Group,
  Modal,
  Stack,
  NumberInput,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  IconTrash,
  IconPlus,
  IconPhoto,
} from '@tabler/icons-react';
import { MyFileInput, MyTextInput, MyButton, MyTextArea } from 'aq-fe-framework/components';
import { ISingleQuestionInfoViewModel, SingleQuestionSetting } from './interfaces/ISingleQuestionInfoViewModel';
import { QuestionPaperBox } from './QuestionPaperBox';


const defaultData: ISingleQuestionInfoViewModel = {
  numberQuestion: 'Nhập nội dung câu hỏi',
  instruction: 'Nhập nội dung hướng dẫn',
  image: null,
};

export default function NumberQuestion({
  setting,
  data,
  onChange,
}: {
  readonly setting: SingleQuestionSetting;
  readonly data?: ISingleQuestionInfoViewModel;
  readonly onChange?: (data: ISingleQuestionInfoViewModel) => void;
}) {

  const [opened, { open, close }] = useDisclosure(false);
  const [displayData, setDisplayData] = useState<ISingleQuestionInfoViewModel>(data ?? defaultData);
  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);
  const form = useForm<ISingleQuestionInfoViewModel>({
    initialValues: {
      numberQuestion: '',
      instruction: '',
      image: null,
    },
    validate: {
      numberQuestion: (v) => (!!v ? null : 'Vui lòng nhập nội dung câu hỏi'),
      instruction: (v) => (!!v ? null : 'Vui lòng nhập nội dung hướng dẫn'),
    },
  });
  const isMock = (
    displayData.numberQuestion === defaultData.numberQuestion &&
    displayData.instruction === defaultData.instruction &&
    displayData.image === defaultData.image
  );
  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        numberQuestion: '',
        instruction: '',
        image: null,
      });
    } else {
      form.setValues(displayData);
    }
    open();
  };

  return (
    <>
      <QuestionPaperBox onClick={handleOpen} isAnswerRequired={true}>
        <Text fw={500} size="sm" >
          {displayData.numberQuestion}
        </Text>
        {setting.isHasImage && displayData.image && (
          <img
            src={URL.createObjectURL(displayData.image)}
            alt="survey"
            style={{ display: "block", margin: "8px auto", maxWidth: 120, maxHeight: 120 }}
          />
        )}
        <Text size="sm" mt={4} c="dimmed">
          {displayData.instruction}
        </Text>
        <Group mt={8} justify="center">
          <NumberInput
            size="xs"
            w="100%"
            value={displayData.numberQuestion}
            readOnly
            hideControls
          />
        </Group>
      </QuestionPaperBox>

      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa câu hỏi số"
        centered
        size="xl"
      >
        <form onSubmit={handleOpen}>
          <Stack gap="md">
            <MyTextArea
              minRows={4}
              label="Nội dung câu hỏi"
              placeholder="Nhập nội dung câu hỏi"
              withAsterisk
              {...form.getInputProps('question')}
            />

            <MyTextArea
              minRows={4}
              label="Hướng dẫn"
              placeholder="Nhập nội dung hướng dẫn"
              {...form.getInputProps('instruction')}
            />
            {setting.isHasImage && (
              <MyFileInput
                onChange={(file) => form.setFieldValue('image', file)}
                accept="image/*"
              />
            )}
            <NumberInput
              label="Giá trị mặc định"
              placeholder="Nhập con số"
              {...form.getInputProps('defaultValue')}
              hideControls
              step={1}
              min={0}
            />

            <Group mt="md" justify='flex-end'>
              <MyButton type="submit">Lưu</MyButton>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
