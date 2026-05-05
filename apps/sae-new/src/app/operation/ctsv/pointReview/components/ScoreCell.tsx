import { useState, useEffect } from "react";
import { ActionIcon, Box, Group, NumberInput, Text } from "@mantine/core";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";

import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { C } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import type { ActivityParticipation } from "../shared/types";

interface ScoreCellProps {
  record: ActivityParticipation;
  maxScore: number;
  editingScoreId: string | null;
  editingScoreValue: number;
  onStartEditScore: (id: string, val: number) => void;
  onCancelEditScore: () => void;
  onConfirmEditScore: (finalValue: number) => void;
}

export function ScoreCell({
  record,
  maxScore,
  editingScoreId,
  editingScoreValue,
  onStartEditScore,
  onCancelEditScore,
  onConfirmEditScore,
}: ScoreCellProps) {
  const isEditing = editingScoreId === record.id;
  const isRecording = record.state === "Recording";

  // Local draft value — syncs from hook state when edit starts
  const [localValue, setLocalValue] = useState(editingScoreValue);

  useEffect(() => {
    if (isEditing) {
      setLocalValue(editingScoreValue);
    }
  }, [isEditing, editingScoreValue]);

  return (
    <CustomCenterFull>
      <Group gap={4} justify="center">
        {isEditing ? (
          <>
            <NumberInput
              value={localValue}
              onChange={(val) => setLocalValue(Number(val))}
              min={0}
              max={maxScore}
              size="xs"
              w={56}
              radius="sm"
              styles={{
                input: {
                  textAlign: "center",
                  border: `1px solid ${C.navy}`,
                  background: C.white,
                  color: C.navy,
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 700,
                },
              }}
            />
            <ActionIcon
              size="xs"
              variant="filled"
              color="green"
              radius="sm"
              onClick={() => onConfirmEditScore(localValue)}
            >
              <IconCheck size={11} />
            </ActionIcon>
            <ActionIcon
              size="xs"
              variant="light"
              color="gray"
              radius="sm"
              onClick={onCancelEditScore}
            >
              <IconX size={11} />
            </ActionIcon>
          </>
        ) : (
          <>
            <Text
              size="sm"
              ta="center"
              fw={800}
              style={{
                color: record.finalScore !== null ? C.navy : C.textMuted,
                fontFamily: "'Roboto', sans-serif",
                fontSize: 15,
                minWidth: 28,
              }}
            >
              {record.finalScore !== null ? record.finalScore : "—"}
            </Text>
            <Text
              size="xs"
              style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
            >
              / {maxScore}
            </Text>
            {!record.finalScore && isRecording && (
              <ActionIcon
                size="xs"
                variant="subtle"
                color="gray"
                radius="sm"
                onClick={() => onStartEditScore(record.id, record.proposedScore)}
              >
                <IconEdit size={11} />
              </ActionIcon>
            )}
          </>
        )}
      </Group>
    </CustomCenterFull>
  );
}
