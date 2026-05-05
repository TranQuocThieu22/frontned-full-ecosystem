"use client";
import {
  Badge,
  Box,
  Card,
  Flex,
  Progress,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import type { Icon as TablerIcon } from "@tabler/icons-react";
import React from "react";

export type StatsCardProps = {
  title: string;
  valueText: string; // "8/10"
  percent: number; // 0..100
  color: "indigo" | "blue" | "cyan" | "teal" | "grape" | "orange"; // màu accent trái/phải
  Icon?: React.ElementType;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
  minHeight?: number;
};

/** Chọn pha tiến độ + màu hiển thị */
function getPhase(p: number) {
  const pct = Math.max(0, Math.min(100, Math.round(p))); // clamp & round
  if (pct < 50) {
    return { pct, badge: "Cảnh báo", color: "red" as const };
  }
  if (pct < 100) {
    return { pct, badge: "Cần cải thiện", color: "yellow" as const };
  }
  return { pct, badge: "Hoàn thành", color: "teal" as const };
}

export default function StatsCard({
  title,
  valueText,
  percent,
  color,
  Icon,
  interactive = false,
  selected = false,
  onClick,
  minHeight = 160,
}: StatsCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  // accent cho phần icon + tiêu đề + con số bên phải
  const accentShade = isDark ? 5 : 8;
  const accent = `var(--mantine-color-${color}-${accentShade})`;
  const titleColor = `var(--mantine-color-${color}-${isDark ? 3 : 7})`;
  const bubble = isDark
    ? `color-mix(in oklab, var(--mantine-color-${color}-9) 70%, black)`
    : `var(--mantine-color-${color}-1)`;
  const trackBg = `light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))`;

  // pha tiến độ cho progress + badge
  const phase = getPhase(percent);

  return (
    <Card
      shadow="sm"
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      withBorder
      radius="md"
      p="md"
      h="100%"
      style={{
        minHeight,
        cursor: interactive ? "pointer" : "default",
        outline: interactive && selected ? `2px solid ${accent}` : "none",
        boxShadow:
          interactive && selected
            ? `0 0 0 4px color-mix(in oklab, ${accent} 20%, transparent)`
            : undefined,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? selected : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick?.()
          : undefined
      }
    >
      <Stack gap="sm" h="100%">
        {/* HEADER: trái = icon + title (2 dòng), phải = số liệu to */}
        <Flex align="center" justify="space-between" style={{ flex: 1 }}>
          {/* Trái */}
          <Flex align="center" gap="sm" style={{ minWidth: 0 }}>
            {Icon && (
              <Box
                w={52}
                h={52}
                style={{
                  borderRadius: "50%",
                  background: bubble,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Icon size="20" style={{ color: accent }} />
              </Box>
            )}
          </Flex>

          {/* Phải – số liệu lớn */}
          <Flex align="baseline" gap={6} style={{ flex: "0 0 auto" }}>
            <Text span c="dimmed" fw={600} size="sm">
              Đạt:
            </Text>
            <Text fz={22} fw={800} lh={1} style={{ color: accent }}>
              {valueText}
            </Text>
          </Flex>
        </Flex>

        <Text mt="xs" c={titleColor} fw={600} size="sm" lh={1.2} lineClamp={2}>
          {title}
        </Text>

        {/* Hàng trạng thái: badge + phần trăm */}
        <Flex align="center" justify="space-between">
          <Badge size="md" variant="light" color={phase.color} radius="sm">
            {phase.badge}
          </Badge>
          <Text size="sm" c="dimmed">
            {phase.pct}%
          </Text>
        </Flex>

        {/* Progress dưới cùng */}
        <Progress
          value={phase.pct}
          radius="xl"
          size="lg"
          w="100%"
          // màu theo pha
          color={phase.color}
          styles={{ root: { background: trackBg } }}
        />
      </Stack>
    </Card>
  );
}
