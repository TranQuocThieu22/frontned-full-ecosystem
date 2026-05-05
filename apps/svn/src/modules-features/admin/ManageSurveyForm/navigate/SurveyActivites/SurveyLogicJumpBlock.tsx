'use client';

import { Paper, Flex, Select, Text } from "@mantine/core";
import { useState } from "react";

interface SurveyLogicJumpBlockProps {
  index: number;
  value: "Thì" | "Kết thúc";
  onInsertQuestionAbove: (index: number, type: "Và" | "Hoặc") => void;
}

export function SurveyLogicJumpBlock({
  index,
  value,
  onInsertQuestionAbove,
}: SurveyLogicJumpBlockProps) {
  const selectData =
    value === "Thì"
      ? [
          { value: "Thì", label: "Thì" },
          { value: "Và", label: "Và" },
          { value: "Hoặc", label: "Hoặc" },
        ]
      : [
          { value: "Kết thúc", label: "Kết thúc" },
          { value: "Và", label: "Và" },
          { value: "Hoặc", label: "Hoặc" },
        ];

  const [selectValue, setSelectValue] = useState<"Thì" | "Kết thúc">(
    value
  );

  // Kịch bản: nếu user chọn "Và" hoặc "Hoặc" → chèn block mới phía trên và reset lại về "Thì"/"Kết thúc"
  function handleChange(val: string | null) {
    if (val === "Và" || val === "Hoặc") {
      onInsertQuestionAbove(index, val);
      setSelectValue(value); // revert lại về "Thì" hoặc "Kết thúc"
    } else if (val === "Thì" || val === "Kết thúc") {
      setSelectValue(val);
    }
  }

  return (
    <Paper withBorder radius="md" p="md" mb={20} style={{ textAlign: "center" }}>
      <Flex align="center" justify="center" gap={8}>
        <Select
          data={selectData}
          value={selectValue}
          onChange={handleChange}
          size="md"
          w={120}
          fw={700}
          style={{ fontSize: 20, textAlign: "center" }}
          // Thường không cần disableDropdownIcon vì bạn muốn cho người ta chọn
        />
      </Flex>
    </Paper>
  );
}
