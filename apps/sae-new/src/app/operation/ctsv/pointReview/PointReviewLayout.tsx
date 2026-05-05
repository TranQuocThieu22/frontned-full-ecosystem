"use client";

import { C, POINT_REVIEW_GLOBAL_CSS } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import { usePointReview } from "@/app/operation/ctsv/pointReview/shared/usePointReview";
import PointReviewLeftPanel from "@/app/operation/ctsv/pointReview/components/PointReviewLeftPanel";
import PointReviewRightPanelHeader from "@/app/operation/ctsv/pointReview/components/PointReviewRightPanelHeader";
import PointReviewToolbar from "@/app/operation/ctsv/pointReview/components/PointReviewToolbar";
import PointReviewParticipationTable from "./components/PointReviewParticipationTable";
import PointReviewApproveDialog from "@/app/operation/ctsv/pointReview/components/PointReviewApproveDialog";
import PointReviewRejectModal from "@/app/operation/ctsv/pointReview/modal/PointReviewRejectModal";
import RejectConfirmInline from "@/app/operation/ctsv/pointReview/components/RejectConfirmInline";
import { Box, Group, Badge, Text } from "@mantine/core";
import { useState } from "react";
import EmptyState from "@/shared/components/EmptyState";
import MissingActivity from "@/shared/components/svg/MissingActivity";
import type { ActivityApiItem } from "@/shared/interfaces/ActivityStudent";

