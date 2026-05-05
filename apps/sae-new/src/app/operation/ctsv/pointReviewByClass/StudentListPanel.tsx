"use client";

import { C } from "./shared/colors";

import {
  Avatar,
  Badge,
  Box,
  Flex,
  Group,
  Progress,
  ScrollArea,
  Text,
  Tooltip,
} from "@mantine/core";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from "@tabler/icons-react";
import {
  STATE_CONFIG,
  CLASSIFICATION_CONFIG,
  Classification,
  StudentSelfAssessmentStateNum,
  STATE_LABEL,
  FILTER_STATE_OPTIONS,
} from "./types";
import {
  FilterState,
  SortField,
  SortDir,
} from "./usePointReviewByClass";
import { getScoreColor, getInitials } from "./shared/constants";
import { StudentListItem } from "@/shared/APIs/pointReviewService";

// ─────────────────────────────────────────────
// Sort Icon
// ─────────────────────────────────────────────

function SortIcon({ field, current, dir }: { field: SortField; current: SortField; dir: SortDir }) {
  if (field !== current) return <IconSelector size={12} color={C.textPlaceholder} />;
  return dir === "asc"
    ? <IconChevronUp size={12} color={C.navy} />
    : <IconChevronDown size={12} color={C.navy} />;
}

// ─────────────────────────────────────────────
// Student Row
// ─────────────────────────────────────────────

