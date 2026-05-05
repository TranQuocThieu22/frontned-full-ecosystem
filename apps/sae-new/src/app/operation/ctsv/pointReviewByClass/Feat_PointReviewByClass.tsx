"use client";

import { C } from "./shared/colors";

import { Box } from "@mantine/core";

import { usePointReviewByClass } from "./usePointReviewByClass";
import { StudentListPanel } from "./StudentListPanel";
import { AssessmentDetailPanel } from "./AssessmentDetailPanel";
import { ActionFooter } from "./ActionFooter";
// import { EmptyState } from "./EmptyState";
import { RejectModal } from "./modal/RejectModal";
import { ConfirmApproveModal } from "./modal/ConfirmApproveModal";
import EmptyState from "@/shared/components/EmptyState";
import MissingStudent from "@/shared/components/svg/MissingStudent";

// ─────────────────────────────────────────────
// Global CSS (keyframe animations, scrollbars)
// ─────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800&display=swap');

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes cardFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes successPop {
    0%   { opacity: 0; transform: scale(0.9); }
    60%  { opacity: 1; transform: scale(1.06); }
    100% { opacity: 1; transform: scale(1); }
  }

  .student-row:hover { background: #FAF8F5 !important; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #F3F0EA; }
  ::-webkit-scrollbar-thumb { background: #C5BEB4; border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: #9E9689; }
`;

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────

export default function Feat_PointReviewByClass() {
  const h = usePointReviewByClass();

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <Box
        style={{
          display: "flex",
          flexDirection: "row", // Default to row, but we can use Box props or media queries if we had a proper Mantine wrapper here
          height: "100vh",
          overflow: "hidden",
          background: C.neutralBg,
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {/* ── Left: Student List ── */}
        <Box
          style={{
            width: "100%",
            maxWidth: 340,
            minWidth: 280,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <StudentListPanel
            students={h.filteredStudents}
            selectedId={h.selectedId}
            filterState={h.filterState}
            searchKw={h.searchKw}
            sortField={h.sortField}
            sortDir={h.sortDir}
            onSelect={h.setSelectedId}
            onFilterState={h.setFilterState}
            onSearchKw={h.setSearchKw}
            onSortField={h.setSortField}
            onSortDir={h.setSortDir}
          />
        </Box>

        {/* ── Right: Assessment Detail ── */}
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: C.neutralBg,
            animation: "slideInRight 0.28s ease both",
          }}
        >
          {h.selectedDetail ? (
            <>
              <AssessmentDetailPanel
                student={h.selectedDetail}
                draftScores={h.draftScores}
                draftComment={h.draftComment}
                onDraftScore={h.setDraftScore}
                onDraftComment={h.setDraftComment}
                totalDraftScore={h.totalDraftScore}
                draftClassification={h.draftClassification}
                isReadOnly={
                  h.selectedDetail.state !== 2 /* PendingClassApproval */
                }
              />

              {h.selectedDetail.state === 2 /* PendingClassApproval */ && (
                <ActionFooter
                  totalDraftScore={h.totalDraftScore}
                  draftClassification={h.draftClassification}
                  selfScore={h.selectedDetail.totalScore}
                  hasScoreChanges={h.hasScoreChanges}
                  canApprove={h.canApprove}
                  disciplineLevel={h.selectedDetail.disciplineRecord?.level ?? null}
                  onSave={h.handleSaveDraft}
                  onApprove={h.openApproveModal}
                  onReject={h.openRejectModal}
                  saveSuccess={h.saveSuccess}
                />
              )}
            </>
          ) : (
            <EmptyState
              SVG={() => <MissingStudent C={C} />}
              title="Chưa chọn sinh viên"
              message="Thử thay đổi bộ lọc hoặc chọn một hoạt động khác để xem kết quả."

            />
          )}
        </Box>

        {/* ── Modals ── */}
        <RejectModal
          opened={h.rejectModalOpened}
          student={h.selectedDetail}
          reason={h.draftRejectReason}
          onClose={h.closeRejectModal}
          onConfirm={h.handleReject}
          onReason={h.setDraftRejectReason}
        />

        <ConfirmApproveModal
          opened={h.approveModalOpened}
          student={h.selectedDetail}
          totalDraftScore={h.totalDraftScore}
          draftClassification={h.draftClassification}
          hasScoreChanges={h.hasScoreChanges}
          disciplineLevel={h.selectedDetail?.disciplineRecord?.level ?? null}
          onClose={h.closeApproveModal}
          onConfirm={h.handleApprove}
        />
      </Box>
    </>
  );
}
