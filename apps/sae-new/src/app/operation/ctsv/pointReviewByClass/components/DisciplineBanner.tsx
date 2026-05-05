"use client";

import { C } from "../shared/colors";

import { Box, Group, Text } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { StudentAssessment } from "../types";

interface DisciplineBannerProps {
  student: StudentAssessment;
}

export function DisciplineBanner({ student }: DisciplineBannerProps) {
  const d = student.disciplineRecord;
  if (!d) return null;

  return (
    <Box
      p="sm"
      style={{
        background: C.amberBg,
        border: "1px solid #F0D98A",
        borderRadius: 10,
        marginBottom: "md",
      }}
    >
      <Group gap={6}>
        <IconAlertTriangle size={14} color={C.amberText} />
        <Text
          size="xs"
          fw={700}
          style={{ color: C.amberText, fontFamily: "'Roboto', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          Kỷ luật: {d.level}
        </Text>
        <Text size="xs" style={{ color: C.amberDark, fontFamily: "'Roboto', sans-serif" }}>
          {d.reason} — {d.date}
        </Text>
      </Group>
      <Text
        size="xs"
        mt={4}
        style={{ color: C.amberText, fontFamily: "'Roboto', sans-serif", paddingLeft: 20 }}
      >
        ⚠ Kỷ luật mức Cảnh cáo → xếp loại không vượt quá{" "}
        <Text span fw={700}>Trung bình</Text>
      </Text>
    </Box>
  );
}
