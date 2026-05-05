// components/Survey/MultiSelectQuestion.tsx


import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  Textarea
} from '@mantine/core';
import { useForm, } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { MyButton, MyFileInput, MySelect, MyTextArea, MyTextInput, } from 'aq-fe-framework/components';
import { useEffect, useState } from 'react';
import { IMultiChoiceQuestionInfoViewModel, MultiChoiceQuestionSetting } from './interfaces/IMultiChoiceQuestionInfoViewModel';
import { QuestionPaperBox } from './QuestionPaperBox';


const uuidv4 = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

const defaultData: IMultiChoiceQuestionInfoViewModel = {
  question: 'Nhập nội dung câu hỏi',
  instruction: 'Nhập nội dung hướng dẫn',
  image: null,
  options: [
    { id: uuidv4(), label: 'Lựa chọn 1', score: 0 },
    { id: uuidv4(), label: 'Lựa chọn 2', score: 0 },
    { id: uuidv4(), label: 'Lựa chọn 3', score: 0 },
  ],
  clo: "",
  plo: "",
};




export default function MultiSelectQuestion({
  setting,
  data,
  onChange,
}: {
  readonly setting: MultiChoiceQuestionSetting;
  readonly data?: IMultiChoiceQuestionInfoViewModel;
  readonly onChange?: (data: IMultiChoiceQuestionInfoViewModel) => void;

}) {
  const [bulkInputVisible, setBulkInputVisible] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [displayData, setDisplayData] = useState<IMultiChoiceQuestionInfoViewModel>(data ?? defaultData);
  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);
  const cloOptions = [
    { value: 'CLO1', label: 'CLO1 - Nắm được nguyên lý cơ bản' },
    { value: 'CLO2', label: 'CLO2 - Ứng dụng nâng cao' },
  ];
  const ploOptions = [
    { value: 'PLO1', label: 'PLO1 - Hiểu được lý thuyết ngành' },
    { value: 'PLO2', label: 'PLO2 - Kỹ năng thực hành' },
  ];
  const form = useForm<IMultiChoiceQuestionInfoViewModel>({
    initialValues: {
      question: '',
      instruction: '',
      image: null,
      options: [],
      clo: cloOptions[0]?.value || '',
      plo: ploOptions[0]?.value || '',
    },
    validate: {
      question: (v) => (!!v ? null : 'Vui lòng nhập nội dung câu hỏi'),
      instruction: (v) => (v ? null : 'Vui lòng nhập nội dung hướng dẫn'),

    },
  });
  const isMock = (
    displayData.question === defaultData.question &&
    displayData.instruction === defaultData.instruction &&
    displayData.image === defaultData.image &&
    displayData.options.length === defaultData.options.length &&
    displayData.options.every(
      (opt, idx) => opt.label === defaultData.options[idx]?.label) &&
    displayData.clo === defaultData.clo &&
    displayData.plo === defaultData.plo
  );
  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        question: '',
        instruction: '',
        image: null,
        options: [],
        clo: cloOptions[0]?.value,
        plo: ploOptions[0]?.value,
      });
    } else {
      const safeOptions = displayData.options.map((opt) => ({
        id: opt.id,
        label: typeof opt.label === "string" ? opt.label : "",

        score: typeof opt.score === "number" ? opt.score : 0,
      }));
      form.setValues({ ...displayData, options: safeOptions });
    }
    open();
  };
  const addOption = () => {
    form.setFieldValue('options', [
      ...form.values.options,
      { id: uuidv4(), label: '', score: 0 },
    ]);
  }
  const removeOption = (id: string) =>
    form.setFieldValue(
      'options',
      form.values.options.filter((o) => o.id !== id)
    );
  const handleSubmit = form.onSubmit((vals) => {
    setDisplayData(vals);
    close();
  });
  const addBulkOptions = () => {
    setBulkInputVisible(true);
  };

  const confirmBulkAdd = () => {
    const newOptions = bulkText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line)
      .map((label) => ({ id: uuidv4(), label, score: 0 }));
    form.setFieldValue("options", [...form.values.options, ...newOptions]);
    setBulkText("");
    setBulkInputVisible(false);
  };

  return (
    <>
      <QuestionPaperBox onClick={handleOpen} isAnswerRequired={true}>
        <Text fw={700} size="sm">
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
          {displayData.instruction}
        </Text>
        <Stack mt={8} gap={8}>
          {displayData.options.map((opt, idx) => (
            <Group key={opt.id} gap={8} align="center">
              <Checkbox disabled />
              <Text size='sm'>{opt.label}</Text>
            </Group>
          ))}
        </Stack>

      </QuestionPaperBox>
      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa câu hỏi"
        centered
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <MyTextArea
              minRows={4}
              label="Nội dung câu hỏi"
              placeholder="Nhập nội dung câu hỏi"
              {...form.getInputProps('question')}
            />
            <MyTextArea
              minRows={4}
              label="Hướng dẫn"
              placeholder="Nhập nội dung hướng dẫn"
              {...form.getInputProps('instruction')}
            />
            <MyFileInput
              onChange={(file) => form.setFieldValue('image', file)}
              accept="image/*"
            />

            <Text w={500}>Các lựa chọn</Text>
            {form.values.options.map((opt, idx) => (
              <Group key={opt.id} gap={8}>
                <Checkbox disabled />
                <MyTextInput
                  placeholder={`Lựa chọn ${idx + 1}`}
                  {...form.getInputProps(`options.${idx}.label`)}
                  style={{ flex: 1 }}
                />
                <NumberInput
                  placeholder="Điểm lựa chọn ${idx + 1}"
                  {...form.getInputProps(`options.${idx}.score`)}
                  style={{ width: 120 }}
                />
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => removeOption(opt.id)}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Group>
            ))}
            {bulkInputVisible && (
              <Stack>
                <Textarea
                  placeholder="Nhập mỗi câu trả lời trên một dòng"
                  minRows={4}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.currentTarget.value)}
                />
                <Group justify="flex-end">
                  <MyButton onClick={confirmBulkAdd} type="button">
                    Thêm vào danh sách
                  </MyButton>
                </Group>
              </Stack>
            )}
            <Group gap={8}>
              <MyButton
                variant="filled"
                color="green"
                leftSection={<IconPlus size={16} />}
                onClick={addOption}
                type="button"
              >
                Thêm câu trả lời
              </MyButton>
              <MyButton
                variant="filled"
                color="green"
                leftSection={<IconPlus size={16} />}
                onClick={addBulkOptions}
                type="button"
              >
                Thêm câu trả lời hàng loạt
              </MyButton>
            </Group>

            <Group mt={8} gap={8} align="center">
              <Text>Đóng góp cho CLO:</Text>
              <MySelect
                data={cloOptions}
                {...form.getInputProps("clo")}
                miw={300}
                value={form.values.clo || cloOptions[0]?.value}
              />
            </Group>
            <Group gap={8} align="center">
              <Text>Đóng góp cho PLO:</Text>
              <MySelect
                data={ploOptions}
                {...form.getInputProps("plo")}
                miw={300}
                value={form.values.plo || ploOptions[0]?.value}
              />
            </Group>

            <Group justify="flex-end" mt="lg">
              <Button type="submit">Lưu</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
