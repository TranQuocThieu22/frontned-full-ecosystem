import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Box, Flex, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ContentConfigSidebar from "./ContentConfigSidebar";
import QuestionTypeSidebar from "./QuestionTypeSidebar";
import MainDesign from "./MainDesign";

export enum QuestionType {
  FirstPage = "FirstPageQuestion",
  ThankYouPage = "ThankYouPageQuestion",
  Introduction = "IntroductionPageQuestion",
  BreakPage = "BreakPageQuestion",
  SingleChoice = "SingleChoiceQuestion",
  SingleChoiceGroup = "SingleChoiceGroupQuestion",
  MultiChoice = "MultiChoiceQuestion",
  Ranking = "RankingQuestion",
  String = "StringQuestion",
  Passage = "PassageQuestion",
  SingleNumber = "SingleQuestion",
  Email = "SingleEmail",
  CustomQuestion = "CustomQuestion",
}

export interface IQuestion {
  id: string;
  Data?: any;
  Setting?: any;
  QuestionType: QuestionType;
  CustomQuestion?: ICustomComponent; // dùng tạm hiển thị
}

// custom component interface
export interface IOption {
  id: string;
  label: string;
  value: string;
}

export interface ICustomComponent {
  id: string;
  code: string;
  title: string;
  isRequired: boolean;
  type: "radio" | "checkbox" | "text" | string; // thêm các loại khác nếu cần
  options: IOption[];
}

