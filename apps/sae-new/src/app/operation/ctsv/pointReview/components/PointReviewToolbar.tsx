import { C } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import PointReviewRejectModal from "@/app/operation/ctsv/pointReview/modal/PointReviewRejectModal";
import { Box, Divider, Flex, Group, Text } from "@mantine/core";
import { IconSearch, IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {ParticipationStateEnum} from "@/shared/consts/enum/ParticipationsStateEnum";

export default function PointReviewToolbar({
  selectedCount,
  totalRecordingCount,
  searchKeyword,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onSelectAll,
  onDeselectAll,
  onApproveSelected,
  onRejectSelected,
  canAct,
}: {
  selectedCount: number;
  totalRecordingCount: number;
  searchKeyword: string;
  statusFilter: number | "all";
  onSearchChange: (kw: string) => void;
  onStatusFilterChange: (s: number | "all") => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onApproveSelected: () => void;
  onRejectSelected: (id: string) => void;
  canAct: boolean;
}) {
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);

  return (
    <>
      <Box
        mb="xs"
        mt="xs"
        px="xl"
        py="md"
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.neutralBorder}`,
          flexShrink: 0,
        }}
      >
        <Flex gap="md" wrap="wrap" align="center">
          {/* Search */}
          <CustomTextInput
            placeholder="Tìm theo tên, mã SV, lớp"
            leftSection={<IconSearch size={15} color={C.textMuted} />}
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            size="xs"
            radius="sm"
            style={{ flex: "1 1 260px", minWidth: 200 }}
            styles={{
              input: {
                background: C.white,
                border: `1px solid ${C.neutralBorder}`,
                color: C.navy,
                fontFamily: "'Roboto', sans-serif",
                "&::placeholder": { color: C.textMuted },
              },
            }}
          />

          {/* Status filter pills */}
          <Group gap={5}>
            {([
              { value: "all" as const, label: "Tất cả", color: C.navy },
              { value: ParticipationStateEnum.Recording as const, label: "Chờ duyệt", color: C.gold },
              { value: ParticipationStateEnum.Approved as const, label: "Đã duyệt", color: C.green },
              { value: ParticipationStateEnum.Rejected as const, label: "Từ chối", color: C.orange },
            ]).map((f) => (
              <CustomButton
                key={String(f.value)}
                size="xs"
                radius="sm"
                variant={statusFilter === f.value ? "filled" : "light"}
                className="filter-pill"
                style={
                  statusFilter === f.value
                    ? {
                      background: f.color,
                      color: C.white,
                      fontWeight: 700,
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "11px",
                    }
                    : {
                      background: C.white,
                      border: `1px solid ${C.neutralBorder}`,
                      color: C.textMid,
                      fontWeight: 600,
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "11px",
                    }
                }
                onClick={() => onStatusFilterChange(f.value)}
              >
                {f.label}
              </CustomButton>
            ))}
          </Group>

          {/* Bulk actions */}
          {selectedCount > 0 && (
            <Group gap={6} style={{ animation: "fadeUp 0.2s ease both" }}>
              <Divider orientation="vertical" color={C.neutralDivider} />
              <Text
                size="xs"
                fw={600}
                style={{ color: C.textMid, fontFamily: "'Roboto', sans-serif" }}
              >
                {selectedCount} đã chọn
              </Text>
              <CustomButton
                size="xs"
                radius="sm"
                leftSection={<IconCheck size={13} />}
                onClick={onApproveSelected}
                disabled={!canAct}
                styles={{
                  root: {
                    background: C.green,
                    color: C.white,
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 700,
                    fontSize: "11px",
                  },
                }}
              >
                Duyệt ({selectedCount})
              </CustomButton>
              <CustomButton
                size="xs"
                radius="sm"
                variant="light"
                leftSection={<IconX size={13} />}
                color="red"
                onClick={() => rejectTarget && onRejectSelected(rejectTarget)}
                disabled={selectedCount !== 1}
                styles={{
                  root: {
                    border: `1px solid ${C.neutralBorder}`,
                    color: C.orange,
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 700,
                    fontSize: "11px",
                    background: C.white,
                  },
                }}
              >
                Từ chối
              </CustomButton>
              <CustomButton
                size="xs"
                variant="subtle"
                color="gray"
                radius="sm"
                onClick={onDeselectAll}
                styles={{
                  root: {
                    color: C.textMuted,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "11px",
                  },
                }}
              >
                Bỏ chọn
              </CustomButton>
            </Group>
          )}

          {/* Select all */}
          <Group gap={6}>
            <Divider orientation="vertical" color={C.neutralDivider} />
            <CustomButton
              size="xs"
              variant="subtle"
              radius="sm"
              onClick={onSelectAll}
              styles={{
                root: {
                  color: C.navy,
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                },
              }}
            >
              Chọn tất cả chờ duyệt ({totalRecordingCount})
            </CustomButton>
          </Group>
        </Flex>
      </Box>

      <PointReviewRejectModal
        opened={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={(reason) => {
          if (rejectTarget) onRejectSelected(rejectTarget);
          setRejectTarget(null);
        }}
        studentName=""
      />
    </>
  );
}
