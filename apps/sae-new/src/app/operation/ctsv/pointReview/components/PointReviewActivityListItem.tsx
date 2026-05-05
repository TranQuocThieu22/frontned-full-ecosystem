import { ACTIVITY_STATE_CONFIG, C, TYPE_CONFIG } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import { ActivityState, ActivityType } from "@/shared/interfaces/ActivityStudent";
import type { ActivityApiItem } from "@/shared/interfaces/ActivityStudent";
import { Box, Group, Text } from "@mantine/core";
import { StatusBadge } from "@/shared/components/dataDisplay/StatusBadge";

// ─────────────────────────────────────────────
// API → display mapper
// ─────────────────────────────────────────────

interface ActivityDisplay {
  title: string;
  category: string;
  maxScore: number;
  date: string;
  code: string;
  locked: boolean;
  total: number;
}

/** Map raw API item to display fields — use enum values for config lookups */
function mapActivity(item: ActivityApiItem): ActivityDisplay {
  return {
    title:   item.code ?? item.description ?? "—",
    category: item.semester?.name ?? "—",
    maxScore: item.maxScore ?? 0,
    date:     item.semester?.code ?? "—",
    code:     item.code ?? "—",
    locked:   item.state === ActivityState.Locked,
    total:    item.registeredCount ?? 0,
  };
}

export default function PointReviewActivityListItem({
  activity,
  selected,
  onClick,
}: {
  activity: ActivityApiItem;
  selected: boolean;
  onClick: () => void;
}) {
  const a = mapActivity(activity);
  const typeCfg  = TYPE_CONFIG[activity.type ?? ActivityType.Mandatory];
  const stateCfg = ACTIVITY_STATE_CONFIG[activity.state ?? ActivityState.Recording];

  // Stats row shows total only — participation breakdown not available from activity list API
  const total = a.total;

  return (
    <Box
      onClick={onClick}
      className="activity-item"
      style={{
        padding: "14px 16px",
        cursor: "pointer",
        borderLeft: selected ? `3px solid ${typeCfg.color}` : "3px solid transparent",
        background: selected ? C.neutralCard : "transparent",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
    >
      {/* ── Top row: badges + max score ── */}
      <Group justify="space-between" align="flex-start" mb={8} wrap="nowrap">
        <Group gap={5} wrap="nowrap" style={{ flex: 1 }}>
          <StatusBadge label={typeCfg.label} config={{ bg: typeCfg.bg, color: typeCfg.color }} size="xs" />
          <StatusBadge label={stateCfg.label} config={{ bg: stateCfg.bg, color: stateCfg.color }} size="xs" />
        </Group>
        <Text
          size="sm"
          fw={700}
          style={{
            color: C.navy,
            fontFamily: "'Roboto', sans-serif",
            flexShrink: 0,
          }}
        >
          {a.maxScore}đ
        </Text>
      </Group>

      {/* ── Title ── */}
      <Text
        size="sm"
        fw={600}
        lineClamp={2}
        mb={6}
        style={{
          color: selected ? C.navy : C.textDark,
          fontFamily: "'Roboto', sans-serif",
          lineHeight: 1.3,
        }}
      >
        {a.title}
      </Text>

      {/* ── Category · Date ── */}
      <Group gap={6} mb={8}>
        <Text
          size="xs"
          style={{
            color: C.textMuted,
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500,
          }}
        >
          {a.category}
        </Text>
        {/* <Text size="xs" style={{ color: C.neutralDark, lineHeight: 1 }}>
          ·
        </Text>
        <Text
          size="xs"
          style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
        >
          {a.date}
        </Text> */}
      </Group>

      {/* ── Progress bar placeholder ── */}
      <Box
        mb={8}
        style={{
          height: 6,
          borderRadius: 99,
          background: C.neutralDark,
        }}
      />

      {/* ── Stats row ── */}
      <Group gap={0} justify="space-between">
        <Box ta="center" style={{ flex: 1 }}>
          <Text
            size="xs"
            fw={700}
            style={{
              color: C.navy,
              fontFamily: "'Roboto', sans-serif",
              lineHeight: 1.2,
            }}
          >
            {total}
          </Text>
          <Text
            size="10px"
            style={{
              color: C.textMuted,
              fontFamily: "'Roboto', sans-serif",
              letterSpacing: "0.04em",
              lineHeight: 1.2,
            }}
          >
            Tổng SV
          </Text>
        </Box>
      </Group>
    </Box>
  );
}
