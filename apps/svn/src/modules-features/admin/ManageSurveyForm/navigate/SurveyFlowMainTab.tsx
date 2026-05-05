"use client";
import { Box, Button, Paper, ScrollArea, Text, Title } from "@mantine/core";
import { IFlowBlock, ISurveyFlow } from "./SurveyFlowTable";
import { MyFieldset } from "aq-fe-framework/components";
import SurveyQuestionBlock from "./SurveyActivites/SurveyQuestionBlock";
import { useEffect, useState } from "react";
import SurveyActionBlock from "./SurveyActivites/SurveyActionBlock";
import { SurveyLogicJumpBlock } from "./SurveyActivites/SurveyLogicJumpBlock";
import { useQuery } from "@tanstack/react-query";
import { SurveyQuestionModal } from "./SurveyQuestionModal";
import { EmptyFlowPlaceholder } from "./SurveyErrorPlaceholder";

const mockAvailableQuestions: IFlowBlock[] = [
  {
    id: "CLO5",
    type: "single_choice", // kiểu block
    role: "question", // vai trò là câu hỏi
    title:
      "Sau khi học môn này, bạn tự đánh giá khả năng vận dụng kiến thức lập trình để xây dựng ứng dụng mobile đơn giản ở mức độ nào?",
    required: true,
    options: [
      { value: 1, label: "1 (Rất kém)" },
      { value: 2, label: "2 (Kém)" },
      { value: 3, label: "3 (Trung bình)" },
      { value: 4, label: "4 (Khá)" },
      { value: 5, label: "5 (Tốt)" },
    ],
    constraint: { conditionType: "Và", prevBlockId: "CLO4" },
  },
  {
    id: "CLO6",
    type: "single_choice",
    role: "question",
    title:
      "Bạn tự tin như thế nào khi sử dụng các công cụ và framework (ví dụ: React Native, Flutter, Android SDK) để phát triển ứng dụng mobile?",
    required: true,
    options: [
      { value: 1, label: "1 (Không tự tin)" },
      { value: 2, label: "2 (Tôi nghĩ là mình có thể làm được)" },
      { value: 3, label: "3 (Có thể làm được)" },
      { value: 4, label: "4 (Tôi làm được)" },
      { value: 5, label: "5 (Rất tự tin)" },
    ],
    constraint: { conditionType: "Và", prevBlockId: "CLO4" },
  },
  {
    id: "CLO7",
    type: "single_choice",
    role: "question",
    title:
      "Bạn có thể áp dụng các nguyên tắc thiết kế UI/UX để tạo ra ứng dụng mobile hấp dẫn và dễ sử dụng ở mức độ nào?",
    required: true,
    options: [
      { value: 1, label: "1 (Không thể)" },
      { value: 2, label: "2 (Có thể với hướng dẫn)" },
      { value: 3, label: "3 (Có thể độc lập)" },
      { value: 4, label: "4 (Có thể hướng dẫn người khác)" },
      { value: 5, label: "5 (Có thể sáng tạo và cải tiến)" },
    ],
    constraint: { conditionType: "Và", prevBlockId: "CLO4" },
  },
  {
    id: "CLO8",
    type: "single_choice",
    role: "question",
    title:
      "Mức độ đóng góp của môn học này vào khả năng làm việc nhóm trong dự án phát triển ứng dụng mobile của bạn là gì?",
    required: true,
    options: [
      { value: 1, label: "1 (Không đóng góp)" },
      { value: 2, label: "2 (Đóng góp ít)" },
      { value: 3, label: "3 (Đóng góp trung bình)" },
      { value: 4, label: "4 (Đóng góp nhiều)" },
      { value: 5, label: "5 (Đóng góp rất nhiều)" },
    ],
    constraint: { conditionType: "Và", prevBlockId: "CLO4" },
  },
];

