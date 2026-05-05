"use client";

import { MyButton, MyFieldset } from "aq-fe-framework/components";
import SurveyFlowSidebar from "./SurveyFlowSidebar";
import { useState } from "react";
import { Flex, Text } from "@mantine/core";
import SurveyFlowMainTab from "./SurveyFlowMainTab";
import { useQuery } from "@tanstack/react-query";

export default function FeatSurveyFlowTable() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const querySurveyList = useQuery<ISurveyFlow[]>({
    queryKey: ["ISurveyFlowListQuery"],
    queryFn: () => {
      return mockDataSurveyDetail || [];
    },
  });

  if (querySurveyList.isLoading) {
    return "Đang tải . . . ";
  }

  if (querySurveyList.isError) {
    return "Có lỗi đã xảy ra";
  }

  const selectedFlow = querySurveyList.data?.find(f => f.id === selectedId) ?? null;
  return (
    <MyFieldset title="Danh sách điều hướng">
      <Flex>
        <SurveyFlowSidebar
          opened={leftOpen}
          onToggle={() => setLeftOpen((x) => !x)}
          flows={mockDataSurveyDetail.map(({ id, name }) => ({ id, name }))}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <SurveyFlowMainTab flow={selectedFlow} />
      </Flex>
    </MyFieldset>
  );
}

//=============================================================
// Question block

// Block base (là phần chứa câu hỏi không quan tâm type)
interface IFlowBlockBase {
  id: string;
  code?: string;
  type?: string; // "single_choice" | "multiple_choice" | "input_number" | "input_string" | "info" | "end" | "page_break"
  role: "question" | "action" | "transfer";
  title?: string;
  required?: boolean;
  constraint?: IConstraint;
}

interface IConstraint {
  prevBlockId?: string; // block trước (n-1)
  conditionType: "Và" | "Hoặc" | "Ẩn" | "Hiện" | "Thì" | "Kết thúc";
  triggerValues?: (string | number)[]; // Danh sách value của option cần chọn mới kích hoạt block này
}

// Các loại block cụ thể
interface ISingleChoiceBlock extends IFlowBlockBase {
  type: "single_choice";
  options: IQuestionOption[];
  selectedValue?: number | string;
}
interface IMultipleChoiceBlock extends IFlowBlockBase {
  type: "multiple_choice";
  options: IQuestionOption[];
  selectedValue?: number | string;
}
interface IInputNumberBlock extends IFlowBlockBase {
  type: "input_number";
  placeholder?: string;
  min?: number;
  max?: number;
}
interface IInputStringBlock extends IFlowBlockBase {
  type: "input_string";
  placeholder?: string;
  maxLength?: number;
}
interface IInfoBlock extends IFlowBlockBase {
  type: "info";
  content: string; // chỉ hiện text, không input
}
interface IEndBlock extends IFlowBlockBase {
  type: "end";
  content?: string; // text nếu có
}
interface IPageBreakBlock extends IFlowBlockBase {
  type: "page_break";
  content?: string;
}

interface ILogicJump extends IFlowBlockBase {
  type: "logic_jump";
}

interface IBlank extends IFlowBlockBase {
  type: "blank";
}

////=============================================================

export type IFlowBlock =
  | ISingleChoiceBlock
  | IMultipleChoiceBlock
  | IInputNumberBlock
  | IInputStringBlock
  | IInfoBlock
  | IEndBlock
  | IPageBreakBlock
  | ILogicJump
  | IBlank;

export interface ISurveyFlow {
  id: string;
  name: string;
  blocks: IFlowBlock[];
}

interface IQuestion {
  code: string;
  title: string;
  required: true;
  cloOption: IQuestionOption[];
}

interface IQuestionOption {
  value: number;
  label: string;
}


// Flow
//=============================================================
// bao gồm 2 nhóm: "điều kiện" và "hành động"
// bắt đầu từ điều kiện 2 thì có option cho điều kiện này (đk 2)
// là chọn liên kết ràng buộc (condition constraint) tức là sẽ có ràng buộc giữa đkiện 1 - 2
// condition contraints gồm "và" & "hoặc"
//
// Sau khi điều kiện ràng buộc với nhau thì sẽ có một hành động điều hướng đến chuỗi hành động hoặc kết quả
// chọn "Thì" sẽ đi đến chuỗi hành động với điều kiện (Điều kiện -> Thì -> Hành động)
// chọn "Và" & "Hoặc" sẽ tiếp tục điều kiện tiếp (nếu đang ở phần điều kiện)
// hoặc hành động tiếp (nếu đang ở phần hành động)
// cuối condition chain là kết thúc (kết quả)
//
// Có nghĩa là:
//
//      Condition 1
//          |
//          V
//   <Invoke method> "Và"
//          |
//          V
//  Condition 2 with Relation (Condition_Type - "và", "hoặc")
//          |
//          V
//  <Invoke method> "Thì"
//          |
//          V
//       Action 1
//          |
//          V
//       Action 2
//          |
//          V
//  <Invoke method> "Kết thúc" (chỉ xuất hiện sau "Thì")
//============================================================



//=============================================================================================
//=========================================Mock Data===========================================
//=============================================================================================

const mockDataSurveyDetail: ISurveyFlow[] = [
  {
    id: "1",
    name: "Luồng 1",
    blocks: [
      {
        id: "CLO1",
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
        // constraint: undefined (câu hỏi đầu tiên không ràng buộc)
      },
      {
        id: "CLO2",
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
        constraint: {
          prevBlockId: "CLO1",
          conditionType: "Và",
          triggerValues: [1],
        },
      },
      {
        id: "THEN",
        type: "logic_jump",
        role: "transfer",
        title: "Thì",
        constraint: {
          prevBlockId: "CLO2",
          conditionType: "Thì",
        },
      },
      {
        id: "CLO3",
        type: "single_choice",
        role: "action",
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
        constraint: {
          prevBlockId: "THEN",
          conditionType: "Và",
          triggerValues: [1],
        },
      },

      // Block kết thúc
      {
        id: "END",
        type: "end",
        role: "action", // kết thúc cũng là action
        title: "Kết thúc khảo sát",
        constraint: {
          prevBlockId: "CLO3",
          conditionType: "Kết thúc", // hoặc "END"
        },
      },
    ],
  },
];
