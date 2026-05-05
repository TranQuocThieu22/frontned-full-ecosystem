"use client";

import { useState, useMemo, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCustomReactQuery } from "@/shared/hooks/useCustomReactQuery";
import {
  StudentAssessment,
  classifyScore,
  Classification,
  StudentSelfAssessmentStateNum,
  StudentListItem,
} from "./types";
import {
  pointReviewService,
  PaginatedListResponse,
} from "@/shared/APIs/pointReviewService";
import { useAuthenticateStore } from "@aq-fe/aq-core-framework/shared/stores/useAuthenticateStore";

// ─────────────────────────────────────────────
// Filter / Sort Options
// ─────────────────────────────────────────────

export type FilterState = number | "all";
export type SortField = "studentName" | "totalSelfScore" | "submittedAt" | "state";
export type SortDir = "asc" | "desc";

// ─────────────────────────────────────────────
// Interface
// ─────────────────────────────────────────────

export interface PointReviewByClassState {

  // ── Raw data ──────────────────────────────────────────────────────────────
  /** Lightweight list — for sidebar (filtering / sorting / counting) */
  studentList: StudentListItem[];
  listLoading: boolean;
  listError: Error | null;

  /** Full detail — for right panel (criteria, activities, audit, discipline) */
  selectedDetail: StudentAssessment | null;
  detailLoading: boolean;
  detailError: Error | null;

  // ── Selection + filter / sort ────────────────────────────────────────────
  selectedId: string | null;
  filterState: FilterState;
  sortField: SortField;
  sortDir: SortDir;
  searchKw: string;

  // ── Local editing ────────────────────────────────────────────────────────
  draftScores: Record<string, number>;
  draftComment: string;
  draftRejectReason: string;

  // ── UI state ─────────────────────────────────────────────────────────────
  rejectModalOpened: boolean;
  approveModalOpened: boolean;
  saveSuccess: boolean;

  // ── Computed ─────────────────────────────────────────────────────────────
  filteredStudents: StudentListItem[];
  totalDraftScore: number;
  draftClassification: Classification;
  canApprove: boolean;
  canReject: boolean;
  hasScoreChanges: boolean;

