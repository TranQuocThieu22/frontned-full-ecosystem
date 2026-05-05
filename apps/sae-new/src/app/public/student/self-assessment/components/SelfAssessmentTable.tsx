"use client";
import { useMemo } from "react";
import { Box, Flex, Loader } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import SelfAssessmentScoreCard from "./SelfAssessmentScoreCard";
import SelfAssessmentSummaryPanel from "./SelfAssessmentSummaryPanel";
import SelfAssessmentSubmitModal from "./SelfAssessmentSubmitModal";
import SelfAssessmentMobileBar from "./SelfAssessmentMobileBar";
import { C, classifyScore } from "../shared/constants";
import type { UseSelfAssessmentReturn } from "../shared/useSelfAssessment";

interface Props extends UseSelfAssessmentReturn { }

export default function SelfAssessmentTable({
  assessment,
  criteria,
  isLoading,
  isError,
  hasSavedDraft,
  isSubmitted,
  scores,
  savedScores,
  totalScore,
  classification,
  canSubmit,
  disciplineBlocked,
  overMaxCriterion,
  totalOver100,
  savingDraft,
  submitting,
  setScore,
  handleSaveDraft,
  handleSubmit,
}: Props) {
  const submitDisclosure = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)", false);

  // ── Saved scores summary (for submit modal) — MUST be before early returns ──
  // Compute from savedScores (last Lưu nháp'd) so modal shows confirmed data
  const savedTotalScore = useMemo(() => {
    return criteria.reduce((sum, c) => {
      if (c.subCriteria && c.subCriteria.length > 0) {
        return sum + c.subCriteria.reduce((s, sub) => s + (savedScores[sub.id] ?? 0), 0);
      }
      return sum + (savedScores[c.id] ?? 0);
    }, 0);
  }, [criteria, savedScores]);

  const savedClassification = classifyScore(savedTotalScore);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h={300}>
        <Loader />
      </Flex>
    );
  }

  if (isError || !assessment) {
    return (
      <Flex justify="center" align="center" h={200}>
        <Box
          p={16}
          style={{
            background: C.dangerBg,
            border: `1px solid ${C.dangerBorder}`,
            borderRadius: 8,
            color: C.danger,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Không thể tải dữ liệu tự đánh giá. Vui lòng thử tải lại trang.
        </Box>
      </Flex>
    );
  }

  const readOnly = isSubmitted;

  // ── Shared: cards + warnings ──
  const renderCards = () => (
    <>
      <Flex direction="column" gap={0}>
        {criteria.map((criterion) => (
          <SelfAssessmentScoreCard
            key={criterion.id}
            criterion={criterion}
            score={scores[criterion.id] ?? 0}
            subScores={scores}
            readOnly={readOnly}
            onChange={setScore}
          />
        ))}
      </Flex>

      {/* BR-02 total-over-100 warning */}
      {totalOver100 && (
        <Box
          mt={12}
          p={12}
          style={{
            background: C.dangerBg,
            border: `1px solid ${C.dangerBorder}`,
            borderRadius: 8,
            color: C.danger,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          ⚠️ Tổng điểm vượt quá 100 — không thể nộp (BR-02)
        </Box>
      )}

      {/* Discipline warning (BR-03) */}
      {disciplineBlocked && (
        <Box
          mt={12}
          p={12}
          style={{
            background: C.amberBg,
            border: `1px solid ${C.amberBorder}`,
            borderRadius: 8,
            fontSize: 13,
            color: "#92400e",
          }}
        >
          ⚠️ Bạn có kỷ luật — xếp loại tối đa bị giới hạn ở{" "}
          <strong>Trung bình</strong> theo Quy chế ĐRL (BR-03).
        </Box>
      )}
    </>
  );

  // ── Shared: mobile bar props ──
  const mobileBarProps = {
    totalScore,
    classification,
    canSubmit,
    disciplineBlocked,
    savingDraft,
    submitting,
    readOnly,
    totalOver100,
    hasSavedDraft,
    assessmentState: assessment.state,
    onSaveDraft: handleSaveDraft,
    onSubmit: () => submitDisclosure[1].open(),
  };

  // ── Mobile: single column + bottom bar ──
  if (isMobile) {
    return (
      <>
        <Box pb={120}>
          <CustomFieldset
            title="PHIẾU TỰ ĐÁNH GIÁ ĐIỂM RÈN LUYỆN"
            textColor={C.navy}
            bgColor={C.navyPale}
          >
            {renderCards()}
          </CustomFieldset>
        </Box>
        <SelfAssessmentMobileBar {...mobileBarProps} />
        <SelfAssessmentSubmitModal
          disclosure={submitDisclosure}
          totalScore={savedTotalScore}
          classification={savedClassification}
          scores={savedScores}
          criteria={criteria}
          loading={submitting}
          onConfirm={handleSubmit}
        />
      </>
    );
  }

  // ── Desktop: 2-column grid + sticky sidebar ──
  return (
    <>
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 20,
          alignItems: "start",
        }}
      >
        <CustomFieldset
          title="PHIẾU TỰ ĐÁNH GIÁ ĐIỂM RÈN LUYỆN"
          textColor={C.navy}
          bgColor={C.navyPale}
        >
          {renderCards()}
        </CustomFieldset>

        <Box
          style={{
            position: "sticky",
            top: 60,
            alignSelf: "flex-start",
          }}
        >
          <SelfAssessmentSummaryPanel {...mobileBarProps} scores={scores} criteria={criteria} />
        </Box>
      </Box>

      <SelfAssessmentSubmitModal
        disclosure={submitDisclosure}
        totalScore={savedTotalScore}
        classification={savedClassification}
        scores={savedScores}
        criteria={criteria}
        loading={submitting}
        onConfirm={handleSubmit}
      />
    </>
  );
}
