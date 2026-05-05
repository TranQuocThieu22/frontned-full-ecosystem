"use client";

import { academicYearService } from "@/shared/APIs/academicYearServiceQT";
import {
  studentSelfAssessmentService,
  StudentSelfAssessmentState,
  type CriterionWithSub,
  type GetSelfAssessmentCurrentSemesterDto,
  type GetSelfAssessmentDetailDto,
  type SaveDraftRequest,
} from "@/shared/APIs/studentSelfAssessmentService";
import type { Classification } from "@/shared/consts/classification";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { classifyScore, TOTAL_MAX_SCORE } from "./constants";

// ─── Local UI-only fields (not in the API response) ────────────────────────

export interface SelfAssessment {
  /** Server root entity id */
  id: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  className: string;
  semesterId: string;
  semesterName: string;
  academicYear: string;
  academicYearId: string;
  state: StudentSelfAssessmentState;
  totalScore: number;
  classification: Classification | null;
  /** Discipline level — not in the current API DTO; always "Không" until backend adds it */
  discipline: { level: "Cảnh cáo" | "Cảnh cáo nặng" | "Khiển trách" | "Không" };
  submittedAt: string | null;
  deadline: string | null;
}

// ─── Return type ─────────────────────────────────────────────────────────

export interface UseSelfAssessmentReturn {
  assessment: SelfAssessment | null;
  criteria: CriterionWithSub[];
  isLoading: boolean;
  isError: boolean;
  /** True once the student has clicked Lưu nháp at least once */
  hasSavedDraft: boolean;
  isSubmitted: boolean;
  scores: Record<string, number>;
  /** Scores last saved to the server (for submit modal display) */
  savedScores: Record<string, number>;
  totalScore: number;
  classification: Classification;
  canSubmit: boolean;
  disciplineBlocked: boolean;
  overMaxCriterion: string | null;
  totalOver100: boolean;
  submitConfirmOpened: boolean;
  setSubmitConfirmOpened: (v: boolean) => void;
  savingDraft: boolean;
  submitting: boolean;
  setScore: (criterionId: string, value: number) => void;
  handleSaveDraft: () => Promise<void>;
  handleSubmit: () => Promise<void>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────

/**
 * Build a parent→children tree from flat GetSelfAssessmentDetailDto[].
 * criteriaId is used as the stable id; level 1 = parent, level 2 = child.
 */
function buildCriteriaTree(details: GetSelfAssessmentDetailDto[]): CriterionWithSub[] {
  const parents = details
    .filter((d) => d.level === 1)
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

  const children = details.filter((d) => d.level === 2);

  return parents.map((p) => {
    const subs = children
      .filter((c) => c.parentId === p.criteriaId)
      .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
      .map((s) => ({
        id: s.criteriaId,
        code: s.criteriaCode ?? "",
        name: s.criteriaName ?? "",
        maxScore: s.maxScore ?? 0,
        parentId: s.parentId,
        level: s.level ?? 2,
        orderIndex: s.orderIndex ?? 0,
      }));

    return {
      id: p.criteriaId,
      code: p.criteriaCode ?? "",
      name: p.criteriaName ?? "",
      maxScore: p.maxScore ?? 0,
      parentId: null,
      level: p.level ?? 1,
      orderIndex: p.orderIndex ?? 0,
      subCriteria: subs,
    } as CriterionWithSub;
  });
}

/**
 * Seed score map from API detail rows.
 */
function buildScoresFromDetails(details: GetSelfAssessmentDetailDto[]): Record<string, number> {
  const init: Record<string, number> = {};
  details.forEach((d) => { init[d.criteriaId] = d.score; });
  return init;
}

// ─── Hook ────────────────────────────────────────────────────────────────

export function useSelfAssessment(): UseSelfAssessmentReturn {
  const queryClient = useQueryClient();
  const tenantId = useAuthenticateStore.getState().state.tenantId;
  const currentAccademicYearId = useCustomReactQuery({
    queryKey: ['current-academic-year'],
    serviceFn: () => academicYearService.getCurrentAcademicYear({ tenantId: tenantId }),
  })
  // ── Self-assessment query — real API ──────────────────────────────────
  const assessmentQuery = useCustomReactQuery<GetSelfAssessmentCurrentSemesterDto>({
    queryKey: ["selfAssessment", "current-semester", currentAccademicYearId.data?.id],
    serviceFn: () =>
      studentSelfAssessmentService.getSelfAssessmentCurrentSemester(currentAccademicYearId.data?.id || ''),
    enabled: true,
  });

  const rawAssessment = assessmentQuery.data;

  // ── Criteria tree (built from API details — no separate call needed) ─
  const criteria: CriterionWithSub[] = useMemo(() => {
    if (!rawAssessment?.selfAssessmentDetails) return [];
    return buildCriteriaTree(rawAssessment.selfAssessmentDetails);
  }, [rawAssessment]);

  // ── Scores — seeded from API response, then locally editable ─────────
  const [scores, setScores] = useState<Record<string, number>>({});

  // Seed from API on first load
  useEffect(() => {
    if (!rawAssessment?.selfAssessmentDetails) return;
    const apiScores = buildScoresFromDetails(rawAssessment.selfAssessmentDetails);
    setScores(apiScores);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawAssessment?.id]);

  // ── Saved scores (for submit modal) ────────────────────────────────────
  // Tracks the last Lưu nháp'd scores; starts from API scores
  const [savedScores, setSavedScores] = useState<Record<string, number>>({});

  // Sync savedScores with API scores on initial load
  useEffect(() => {
    if (!rawAssessment?.selfAssessmentDetails) return;
    setSavedScores(buildScoresFromDetails(rawAssessment.selfAssessmentDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawAssessment?.id]);

  // ── Has saved draft at least once ─────────────────────────────────────
  // True when state > New (backend confirms at least one Lưu nháp was saved)
  const hasSavedDraft = useMemo(
    () => rawAssessment != null && rawAssessment.state !== StudentSelfAssessmentState.New,
    [rawAssessment],
  );

  // ── Derived UI state from assessment ──────────────────────────────────
  const assessment: SelfAssessment | null = useMemo(() => {
    if (!rawAssessment) return null;
    const deadline = rawAssessment.semester?.selfAssessmentClose ?? null;
    return {
      id: rawAssessment.id,
      studentId: rawAssessment.studentId ?? "",
      studentName: "Nguyễn Minh Tuấn",    // TODO: wire from student profile API
      studentCode: "20220001",            // TODO: wire from student profile API
      className: "D22CNT01",              // TODO: wire from student profile API
      semesterId: rawAssessment.semesterId ?? "",
      semesterName: rawAssessment.semester?.name ?? "Học kỳ",
      academicYear: "2025–2026",          // TODO: wire from academicYear API
      academicYearId: currentAccademicYearId.data?.id || '',
      state: rawAssessment.state,
      totalScore: rawAssessment.totalScore,
      classification: (rawAssessment.classification as Classification) ?? null,
      discipline: { level: "Không" },      // TODO: wire from discipline API when available
      submittedAt: rawAssessment.submittedAt,
      deadline,
    };
  }, [rawAssessment]);

  const isLoading = assessmentQuery.isLoading;
  const isError = !!assessmentQuery.isError;

  // ── Local total score (computed from local scores, not API totalScore) ─
  const totalScore = useMemo(() => {
    return criteria.reduce((sum, c) => {
      if (c.subCriteria && c.subCriteria.length > 0) {
        return sum + c.subCriteria.reduce((s, sub) => s + (scores[sub.id] ?? 0), 0);
      }
      return sum + (scores[c.id] ?? 0);
    }, 0);
  }, [criteria, scores]);

  const classification = useMemo(() => classifyScore(totalScore), [totalScore]);

  const isSubmitted = useMemo(
    () =>
      !assessment ||
      (assessment.state !== StudentSelfAssessmentState.New &&
        assessment.state !== StudentSelfAssessmentState.Draft),
    [assessment],
  );

  const overMaxCriterion = useMemo<string | null>(() => {
    for (const c of criteria) {
      if (c.subCriteria && c.subCriteria.length > 0) continue;
      if ((scores[c.id] ?? 0) > c.maxScore) return c.id;
    }
    return null;
  }, [criteria, scores]);

  const totalOver100 = totalScore > TOTAL_MAX_SCORE;

  const disciplineBlocked = useMemo(() => {
    if (!assessment?.discipline) return false;
    if (assessment.discipline.level === "Không") return false;
    return totalScore > 50;
  }, [assessment, totalScore]);

  const canSubmit = useMemo(() => {
    if (!assessment) return false;
    if (isSubmitted) return false;
    if (!hasSavedDraft) return false;   // Must Lưu nháp first
    if (overMaxCriterion !== null) return false;
    if (totalOver100) return false;
    return criteria.every((c) => {
      if (c.subCriteria && c.subCriteria.length > 0) {
        return c.subCriteria.every((sub) => (scores[sub.id] ?? 0) > 0);
      }
      return (scores[c.id] ?? 0) > 0;
    });
  }, [assessment, isSubmitted, hasSavedDraft, overMaxCriterion, totalOver100, criteria, scores]);

  // ── Mutations ────────────────────────────────────────────────────────
  const saveMutation = useMutation({
    mutationFn: (_body: { criterionScores: Record<string, number> }) => {
      if (!assessment) throw new Error("No assessment loaded");
      const details = Object.entries(_body.criterionScores).map(([criteriaId, score]) => ({
        criteriaId,
        score: score ?? 0,   // null → 0
      }));
      const request: SaveDraftRequest = {
        semesterId: assessment.semesterId,
        selfAssessmentDetails: details,
      };
      return studentSelfAssessmentService.saveDraft(currentAccademicYearId.data?.id || '', request);
    },
    onSuccess: () => {
      // Update saved scores so modal shows the freshly saved data
      setSavedScores({ ...scores });
      queryClient.invalidateQueries({
        queryKey: ["selfAssessment", "current-semester", currentAccademicYearId.data?.id],
      });
      notifications.show({
        title: "Đã lưu nháp",
        message: "Dữ liệu tự đánh giá đã được lưu thành công.",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Lỗi lưu nháp",
        message: "Không thể lưu dữ liệu. Vui lòng thử lại.",
        color: "red",
      });
    },
  });

  const submitMutation = useMutation({
    mutationFn: (_body: { criterionScores: Record<string, number> }) => {
      if (!assessment) throw new Error("No assessment loaded");
      const details = Object.entries(_body.criterionScores).map(([criteriaId, score]) => ({
        criteriaId,
        score: score ?? 0,   // null → 0
      }));
      const request: SaveDraftRequest = {
        semesterId: assessment.semesterId,
        selfAssessmentDetails: details,
      };
      return studentSelfAssessmentService.submitAssessment(
        currentAccademicYearId.data?.id || '',
        assessment.id,
        request,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["selfAssessment", "current-semester", currentAccademicYearId.data?.id],
      });
      setSubmitConfirmOpened(false);
      notifications.show({
        title: "Nộp đánh giá thành công",
        message: "Phiếu tự đánh giá đã được gửi đến GVCN. Không thể chỉnh sửa sau bước này.",
        color: "teal",
      });
    },
    onError: () => {
      notifications.show({ title: "Lỗi nộp đánh giá", message: "Vui lòng thử lại.", color: "red" });
    },
  });

  // ── UI state ────────────────────────────────────────────────────────
  const [submitConfirmOpened, setSubmitConfirmOpened] = useState(false);

  // ── Actions ─────────────────────────────────────────────────────────
  const setScore = useCallback((id: string, value: number) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSaveDraft = useCallback(async () => {
    await saveMutation.mutateAsync({ criterionScores: scores });
  }, [scores, saveMutation]);

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;
    // Use savedScores (last Lưu nháp'd) for the modal confirm, not local unsaved changes
    await submitMutation.mutateAsync({ criterionScores: savedScores });
  }, [canSubmit, savedScores, submitMutation]);

  return {
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
    submitConfirmOpened,
    setSubmitConfirmOpened,
    savingDraft: saveMutation.isPending,
    submitting: submitMutation.isPending,
    setScore,
    handleSaveDraft,
    handleSubmit,
  };
}
