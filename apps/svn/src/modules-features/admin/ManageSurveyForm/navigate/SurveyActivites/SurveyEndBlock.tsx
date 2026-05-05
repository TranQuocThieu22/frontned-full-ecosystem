
'use client';
import {  Paper, Text } from "@mantine/core"

export function SurveyEndBlock({ label = "Kết thúc", onSelect }: { label?: string; onSelect?: (val: string) => void }) {
  // Tương tự như SurveyLogicJumpBlock nhưng label là "Kết thúc"
  return (
    <Paper
      withBorder
      radius="md"
      py={8}
      px={20}
      my={14}
      style={{ display: "inline-block", minWidth: 120, textAlign: "center" }}
    >
      <Text fw={700} fz={20}>{label}</Text>
      {/* <Select data={[...]} /> nếu muốn cho chọn hành động tiếp */}
    </Paper>
  );
}