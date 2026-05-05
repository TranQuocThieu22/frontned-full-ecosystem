import { useDroppable } from "@dnd-kit/core";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Paper,
  Radio,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { IconAsterisk, IconPlus, IconTrash } from "@tabler/icons-react";
import FirstPageQuestion from "@/modules-features/admin/ManageSurveyForm/questionType/FirstPageQuestion";
import ThankYouPage from "@/modules-features/admin/ManageSurveyForm/questionType/ThankYouPage";
import MultiChoicePage from "@/modules-features/admin/ManageSurveyForm/questionType/MultiChoiceQuestion";
import SingleQuestion from "@/modules-features/admin/ManageSurveyForm/questionType/SingleQuestion";
import IntroductionPageQuestion from "@/modules-features/admin/ManageSurveyForm/questionType/IntroductionPageQuestion";
import PassageQuestion from "@/modules-features/admin/ManageSurveyForm/questionType/PassageQuestion";
import BreakPageQuestion from "../questionType/BreakPageQuestion";
import SingleChoiceQuestion from "../questionType/SingleChoiceQuestion";
import SingleChoiceGroupQuestionBlock from "../questionType/SingleChoiceGroupQuestion";
import RankingQuestionBlock from "../questionType/RankingQuestion";
import StringQuestion from "../questionType/StringQuestion";
import SingleEmail from "../questionType/SingleEmail";
import FeatSurveyFlowTable from "../navigate/SurveyFlowTable";
import DecorationView from "../decorate/DecorateView";
import { ICustomComponent, IQuestion, QuestionType } from "./DesignerLayout";

// Render custom (cho demo)
function renderCustomRadioQuestion(
  question: ICustomComponent,
  index: number,
  onDelete?: () => void,
  onAddAfter?: () => void
) {
  return (
    <Flex gap={10} flex={1} key={question.id}>
      <Paper p={20} radius="md" withBorder flex={1}>
        <Flex justify="space-between" align="flex-start" gap={16}>
          <Stack gap={4} flex={1}>
            <Group gap={8}>
              <Text size="sm">
                {question.isRequired && (
                  <Text component="span" c="red">
                    <IconAsterisk style={{ width: 14, height: 14 }} />
                  </Text>
                )}{" "}
                <Text component="span" c="blue" td="underline">
                  {question.code}
                </Text>{" "}
                {question.title}
              </Text>
            </Group>

            {/* Chỉ xử lý radio */}
            <Stack gap={8} mt={4}>
              {question.options.map((option) => (
                <Radio size="sm" key={option.id} label={option.label} value={option.value} />
              ))}
            </Stack>
          </Stack>
        </Flex>
      </Paper>

      {/* Các nút hành động */}
      <Stack justify="flex-start" align="center" gap={10}>
        <ActionIcon variant="light" color="red" onClick={onDelete}>
          <IconTrash size={16} />
        </ActionIcon>
        <ActionIcon variant="light" color="green" onClick={onAddAfter}>
          <IconPlus size={16} />
        </ActionIcon>
      </Stack>
    </Flex>
  );
}