export default function SurveyFlowMainTab({
  flow,
}: {
  flow: ISurveyFlow | null;
}) {
  const [questions, setQuestions] = useState<IFlowBlock[]>(flow?.blocks ?? []);
  const [pickModalOpen, setPickModalOpen] = useState(false);
  const [pickBlockIdx, setPickBlockIdx] = useState<number | null>(null);

  const queryAvailableQuestionsList = useQuery<IFlowBlock[]>({
    queryKey: ["AvailableQuestionQuery"],
    queryFn: () => {
      return mockAvailableQuestions || [];
    },
  });

  let displayIdx = 0;
  useEffect(() => {
    setQuestions(flow?.blocks ?? []);
  }, [flow]);

  if (!flow) {
    return (
      <EmptyFlowPlaceholder/>
    );
  }

  function handleConditionQuestionChange(idx: number, val: "Và" | "Hoặc") {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
            ...q,
            constraint: {
              ...(q.constraint ?? {}),
              conditionType: val,
            },
          }
          : q
      )
    );
  }

  function handleConditionActionChange(idx: number, val: "Ẩn" | "Hiện") {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
            ...q,
            constraint: {
              ...(q.constraint ?? {}),
              conditionType: val,
            },
          }
          : q
      )
    );
  }

  function handleInsertQuestionAbove(idx: number, type: "Và" | "Hoặc") {
    setQuestions((prev) => [
      ...prev.slice(0, idx),
      {
        id: "blank_" + Date.now(),
        type: "blank",
        role: "question", // Nếu bạn muốn phân biệt, không bắt buộc
        constraint: { conditionType: type },
      },
      ...prev.slice(idx),
    ]);
  }

  function handleOpenPickModal(idx: number) {
    setPickBlockIdx(idx);
    setPickModalOpen(true);
  }

  function handlePickQuestion(questionId: string) {
    if (pickBlockIdx === null) return;
    // Lấy question data theo id
    const pickedQ = queryAvailableQuestionsList.data?.find(
      (q) => q.id === questionId
    );
    if (!pickedQ) return;
    setQuestions((prev) =>
      prev.map((q, idx) =>
        idx === pickBlockIdx
          ? {
            ...pickedQ,
            constraint: { prevBlockId: "CLO2", conditionType: "Thì" },
          }
          : q
      )
    );
    setPickModalOpen(false);
    setPickBlockIdx(null);
  }

  function SurveyPickQuestionBlock({ onPick }: { onPick: () => void }) {
    return (
      <Paper withBorder radius="md" p="md" style={{ textAlign: "center" }}>
        <Button color="teal" leftSection="+" onClick={onPick}>
          Chọn câu hỏi
        </Button>
      </Paper>
    );
  }

  if (queryAvailableQuestionsList.isLoading) {
    return "Đang tải . . . ";
  }

  if (queryAvailableQuestionsList.isError) {
    return "Có lỗi đã xảy ra";
  }

  // Render chi tiết flow, ví dụ list block, logic, v.v.
  return (
    <MyFieldset ml={32} mr={4} title={flow.name} w="100%">
      <ScrollArea h={"55vh"}>
        <Title order={5}>Bắt đầu bằng việc trả lời các câu hỏi sau</Title>
      {questions.map((q, idx) => {
        if (q.role === "question") {
          if (q.type === "single_choice" || q.type === "multiple_choice") {
            return (
              <SurveyQuestionBlock
                key={q.id}
                index={displayIdx++}
                code={q.id ?? ""}
                title={q.title ?? ""}
                required={q.required}
                options={q.options}
                selectedValue={q.selectedValue}
                onSelect={(val) => { }}
                onDelete={() => { }}
                showCondition={idx > 0}
                conditionType={
                  q.constraint?.conditionType === "Và" ||
                    q.constraint?.conditionType === "Hoặc"
                    ? q.constraint?.conditionType
                    : "Và"
                }
                onConditionChange={(val) =>
                  handleConditionQuestionChange(idx, val)
                }
              />
            );
          }
        }
        if (q.role === "action") {
          if (q.type === "single_choice" || q.type === "multiple_choice") {
            return (
              <SurveyActionBlock
                key={q.id}
                index={displayIdx++}
                code={q.id ?? ""}
                title={q.title ?? ""}
                required={q.required}
                options={q.options}
                selectedValue={q.selectedValue}
                onSelect={(val) => { }}
                onDelete={() => { }}
                showCondition={idx > 0}
                conditionType={
                  q.constraint?.conditionType === "Ẩn" ||
                    q.constraint?.conditionType === "Hiện"
                    ? q.constraint?.conditionType
                    : "Ẩn"
                }
                onConditionChange={(val) =>
                  handleConditionActionChange(idx, val)
                }
              />
            );
          }
        }
        if (q.type === "blank") {
          return (
            <SurveyPickQuestionBlock
              key={q.id}
              onPick={() => handleOpenPickModal(idx)}
            />
          );
        }
        if (q.type === "logic_jump") {
          return (
            <SurveyLogicJumpBlock
              key={q.id}
              index={idx}
              value="Thì"
              onInsertQuestionAbove={handleInsertQuestionAbove}
            />
          );
        }
        if (q.type === "end") {
          return (
            <SurveyLogicJumpBlock
              key={q.id}
              index={idx}
              value="Kết thúc"
              onInsertQuestionAbove={handleInsertQuestionAbove}
            />
          );
        }
        return null;
      })}

      <SurveyQuestionModal
        opened={pickModalOpen}
        onClose={() => setPickModalOpen(false)}
        questionList={queryAvailableQuestionsList.data!.filter(
          (q) => q.role === "question" || q.role === "action"
        )}
        onSelect={handlePickQuestion}
      />
      </ScrollArea>
    </MyFieldset>
  );
}
