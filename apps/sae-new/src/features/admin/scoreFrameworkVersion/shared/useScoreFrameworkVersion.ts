"use client";

import { useDebouncedValue, useDisclosure, useMediaQuery } from "@mantine/hooks";

import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { calcRootTotal, validateParentChildren } from "./helper";
import { useVersionQueries } from "./useVersionQueries";
import { useVersionMutations } from "./useVersionMutations";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";

export function UseScoreFrameworkVersion() {
  // ── Store reads ──────────────────────────
  const versions = useScoreFrameworkVersionStore((s) => s.versions);
  const selectedId = useScoreFrameworkVersionStore((s) => s.selectedId);
  const isListLoaded = useScoreFrameworkVersionStore((s) => s.isListLoaded);
  const editedCriteria = useScoreFrameworkVersionStore((s) => s.editedCriteria);
  const expandedIds = useScoreFrameworkVersionStore((s) => s.expandedIds);
  const filterStatus = useScoreFrameworkVersionStore((s) => s.filterStatus);
  const searchKw = useScoreFrameworkVersionStore((s) => s.searchKw);
  const newVersionIds = useScoreFrameworkVersionStore((s) => s.newVersionIds);
  const newVersionDetails = useScoreFrameworkVersionStore((s) => s.newVersionDetails);
  const existingVersionMeta = useScoreFrameworkVersionStore((s) => s.existingVersionMeta);
  const serverErrors = useScoreFrameworkVersionStore((s) => s.serverErrors);
  const [debouncedSearchKw] = useDebouncedValue(searchKw, 300);

  // ── Sub-hooks ──────────────────────────
  const queries = useVersionQueries({
    filterStatus: filterStatus as string,
    debouncedSearchKw,
    selectedId,
    newVersionIds,
    newVersionDetails,
    existingVersionMeta,
  });

  // ── UI state ────────────────────────────
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [leftOpen] = useDisclosure(!isMobile);
  const createVersionModal = useDisclosure(false);

  const mutations = useVersionMutations({
    selectedId,
    versions,
    newVersionIds,
    newVersionDetails,
    existingVersionMeta,
    editedCriteria,
    versionDetailWithCriteria: queries.versionDetailWithCriteria,
    closeNewVersionModal: createVersionModal[1].close,
  });

  // ── Derived state ────────────────────────
  const totalScore = queries.versionDetailWithCriteria
    ? (queries.versionDetailWithCriteria.totalMaxScore ?? calcRootTotal(editedCriteria))
    : calcRootTotal(editedCriteria);
  const totalValid = totalScore === 100;
  const childValidation = validateParentChildren(editedCriteria);
  const childrenValid = !childValidation.hasError;
  const canPublish = totalValid && childrenValid && !mutations.isSaving;
  const canEdit =
    (queries.isExistingVersion &&
      !!queries.versionDetail &&
      queries.versionDetail.state === ScoreFrameworkVersionStateEnum.Draft) ||
    (!queries.isExistingVersion);
  const firstChildMismatch = editedCriteria.find((c) => childValidation.byId[c.id]);

  // ── Return ──────────────────────────────
  return {
    // List state
    versions,
    selectedId,
    isListLoaded,
    // Detail
    versionDetailWithCriteria: queries.versionDetailWithCriteria,
    isDetailLoading: queries.isDetailLoading,
    criteria: editedCriteria,
    serverErrors,
    // Filter / search
    filterStatus,
    searchKw,
    setSearchKw: useScoreFrameworkVersionStore.getState().setSearchKw,
    setFilterStatus: useScoreFrameworkVersionStore.getState().setFilterStatus,
    // Criteria tree
    expandedIds,
    setExpandedIds: useScoreFrameworkVersionStore.getState().setExpandedIds,
    // Validation
    publishError: mutations.publishError,
    saveSuccess: mutations.saveSuccess,
    canPublish,
    canEdit,
    childrenValid,
    firstChildMismatch,
    totalScore,
    totalValid,
    // Loading
    isSaving: mutations.isSaving,
    // Panels
    leftOpen,
    isMobile,
    // Modal state
    newModalOpened: createVersionModal[0],
    archiveModalOpened: useScoreFrameworkVersionStore((s) => s.archiveModalOpened),
    // Setters
    setSelectedId: useScoreFrameworkVersionStore.getState().setSelectedId,
    // Actions
    updateCriteria: mutations.updateCriteria,
    handleCreateVersion: mutations.handleCreateVersion,
    handleSaveDraft: mutations.handleSaveDraft,
    handleSave: mutations.handleSaveDraft,
    handlePublish: mutations.handlePublish,
    openArchiveModal_: mutations.openArchiveModal_,
    confirmArchive: mutations.confirmArchive,
    openDeleteModal_: mutations.openDeleteModal_,
    confirmDelete: mutations.confirmDelete,
    updateVersionMeta: mutations.updateVersionMeta,
    clearErrorForId: useScoreFrameworkVersionStore.getState().clearErrorForId,
    openNewModal: createVersionModal[1].open,
    closeNewModal: createVersionModal[1].close,
    closeArchiveModal: useScoreFrameworkVersionStore.getState().closeArchiveModal,
    closeDeleteModal: useScoreFrameworkVersionStore.getState().closeDeleteModal,
    deleteModalOpened: useScoreFrameworkVersionStore((s) => s.deleteModalOpened),
    validateCodeDuplicate: mutations.validateCodeDuplicate,
    isExistingVersion: queries.isExistingVersion,
  };
}