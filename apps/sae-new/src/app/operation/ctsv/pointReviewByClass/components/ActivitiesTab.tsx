"use client";

import { C } from "../shared/colors";

import { Badge, Box, Group, Stack, Text } from "@mantine/core";
import { StudentAssessment } from "../types";
import { ACTIVITY_TYPE_CONFIG, activityTypeLabel } from "../shared/constants";
import { StatusBadge } from "@/shared/components/dataDisplay/StatusBadge";

interface ActivitiesTabProps {
  student: StudentAssessment;
}

export function ActivitiesTab({ student }: ActivitiesTabProps) {
  const totalActPoints = student.recognisedActivities.reduce((s, a) => s + a.points, 0);

  return (
    <Stack gap="sm">
      <Box
        p="md"
        style={{
          background: C.neutralCard,
          border: "1px solid #E8E2D9",
          borderRadius: 10,
        }}
      >
        <Group justify="space-between">
          <Text
            size="xs"
            fw={700}
            style={{
              color: C.textMuted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Hoạt động được công nhận
          </Text>
          <Badge
            size="sm"
            radius="md"
            style={{
              background: C.navyPale,
              color: C.navy,
              fontWeight: 800,
              fontSize: "11px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {totalActPoints} điểm
          </Badge>
        </Group>
      </Box>

      {student.recognisedActivities.length === 0 ? (
        <Text
          size="sm"
          style={{
            color: C.textMuted,
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            padding: "24px 0",
          }}
        >
          Không có hoạt động được ghi nhận
        </Text>
      ) : (
        student.recognisedActivities.map((act, i) => {
          const cfg = ACTIVITY_TYPE_CONFIG[act.type]! ?? ACTIVITY_TYPE_CONFIG.mandatory;

          return (
            <Box
              key={act.id}
              p="sm"
              style={{
                background: C.white,
                border: "1px solid #EDE9E3",
                borderRadius: 10,
                animation: `cardFadeUp 0.3s ease both`,
                animationDelay: `${i * 60}ms`,
              }}
            >
              <Group justify="space-between" align="flex-start" gap="sm">
                <Box style={{ flex: 1 }}>
                  <Group gap={6} mb={2}>
                    <StatusBadge
                      label={activityTypeLabel(act.type)}
                      config={{ bg: cfg.bg, color: cfg.color, border: cfg.color }}
                      size="xs"
                    />
                    <Text
                      size="xs"
                      style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
                    >
                      {act.date}
                    </Text>
                  </Group>
                  <Text
                    size="sm"
                    fw={600}
                    style={{
                      color: C.textDark,
                      fontFamily: "'Roboto', sans-serif",
                      lineHeight: 1.4,
                    }}
                  >
                    {act.title}
                  </Text>
                </Box>
                <Badge
                  size="md"
                  radius="md"
                  style={{
                    background: C.navyPale,
                    color: C.navy,
                    fontWeight: 800,
                    fontSize: "13px",
                    fontFamily: "'Roboto', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  +{act.points}
                </Badge>
              </Group>
            </Box>
          );
        })
      )}
    </Stack>
  );
}
