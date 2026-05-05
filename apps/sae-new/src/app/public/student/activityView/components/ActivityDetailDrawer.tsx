"use client";

import {
  Badge,
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconSchool,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ActivityApiItem } from "@/shared/interfaces/ActivityStudent";
import {
  ActivityState,
  ActivityStateColor,
  ActivityStateBg,
  ActivityStateLabel,
  ActivityType,
  ActivityTypeColor,
  ActivityTypeBg,
  ActivityTypeBorder,
  ActivityTypeLabel,
} from "@/shared/interfaces/ActivityStudent";
import { getQuotaColor, getQuotaLabel } from "../config/typeConfig";

// ─── Hero gradient per type ────────────────────────────────────────────────────

const TYPE_GRADIENT: Record<ActivityType, string> = {
  [ActivityType.Mandatory]: "linear-gradient(160deg, #1A2744 0%, #2D4270 60%, #4A6BA8 100%)",
  [ActivityType.Optional]: "linear-gradient(160deg, #3D1A0C 0%, #A03A1A 55%, #D4623B 100%)",
};

// ─────────────────────────────────────────────────────────────────────────────

interface ActivityDetailDrawerProps {
  item: ActivityApiItem | null;
  opened: boolean;
  onClose: () => void;
  onRegister: (activityId: string) => void;
  registerMutation: UseMutationResult<void, Error, string, unknown>;
}

