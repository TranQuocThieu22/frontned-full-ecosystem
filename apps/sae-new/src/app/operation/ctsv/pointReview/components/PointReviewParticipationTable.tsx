/**
 * PointReviewParticipationTable — MRT-based participation review table.
 *
 * Built on CustomDataTable (Mantine React Table) to align column widths
 * precisely and support future MRT features (sorting, filtering, export).
 *
 * Inline score editing is implemented per-Cell (not MRT built-in editing)
 * because MRT has no built-in confirm/cancel mechanism — we need both to
 * commit the change AND to optionally revert it on cancel.
 *
 * Replaces: PointReviewParticipationTableLegacy.tsx
 */

import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

import { ActionIcon, Badge, Box, Group, Text, Tooltip } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

import { CustomDataTable } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { ScoreCell } from "./ScoreCell";

import type { ActivityParticipation } from "../shared/types";
import { C, STATE_CONFIG } from "../shared/pointReview.constants";
import {ParticipationState} from "@/shared/consts/enum/ParticipationsStateEnum";

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

/** Hardcoded max score — pass via props when activity is selected */
export const MAX_SCORE_DEFAULT = 100;

// ─────────────────────────────────────────────
// Status Cell — badge
// ─────────────────────────────────────────────

function StatusCell({ state }: { state: ParticipationState }) {
  const cfg = STATE_CONFIG[state]!;
  return (
    <Badge
      size="sm"
      radius="sm"
      style={{
        background: cfg.bg,
        color: cfg.color,
        fontWeight: 700,
        fontSize: "10px",
        letterSpacing: "0.04em",
      }}
    >
      {cfg.label}
    </Badge>
  );
}

// ─────────────────────────────────────────────
// Row Actions Cell — approve / reject buttons
// ─────────────────────────────────────────────

function RowActionsCell({
  record,
  locked,
  onApprove,
  onReject,
}: {
  record: ActivityParticipation;
  locked: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const isRecording = record.state === "Recording";

  if (!isRecording || locked) {
    return (
      <CustomCenterFull>
        <Text
          size="xs"
          style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
        >
          {record.approvedBy ? `Đã duyệt: ${record.approvedBy}` : ""}
        </Text>
      </CustomCenterFull>
    );
  }

  return (
    <CustomCenterFull>
      <Group gap={4}>
        <Tooltip label="Duyệt" position="top" withArrow>
          <ActionIcon
            size="sm"
            variant="light"
            radius="sm"
            onClick={() => onApprove(record.id)}
            style={{
              background: C.greenLight,
              color: C.green,
              border: `1px solid ${C.green}22`,
            }}
          >
            <IconCheck size={14} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Từ chối" position="top" withArrow>
          <ActionIcon
            size="sm"
            variant="light"
            radius="sm"
            onClick={() => onReject(record.id)}
            style={{
              background: C.orangeLight,
              color: C.orange,
              border: `1px solid ${C.orange}22`,
            }}
          >
            <IconX size={14} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </CustomCenterFull>
  );
}

// ─────────────────────────────────────────────
// Student Cell — name + meta
// ─────────────────────────────────────────────

function StudentCell({ record }: { record: ActivityParticipation }) {
  return (
    <Box style={{ minWidth: 0 }}>
      <Text
        size="sm"
        fw={600}
        lineClamp={1}
        style={{ color: C.navy, fontFamily: "'Roboto', sans-serif" }}
      >
        {record.studentName}
      </Text>
      <Text
        size="xs"
        style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
      >
        {record.studentCode} · {record.className} · {record.role ?? "—"}
      </Text>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function PointReviewParticipationTable({
  participations,
  selectedIds,
  editingScoreId,
  editingScoreValue,
  maxScore,
  locked,
  onToggleId,
  onApprove,
  onReject,
  onStartEditScore,
  onCancelEditScore,
  onConfirmEditScore,
}: {
  participations: ActivityParticipation[];
  selectedIds: Set<string>;
  editingScoreId: string | null;
  editingScoreValue: number;
  maxScore: number;
  locked: boolean;
  onToggleId: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onStartEditScore: (id: string, val: number) => void;
  onCancelEditScore: () => void;
  onConfirmEditScore: (finalValue: number) => void;
}) {
  const columns = useMemo<MRT_ColumnDef<ActivityParticipation>[]>(
    () => [

      {
        accessorKey: "studentName",
        header: "Sinh viên",
        size: 240,
        Cell: ({ row }) => <StudentCell record={row.original} />,
        enableGlobalFilter: true,
      },
      {
        accessorKey: "evidence",
        header: "Minh chứng",
        size: 160,
        Cell: ({ cell }) => (
          <Text
            size="xs"
            lineClamp={2}
            style={{
              color: C.textMid,
              fontFamily: "'Roboto', sans-serif",
              lineHeight: 1.5,
            }}
          >
            {cell.getValue<string | null>() ?? "—"}
          </Text>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "proposedScore",
        header: "Đề xuất",
        size: 100,
        Cell: ({ cell }) => (
          <CustomCenterFull>
            <Text
              size="sm"
              ta="center"
              fw={700}
              style={{ color: C.textMid, fontFamily: "'Roboto', sans-serif" }}
            >
              {cell.getValue<number>()}
            </Text>
          </CustomCenterFull>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "finalScore",
        header: "Kết quả",
        size: 140,
        Cell: ({ row }) => (
          <ScoreCell
            record={row.original}
            maxScore={maxScore}
            editingScoreId={editingScoreId}
            editingScoreValue={editingScoreValue}
            onStartEditScore={onStartEditScore}
            onCancelEditScore={onCancelEditScore}
            onConfirmEditScore={onConfirmEditScore}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "state",
        header: "Trạng thái",
        size: 130,
        Cell: ({ row }) => <CustomCenterFull><StatusCell state={row.original.state} /></CustomCenterFull>,
        enableSorting: false,
      },
      {
        id: "mrt-row-actions",
        header: "Thao tác",
        size: 100,
        Cell: ({ row }) => (
          <RowActionsCell
            record={row.original}
            locked={locked}
            onApprove={onApprove}
            onReject={onReject}
          />
        ),
        enableSorting: false,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxScore, locked, editingScoreId, editingScoreValue]
  );

  return (
    <CustomDataTable
      columns={columns}
      data={participations}
      enableRowSelection
      enableRowNumbers
      enableGlobalFilter={false}
      enableColumnFilters={false}
      enableSorting={false}
      rowActionSize={100}
      state={{
        rowSelection: Array.from(selectedIds).reduce<Record<string, boolean>>(
          (acc, id) => {
            acc[id] = true;
            return acc;
          },
          {}
        ),
      }}
      mantineTableBodyRowProps={({ row }) => ({
        style: {
          background:
            selectedIds.has(row.original.id) ? C.neutralCard : "transparent",
        },
      })}
      onRowSelectionChange={(updater) => {
        const next = typeof updater === "function" ? updater({}) : updater;
        const incoming = Object.keys(next);
        const current = Array.from(selectedIds);

        // IDs that were selected but are now deselected
        const toDeselect = current.filter((id) => !incoming.includes(id));
        // IDs that are newly selected
        const toSelect = incoming.filter((id) => !current.includes(id));

        toDeselect.forEach((id) => onToggleId(id));
        toSelect.forEach((id) => onToggleId(id));
      }}
    />
  );
}
