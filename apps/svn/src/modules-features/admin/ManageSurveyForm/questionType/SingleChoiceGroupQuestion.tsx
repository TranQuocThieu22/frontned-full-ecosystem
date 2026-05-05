import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Image,
  Modal,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Textarea
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { MyButton, MyFileInput, MyTextArea } from "aq-fe-framework/components";
import { useEffect, useState } from "react";
import {
  ISingleChoiceGroupQuestionViewModel,
} from "./interfaces/ISingleChoiceGroupQuestionViewModel";
import { QuestionPaperBox } from "./QuestionPaperBox";

const defaultData: ISingleChoiceGroupQuestionViewModel = {
  groupTitle: "Nhập nội dung mô tả cho nhóm câu hỏi",
  guide: "Nhập nội dung hướng dẫn trả lời cho nhóm câu hỏi",
  image: null,
  answers: ["Đồng ý", "Không đồng ý"],
  answerPoints: [0, 0],
  questions: [
    { id: 1, text: "Câu hỏi 1" },
    { id: 2, text: "Câu hỏi 2" },
  ],
};

export default function SingleChoiceGroupQuestionBlock({
  setting,
  data,
  onChange,
}: {
  readonly setting: { isAnswerRequired: boolean; isHasImage?: boolean };
  readonly data?: ISingleChoiceGroupQuestionViewModel;
  readonly onChange?: (data: ISingleChoiceGroupQuestionViewModel) => void;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [bulkInputOpened, setBulkInputOpened] = useState(false);
  const [bulkAnswerInputOpened, setBulkAnswerInputOpened] = useState(false);
  const [bulkInputText, setBulkInputText] = useState("");
  const [bulkAnswerInputText, setBulkAnswerInputText] = useState("");
  const [displayData, setDisplayData] = useState<ISingleChoiceGroupQuestionViewModel>(
    data ?? defaultData
  );

  useEffect(() => {
    if (data) setDisplayData(data);
  }, [data]);

  const form = useForm<ISingleChoiceGroupQuestionViewModel>({
    initialValues: {
      groupTitle: "",
      guide: "",
      image: null,
      answers: [],
      answerPoints: [],
      questions: [],
    },
    validate: {
      groupTitle: (value) => (value ? null : "Vui lòng nhập mô tả"),
      guide: (value) => (value ? null : "Vui lòng nhập hướng dẫn"),
    },
  });

  const isMock =
    displayData.groupTitle === defaultData.groupTitle &&
    displayData.guide === defaultData.guide;

  const handleOpen = () => {
    if (isMock) {
      form.setValues({
        groupTitle: "",
        guide: "",
        image: null,
        answers: ["Đồng ý", "Không đồng ý"],
        questions: [
          { id: 1, text: "" },
          { id: 2, text: "" },
        ],
        answerPoints: [0, 0],
      });
    } else {
      form.setValues({
        ...displayData,
        answerPoints: displayData.answerPoints ?? displayData.answers.map(() => 0),
      });
    }
    open();
  };

  const addAnswer = () => {
    form.insertListItem("answers", "");
    form.insertListItem("answerPoints", 0);
  };

  const addQuestion = () => {
    const nextId = Math.max(0, ...form.values.questions.map((q) => q.id)) + 1;
    form.insertListItem("questions", { id: nextId, text: "" });
  };

  const handleBulkAddQuestions = () => {
    const lines = bulkInputText.split("\n").map((line) => line.trim()).filter(Boolean);
    const currentMaxId = Math.max(0, ...form.values.questions.map((q) => q.id));
    const newQuestions = lines.map((text, i) => ({ id: currentMaxId + i + 1, text }));
    form.setFieldValue("questions", [...form.values.questions, ...newQuestions]);
    setBulkInputText("");
    setBulkInputOpened(false);
  };

  const handleBulkAddAnswers = () => {
    const lines = bulkAnswerInputText.split("\n").map((line) => line.trim()).filter(Boolean);
    const newAnswers = [...form.values.answers, ...lines];
    const newPoints = [...(form.values.answerPoints ?? []), ...new Array(lines.length).fill(0)];

    form.setFieldValue("answers", newAnswers);
    form.setFieldValue("answerPoints", newPoints);
    setBulkAnswerInputText("");
    setBulkAnswerInputOpened(false);
  };

  return (
    <>
      <QuestionPaperBox onClick={handleOpen} isAnswerRequired={setting.isAnswerRequired}>
        <Text size="sm" c="black" fw={500}>
          {displayData.groupTitle}
        </Text>
        <Text size="sm" mt={4} c="black" >
          {displayData.guide}
        </Text>
        {setting.isHasImage && displayData.image && (
          <img
            src={typeof displayData.image === "string" ? displayData.image : URL.createObjectURL(displayData.image)}
            alt="survey"
            style={{
              display: "block",
              margin: "8px auto",
              maxWidth: 120,
              maxHeight: 120,
            }}
          />
        )}


        {displayData.questions.length > 0 && (
          <Box mt="md" style={{ borderRadius: 8, overflow: "hidden" }}>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>STT</Table.Th>
                  <Table.Th>Nội dung câu hỏi</Table.Th>
                  {displayData.answers.map((answer, i) => (
                    <Table.Th key={i}>{answer}</Table.Th>
                  ))}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {displayData.questions.map((q, index) => (
                  <Table.Tr key={q.id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{q.text}</Table.Td>
                    {displayData.answers.map((_, i) => (
                      <Table.Td key={i} style={{ textAlign: "center" }}>
                        <input type="radio" disabled />
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        )}
      </QuestionPaperBox>

      <Modal
        opened={opened}
        onClose={close}
        title="Chỉnh sửa thông tin mô tả nhóm câu hỏi"
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
              label="Mô tả nhóm câu hỏi"
              {...form.getInputProps("groupTitle")}
              withAsterisk
            />
            <MyTextArea
              minRows={4}
              label="Hướng dẫn trả lời"
              {...form.getInputProps("guide")}
              withAsterisk
            />

            <MyFileInput
              label="Ảnh minh họa"
              onChange={(file) => {
                form.setFieldValue("image", file);
              }}
              accept="image/*"
            />

            {form.values.image && (
              <Box mx="auto" my="xs">
                <Image
                  alt=""
                  src={URL.createObjectURL(form.values.image)}
                  width={150}
                  radius="md"
                />
              </Box>
            )}

            <Divider label="Các đáp án lựa chọn" labelPosition="center" my="sm" />
            {form.values.answers.map((answer, answerIdx) => (
              <Group key={answerIdx} align="center">
                <TextInput
                  placeholder={`Đáp án ${answerIdx + 1}`}
                  style={{ flex: 1 }}
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...form.values.answers];
                    newAnswers[answerIdx] = e.currentTarget.value;
                    form.setFieldValue("answers", newAnswers);
                  }}
                />
                <TextInput
                  type="number"
                  value={form.values.answerPoints?.[answerIdx] ?? 0}
                  onChange={(e) => {
                    const val = parseInt(e.currentTarget.value, 10);
                    const newPoints = [...(form.values.answerPoints ?? [])];
                    newPoints[answerIdx] = isNaN(val) ? 0 : val;
                    form.setFieldValue("answerPoints", newPoints);
                  }}
                  style={{ width: 100 }}
                />
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => {
                    form.removeListItem("answers", answerIdx);
                    form.removeListItem("answerPoints", answerIdx);
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ))}
            <Group>
              <MyButton
                variant="filled"
                color="green"
                leftSection={<IconPlus size={16} />}
                onClick={addAnswer}
                type="button"
              >
                Thêm đáp án
              </MyButton>
              <MyButton
                variant="filled"
                color="green"
                leftSection={<IconPlus size={16} />}
                onClick={() => setBulkAnswerInputOpened(true)}
                type="button"
              >
                Nhập nhanh nhiều đáp án
              </MyButton>
            </Group>
            {bulkAnswerInputOpened && (
              <Stack>
                <Textarea
                  placeholder="Mỗi dòng là một đáp án"
                  minRows={4}
                  autosize
                  value={bulkAnswerInputText}
                  onChange={(e) => setBulkAnswerInputText(e.currentTarget.value)}
                />
                <Group justify="flex-end">
                  <MyButton onClick={handleBulkAddAnswers}>Thêm nhiều đáp án</MyButton>
                </Group>
              </Stack>
            )}

            <Divider label="Các câu hỏi" labelPosition="center" my="sm" />
            {form.values.questions.map((q, qIdx) => (
              <Group key={q.id} align="center" >
                <TextInput
                  // label={`Câu hỏi ${qIdx + 1}`}
                  placeholder={`Câu hỏi ${qIdx + 1}`}
                  style={{ flex: 1 }}
                  value={q.text}
                  onChange={(e) => {
                    const newQuestions = [...form.values.questions];
                    if (!newQuestions[qIdx]) return;
                    newQuestions[qIdx].text = e.currentTarget.value;
                    form.setFieldValue("questions", newQuestions);
                  }}
                />
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => {
                    form.removeListItem("questions", qIdx);
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ))}
            <Group>
              <MyButton
                variant="filled"
                color="green"
                leftSection={<IconPlus size={16} />}
                onClick={addQuestion}
                type="button"
              >
                Thêm câu hỏi
              </MyButton>
              <MyButton
                variant="filled"
                color="green"
                leftSection={<IconPlus size={16} />}
                onClick={() => setBulkInputOpened(true)}
                type="button"
              >
                Nhập nhanh nhiều câu hỏi
              </MyButton>
            </Group>
            {bulkInputOpened && (
              <Stack>
                <Textarea
                  placeholder="Mỗi dòng là một câu hỏi"
                  minRows={4}
                  autosize
                  value={bulkInputText}
                  onChange={(e) => setBulkInputText(e.currentTarget.value)}
                />
                <Group justify="flex-end">
                  <MyButton onClick={handleBulkAddQuestions}>Thêm nhiều câu hỏi</MyButton>
                </Group>
              </Stack>
            )}
            <Select
              label="Đóng góp CLO"
              data={["1", "2", "Bất kỳ"]}
              {...form.getInputProps("clo")}
            />

            <Select
              label="Đóng góp PLO"
              data={["1", "2", "Bất kỳ"]}
              {...form.getInputProps("plo")}
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
