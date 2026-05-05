"use client";

import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

import { scoreFrameworkVersionService } from "@/shared/APIs/scoreFrameworkVersionService";
import { MAIN_TENANT_ID } from "@/shared/consts/data/mainTenantId";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { ScoreFrameworkVersion } from "@/shared/interfaces/ScoreFrameworkVersion";
import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { MAX_TOTAL, DEFAULT_CRITERIA } from "./constants";
import {
  CreateVersionBody,
  Criterion,
  ScoreFrameworkVersionDetail,
  UpdateVersionBody,
  flattenCriteriaToInput,
} from "./types";
import { generateGUID, deepClone, calcRootTotal, validateParentChildren } from "./helper";

interface UseVersionMutationsProps {
  selectedId: string | null;
  versions: ScoreFrameworkVersion[];
  newVersionIds: Set<string>;
  newVersionDetails: Map<string, { code: string; name: string; criteria: Criterion[] }>;
  existingVersionMeta: { name?: string };
  editedCriteria: Criterion[];
  versionDetailWithCriteria: ScoreFrameworkVersionDetail | undefined;
  closeNewVersionModal: () => void;
}

interface UseVersionMutationsReturn {
  // Local state
  publishError: string | null;
  saveSuccess: boolean;
  isSaving: boolean;
  // Handlers
  handleCreateVersion: (data: { code: string; name: string }) => void;
  handleSaveDraft: () => void;
  handlePublish: () => void;
  openArchiveModal_: (id: string) => void;
  confirmArchive: () => void;
  openDeleteModal_: (id: string) => void;
  confirmDelete: () => void;
  updateVersionMeta: (partial: { code?: string; name?: string }) => void;
  updateCriteria: (updated: Criterion[]) => void;
  clearError: (criterion: Criterion) => void;
  validateCodeDuplicate: (code: string) => string | null;
}

