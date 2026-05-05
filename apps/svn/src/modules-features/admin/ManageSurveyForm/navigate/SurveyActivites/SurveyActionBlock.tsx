"use client";

import {
  Box,
  Paper,
  Flex,
  Text,
  Select,
  Radio,
  ActionIcon,
  Group,
  Tooltip,
  rem,
} from "@mantine/core";
import SurveyQuestionDelete from "../SurveyQuestionDelete";

interface SurveyActionBlockProps {
  index: number; // số thứ tự, auto tăng
  code: string; // mã câu hỏi (CLO1, ...)
  title: string;
  required?: boolean;
  options: { value: number | string; label: string }[];
  selectedValue?: number | string;
  onSelect: (val: number | string) => void;
  onDelete: () => void;
  conditionType?: "Ẩn" | "Hiện";
  onConditionChange?: (val: "Ẩn" | "Hiện") => void;
  showCondition?: boolean;
}

export default function SurveyActionBlock({
  index,
  code,
  title,
  required,
  options,
  selectedValue,
  onSelect,
  onDelete,
  conditionType,
  onConditionChange,
  showCondition = false,
}: SurveyActionBlockProps) {
  function showRequired(condition: boolean) {
    if (condition)
      return (
        <Select
          w={100}
          data={[
            { value: "Ẩn", label: "Ẩn" },
            { value: "Hiện", label: "Hiện" },
          ]}
          value={conditionType}
          onChange={(v) => {
            if (v === "Ẩn" || v === "Hiện") onConditionChange?.(v);
          }}
          size="xs"
          radius="md"
          fw={600}
          style={{ marginRight: 12 }}
        />
      );
  }

  return (
    <Paper
      withBorder
      radius="md"
      p="md"
      mb={24}
      style={{ position: "relative" }}
    >
      {/* Số thứ tự tròn xanh và ràng buộc */}
      <Group align="center" gap={12} mb={15} wrap="nowrap">
        {/* Số thứ tự tròn xanh */}
        <ActionIcon size="lg" radius="lg" bg={"green"} c={"white"}>
          {index + 1}
        </ActionIcon>

        {/* Dropdown chọn ràng buộc */}
        {showRequired(showCondition)}



        {/* Nút xoá */}
        <Group
          justify="space-between" w={"100%"}>
          <Text fw={600} fz={16}>
            Với câu hỏi:
          </Text>
          <SurveyQuestionDelete data={code} />
        </Group>
      </Group>

      {/* Nội dung câu hỏi */}
      <Box mb={6} mt={4}>
        <Text span c="red" fw={700} mr={4}>
          *
        </Text>
        <Text span fw={500} fz={15} mr={6}>
          <Text
            span
            c="blue"
            component="a"
            href="#"
            style={{ textDecoration: "underline" }}
          >
            {code}
          </Text>{" "}
          {title}
        </Text>
      </Box>

      {/* Group lựa chọn */}
      <Box mt={8} mb={4}>
        <Text fz={14} c="dimmed" mb={4}>
          Với lựa chọn là:
        </Text>
        <Radio.Group
          value={selectedValue?.toString()}
          onChange={(v) => onSelect(Number(v))}
        >
          {options.map((opt) => (
            <Radio
              key={opt.value}
              value={opt.value.toString()}
              label={opt.label}
              ml="lg"
              mt="sm"
              styles={{
                label: { fontWeight: 500 },
              }}
            />
          ))}
        </Radio.Group>
      </Box>
    </Paper>
  );
}