export function ActivityDetailDrawer({
  item,
  opened,
  onClose,
  onRegister,
  registerMutation,
}: ActivityDetailDrawerProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // ── Derived values ─────────────────────────────────────────────────────────
  const type = item?.type;
  const state = item?.state;

  const typeColor = type !== undefined ? ActivityTypeColor[type] : "#6B7280";
  const typeBg = type !== undefined ? ActivityTypeBg[type] : "#F3F4F6";
  const typeBorder = type !== undefined ? ActivityTypeBorder[type] : "#6B7280";
  const typeLabel = type !== undefined ? ActivityTypeLabel[type] : "—";
  const heroGradient = type !== undefined ? TYPE_GRADIENT[type] : "#6B7280";

  const stateColor = state !== undefined ? ActivityStateColor[state] : "#6B7280";
  const stateBg = state !== undefined ? ActivityStateBg[state] : "#F3F4F6";
  const stateLabel = state !== undefined ? ActivityStateLabel[state] : "—";

  const registered = item?.registeredCount ?? 0;
  const quota = item?.quota ?? 0;
  const quotaPct = quota > 0 ? (registered / quota) * 100 : 0;
  const quotaColor = item ? getQuotaColor(registered, quota) : "#6B7280";

  const showRegister = item ? state === ActivityState.Open : false;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size={isMobile ? "100%" : "680px"}
      withCloseButton={false}
      styles={{
        body: { padding: 0, height: "100%" },
        content: { borderRadius: "20px 0 0 20px" },
      }}
    >
      {item && (
        <Flex direction="column" h="100%">
          {/* ── Hero Banner ── */}
          <Box
            style={{
              background: heroGradient,
              padding: "28px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              style={{
                position: "absolute",
                right: -40,
                top: -40,
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: `2px solid rgba(255,255,255,0.15)`,
                pointerEvents: "none",
              }}
            />
            <Box
              style={{
                position: "absolute",
                right: 20,
                bottom: -60,
                width: 140,
                height: 140,
                borderRadius: "50%",
                border: `1px solid rgba(255,255,255,0.10)`,
                pointerEvents: "none",
              }}
            />
            <Box
              style={{
                position: "absolute",
                left: 24,
                bottom: 20,
                width: 80,
                height: 80,
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1.5px, transparent 1.5px)`,
                backgroundSize: "12px 12px",
                pointerEvents: "none",
              }}
            />

            <Flex justify="space-between" align="flex-start" mb="md">
              <Group gap="xs">
                <Badge
                  size="sm"
                  radius="sm"
                  style={{
                    background: typeBg,
                    color: typeColor,
                    border: `1px solid ${typeBorder}`,
                    fontWeight: 700,
                  }}
                >
                  {typeLabel}
                </Badge>
                <Badge
                  size="sm"
                  radius="sm"
                  style={{
                    background: stateBg,
                    color: stateColor,
                    fontWeight: 600,
                  }}
                >
                  {stateLabel}
                </Badge>
              </Group>
              <CloseButton
                onClick={onClose}
                variant="white"
                size="md"
                radius="xl"
                style={{ color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
              />
            </Flex>

            <Text
              size="xs"
              style={{
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              {item.criteria?.code ?? "—"} - {item.criteria?.name ?? "—"}
            </Text>
            <Title
              order={2}
              style={{
                color: "white",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "clamp(22px, 3vw, 30px)",
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              {item.name ?? "—"}
            </Title>

            <Group gap="lg">
              <Group gap={6}>
                <IconCalendarEvent size={15} color="rgba(255,255,255,0.6)" />
                <Text size="sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {item.semester?.name ?? "—"}
                </Text>
              </Group>
              <Group gap={6}>
                <IconClock size={15} color="rgba(255,255,255,0.6)" />
                <Text size="sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                  —
                </Text>
              </Group>
            </Group>
          </Box>

          {/* ── Scrollable Body ── */}
          <ScrollArea h="calc(100% - 210px)" p="lg">
            <Stack gap="lg">

              {/* Points & Registration Card */}
              <Box
                style={{
                  background: "#FAF8F5",
                  borderRadius: 16,
                  padding: "20px 24px",
                  border: "1px solid #E8E2D9",
                }}
              >
                <Group justify="space-between" mb="md">
                  <Box>
                    <Text
                      size="xs"
                      style={{
                        color: "#9E9689",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      Điểm tối đa
                    </Text>
                    <Title
                      order={1}
                      style={{
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: 48,
                        color: typeColor,
                        lineHeight: 1,
                        marginTop: 4,
                      }}
                    >
                      {item.maxScore ?? 0}
                    </Title>
                  </Box>
                  {showRegister && (
                    <Button
                      size="md"
                      radius="md"
                      loading={registerMutation.isPending}
                      onClick={() => onRegister(item.id)}
                      style={{
                        background: typeColor,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Đăng ký ngay
                    </Button>
                  )}
                </Group>

                {/* Quota bar */}
                <Box>
                  <Group justify="space-between" mb={6}>
                    <Text size="xs" fw={700} style={{ color: typeColor }}>
                      SỐ LƯỢNG
                    </Text>
                    <Text size="xs" fw={700} style={{ color: quotaColor }}>
                      {registered} / {quota} ({(quotaPct).toFixed(1)}%)
                    </Text>
                  </Group>
                  <Box
                    style={{
                      height: 8,
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
                        transition: "width 0.6s ease",
                      }}
                    />
                  </Box>
                  <Group justify="space-between" mt={4}>
                    <Text size="xs" style={{ color: "#9E9689" }}>
                      Đã đăng ký
                    </Text>
                    {/* <Text size="xs" fw={700} style={{ color: quotaColor }}>
                      {getQuotaLabel(registered, quota)}
                    </Text> */}
                  </Group>
                </Box>
              </Box>

              {/* Quick Info Pills */}
              <Grid gutter="md">
                  {/* NOTE: Tạm ẩn do không có dữ liệu */}
                {/* <Grid.Col span={6}>
                  <Paper
                    p="md"
                    radius="md"
                    style={{
                      background: "#F7F5F2",
                      border: "1px solid #E8E2D9",
                    }}
                  >
                    <Group gap="xs" mb={4}>
                      <IconMapPin size={15} color={typeColor} />
                      <Text
                        size="xs"
                        fw={700}
                        style={{ color: "#9E9689", letterSpacing: "0.08em", textTransform: "uppercase" }}
                      >
                        Địa điểm
                      </Text>
                    </Group>
                    <Text size="sm" fw={600} style={{ color: "#1A2744", lineHeight: 1.4 }}>
                      —
                    </Text>
                  </Paper>
                </Grid.Col> */}
                <Grid.Col span={12}>
                  <Paper
                    p="md"
                    radius="md"
                    style={{
                      background: "#F7F5F2",
                      border: "1px solid #E8E2D9",
                    }}
                  >
                    <Group gap="xs" mb={4}>
                      <IconUsers size={15} color={typeColor} />
                      <Text
                        size="xs"
                        fw={700}
                        style={{ color: "#9E9689", letterSpacing: "0.08em", textTransform: "uppercase" }}
                      >
                        Đơn vị
                      </Text>
                    </Group>
                    <Text size="sm" fw={600} style={{ color: "#1A2744", lineHeight: 1.4 }}>
                      {item.organizerUnit ?? "—"}
                    </Text>
                  </Paper>
                </Grid.Col>
              </Grid>

              {/* Description */}
              <Box>
                <Text
                  size="sm"
                  fw={700}
                  style={{
                    color: "#1A2744",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Giới thiệu
                </Text>
                <Text size="sm" style={{ color: "#4A453F", lineHeight: 1.8 }}>
                  {item.description ?? "—"}
                </Text>
              </Box>

              {/* Topics — no data in API, show empty */}
              {/* NOTE: Tạm ẩn do không có dữ liệu */}
              {/* <Box>
                <Text
                  size="sm"
                  fw={700}
                  style={{
                    color: "#1A2744",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Nội dung chính
                </Text>
                <Text size="sm" style={{ color: "#9E9689" }}>
                  Chưa có nội dung.
                </Text>
              </Box> */}

              {/* Eligibility & Attendance — no data in API */}
              {/* NOTE: Tạm ẩn do không có dữ liệu */}

              {/* <Grid gutter="md">
                <Grid.Col span={6}>
                  <Paper
                    p="md"
                    radius="md"
                    style={{
                      background: "#EEF1F8",
                      border: "1px solid #C5CEE0",
                    }}
                  >
                    <Group gap="xs" mb="xs">
                      <IconSchool size={15} color="#1A2744" />
                      <Text size="xs" fw={700} style={{ color: "#1A2744" }}>
                        Đối tượng
                      </Text>
                    </Group>
                    <Text size="xs" style={{ color: "#3A4A6B", lineHeight: 1.6 }}>
                      —
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Paper
                    p="md"
                    radius="md"
                    style={{
                      background: "#FEF9EC",
                      border: "1px solid #F0D98A",
                    }}
                  >
                    <Group gap="xs" mb="xs">
                      <IconShieldCheck size={15} color="#B8810A" />
                      <Text size="xs" fw={700} style={{ color: "#B8810A" }}>
                        Điểm danh
                      </Text>
                    </Group>
                    <Text size="xs" style={{ color: "#7A6010", lineHeight: 1.6 }}>
                      —
                    </Text>
                  </Paper>
                </Grid.Col>
              </Grid> */}
            </Stack>
          </ScrollArea>
        </Flex>
      )}
    </Drawer>
  );
}
