"use client";

import { Box, Flex, Stack, Text } from "@mantine/core";

const HINTS = [
  "Tổng điểm 5 tiêu chí chính (C1–C5) phải bằng đúng 100 điểm",
  "Tổng điểm tiêu chí con phải ≤ điểm tiêu chí cha",
  "Mã tiêu chí không được trùng nhau trong cùng version",
  "Sau khi phát hành, version sẽ bị khóa và không thể chỉnh sửa",
];

export function CriteriaHint() {
  return (
    <Box
      mt="xl"
      p="md"
      style={{
        background: "#EEF1F8",
        border: "1px solid #C5CEE0",
        borderRadius: 10,
      }}
    >
      <Text
        size="xs"
        fw={700}
        mb={6}
        style={{ color: "#1A2744", fontFamily: "'Roboto', sans-serif" }}
      >
        Lưu ý
      </Text>
      <Stack gap={4}>
        {HINTS.map((hint, i) => (
          <Flex key={i} gap={6} align="flex-start">
            <Box
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#1A2744",
                marginTop: 5,
                flexShrink: 0,
              }}
            />
            <Text
              size="xs"
              style={{
                color: "#3A4A6B",
                fontFamily: "'Roboto', sans-serif",
                lineHeight: 1.5,
              }}
            >
              {hint}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
