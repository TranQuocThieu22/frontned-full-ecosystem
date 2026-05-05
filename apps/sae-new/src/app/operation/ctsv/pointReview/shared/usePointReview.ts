"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  ActivityParticipation,

} from "./types";
import {
  participationService,
  TENANT_ID_POINT_REVIEW,
  ApiParticipation,
  PaginatedListResponse,
} from "@/shared/APIs/participationService";
import { activityService } from "@/shared/APIs/activityService";
import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { ActivityState, ApproveType } from "@/shared/interfaces/ActivityStudent";
import type { ActivityApiItem } from "@/shared/interfaces/ActivityStudent";
import type { DataIncludePagingResponse } from "@/shared/interfaces/CustomAPIResponse";
import {PARTICIPATION_STATE_LABEL} from "@/shared/consts/enum/ParticipationsStateEnum";


// ─────────────────────────────────────────────
// Actions interface
// ─────────────────────────────────────────────

interface PointReviewActions {
  // Activity
  selectedActivityId: string | null;
  setSelectedActivityId: (id: string | null) => void;
  // Filters
  searchKeyword: string;
  statusFilter: number | "all";
  setSearchKeyword: (kw: string) => void;
  setStatusFilter: (status: number | "all") => void;
  // Selection
  toggleSelectId: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  // Score editing
  startEditScore: (id: string, currentValue: number) => void;
  cancelEditScore: () => void;
  confirmEditScore: (finalValue: number) => void;
  // Reject
  openRejectModal: (id: string) => void;
  closeRejectModal: () => void;
  confirmReject: (reason: string) => void;
  // Approve
  openApproveConfirm: (ids: string[]) => void;
  closeApproveConfirm: () => void;
  confirmApprove: () => void;
  approveMutation: UseMutationResult<void, Error, string, unknown>;
  rejectMutation: UseMutationResult<void, Error, { studentId: string; reason: string }, unknown>;
  // UI
  toggleLeftPanel: () => void;
  leftOpen: boolean;
  isMobile: boolean;
  // Data
  activities: ActivityApiItem[];
  activitiesLoading: boolean;
  activitiesError: Error | null;
  participations: ActivityParticipation[];
  participationsLoading: boolean;
  participationsError: Error | null;
  selectedIds: Set<string>;
  editingScoreId: string | null;
  editingScoreValue: number;
  // Modals
  rejectModalOpened: boolean;
  rejectTargetId: string | null;
  approveConfirmOpened: boolean;
  approveConfirmIds: string[];
  // Stats
  totalCount: number;
  approvedCount: number;
  rejectedCount: number;
  recordingCount: number;
  // Derived
  visibleParticipations: ActivityParticipation[];
}

export type UsePointReviewReturn = PointReviewActions;

// ─────────────────────────────────────────────
// API → local field mapper
// ─────────────────────────────────────────────

function mapApiToRecord(api: ApiParticipation): ActivityParticipation {
  const stateLabel = PARTICIPATION_STATE_LABEL[api.state] ?? "Recording";
  return {
    id: api.id,
    activityId: api.activityId,
    studentId: api.studentId,
    studentName: api.student?.name ?? api.student?.code ?? "—",
    studentCode: api.student?.code ?? "—",
    className: api.student?.classCode ?? "—",
    proposedScore: api.proposedScore,
    finalScore: api.finalScore,
    state: stateLabel,
    rejectReason: api.rejectReason,
    approvedBy: api.approvedBy,
    approvedAt: api.approvedAt,
  };
}

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

/**
 * pointReview hook — faculty-level participation review:
 *
 *  1. useCustomReactQuery → activityService.getActivities() → left panel
 *  2. useCustomReactQuery → participationService.getParticipants() → right panel
 *  3. Mutations → TBD (approve/reject/score APIs not yet available)
 *
 * Activity state (from API): 1=Draft, 2=Open, 3=Ongoing, 4=Recording...
 * Participation state (from API): 1=Recording, 2=Approved, 3=Rejected
 */