export function useVersionMutations({
  selectedId,
  versions,
  newVersionIds,
  newVersionDetails,
  existingVersionMeta,
  editedCriteria,
  versionDetailWithCriteria,
  closeNewVersionModal,
}: UseVersionMutationsProps): UseVersionMutationsReturn {
  const queryClient = useQueryClient();

  // ── Local mutation state ────────────────
  const [publishError, setPublishError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Store reads (from Zustand directly inside handlers) ─
  const getVersions = () => useScoreFrameworkVersionStore.getState().versions;
  const getNewVersionDetails = () => useScoreFrameworkVersionStore.getState().newVersionDetails;
  const getSelectedId = () => useScoreFrameworkVersionStore.getState().selectedId;

  // ── Helpers ─────────────────────────────

  function buildCreateBody(state: number): CreateVersionBody {
    const id = getSelectedId() ?? "";
    return {
      code: versionDetailWithCriteria?.code ?? getNewVersionDetails().get(id)?.code ?? "",
      name: versionDetailWithCriteria?.name ?? getNewVersionDetails().get(id)?.name ?? "",
      state,
      criterias: flattenCriteriaToInput(editedCriteria),
    };
  }

  function buildUpdateBody(state: number): UpdateVersionBody {
    return {
      name: existingVersionMeta.name ?? versionDetailWithCriteria?.name ?? "",
      state,
      criterias: flattenCriteriaToInput(editedCriteria),
    };
  }

  /** Client-side duplicate code check against the loaded version list */
  function validateCodeDuplicate(code: string): string | null {
    const currentVersions = useScoreFrameworkVersionStore.getState().versions;
    const currentSelectedId = getSelectedId();
    const isTaken = currentVersions.some(
      (v) => v.code?.toLowerCase() === code.toLowerCase() && v.id !== currentSelectedId,
    );
    return isTaken ? "Mã version đã tồn tại" : null;
  }

  function setServerErrors(errs: Record<string, Record<string, string[]>>) {
    useScoreFrameworkVersionStore.getState().setServerErrors(errs);
  }

  /** Shared server-error mapping — used by both save and publish */
  function buildServerError(err: any, fallbackMessage: string) {
    const data = err?.response?.data;
    const apiErrors = data?.errors;
    if (apiErrors) {
      const flattened = flattenCriteriaToInput(editedCriteria);
      const mappedErrors: Record<string, Record<string, string[]>> = {};
      Object.keys(apiErrors as Record<string, any>).forEach((key) => {
        const match = key.match(/criterias\[(\d+)\]\.(\w+)/i);
        if (match) {
          const index = parseInt(match[1]!, 10);
          const field = match[2]!.toLowerCase();
          const criterion = flattened[index];
          if (criterion?.id) {
            const entry = mappedErrors[criterion.id] ?? {};
            entry[field] = (apiErrors as Record<string, any>)[key];
            mappedErrors[criterion.id] = entry;
          }
        }
      });
      setServerErrors(mappedErrors);
    }
    return data?.message ?? fallbackMessage;
  }

  /** Shared: after a new (temp) version is created via API, migrate it to the real store state */
  function migrateTempVersionToServer(created: ScoreFrameworkVersionDetail) {
    const id = getSelectedId();
    if (!id) return;
    const updated = getVersions().map((v: ScoreFrameworkVersion) =>
      v.id === id
        ? ({ ...created, academicYears: created.academicYears ?? [] } as unknown as ScoreFrameworkVersion)
        : v,
    );
    useScoreFrameworkVersionStore.getState().setVersions(updated);
    useScoreFrameworkVersionStore.getState().deleteNewVersionDetail(id);
    useScoreFrameworkVersionStore.getState().deleteNewVersionId(id);
    if (created.id) {
      useScoreFrameworkVersionStore.getState().setSelectedId(created.id);
    }
  }

  // ── Criteria update ──────────────────────

  function updateCriteria(updated: Criterion[]) {
    useScoreFrameworkVersionStore.getState().setEditedCriteria(updated);
    setSaveSuccess(false);
    setPublishError(null);

    const id = getSelectedId();
    if (!id || !newVersionIds.has(id)) return;
    const existing = getNewVersionDetails().get(id);
    if (existing) {
      useScoreFrameworkVersionStore.getState().setNewVersionDetail(id, { ...existing, criteria: updated });
    }
  }

  function clearError(criterion: Criterion) {
    useScoreFrameworkVersionStore.getState().clearErrorForId(criterion.id);
    criterion.children.forEach(clearError);
  }

  // ── Create ───────────────────────────────

  function handleCreateVersion(data: { code: string; name: string }) {
    const tempId = generateGUID();
    const criteria = deepClone(DEFAULT_CRITERIA);

    useScoreFrameworkVersionStore.getState().addNewVersionId(tempId);
    useScoreFrameworkVersionStore.getState().setNewVersionDetail(tempId, {
      code: data.code,
      name: data.name,
      criteria,
    });

    const tempItem: ScoreFrameworkVersion = {
      id: tempId,
      code: data.code,
      name: data.name,
      state: ScoreFrameworkVersionStateEnum.Draft,
      publishedAt: null,
      totalMaxScore: MAX_TOTAL,
      academicYears: [],
    };
    useScoreFrameworkVersionStore.getState().setVersions([tempItem, ...getVersions()]);
    useScoreFrameworkVersionStore.getState().setSelectedId(tempId);
    useScoreFrameworkVersionStore.getState().setEditedCriteria(criteria);
    closeNewVersionModal();
  }

  // ── Save draft ───────────────────────────

  function handleSaveDraft() {
    const id = getSelectedId();
    if (!id) return;

    setPublishError(null);
    setIsSaving(true);

    const isExisting = !newVersionIds.has(id);

    const doSave = () => {
      void queryClient.invalidateQueries({ queryKey: ["rl-versions"] });
      setSaveSuccess(true);
      notifications.show({ message: "Đã lưu nháp thành công", color: "green" });
      setTimeout(() => setSaveSuccess(false), 3000);
    };

    const doFail = (err: any) => setPublishError(buildServerError(err, "Lưu nháp thất bại"));

    const finally_ = () => setIsSaving(false);

    if (isExisting) {
      scoreFrameworkVersionService
        .updateData(MAIN_TENANT_ID, id, buildUpdateBody(ScoreFrameworkVersionStateEnum.Draft))
        .then(doSave)
        .catch(doFail)
        .finally(finally_);
    } else {
      scoreFrameworkVersionService
        .createNew(MAIN_TENANT_ID, buildCreateBody(ScoreFrameworkVersionStateEnum.Draft))
        .then((res) => {
          migrateTempVersionToServer(res.data.results);
          doSave();
        })
        .catch(doFail)
        .finally(finally_);
    }
  }

  // ── Publish ──────────────────────────────

  function handlePublish() {
    const id = getSelectedId();
    if (!id) return;

    const totalScore = versionDetailWithCriteria
      ? (versionDetailWithCriteria.totalMaxScore ?? calcRootTotal(editedCriteria))
      : calcRootTotal(editedCriteria);

    if (totalScore !== MAX_TOTAL) {
      setPublishError(
        `Tổng điểm tiêu chí cha hiện tại: ${totalScore} — Cần đủ ${MAX_TOTAL} điểm để phát hành.`,
      );
      return;
    }

    const childValidation = validateParentChildren(editedCriteria);
    if (childValidation.hasError) return;

    setPublishError(null);
    setIsSaving(true);

    const isExisting = !newVersionIds.has(id);

    const doPublish = () => {
      void queryClient.invalidateQueries({ queryKey: ["rl-versions"] });
      notifications.show({ message: "Phát hành thành công", color: "green" });
    };

    const doFail = (err: any) => setPublishError(buildServerError(err, "Phát hành thất bại"));

    const finally_ = () => setIsSaving(false);

    if (isExisting) {
      scoreFrameworkVersionService
        .updateData(MAIN_TENANT_ID, id, buildUpdateBody(ScoreFrameworkVersionStateEnum.Published))
        .then(doPublish)
        .catch(doFail)
        .finally(finally_);
    } else {
      scoreFrameworkVersionService
        .createNew(MAIN_TENANT_ID, buildCreateBody(ScoreFrameworkVersionStateEnum.Published))
        .then((res) => {
          migrateTempVersionToServer(res.data.results);
          doPublish();
        })
        .catch(doFail)
        .finally(finally_);
    }
  }

  // ── Archive ──────────────────────────────

  function openArchiveModal_(id: string) {
    useScoreFrameworkVersionStore.getState().openArchiveModal(id);
  }

  function confirmArchive() {
    const id = useScoreFrameworkVersionStore.getState().pendingArchiveId;
    if (!id) return;

    scoreFrameworkVersionService
      .archive(MAIN_TENANT_ID, id)
      .then(() => {
        const s = useScoreFrameworkVersionStore.getState();
        const updated = s.versions.map((v: ScoreFrameworkVersion) =>
          v.id === id
            ? ({ ...v, state: ScoreFrameworkVersionStateEnum.Archived } as ScoreFrameworkVersion)
            : v,
        );
        s.setVersions(updated);
        s.closeArchiveModal();
        void queryClient.invalidateQueries({ queryKey: ["rl-versions"] });
        void queryClient.invalidateQueries({ queryKey: ["rl-version-detail"] });
        notifications.show({ message: "Đã lưu trữ thành công", color: "green" });
      })
      .catch((err: any) => {
        notifications.show({
          message: err?.response?.data?.message ?? "Lưu trữ thất bại",
          color: "red",
        });
      });
  }

  // ── Delete ───────────────────────────────

  function openDeleteModal_(id: string) {
    useScoreFrameworkVersionStore.getState().openDeleteModal(id);
  }

  function confirmDelete() {
    const id = useScoreFrameworkVersionStore.getState().pendingDeleteId;
    if (!id) return;

    const s = useScoreFrameworkVersionStore.getState();

    if (s.newVersionIds.has(id)) {
      // New version — not yet saved to DB, remove locally only
      const updated = s.versions.filter((v: ScoreFrameworkVersion) => v.id !== id);
      s.setVersions(updated);
      s.deleteNewVersionDetail(id);
      s.deleteNewVersionId(id);
      if (s.selectedId === id) {
        s.setSelectedId(updated[0]?.id ?? null);
      }
      s.closeDeleteModal();
      notifications.show({ message: "Đã xóa", color: "green" });
      return;
    }

    // Existing version — call API
    scoreFrameworkVersionService
      .deleteById(MAIN_TENANT_ID, id)
      .then(() => {
        const s2 = useScoreFrameworkVersionStore.getState();
        const updated = s2.versions.filter((v: ScoreFrameworkVersion) => v.id !== id);
        s2.setVersions(updated);
        if (s2.selectedId === id) {
          s2.setSelectedId(updated[0]?.id ?? null);
        }
        s2.closeDeleteModal();
        void queryClient.invalidateQueries({ queryKey: ["rl-versions"] });
        notifications.show({ message: "Xóa thành công", color: "green" });
      })
      .catch((err: any) => {
        notifications.show({
          message: err?.response?.data?.message ?? "Xóa thất bại",
          color: "red",
        });
      });
  }

  // ── Meta update ──────────────────────────

  function updateVersionMeta(partial: { code?: string; name?: string }) {
    const id = getSelectedId();
    if (!id) return;

    const { code, name } = partial;

    // Always update versions list (persists to left panel immediately)
    const updated = getVersions().map((v: ScoreFrameworkVersion) =>
      v.id === id
        ? { ...v, ...(code !== undefined && { code }), ...(name !== undefined && { name }) }
        : v,
    );
    useScoreFrameworkVersionStore.getState().setVersions(updated);

    if (!newVersionIds.has(id)) {
      // Existing version
      useScoreFrameworkVersionStore.getState().setExistingVersionMeta({
        ...(name !== undefined ? { name } : {}),
      });
    } else {
      // New (unsaved) version
      const existing = getNewVersionDetails().get(id);
      if (existing) {
        useScoreFrameworkVersionStore.getState().setNewVersionDetail(id, {
          ...existing,
          ...(code !== undefined && { code }),
          ...(name !== undefined && { name }),
        });
      }
    }
  }

  return {
    publishError,
    saveSuccess,
    isSaving,
    handleCreateVersion,
    handleSaveDraft,
    handlePublish,
    openArchiveModal_,
    confirmArchive,
    openDeleteModal_,
    confirmDelete,
    updateVersionMeta,
    updateCriteria,
    clearError,
    validateCodeDuplicate,
  };
}