// Render chính
function QuestionItem({
  question,
  onDelete,
  index,
  handleAddQuestionAt,
  id,
}: {
  id: string;
  index: number;
  question: IQuestion;
  onDelete: (id: string) => void;
  handleAddQuestionAt: (type: QuestionType, index: number) => void;
}) {
  const renderQuestion = () => {
    switch (question.QuestionType) {
      case "FirstPageQuestion":
        return <FirstPageQuestion data={question.Data} setting={{ isHasImage: false }} />;
      case "ThankYouPageQuestion":
        return <ThankYouPage data={question.Data} setting={{ isHasImage: false }} />;
      case "IntroductionPageQuestion":
        return <IntroductionPageQuestion data={question.Data} setting={{ isHasImage: false }} />;
      case "BreakPageQuestion":
        return <BreakPageQuestion data={question.Data} />;
      case "SingleChoiceQuestion":
        return <SingleChoiceQuestion data={question.Data} />;
      case "SingleChoiceGroupQuestion":
        return (
          <SingleChoiceGroupQuestionBlock
            data={question.Data}
            setting={{ isHasImage: true, isAnswerRequired: true }}
          />
        );
      case "MultiChoiceQuestion":
        return (
          <MultiChoicePage
            data={question.Data}
            setting={{
              isHasImage: true,
              isHasInstruction: true,
              isHasClo: true,
              isHasPlo: true,
              isHasScore: true,
              isHasOption: true,
              isHasDefaultValue: true,
            }}
          />
        );

      case "RankingQuestion":
        return (
          <RankingQuestionBlock
            data={question.Data}
            setting={{ isAnswerRequired: true, isHasImage: false }}
          />
        );
      case "StringQuestion":
        return <StringQuestion data={question.Data} />;

      case "SingleQuestion":
        return <SingleQuestion data={question.Data} setting={{ isHasImage: true }} />;

      case "SingleEmail":
        return <SingleEmail data={question.Data} setting={{ isHasImage: true }} />;

      case "PassageQuestion":
        return (
          <PassageQuestion
            data={question.Data}
            setting={{ isHasGuide: true, isHasImage: true, isAnswerRequired: true }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Flex gap={10} flex={1}>
      {renderQuestion()}
      <Stack justify="flex-start" align="center" gap={10}>
        <ActionIcon variant="light" color="red" onClick={() => onDelete(id)}>
          <IconTrash size={16} />
        </ActionIcon>
        <ActionIcon
          variant="light"
          color="green"
          onClick={() => {
            handleAddQuestionAt(question.QuestionType, index + 1);
          }}
        >
          <IconPlus size={16} />
        </ActionIcon>
      </Stack>
    </Flex>
  );
}

// Droppable Question Zone
function QuestionDropZone({
  questions,
  onDeleteQuestion,
  handleAddQuestionAt,
}: {
  questions: IQuestion[];
  onDeleteQuestion: (id: string) => void;
  handleAddQuestionAt: (type: QuestionType, index: number) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "question-drop-zone",
    disabled: false,
  });

  return (
    <Box
      ref={setNodeRef}
      id="question-drop-zone"
      style={{
        minHeight: questions.length === 0 ? 200 : "auto",
        border: questions.length === 0 ? "2px dashed #dee2e6" : "none",
        borderRadius: 8,
        padding: questions.length === 0 ? 16 : 0,
        backgroundColor: isOver ? "#e7f5ff" : questions.length === 0 ? "#f8f9fa" : "transparent",
        transition: "background-color 0.2s ease",
        position: "relative",
        overflow: "visible",
      }}
    >
      {questions.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          h={200}
          style={{
            pointerEvents: "auto",
          }}
        >
          <Text size="md" c="dimmed">
            Kéo loại câu hỏi vào đây để tạo câu hỏi mới
          </Text>
        </Flex>
      ) : (
        // Hiển thị danh sách câu hỏi
        <Stack gap={16}>
          {questions.map((question, index) => {
            if (question.QuestionType === "CustomQuestion" && question.CustomQuestion) {
              return renderCustomRadioQuestion(
                question.CustomQuestion,
                index,
                () => onDeleteQuestion(question.id),
                () => handleAddQuestionAt(question.QuestionType, index + 1)
              );
            } else {
              return (
                <QuestionItem
                  key={question.id}
                  id={question.id}
                  index={index}
                  question={question}
                  onDelete={() => onDeleteQuestion(question.id)}
                  handleAddQuestionAt={handleAddQuestionAt}
                />
              );
            }
          })}
        </Stack>
      )}

      {/* Overlay khi đang drag để hiển thị rõ vùng drop */}
      {isOver && (
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(34, 139, 230, 0.1)",
            border: "2px solid #228be6",
            borderRadius: 8,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}

// Main Design Component
export default function MainDesign({
  questions,
  onDeleteQuestion,
  leftOpen,
  rightOpen,
  sidebarWidth,
  handleAddQuestionAt,
}: {
  questions: IQuestion[];
  onDeleteQuestion: (id: string) => void;
  leftOpen: boolean;
  rightOpen: boolean;
  sidebarWidth: number;
  handleAddQuestionAt: (type: QuestionType, index: number) => void;
}) {
  return (
    <Flex
      w={`calc(100% - ${leftOpen ? sidebarWidth : 40}px - ${rightOpen ? sidebarWidth : 40}px)`}
      px="md"
      justify="center"
    >
      <Stack gap={16} w="100%">
        <ScrollArea h="65vh" scrollbarSize={2} scrollHideDelay={5000}>
          <QuestionDropZone
            questions={questions}
            handleAddQuestionAt={handleAddQuestionAt}
            onDeleteQuestion={onDeleteQuestion}
          />
        </ScrollArea>
      </Stack>
    </Flex>
  );
}
