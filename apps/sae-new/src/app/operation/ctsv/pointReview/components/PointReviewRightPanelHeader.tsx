import { C, TYPE_CONFIG, ACTIVITY_STATE_CONFIG } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import { ActivityState, ActivityType } from "@/shared/interfaces/ActivityStudent";
import type { ActivityApiItem } from "@/shared/interfaces/ActivityStudent";
import { ActionIcon, Badge, Box, Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconLock } from "@tabler/icons-react";

// ─────────────────────────────────────────────
// ActivityApiItem → local display mapper
// ─────────────────────────────────────────────

interface ActivityDisplay {
  id: string;
  title: string;
  category: string;
  maxScore: number;
  organizer: string;
  date: string;
  code: string;
  locked: boolean;
}

/** Map raw API item to display fields — use enum values for config lookups */
function mapActivity(item: ActivityApiItem): ActivityDisplay {
  return {
    id:       item.id,
    title:    item.code ?? item.description ?? "—",
    category: item.semester?.name ?? "—",
    maxScore: item.maxScore ?? 0,
    organizer: item.organizerUnit ?? "—",
    date:     item.semester?.code ?? "—",
    code:     item.code ?? "—",
    locked:   item.state === ActivityState.Locked,
  };
}

export default function PointReviewRightPanelHeader({
  activity,
  totalCount,
  approvedCount,
  rejectedCount,
  recordingCount,
  onToggleLeft,
  leftOpen,
}: {
  activity: ActivityApiItem;
  totalCount: number;
  approvedCount: number;
  rejectedCount: number;
  recordingCount: number;
  onToggleLeft: () => void;
  leftOpen: boolean;
}) {
  const a = mapActivity(activity);
  const typeCfg  = TYPE_CONFIG[activity.type ?? ActivityType.Mandatory];
  const stateCfg = ACTIVITY_STATE_CONFIG[activity.state ?? ActivityState.Recording];

  return (
    <Box
      px="xl"
      py="md"
      style={{
        background: C.white,
        borderBottom: `1px solid ${C.neutralBorder}`,
        flexShrink: 0,
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
        <Box>
          <Group gap="sm" mb={4}>
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={onToggleLeft}
              style={{ color: C.navy }}
            >
              {leftOpen ? <IconChevronLeft size={16} /> : <IconChevronRight size={16} />}
            </ActionIcon>

            <Badge
              size="sm"
              radius="sm"
              style={{
                background: typeCfg.bg,
                color: typeCfg.color,
                fontWeight: 700,
                fontSize: "10px",
                letterSpacing: "0.06em",
              }}
            >
              {typeCfg.label}
            </Badge>
            <Badge
              size="sm"
              radius="sm"
              style={{
                background: stateCfg.bg,
                color: stateCfg.color,
                fontWeight: 700,
                fontSize: "10px",
              }}
            >
              {stateCfg.label}
            </Badge>
            {a.locked && (
              <Badge
                size="sm"
                radius="sm"
                leftSection={<IconLock size={10} />}
                style={{
                  background: C.navyPale,
                  color: C.navy,
                  fontWeight: 700,
                  fontSize: "10px",
                }}
              >
                Khóa
              </Badge>
            )}
          </Group>

          <Title
            order={3}
            mb={4}
            style={{
              fontFamily: "'Roboto', sans-serif",
              color: C.navy,
              fontSize: "20px",
              lineHeight: 1.2,
            }}
          >
            {a.title}
          </Title>

          <Group gap="lg">
            <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
              {a.category} · {a.organizer}
            </Text>
            <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
              {a.date}
            </Text>
            <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
              {a.code}
            </Text>
          </Group>
        </Box>

        {/* Stats */}
        <SimpleGrid cols={4} spacing="xs">
          {[
            { label: "TỔNG SV", value: totalCount, color: C.navy },
            { label: "CHỜ DUYỆT", value: recordingCount, color: C.gold },
            { label: "ĐÃ DUYỆT", value: approvedCount, color: C.green },
            { label: "TỪ CHỐI", value: rejectedCount, color: C.orange },
          ].map((stat) => (
            <Paper
              key={stat.label}
              p="xs"
              style={{
                background: C.neutralBg,
                border: `1px solid ${C.neutralBorder}`,
                textAlign: "center",
                minWidth: 70,
              }}
            >
              <Text
                size="xs"
                style={{
                  color: C.textMuted,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  fontFamily: "'Roboto', sans-serif",
                  marginBottom: 2,
                }}
              >
                {stat.label}
              </Text>
              <Text
                size="md"
                fw={800}
                style={{
                  color: stat.color,
                  fontFamily: "'Roboto', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Group>
    </Box>
  );
}