export default function PointReviewLayout() {
  const hookController = usePointReview();

  const currentActivity: ActivityApiItem | null =
    hookController.activities.find((a) => a.id === hookController.selectedActivityId) ?? null;

  const recordingInView = hookController.visibleParticipations.filter(
    (p) => p.state === "Recording"
  ).length;
  console.log(recordingInView);

  const [rejectInlineId, setRejectInlineId] = useState<string | null>(null);
  const [leftSearchKw, setLeftSearchKw] = useState("");

  // ── Empty state (no activity selected) ──
  if (!currentActivity) {
    return (
      <>
        <style>{POINT_REVIEW_GLOBAL_CSS}</style>
        <Box
          style={{
            display: "flex",
            height: "100vh",
            background: C.appBg,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <PointReviewLeftPanel
            activities={hookController.activities}
            selectedId={hookController.selectedActivityId}
            onSelect={hookController.setSelectedActivityId}
            searchKw={leftSearchKw}
            onSearchChange={setLeftSearchKw}
          />
          <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <EmptyState
              SVG={() => <MissingActivity C={C} />}
              title="Không tìm thấy hoạt động"
              message="Chọn một hoạt động để bắt đầu duyệt điểm"
            />
          </Box>
        </Box>
      </>
    );
  }

  // ── Main layout ──
  return (
    <>
      <style>{POINT_REVIEW_GLOBAL_CSS}</style>

      <Box
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          background: C.appBg,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* ── Left Panel ── */}
        <Box
          style={{
            width: hookController.leftOpen ? (hookController.isMobile ? "100%" : 320) : 0,
            minWidth: hookController.leftOpen ? (hookController.isMobile ? "100%" : 320) : 0,
            transition: "width 0.25s ease, min-width 0.25s ease",
            overflow: "hidden",
          }}
        >
          <PointReviewLeftPanel
            activities={hookController.activities}
            selectedId={hookController.selectedActivityId}
            onSelect={(id) => {
              hookController.setSelectedActivityId(id);
              setRejectInlineId(null);
            }}
            searchKw={leftSearchKw}
            onSearchChange={setLeftSearchKw}
          />
        </Box>

        {/* ── Right Panel ── */}
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "slideInRight 0.3s ease both",
          }}
        >
          {/* Header */}
          <PointReviewRightPanelHeader
            activity={currentActivity}
            totalCount={hookController.totalCount}
            approvedCount={hookController.approvedCount}
            rejectedCount={hookController.rejectedCount}
            recordingCount={hookController.recordingCount}
            onToggleLeft={hookController.toggleLeftPanel}
            leftOpen={hookController.leftOpen}
          />

          {/* Toolbar */}
          <PointReviewToolbar
            selectedCount={hookController.selectedIds.size}
            totalRecordingCount={recordingInView}
            searchKeyword={hookController.searchKeyword}
            statusFilter={hookController.statusFilter}
            onSearchChange={(kw) => {
              hookController.setSearchKeyword(kw);
              setRejectInlineId(null);
            }}
            onStatusFilterChange={(s) => {
              hookController.setStatusFilter(s);
              setRejectInlineId(null);
            }}
            onSelectAll={hookController.selectAll}
            onDeselectAll={() => {
              hookController.deselectAll();
              setRejectInlineId(null);
            }}
            onApproveSelected={() => {
              const ids = Array.from(hookController.selectedIds);
              hookController.openApproveConfirm(ids);
            }}
            onRejectSelected={(id) => setRejectInlineId(id)}
            canAct={hookController.selectedIds.size > 0}
          />

          {/* Inline reject confirmation bar */}
          {rejectInlineId &&
            (() => {
              const rec = hookController.visibleParticipations.find(
                (p) => p.id === rejectInlineId
              );
              if (!rec) return null;
              return (
                <RejectConfirmInline
                  studentName={rec.studentName}
                  onConfirm={() => {
                    hookController.openRejectModal(rejectInlineId);
                    setRejectInlineId(null);
                  }}
                  onCancel={() => setRejectInlineId(null)}
                  loading={hookController.rejectMutation.isPending}
                />
              );
            })()}

          {/* Table */}
          {hookController.visibleParticipations.length === 0 ? (
            <EmptyState
              SVG={() => <MissingActivity C={C} />}
              title="Không tìm thấy sinh viên"
              message="Thử thay đổi bộ lọc hoặc chọn một hoạt động khác để xem kết quả"
            />
          ) : (
            <PointReviewParticipationTable
              participations={hookController.visibleParticipations}
              selectedIds={hookController.selectedIds}
              editingScoreId={hookController.editingScoreId}
              editingScoreValue={hookController.editingScoreValue}
              maxScore={currentActivity.maxScore ?? 0}
              locked={false}
              onToggleId={hookController.toggleSelectId}
              onApprove={(id) => hookController.openApproveConfirm([id])}
              onReject={(id) => setRejectInlineId(id)}
              onStartEditScore={hookController.startEditScore}
              onCancelEditScore={hookController.cancelEditScore}
              onConfirmEditScore={hookController.confirmEditScore}
            />
          )}

          {/* Footer */}
          <Box
            px="xl"
            py="sm"
            style={{
              background: C.white,
              borderTop: `1px solid ${C.neutralBorder}`,
              flexShrink: 0,
            }}
          >
            <Group justify="space-between">
              <Text
                size="xs"
                style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif" }}
              >
                Hiển thị{" "}
                <Text span fw={700} style={{ color: C.navy }}>
                  {hookController.visibleParticipations.length}
                </Text>{" "}
                / {hookController.totalCount} sinh viên
              </Text>
              <Group gap={6}>
                <Badge
                  size="sm"
                  style={{
                    background: C.navyPale,
                    color: C.navy,
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Đang ghi nhận — có thể duyệt / từ chối
                </Badge>
              </Group>
            </Group>
          </Box>
        </Box>

        {/* ── Modals ── */}
        <PointReviewRejectModal
          opened={hookController.rejectModalOpened}
          onClose={hookController.closeRejectModal}
          onConfirm={(reason) => {
            hookController.confirmReject(reason);
            setRejectInlineId(null);
          }}
          studentName={
            hookController.visibleParticipations.find((p) => p.id === hookController.rejectTargetId)
              ?.studentName ?? ""
          }
          loading={hookController.rejectMutation.isPending}
        />

        <PointReviewApproveDialog
          opened={hookController.approveConfirmOpened}
          onClose={hookController.closeApproveConfirm}
          onConfirm={hookController.confirmApprove}
          count={hookController.approveConfirmIds.length}
          maxScore={currentActivity.maxScore ?? 0}
          loading={hookController.approveMutation.isPending}
        />
      </Box>
    </>
  );
}
