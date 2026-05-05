"use client";

import { C } from "../shared/colors";

import { Badge, Box, Flex, Stack, Text } from "@mantine/core";
import { StudentAssessment } from "../types";
import { formatDate, ACTION_COLORS } from "../shared/constants";

interface AuditLogTabProps {
  student: StudentAssessment;
}

const ACTION_LABELS: Record<string, string> = {
  CREATE: "Tạo",
  UPDATE: "Cập nhật",
  SUBMIT: "Nộp",
  APPROVE: "Duyệt",
  REJECT: "Từ chối",
};

export function AuditLogTab({ student }: AuditLogTabProps) {
  return (
    <Stack gap="xs">
      {student.auditLog.length === 0 ? (
        <Text
          size="sm"
          style={{
            color: C.textMuted,
            fontFamily: "'Roboto', sans-serif",
            textAlign: "center",
            padding: "24px 0",
          }}
        >
          Chưa có lịch sử thay đổi
        </Text>
      ) : (
        student.auditLog.map((entry, i) => (
          <Box
            key={entry.id}
            style={{
              background: C.neutralCard,
              border: "1px solid #EDE9E3",
              borderRadius: 10,
              padding: "12px 14px",
              animation: `cardFadeUp 0.3s ease both`,
              animationDelay: `${i * 50}ms`,
            }}
          >
            <Flex justify="space-between" align="flex-start" gap="sm" mb={6}>
              <Flex gap={6} align="center">
                <Box
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: ACTION_COLORS[entry.action] ?? C.gray,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                <Badge
                  size="xs"
                  radius="sm"
                  style={{
                    background:
                      entry.action === "APPROVE"
                        ? C.greenLight
                        : entry.action === "REJECT"
                        ? C.redLight
                        : C.grayLight,
                    color:
                      entry.action === "APPROVE"
                        ? C.green
                        : entry.action === "REJECT"
                        ? C.red
                        : C.gray,
                    fontWeight: 700,
                    fontSize: "10px",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {ACTION_LABELS[entry.action] ?? entry.action}
                </Badge>
                <Text
                  size="xs"
                  fw={600}
                  style={{ color: C.textDark, fontFamily: "'Roboto', sans-serif" }}
                >
                  {entry.actorName}
                </Text>
              </Flex>
              <Flex gap={4} align="center">
                {entry.newScore !== null && (
                  <Badge
                    size="xs"
                    radius="sm"
                    style={{
                      background: C.navyPale,
                      color: C.navy,
                      fontWeight: 800,
                      fontSize: "10px",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {entry.newScore}đ
                  </Badge>
                )}
                <Text
                  size="xs"
                  style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
                >
                  {formatDate(entry.timestamp)}
                </Text>
              </Flex>
            </Flex>
            {entry.note && (
              <Text
                size="xs"
                style={{
                  color: C.textLight,
                  fontFamily: "'Roboto', sans-serif",
                  lineHeight: 1.5,
                  paddingLeft: 14,
                }}
              >
                {entry.note}
              </Text>
            )}
          </Box>
        ))
      )}
    </Stack>
  );
}
