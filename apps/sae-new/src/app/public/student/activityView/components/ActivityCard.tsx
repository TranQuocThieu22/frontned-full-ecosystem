"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import type { ActivityApiItem } from "@/shared/interfaces/ActivityStudent";
import {
  ActivityState,
  ActivityStateColor,
  ActivityStateBg,
  ActivityStateLabel,
  ActivityTypeColor,
  ActivityTypeBg,
  ActivityTypeBorder,
  ActivityTypeLabel,
} from "@/shared/interfaces/ActivityStudent";
import { getQuotaColor } from "../config/typeConfig";

interface ActivityCardProps {
  item: ActivityApiItem;
  onViewDetail: (item: ActivityApiItem) => void;
  onRegister: (activityId: string) => void;
  index: number;
}

function isRegistrationOpen(state?: ActivityState): boolean {
    return state === ActivityState.Open;
}

function isQuotaFull(registered?: number, quota?: number): boolean {
    return (registered ?? 0) >= (quota ?? 0);
}

export function ActivityCard({ item, onViewDetail, onRegister, index }: ActivityCardProps) {
  const typeColor = item.type !== undefined ? ActivityTypeColor[item.type] : "#6B7280";
  const typeBg = item.type !== undefined ? ActivityTypeBg[item.type] : "#F3F4F6";
  const typeBorder = item.type !== undefined ? ActivityTypeBorder[item.type] : "#6B7280";
  const typeLabel = item.type !== undefined ? ActivityTypeLabel[item.type] : "—";

  const stateColor = item.state !== undefined ? ActivityStateColor[item.state] : "#6B7280";
  const stateBg = item.state !== undefined ? ActivityStateBg[item.state] : "#F3F4F6";
  const stateLabel = item.state !== undefined ? ActivityStateLabel[item.state] : "—";

  const registered = item.registeredCount ?? 0;
  const quota = item.quota ?? 0;
  const quotaPct = quota > 0 ? (registered / quota) * 100 : 0;
  const full = isQuotaFull(registered, quota);
  const showRegister = isRegistrationOpen(item.state) && !full;

  const semesterName = item.semester?.name ?? "—";

  return (
    <Card
      radius="md"
      p={0}
      bd="1px solid #F5F5F5"
      opacity="15%"
      shadow="md"
      style={{
        background: "#FFFFFF",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        animation: `cardFadeUp 0.5s ease both`,
        animationDelay: `${index * 60}ms`,
        height: "100%",
      }}
      className="activity-card"
      onClick={() => onViewDetail(item)}
    >
      <Flex direction="column" h="100%" p="lg">
        {/* ── Top section: badges + points ── */}
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Group gap={6}>
            <Badge
              size="xs"
              radius="sm"
              style={{
                background: typeBg,
                color: typeColor,
                border: `1px solid ${typeBorder}`,
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "0.06em",
              }}
            >
              {typeLabel}
            </Badge>
            <Badge
              size="xs"
              radius="sm"
              style={{
                background: stateBg,
                color: stateColor,
                fontWeight: 600,
                fontSize: "10px",
              }}
            >
              {stateLabel}
            </Badge>
          </Group>

          <Box style={{ textAlign: "right", flexShrink: 0 }}>
            <Text
              size="xs"
              style={{
                color: "#0C1E33",
                fontWeight: 600,
                letterSpacing: "0.06em",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              ĐIỂM
            </Text>
            <Text
              size="xl"
              fw={800}
              style={{
                fontFamily: "'Roboto', sans-serif",
                color: typeColor,
                lineHeight: 1,
              }}
            >
              {item.maxScore ?? 0}
            </Text>
          </Box>
        </Group>

        {/* ── Middle section: category + title + meta ── */}
        <Box style={{ flex: 1 }}>
          <Divider />
          <Flex justify="space-between" mb="5">
            <Text
              size="xs"
              fw={700}
              mb={4}
              style={{
                fontFamily: "'Roboto', sans-serif",
                color: "#0C1E33",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {item.criteria?.code ?? "—"} - {item.criteria?.name ?? "—"}
            </Text>
            <Text size="sm" style={{ color: "#A3A9AF" }} fw={500}>
              {semesterName}
            </Text>
          </Flex>

          <Title
            order={4}
            lineClamp={2}
            mb="xs"
            style={{
              fontFamily: "'Roboto', sans-serif",
              color: typeColor,
              fontSize: "18px",
              lineHeight: 1.3,
            }}
          >
            {item.code} - {item.name ?? "—"}
          </Title>

          <Group gap="xs" justify="space-between" mb="10">
            <Group gap="xs">
              <Text size="sm" style={{ color: "#A3A9AF" }} fw={500}>
                {item.organizerUnit ?? "—"}
              </Text>
            </Group>
          </Group>
        </Box>

        {/* ── Bottom section: quota bar + CTA ── */}
        <Box>
          <Box mb="md">
            <Group justify="space-between" align="center" mb={4}>
              <Text size="xs" fw={700} style={{ color: typeColor }}>
                SỐ CHỖ
              </Text>
              <Text size="xs" fw={700} style={{ color: typeColor }}>
                {registered}/{quota}
                {full && (
                  <Text span c="#6B7280" ml={4} size="xs">
                    (Hết chỗ)
                  </Text>
                )}
              </Text>
            </Group>
            <Box
              style={{
                height: 6,
                borderRadius: 99,
                background: "#E8E2D9",
                overflow: "hidden",
              }}
            >
              <Box
                style={{
                  height: "100%",
                  width: `${Math.min(quotaPct, 100)}%`,
                  background: typeColor,
                  borderRadius: 99,
                }}
              />
            </Box>
          </Box>

          <Group grow pt="sm" style={{ borderTop: "1px solid #EDE9E3" }}>
            <Button
              variant="light"
              radius="sm"
              size="sm"
              style={{
                border: `1px solid ${typeBorder}`,
                color: typeColor,
                background: "#FFFFFF",
                fontWeight: 600,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetail(item);
              }}
            >
              Xem chi tiết
            </Button>
            {showRegister && (
              <Button
                radius="sm"
                size="sm"
                style={{
                  background: typeColor,
                  fontWeight: 700,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRegister(item.id);
                }}
              >
                Đăng ký
              </Button>
            )}
          </Group>
        </Box>
      </Flex>
    </Card>
  );
}
