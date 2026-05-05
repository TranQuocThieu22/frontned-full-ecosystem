import {
  ActionIcon,
  Group,
  Modal,
  Radio,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import {
  MyButton,
  MyFileInput,
  MySelect,
  MyTextArea,
  MyTextInput,
} from "aq-fe-framework/components";
import { useEffect, useState } from "react";
import { QuestionPaperBox } from "./QuestionPaperBox";
import { ISingleChoiceQuestionInfoViewModel } from "./interfaces/ISingleChoiceQuestionInfoViewModel";

const uuidv4 = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

const defaultData: ISingleChoiceQuestionInfoViewModel = {
  question: "Nhập nội dung câu hỏi",
  guide: "Nhập nội dung hướng dẫn",
  image: null,
  options: [
    { id: uuidv4(), label: "Lựa chọn 1", score: 0 },
    { id: uuidv4(), label: "Lựa chọn 2", score: 0 },
    { id: uuidv4(), label: "Lựa chọn 3", score: 0 },
  ],
  clo: "",
  plo: "",
};

export default function SingleChoiceQuestion({
  data,
  onChange,
}: {
  readonly data?: ISingleChoiceQuestionInfoViewModel;
  readonly onChange?: (data: ISingleChoiceQuestionInfoViewModel) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [bulkInputVisible, setBulkInputVisible] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [displayData, setDisplayData] =
    useState<ISingleChoiceQuestionInfoViewModel>(data ?? defaultData);

  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);

  const cloOptions = [
    { value: "CLO1", label: "CLO1 - Nắm được nguyên lý cơ bản" },
    { value: "CLO2", label: "CLO2 - Ứng dụng nâng cao" },
  ];
  const ploOptions = [
    { value: "PLO1", label: "PLO1 - Hiểu được lý thuyết ngành" },
    { value: "PLO2", label: "PLO2 - Kỹ năng thực hành" },
  ];

  const form = useForm<ISingleChoiceQuestionInfoViewModel>({
    initialValues: {
      question: "",
      guide: "",
      image: null,
      options: [],
      clo: cloOptions[0]?.value,
      plo: ploOptions[0]?.value,
    },
    validate: {
      question: (value) => (!value ? "Vui lòng nhập nội dung câu hỏi" : null),
      options: (opts) =>
        opts.some((o: any) => !o.label)
          ? "Tất cả lựa chọn phải có nội dung"
          : null,
      clo: (value) => (!value ? "Chọn CLO" : null),
      plo: (value) => (!value ? "Chọn PLO" : null),
    },
  });

  const isMock =
    displayData.question === defaultData.question &&
    displayData.guide === defaultData.guide &&
    displayData.options.length === defaultData.options.length &&
    displayData.options.every(
      (opt, idx) => opt.label === defaultData.options[idx]?.label
    );

  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        question: "",
        guide: "",
        image: null,
        options: [],
        clo: cloOptions[0]?.value,
        plo: ploOptions[0]?.value,
      });
    } else {
      const safeOptions = (displayData.options || []).map((opt) => ({
        id: opt.id,
        label: typeof opt.label === "string" ? opt.label : "",
        score: typeof opt.score === "number" ? opt.score : 0,
      }));
      form.setValues({ ...displayData, options: safeOptions });
    }
    open();
  };

  const addOption = () => {
    form.setFieldValue("options", [
      ...form.values.options,
      { id: uuidv4(), label: "", score: 0 },
    ]);
  };

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

  const removeOption = (id: string) => {
    form.setFieldValue(
      "options",
      form.values.options.filter((o) => o.id !== id)
    );
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
                margin: "8px auto",
                maxWidth: 120,
                maxHeight: 120,
              }}
            />
          )}
          <Stack mt={8} gap={8}>
            {displayData.options.map((opt, idx) => (
              <Group key={opt.id} gap={8} align="center">
                <Radio disabled />
                <Text size="sm">{opt.label}</Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      </QuestionPaperBox>
      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa câu hỏi trắc nghiệm"
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
              {...form.getInputProps("question")}
            />
            <MyTextArea
              minRows={4}
              label="Hướng dẫn"
              placeholder="Nhập nội dung hướng dẫn"
              {...form.getInputProps("guide")}
            />
            <MyFileInput
              onChange={(file) => form.setFieldValue("image", file)}
              accept="image/*"
            />
            <Text fw={500}>Các lựa chọn</Text>
            {form.values.options.map((opt, idx) => (
              <Group key={opt.id} gap={8}>
                <Radio disabled />
                <MyTextInput
                  placeholder={`Lựa chọn ${idx + 1}`}
                  {...form.getInputProps(`options.${idx}.label`)}
                  style={{ flex: 1 }}
                />
                <MyTextInput
                  placeholder={`Điểm Lựa chọn ${idx + 1}`}
                  type="number"
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
            {form.errors.options && (
              <Text c="red" size="xs" mt={2}>
                {form.errors.options}
              </Text>
            )}
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
                type="button"
                onClick={addBulkOptions}
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
            <Group mt="md" justify="flex-end">
              <MyButton type="submit">Lưu</MyButton>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
