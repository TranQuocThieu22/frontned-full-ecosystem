// components/Survey/SingleEmail.tsx
'use client';

import React, { useState } from 'react';
import {
  Text,
  Group,
  Modal,
  Stack,
  TextInput,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconMail } from '@tabler/icons-react';
import { MyFileInput, MyTextArea, MyTextInput } from 'aq-fe-framework/components';
import { ISingleEmailInfoViewModel, SingleEmailSetting } from './interfaces/ISingleEmailInfoViewModel';
import { QuestionPaperBox } from './QuestionPaperBox';
const defaultData: ISingleEmailInfoViewModel = {
  question: 'Nhập nội dung câu hỏi',
  email: '',
  description: 'Nhập nội dung hướng dẫn',
  image: null,
  defaultEmail: '',
};

export default function SingleEmail({
  setting,
  data,
  onChange,
}: {
  readonly setting: SingleEmailSetting;
  readonly data?: ISingleEmailInfoViewModel;
  readonly onChange?: (data: ISingleEmailInfoViewModel) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [displayData, setDisplayData] = useState<ISingleEmailInfoViewModel>(defaultData);

  const form = useForm<ISingleEmailInfoViewModel>({
    initialValues: {
      question: '',
      email: '',
      description: '',
      image: null,
      defaultEmail: '',
    },
    validate: {
      question: (v) => (!!v ? null : 'Vui lòng nhập nội dung câu hỏi'),
      email: (v) => (!!v ? null : 'Vui lòng nhập email'),
      description: (v) => (!!v ? null : 'Nhập nội dung hướng dẫn'),
      defaultEmail: (v) =>
        v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          ? null
          : 'Vui lòng nhập email hợp lệ',
    },
  });
  const isMock = (
    displayData.question === defaultData.question &&
    displayData.email === defaultData.email &&
    displayData.description === defaultData.description &&
    displayData.defaultEmail === defaultData.defaultEmail);
  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        question: '',
        email: '',
        description: '',
        image: null,
        defaultEmail: '',
      });
    } else {
      form.setValues(displayData);
    }
    open();
  };

  return (
    <>
      <QuestionPaperBox onClick={handleOpen} isAnswerRequired={true}>
        <Text fw={500} size="sm">
          {displayData.question}
        </Text>
        {setting.isHasImage && displayData.image && (
          <img
            src={URL.createObjectURL(displayData.image)}
            alt="survey"
            style={{ display: "block", margin: "8px auto", maxWidth: 120, maxHeight: 120 }}
          />
        )}
        <Text size="sm" mt={4} c="dimmed">
          {displayData.description}
        </Text>
        <Group mt={8} justify="center">
          <MyTextInput
            size="xs"
            w="100%"
            value={displayData.email || ''}
            readOnly
            leftSection={<IconMail size={16} />}
          />
        </Group>
      </QuestionPaperBox>
      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa thông tin câu hỏi"
        centered
        size="xl"
      >
        <form onSubmit={form.onSubmit((values) => {
          setDisplayData({
            question: values.question,
            email: values.email,
            description: values.description,
            image: values.image,
            defaultEmail: values.defaultEmail,
          });
          close();
        })}
        >
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

            <MyFileInput
              label="Ảnh (tuỳ chọn)"
              accept="image/*"
              value={form.values.image}
              onChange={(file) =>
                form.setFieldValue('image', file)
              }
            />

            <TextInput
              label="Email mặc định"
              placeholder="ví dụ: example@domain.com"
              type="email"
              withAsterisk
              {...form.getInputProps('defaultEmail')}
            />

            <Group gap="right" mt="lg">
              <Button type="submit">Lưu</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