function StudentRow({
  student,
  isActive,
  onSelect,
}: {
  student: StudentListItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  // Map numeric state → string label for STATE_CONFIG (string keys)
  const stateLabel = STATE_LABEL[student.state as StudentSelfAssessmentStateNum] ?? "Draft";
  const stateCfg = STATE_CONFIG[stateLabel as keyof typeof STATE_CONFIG];
  const clsCfg = CLASSIFICATION_CONFIG[student.classification as Classification];
  const scoreColor = getScoreColor(student.totalScore);

  return (
    <Box
      mt={10}
      mb={10}
      onClick={onSelect}
      style={{
        padding: "14px 16px",
        cursor: "pointer",
        background: isActive ? C.navyPale : "transparent",
        borderLeft: `3px solid ${isActive ? C.navy : clsCfg.color}`,
        borderBottom: "1px solid #F0EDE8",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
      className="student-row"
    >
      <Flex gap="sm" align="flex-start">
        {/* Avatar */}
        <Tooltip label={student.studentName ?? ""} openDelay={400}>
          <Avatar
            size={38}
            radius="md"
            style={{
              background: isActive ? C.navy : C.dividerLight,
              color: isActive ? "white" : C.textLight,
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "'Roboto', sans-serif",
              flexShrink: 0,
            }}
          >
            {getInitials(student.studentName ?? "")}
          </Avatar>
        </Tooltip>

        {/* Content */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          {/* Name */}
          <Text
            size="sm"
            fw={isActive ? 700 : 600}
            style={{
              color: isActive ? C.navy : C.textDark,
              fontFamily: "'Roboto', sans-serif",
              lineHeight: 1.3,
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: 2,
            }}
          >
            {student.studentName ?? "—"}
          </Text>

          {/* Student code */}
          <Text
            size="xs"
            style={{
              color: C.textMuted,
              fontFamily: "'Roboto', sans-serif",
              marginBottom: 6,
            }}
          >
            {student.studentCode ?? "—"}
          </Text>

          {/* Score bar + classification */}
          <Group justify="space-between" align="center" mb={4}>
            <Box style={{ flex: 1 }}>
              <Progress.Root size={5} radius={99}>
                <Progress.Section
                  value={(student.totalScore / 100) * 100}
                  color={scoreColor}
                />
              </Progress.Root>
            </Box>
            <Badge
              size="xs"
              radius="sm"
              ml="xs"
              style={{
                background: clsCfg.bg,
                color: clsCfg.color,
                border: `1px solid ${clsCfg.border}`,
                fontWeight: 700,
                fontSize: "10px",
                fontFamily: "'Roboto', sans-serif",
                flexShrink: 0,
              }}
            >
              {student.classification}
            </Badge>
          </Group>

          {/* Bottom: state badge + score */}
          <Group justify="space-between" align="center">
            <Badge
              size="xs"
              radius="sm"
              style={{
                background: stateCfg.bg,
                color: stateCfg.color,
                border: `1px solid ${stateCfg.border}`,
                fontWeight: 600,
                fontSize: "10px",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              {stateCfg.label}
            </Badge>
            <Text
              size="xs"
              fw={700}
              style={{
                fontFamily: "'Roboto', sans-serif",
                color: scoreColor,
              }}
            >
              {student.totalScore}
              <Text
                span
                size="xs"
                fw={400}
                style={{ color: C.textMuted }}
              >
                /100
              </Text>
            </Text>
          </Group>
        </Box>
      </Flex>
    </Box>
  );
}

// ─────────────────────────────────────────────
// Main Panel
// ─────────────────────────────────────────────

interface StudentListPanelProps {
  students: StudentListItem[];
  selectedId: string | null;
  filterState: FilterState;
  searchKw: string;
  sortField: SortField;
  sortDir: SortDir;
  onSelect: (id: string) => void;
  onFilterState: (s: FilterState) => void;
  onSearchKw: (kw: string) => void;
  onSortField: (f: SortField) => void;
  onSortDir: (d: SortDir) => void;
}

export function StudentListPanel({
  students,
  selectedId,
  filterState,
  searchKw,
  sortField,
  sortDir,
  onSelect,
  onFilterState,
  onSearchKw,
  onSortField,
  onSortDir,
}: StudentListPanelProps) {
  const pendingCount = students.filter(
    (s) => s.state === StudentSelfAssessmentStateNum.PendingClassApproval
  ).length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      onSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      onSortField(field);
      onSortDir("desc");
    }
  };

  return (
    <Box
      style={{
        background: C.white,
        borderRight: "1px solid #E8E2D9",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {/* ── Header ── */}
      <Box
        px="md"
        py="md"
        style={{ borderBottom: "1px solid #E8E2D9", flexShrink: 0 }}
      >
        {/* Title */}
        <Flex justify="space-between" align="center" mb="sm">
          <Box>
            <Text
              size="sm"
              fw={800}
              style={{
                color: C.navy,
                fontFamily: "'Roboto', sans-serif",
                fontSize: "15px",
                letterSpacing: "-0.01em",
              }}
            >
              SV lớp D20CNTT1
            </Text>
            <Text size="xs" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}>
              {pendingCount > 0 ? `${pendingCount} chờ duyệt` : "Không có chờ duyệt"}
            </Text>
          </Box>
          {pendingCount > 0 && (
            <Badge
              size="lg"
              radius="xl"
              style={{
                background: C.navy,
                color: "white",
                fontWeight: 800,
                fontSize: "13px",
                fontFamily: "'Roboto', sans-serif",
                minWidth: 28,
                height: 28,
              }}
            >
              {pendingCount}
            </Badge>
          )}
        </Flex>

        {/* Search */}
        <CustomTextInput
          label=""
          placeholder="Tìm theo tên, mã SV..."
          leftSection={<IconSearch size={14} color={C.textMuted} />}
          value={searchKw}
          onChange={(e) => onSearchKw(e.target.value)}
          mb="sm"
          styles={{
            input: {
              background: C.neutralCard,
              border: "1px solid #E8E2D9",
              color: C.navy,
              fontFamily: "'Roboto', sans-serif",
              fontSize: "12px",
              "&::placeholder": { color: C.textPlaceholder },
            },
          }}
        />

        {/* State filters */}
        <Group gap={4}>
          {FILTER_STATE_OPTIONS.map((f) => {
            const count =
              f.value === "all"
                ? students.length
                : students.filter((s) => s.state === f.value).length;
            return (
              <CustomButton
                key={f.value}
                isCheckPermission={false}
                size="xs"
                radius="sm"
                variant={filterState === f.value ? "filled" : "default"}
                onClick={() => onFilterState(f.value)}
                style={
                  filterState === f.value
                    ? {
                        background: C.navy,
                        color: "white",
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                      }
                    : {
                        background: "transparent",
                        border: "1px solid #E8E2D9",
                        color: C.textLight,
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 600,
                        fontSize: "11px",
                      }
                }
              >
                {f.label}
                {count > 0 && (
                  <Text
                    span
                    ml={3}
                    size="xs"
                    fw={800}
                    style={{
                      color: filterState === f.value ? "rgba(255,255,255,0.7)" : C.textMuted,
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {count}
                  </Text>
                )}
              </CustomButton>
            );
          })}
        </Group>

        {/* Sort header */}
        <Group mt="sm" gap={0}>
          {([
            { field: "studentName" as SortField, label: "Tên" },
            { field: "totalSelfScore" as SortField, label: "Điểm" },
            { field: "submittedAt" as SortField, label: "Ngày nộp" },
          ]).map(({ field, label }) => (
            <CustomButton
              key={field}
              isCheckPermission={false}
              variant="subtle"
              size="xs"
              px={4}
              onClick={() => handleSort(field)}
              style={{
                color: sortField === field ? C.navy : C.textMuted,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: sortField === field ? 700 : 500,
                fontSize: "11px",
                height: 20,
                padding: "0 4px",
              }}
              rightSection={<SortIcon field={field} current={sortField} dir={sortDir} />}
            >
              {label}
            </CustomButton>
          ))}
        </Group>
      </Box>

      {/* ── Student List ── */}
      <ScrollArea style={{ flex: 1 }} type="always">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              isActive={student.id === selectedId}
              onSelect={() => onSelect(student.id)}
            />
          ))
        ) : (
          <Box p="xl" style={{ textAlign: "center" }}>
            <Text
              size="sm"
              style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
            >
              Không có sinh viên phù hợp
            </Text>
          </Box>
        )}
      </ScrollArea>

      {/* Global styles for row hover */}
      <style>{`
        .student-row:hover {
          background: #FAF8F5 !important;
        }
      `}</style>
    </Box>
  );
}