export default function DesignerLayout() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const sidebarWidth = 380;
  const [activeId, setActiveId] = useState<string | null>(null);
  const dis = useDisclosure(false);

  const [questions, setQuestions] = useState<IQuestion[]>(mockQuestions);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over) return;

    // Handle dropping new question type from sidebar
    if (active.id.toString().startsWith("question-type-") && over.id === "question-drop-zone") {
      const questionTypeId = active.id.toString().replace("question-type-", "");

      const newQuestion: IQuestion = {
        id: crypto.randomUUID(), // Unique ID for the new question
        Data: null,
        Setting: null,
        QuestionType: QuestionType[questionTypeId as keyof typeof QuestionType],
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddQuestionAt = (value: string, index: number) => {
    const key = Object.keys(QuestionType).find(
      (k) => QuestionType[k as keyof typeof QuestionType] === value
    ) as keyof typeof QuestionType;

    if (!key) {
      console.error("Không tìm thấy kiểu câu hỏi phù hợp với value:", value);
      return;
    }

    // If custom để demo xong xoá
    if (QuestionType[key] === QuestionType.CustomQuestion) {
      return;
    }

    const newQuestion: IQuestion = {
      id: crypto.randomUUID(),
      Data: null,
      Setting: null,
      QuestionType: QuestionType[key],
    };

    setQuestions((prev) => {
      const updated = [...prev];
      updated.splice(index, 0, newQuestion);
      return updated;
    });
  };

  return (
    <>
      <Flex w="100%">
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Box p="md" w="100%" style={{ backgroundColor: "#f8f9fa" }}>
            <Flex>
              <QuestionTypeSidebar
                opened={leftOpen}
                width={sidebarWidth}
                onToggle={() => setLeftOpen((prev) => !prev)} />

              <MainDesign
                questions={questions}
                onDeleteQuestion={handleDeleteQuestion}
                handleAddQuestionAt={handleAddQuestionAt}
                leftOpen={leftOpen}
                rightOpen={rightOpen}
                sidebarWidth={sidebarWidth} />

              <ContentConfigSidebar
                opened={rightOpen}
                width={sidebarWidth}
                onToggle={() => setRightOpen(!rightOpen)} />
            </Flex>
          </Box>

          <DragOverlay>
            {activeId && activeId.startsWith("question-type-") ? (
              <Paper p={12} radius="md" withBorder style={{ opacity: 0.8 }}>
                <Text size="sm">Đang kéo câu hỏi...</Text>
              </Paper>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Flex>
    </>
  );
}

// Mock data
const mockQuestions: IQuestion[] = [
  {
    id: "abc123",
    Data: {
      title: "Nhập tiêu đề bắt đầu cho phiếu khảo sát",
      description: "Nhập nội dung mô tả",
      buttonName: "Nhập tên nút bắt đầu 'Bắt đầu'",
      image: null,
    },
    Setting: null,
    QuestionType: QuestionType.FirstPage,
  },
  {
    id: "def456",
    Data: {
      title:
        "Bạn vui lòng thực hiện khảo sát tự đánh giá năng lực đạt chuẩn đầu ra môn học mà bạn vừa hoàn thành!",
      // description: "Nhập nội dung mô tả",
      image: null,
    },
    Setting: null,
    QuestionType: QuestionType.Introduction,
  },
  {
    id: "def456323",
    Data: null,
    Setting: null,
    QuestionType: QuestionType.CustomQuestion,
    CustomQuestion: {
      id: "q1",
      code: "CL01",
      title:
        "Sau khi hoàn thành môn học này, bạn tự đánh giá khả năng vận dụng kiến thức lập trình để xây dựng ứng dụng mobile đơn giản ở mức độ nào?",
      isRequired: true,
      type: "radio",
      options: [
        { id: "q1-opt1", label: "1 (Rất kém)", value: "1" },
        { id: "q1-opt2", label: "2 (Kém)", value: "2" },
        { id: "q1-opt3", label: "3 (Trung bình)", value: "3" },
        { id: "q1-opt4", label: "4 (Khá)", value: "4" },
        { id: "q1-opt5", label: "5 (Tốt)", value: "5" },
      ],
    }, // sử dụng câu hỏi tùy chỉnh đầu tiên
  },
  {
    id: "def456324",
    Data: null,
    Setting: null,
    QuestionType: QuestionType.CustomQuestion,
    CustomQuestion: {
      id: "q2",
      code: "CL02",
      title:
        "Bạn tự tin thế nào khi sử dụng các công cụ và framework (vì dụ: React Native, Flutter, Android SDK) để phát triển ứng dụng mobile?",
      isRequired: true,
      type: "radio",
      options: [
        { id: "q2-opt1", label: "1 (Không tự tin)", value: "1" },
        { id: "q2-opt2", label: "2 (Tôi nghĩ là mình có thể làm được)", value: "2" },
        { id: "q2-opt3", label: "3 (Có thể làm được)", value: "3" },
        { id: "q2-opt4", label: "4 (Tôi làm được)", value: "4" },
        { id: "q2-opt5", label: "5 (Rất tự tin)", value: "5" },
      ],
    },
  },
  {
    id: "def456325",
    Data: null,
    Setting: null,
    QuestionType: QuestionType.CustomQuestion,
    CustomQuestion: {
      id: "q3",
      code: "CL03",
      title:
        "Bạn có thể áp dụng các nguyên tắc thiết kế UI/UX để tạo ra ứng dụng mobile hấp dẫn và dễ sử dụng ở mức độ nào?",
      isRequired: true,
      type: "radio",
      options: [
        { id: "q3-opt1", label: "1 (Không thể)", value: "1" },
        { id: "q3-opt2", label: "2 (Có thể với hướng dẫn)", value: "2" },
        { id: "q3-opt3", label: "3 (Có thể độc lập)", value: "3" },
        { id: "q3-opt4", label: "4 (Có thể hướng dẫn người khác)", value: "4" },
        { id: "q3-opt5", label: "5 (Có thể sáng tạo và cải tiến)", value: "5" },
      ],
    },
  },
  {
    id: "def456326",
    Data: null,
    Setting: null,
    QuestionType: QuestionType.CustomQuestion,
    CustomQuestion: {
      id: "q4",
      code: "CL04",
      title:
        "Mức độ đóng góp của môn học này vào khả năng làm việc nhóm trong dự án phát triến ứng dụng mobile của bạn là gì?",
      isRequired: true,
      type: "radio",
      options: [
        { id: "q4-opt1", label: "1 (Không đóng góp)", value: "1" },
        { id: "q4-opt2", label: "2 (Đóng góp ít)", value: "2" },
        { id: "q4-opt3", label: "3 (Đóng góp trung bình)", value: "3" },
        { id: "q4-opt4", label: "4 (Đóng góp nhiều)", value: "4" },
        { id: "q4-opt5", label: "5 (Đóng góp rất nhiều)", value: "5" },
      ],
    },
  },
  {
    id: "abc1232434",
    Data: {
      title: "Cảm ơn bạn đã thực hiện khảo sát!",
      buttonName: "Hoàn thành",
      image: null,
    },
    Setting: null,
    QuestionType: QuestionType.ThankYouPage,
  },
];
