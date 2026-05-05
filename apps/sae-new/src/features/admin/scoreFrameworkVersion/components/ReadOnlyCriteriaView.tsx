"use client";

import { Box, Stack, Text } from "@mantine/core";

import { ScoreFrameworkVersionDetail } from "../shared/types";
import { CriterionRow } from "./CriterionRow";
import {ScoreFrameworkVersionStateEnum} from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";

interface ReadOnlyCriteriaViewProps {
  version: ScoreFrameworkVersionDetail;
}

export function ReadOnlyCriteriaView({ version }: ReadOnlyCriteriaViewProps) {
  return (
    <Stack gap={0}>
      {version.criteria?.map((criterion) => (
        <CriterionRow
          key={criterion.id}
          criterion={criterion}
          readonly={true}
          expanded={true}
          onToggleExpand={() => {}}
          onUpdate={() => {}}
          onAddChild={() => {}}
          onDelete={() => {}}
          clearErrorForId={() => {}}
        />
      ))}

      {version.state === ScoreFrameworkVersionStateEnum.Archived && (
        <Box
          mt="xl"
          p="md"
          style={{ background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 10, textAlign: "center" }}
        >
          <Text size="xs" style={{ color: "#6B7280", fontFamily: "'Roboto', sans-serif" }}>
            Version này đã được lưu trữ và không còn được sử dụng.
          </Text>
        </Box>
      )}
    </Stack>
  );
}