export function usePointReview(): UsePointReviewReturn {
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // ── Local state (declared BEFORE queries — React Rules of Hooks) ─────────────
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | "all">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingScoreId, setEditingScoreId] = useState<string | null>(null);
  const [editingScoreValue, setEditingScoreValue] = useState(0);
  /** Draft scores — local-only until score-edit API is available */
  const [draftScores, setDraftScores] = useState<Record<string, number>>({});
  const [rejectModalOpened, { open: openRejectModal_, close: closeRejectModal_ }] =
    useDisclosure(false);
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  /** Actual studentId — needed for the reject API since rejectTargetId is the participation record ID */
  const [rejectStudentId, setRejectStudentId] = useState<string | null>(null);
  const [approveConfirmOpened, { open: openApproveConfirm_, close: closeApproveConfirm_ }] =
    useDisclosure(false);
  const [approveConfirmIds, setApproveConfirmIds] = useState<string[]>([]);
  /** Actual studentIds — participation record IDs are used for UI, studentIds for API */
  const [approveConfirmStudentIds, setApproveConfirmStudentIds] = useState<string[]>([]);

  // ── Activity list query (left panel) ─────────────────────────────────────────
  const activitiesQuery = useCustomReactQuery({
    queryKey: ["pointReview", "activities"],
    serviceFn: () => activityService.getActivities({ state: ActivityState.Recording}),
  });
  const activities: ActivityApiItem[] = activitiesQuery.data ?? [];
  const activitiesLoading = activitiesQuery.isLoading;
  const activitiesError = activitiesQuery.error as Error | null;

  // Auto-select first activity when data arrives
  useEffect(() => {
    if (!selectedActivityId && !activitiesQuery.isLoading && activitiesQuery.data) {
      setSelectedActivityId(activitiesQuery.data[0]?.id ?? null);
    }
  }, [activitiesQuery.isLoading, activitiesQuery.data, selectedActivityId]);

  const participationsQuery = useCustomReactQuery<PaginatedListResponse<ApiParticipation>>({
    queryKey: ["pointReview", "participations", selectedActivityId],
    serviceFn: () =>
      selectedActivityId
        ? participationService.getParticipants( selectedActivityId)
        : Promise.reject(new Error("No activity selected")),
    enabled: !!selectedActivityId,
  });

  const rawParticipations: ApiParticipation[] =
    participationsQuery.data?.data ?? [];
  const participations: ActivityParticipation[] = rawParticipations.map(mapApiToRecord);
  const participationsLoading = participationsQuery.isLoading;
  const participationsError = participationsQuery.error as Error | null;

  useEffect(() => {
    setSelectedIds(new Set());
  }, [selectedActivityId]);

  function refetchParticipations() {
    if (!selectedActivityId) return;
    queryClient.invalidateQueries({
      queryKey: ["pointReview", "participations", selectedActivityId],
    });
  }

  const approveMutation = useMutation({
    mutationFn: async (studentId: string) => {
      if (!selectedActivityId) throw new Error("No activity selected");
      await activityService.approveActivityScore(
        selectedActivityId,
        studentId,
        ApproveType.Approve
      );
    },
    onSuccess: () => refetchParticipations(),
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ studentId, reason }: { studentId: string; reason: string }) => {
      if (!selectedActivityId) throw new Error("No activity selected");
      await activityService.approveActivityScore(
        selectedActivityId,
        studentId,
        ApproveType.Reject,
        reason
      );
    },
    onSuccess: () => refetchParticipations(),
  });

  const visibleParticipations = useMemo(() => {
    return participations.map((p) => {
      const draft = draftScores[p.id];
      if (draft !== undefined) {
        return { ...p, finalScore: draft };
      }
      return p;
    }).filter((p) => {
      const kw = searchKeyword.toLowerCase();
      const matchKw =
        !kw ||
        p.studentName.toLowerCase().includes(kw) ||
        p.studentCode.toLowerCase().includes(kw) ||
        (p.className ?? "").toLowerCase().includes(kw);

      // statusFilter is numeric (1=Recording, 2=Approved, 3=Rejected); p.state is the
      // string label. Cast to number so runtime comparison works correctly.
      const matchStatus =
        statusFilter === "all" || (p.state as number) === statusFilter;

      return matchKw && matchStatus;
    });
  }, [participations, draftScores, searchKeyword, statusFilter]);

  const { totalCount, approvedCount, rejectedCount, recordingCount } = useMemo(() => {
    const all = participations;
    return {
      totalCount: all.length,
      approvedCount: all.filter((p) => p.state === "Approved").length,
      rejectedCount: all.filter((p) => p.state === "Rejected").length,
      recordingCount: all.filter((p) => p.state === "Recording").length,
    };
  }, [participations]);


  const toggleSelectId = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    const all = visibleParticipations
      .filter((p) => p.state === "Recording")
      .map((p) => p.id);
    setSelectedIds(new Set(all));
  }, [visibleParticipations]);

  const deselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const startEditScore = useCallback((id: string, currentValue: number) => {
    setEditingScoreId(id);
    setEditingScoreValue(currentValue);
  }, []);

  const cancelEditScore = useCallback(() => {
    setEditingScoreId(null);
    setEditingScoreValue(0);
  }, []);

  const confirmEditScore = useCallback((finalValue: number) => {
    if (!editingScoreId) return;
    // TODO: call score-edit API when available — track as local draft for now
    setDraftScores((prev) => ({ ...prev, [editingScoreId]: finalValue }));
    setEditingScoreId(null);
    setEditingScoreValue(0);
  }, [editingScoreId]);

  const openRejectModal = useCallback((id: string) => {
    setRejectTargetId(id);
    // Also look up the actual studentId from participations
    const rec = participations.find((p) => p.id === id);
    setRejectStudentId(rec?.studentId ?? null);
    openRejectModal_();
  }, [openRejectModal_, participations]);

  const closeRejectModal = useCallback(() => {
    closeRejectModal_();
    setRejectTargetId(null);
    setRejectStudentId(null);
  }, [closeRejectModal_]);

  const confirmReject = useCallback((reason: string) => {
    if (!rejectTargetId || !rejectStudentId) return;
    rejectMutation.mutate({ studentId: rejectStudentId, reason });
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(rejectTargetId);
      return next;
    });
    closeRejectModal_();
    setRejectTargetId(null);
    setRejectStudentId(null);
  }, [rejectTargetId, rejectStudentId, closeRejectModal_, rejectMutation]);

  const openApproveConfirm = useCallback((ids: string[]) => {
    setApproveConfirmIds(ids);
    // Resolve participation record IDs → actual studentIds for the API
    setApproveConfirmStudentIds(
      ids.map((id) => participations.find((p) => p.id === id)?.studentId ?? id)
    );
    openApproveConfirm_();
  }, [openApproveConfirm_, participations]);

  const closeApproveConfirm = useCallback(() => {
    closeApproveConfirm_();
    setApproveConfirmIds([]);
    setApproveConfirmStudentIds([]);
  }, [closeApproveConfirm_]);

  const confirmApprove = useCallback(() => {
    if (approveConfirmStudentIds.length === 0) return;
    approveConfirmStudentIds.forEach((id) => approveMutation.mutate(id));
    setSelectedIds(new Set());
    closeApproveConfirm_();
    setApproveConfirmIds([]);
    setApproveConfirmStudentIds([]);
  }, [approveConfirmStudentIds, closeApproveConfirm_, approveMutation]);

  return {
    // Activity
    selectedActivityId,
    setSelectedActivityId,
    // Filters
    searchKeyword,
    statusFilter,
    setSearchKeyword,
    setStatusFilter,
    // Selection
    toggleSelectId,
    selectAll,
    deselectAll,
    // Score editing
    startEditScore,
    cancelEditScore,
    confirmEditScore,
    // Reject
    openRejectModal,
    closeRejectModal,
    confirmReject,
    // Approve
    openApproveConfirm,
    closeApproveConfirm,
    confirmApprove,
    approveMutation,
    rejectMutation,
    // UI
    toggleLeftPanel: () => setLeftOpen((v) => !v),
    leftOpen,
    isMobile,
    // Data
    activities,
    activitiesLoading,
    activitiesError,
    participations,
    participationsLoading,
    participationsError,
    selectedIds,
    editingScoreId,
    editingScoreValue,
    // Modals
    rejectModalOpened,
    rejectTargetId,
    approveConfirmOpened,
    approveConfirmIds,
    // Stats
    totalCount,
    approvedCount,
    rejectedCount,
    recordingCount,
    // Derived
    visibleParticipations,
  };
}