  // ── Actions ──────────────────────────────────────────────────────────────
  setSelectedId: (id: string | null) => void;
  setFilterState: (s: FilterState) => void;
  setSortField: (f: SortField) => void;
  setSortDir: (d: SortDir) => void;
  setSearchKw: (kw: string) => void;
  setDraftScore: (criterionId: string, score: number) => void;
  setDraftComment: (c: string) => void;
  setDraftRejectReason: (r: string) => void;
  openRejectModal: () => void;
  closeRejectModal: () => void;
  openApproveModal: () => void;
  closeApproveModal: () => void;
  handleApprove: () => void;
  handleReject: () => void;
  handleSaveDraft: () => void;
  clearSaveSuccess: () => void;
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

/**
 * Point Review hook — real API integration:
 *
 *  1. List API  → studentList (sidebar, filtering, sorting, counts)
 *  2. Detail API → selectedDetail (right panel — loaded only when student selected)
 *  3. Mutations → class-save-draft / class-approve / class-reject
 *
 * Both queries use useCustomReactQuery so they are cached and only re-fetch when needed.
 */
export function usePointReviewByClass(): PointReviewByClassState {
  const queryClient = useQueryClient();
  const tenantId = useAuthenticateStore.getState().state.tenantId

  // ── Local state (declared first so queries can reference them) ─────────────
  const [filterState, setFilterState] = useState<FilterState>(StudentSelfAssessmentStateNum.PendingClassApproval);
  const [sortField, setSortField] = useState<SortField>("submittedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [searchKw, setSearchKw] = useState("");
  const [draftScores, setDraftScores] = useState<Record<string, number>>({});
  const [draftComment, setDraftComment] = useState("");
  const [draftRejectReason, setDraftRejectReason] = useState("");
  const [rejectModalOpened, setRejectModalOpened] = useState(false);
  const [approveModalOpened, setApproveModalOpened] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ── List query — refetches whenever filterState changes ──────────────────
  const listQuery = useCustomReactQuery<PaginatedListResponse<StudentListItem>>({
    queryKey: ["pointReview", "classApproval", tenantId, filterState],
    serviceFn: () => {
      const params: Parameters<typeof pointReviewService.getClassApprovalList>[0] =
        filterState === "all" ? {} : { State: filterState as number };
      return pointReviewService.getClassApprovalList(params);
    },
  });

  const studentList: StudentListItem[] = listQuery.data?.data ?? [];
  const listLoading = listQuery.isLoading;
  const listError = listQuery.error as Error | null;

  // ── Detail query ──────────────────────────────────────────────────────────
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const detailQuery = useCustomReactQuery<StudentAssessment>({
    queryKey: ["pointReview", "detail", selectedId],
    serviceFn: () => pointReviewService.getAssessmentDetail(selectedId!),
    enabled: !!selectedId,
  });

  /** Map API response details[] → criteria[] so components work unchanged */
  const selectedDetail: StudentAssessment | null = useMemo(() => {
    const d = detailQuery.data;
    if (!d) return null;
    const rawDetails = d.selfAssessmentDetails ?? d.criteria ?? [];
    const criteria = rawDetails.map((row) => ({
      ...row,
      id: row.criteriaId || row.id,
    }));
    return { ...d, criteria };
  }, [detailQuery.data]);
  const detailLoading = detailQuery.isLoading;
  const detailError = detailQuery.error as Error | null;

  // ── Draft scores — seed from classApprovalScore → score → 0 ────────────
  useEffect(() => {
    if (!selectedDetail) return;
    const seeded: Record<string, number> = {};
    selectedDetail.criteria.forEach((c) => {
      seeded[c.id] = c.classApprovalScore ?? c.score ?? 0;
    });
    setDraftScores(seeded);
  }, [selectedDetail?.assessmentId]);

  // ── Clear draft state when switching students ────────────────────────────
  useEffect(() => {
    setDraftComment("");
    setDraftRejectReason("");
  }, [selectedId]);

  // ── Effective scores — prefer draft, fall back to classApprovalScore / score ─
  const activeDraftScores = useMemo(() => {
    if (!selectedDetail) return draftScores;
    const seeded: Record<string, number> = {};
    selectedDetail.criteria.forEach((c) => {
      seeded[c.id] = draftScores[c.id] ?? c.classApprovalScore ?? c.score ?? 0;
    });
    return seeded;
  }, [selectedDetail, draftScores]);

  // ── Total draft score ────────────────────────────────────────────────────
  const totalDraftScore = selectedDetail
    ? selectedDetail.criteria
        .filter((c) => {
          if (c.parentId !== null) return true; // child: always include
          const hasChildren = selectedDetail.criteria.some(
            (child) => child.parentId === c.id
          );
          return !hasChildren; // orphan parent: include; normal parent: exclude
        })
        .reduce((sum, c) => {
          const score = activeDraftScores[c.id] ?? c.score ?? 0;
          return sum + Math.max(0, Math.min(score, c.maxScore));
        }, 0)
    : 0;

  const draftClassification = classifyScore(totalDraftScore);

  // ── Filtered + sorted list ───────────────────────────────────────────────
  const filteredStudents = useMemo(() => {
    let list = studentList.filter((s) => {
      const matchState =
        filterState === "all" || s.state === filterState;
      const matchKw =
        !searchKw ||
        (s.studentName ?? "").toLowerCase().includes(searchKw.toLowerCase()) ||
        (s.studentCode ?? "").includes(searchKw);
      return matchState && matchKw;
    });

    list.sort((a, b) => {
      let av: string | number = 0;
      let bv: string | number = 0;
      if (sortField === "studentName") {
        av = a.studentName ?? "";
        bv = b.studentName ?? "";
      } else if (sortField === "totalSelfScore") {
        av = a.totalScore;
        bv = b.totalScore;
      } else if (sortField === "submittedAt") {
        av = a.submittedAt;
        bv = b.submittedAt;
      } else if (sortField === "state") {
        av = a.state;
        bv = b.state;
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [studentList, filterState, sortField, sortDir, searchKw]);

  // ── Score change detection ───────────────────────────────────────────────
  // Compare against classApprovalScore (last saved GVCN score), not student's original score.
  // After a save, classApprovalScore is the new baseline.
  const hasScoreChanges = selectedDetail
    ? selectedDetail.criteria.some((c) => {
        const draft = draftScores[c.id];
        if (draft === undefined) return false;
        const baseline = c.classApprovalScore ?? c.score ?? 0;
        return draft !== baseline;
      })
    : false;

  // ── Approve / reject guards ─────────────────────────────────────────────
  const canApprove = !!selectedDetail
    ? selectedDetail.state === StudentSelfAssessmentStateNum.PendingClassApproval
    : false;

  const canReject = canApprove && !!draftRejectReason.trim();

  // ── Mutations ────────────────────────────────────────────────────────────

  // Save draft
  const saveDraftMutation = useMutation({
    mutationFn: async ({
      assessmentId,
      body,
    }: {
      assessmentId: string;
        body: { classApprovalComment: string; selfAssessmentDetails: { criteriaId: string; classApprovalScore: number }[] };
    }) => {
      await pointReviewService.classSaveDraft(assessmentId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pointReview", "classApproval", tenantId],
      });
      // Also invalidate detail so classApprovalScore refetches → clears "adjusted" indicators
      if (selectedId) {
        queryClient.invalidateQueries({
          queryKey: ["pointReview", "detail", selectedId],
        });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    },
  });

  // Approve
  const approveMutation = useMutation({
    mutationFn: async ({
      assessmentId,
      body,
    }: {
      assessmentId: string;
        body: { classApprovalComment: string; selfAssessmentDetails: { criteriaId: string; classApprovalScore: number }[] };
    }) => {
      await pointReviewService.classApprove(assessmentId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pointReview", "classApproval", tenantId],
      });
      // Capture current selectedId before switching — then invalidate its detail
      const currentId = selectedId;
      if (currentId) {
        queryClient.invalidateQueries({
          queryKey: ["pointReview", "detail", currentId],
        });
      }
      setApproveModalOpened(false);
      setDraftComment("");
      // Switch to next student — useEffect on selectedId will seed fresh draftScores
      const next = filteredStudents.find(
        (s) =>
          s.id !== selectedId &&
          s.state === StudentSelfAssessmentStateNum.PendingClassApproval
      );
      setSelectedId(next?.id ?? null);
    },
  });

  // Reject
  const rejectMutation = useMutation({
    mutationFn: async ({
      assessmentId,
      body,
    }: {
      assessmentId: string;
      body: { classRejectComment: string };
    }) => {
      await pointReviewService.classReject(assessmentId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pointReview", "classApproval", tenantId],
      });
      setRejectModalOpened(false);
      setDraftRejectReason("");
      const next = filteredStudents.find(
        (s) =>
          s.id !== selectedId &&
          s.state === StudentSelfAssessmentStateNum.PendingClassApproval
      );
      setSelectedId(next?.id ?? null);
    },
  });

  // ── Action handlers ──────────────────────────────────────────────────────
  function setDraftScore(criterionId: string, score: number) {
    setDraftScores((prev) => ({ ...prev, [criterionId]: score }));
  }

  /** Only include criteria that have been modified vs the original score */
  function buildMutationBody() {
    if (!selectedDetail) return { classApprovalComment: draftComment, selfAssessmentDetails: [] };
    const changed = selectedDetail.criteria
      .filter((c) => {
        const draft = draftScores[c.id];
        if (draft === undefined) return false; // never touched
        const original = c.classApprovalScore ?? c.score ?? 0;
        return draft !== original;
      })
      .map((c) => ({
        criteriaId: c.id,
        classApprovalScore: draftScores[c.id] as number, // safe: filter guarantees defined
      }));
    return {
      classApprovalComment: draftComment,
      selfAssessmentDetails: changed,
    };
  }

  function handleSaveDraft() {
    if (!selectedId) return;
    saveDraftMutation.mutate({
      assessmentId: selectedId,
      body: buildMutationBody(),
    });
  }

  function handleApprove() {
    if (!selectedId) return;
    approveMutation.mutate({
      assessmentId: selectedId,
      body: buildMutationBody(),
    });
  }

  function handleReject() {
    if (!selectedId || !draftRejectReason.trim()) return;
    rejectMutation.mutate({
      assessmentId: selectedId,
      body: { classRejectComment: draftRejectReason },
    });
  }

  return {
    // Data
    studentList,
    listLoading,
    listError,
    selectedDetail,
    detailLoading,
    detailError,
    // Selection + filter / sort
    selectedId,
    filterState,
    sortField,
    sortDir,
    searchKw,
    // Local editing
    draftScores,
    draftComment,
    draftRejectReason,
    // UI
    rejectModalOpened,
    approveModalOpened,
    saveSuccess,
    // Computed
    filteredStudents,
    totalDraftScore,
    draftClassification,
    canApprove,
    canReject,
    hasScoreChanges,
    // Actions
    setSelectedId,
    setFilterState,
    setSortField,
    setSortDir,
    setSearchKw,
    setDraftScore,
    setDraftComment,
    setDraftRejectReason,
    openRejectModal: () => setRejectModalOpened(true),
    closeRejectModal: () => setRejectModalOpened(false),
    openApproveModal: () => setApproveModalOpened(true),
    closeApproveModal: () => setApproveModalOpened(false),
    handleApprove,
    handleReject,
    handleSaveDraft,
    clearSaveSuccess: () => setSaveSuccess(false),
  };
}
