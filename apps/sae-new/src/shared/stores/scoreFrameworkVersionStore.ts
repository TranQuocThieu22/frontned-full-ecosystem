/**
 * scoreFrameworkVersion Store
 * Holds all reactive UI state for the scoreFrameworkVersion feature.
 * useRLVersion reads/writes this store instead of useState.
 * Components read from this store directly — no prop drilling needed.
 *
 * NOT persisted — all state is session-local.
 */

import { create } from "zustand";
import type { Criterion } from "@/shared/interfaces/criterion";

import {ScoreFrameworkVersionStateEnum} from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { ScoreFrameworkVersion } from "../interfaces/ScoreFrameworkVersion";

// ── New-version detail (local, before API save) ───────────────────────────────

export interface NewVersionDetail {
  code: string;
  name: string;
  criteria: Criterion[];
}

// ── State shape ────────────────────────────────────────────────────────────────

interface ScoreFrameworkVersionState {
  // ── List ──
  versions: ScoreFrameworkVersion[];
  selectedId: string | null;
  isListLoaded: boolean;

  // ── Criteria editing ──
  editedCriteria: Criterion[];
  expandedIds: Set<string>;

  // ── Filter / search ──
  filterStatus: ScoreFrameworkVersionStateEnum | "all";
  searchKw: string;

  // ── Modals ──
  archiveModalOpened: boolean;
  pendingArchiveId: string | null;
  deleteModalOpened: boolean;
  pendingDeleteId: string | null;

  // ── Existing version meta (optimistic overrides) ──
  existingVersionMeta: { name?: string };

  // ── New versions (local, before API save) ──
  newVersionIds: Set<string>;
  newVersionDetails: Map<string, NewVersionDetail>;

  // ── Server-side errors ──
  serverErrors: Record<string, Record<string, string[]>>; // criterionId -> { FieldName: [Messages] }
}

// ── Actions shape ──────────────────────────────────────────────────────────────

interface ScoreFrameworkVersionActions {
  // List
  setVersions: (versions: ScoreFrameworkVersion[]) => void;
  setSelectedId: (id: string | null) => void;
  setIsListLoaded: (v: boolean) => void;

  // Criteria
  setEditedCriteria: (criteria: Criterion[]) => void;
  setExpandedIds: (updater: (prev: Set<string>) => Set<string>) => void;

  // Filter / search
  setFilterStatus: (s: ScoreFrameworkVersionStateEnum | "all") => void;
  setSearchKw: (kw: string) => void;

  // Archive modal
  openArchiveModal: (id: string) => void;
  closeArchiveModal: () => void;
  setPendingArchiveId: (id: string | null) => void;

  // delete modal
  openDeleteModal: (id: string) => void;
  closeDeleteModal: () => void;
  setPendingDeleteModal: (id: string | null) => void;

  // Existing version meta
  setExistingVersionMeta: (meta: { name?: string }) => void;
  resetExistingVersionMeta: () => void;


  // New versions
  addNewVersionId: (id: string) => void;
  deleteNewVersionId: (id: string) => void;
  setNewVersionDetail: (id: string, detail: NewVersionDetail) => void;
  deleteNewVersionDetail: (id: string) => void;

  // Server errors
  setServerErrors: (errors: Record<string, Record<string, string[]>>) => void;
  clearErrorForId: (id: string) => void;
}

// ── Store ───────────────────────────────────────────────────────────────────────

export const useScoreFrameworkVersionStore = create<
  ScoreFrameworkVersionState & ScoreFrameworkVersionActions
>((set) => ({
  versions: [],
  selectedId: null,
  isListLoaded: false,
  editedCriteria: [],
  expandedIds: new Set(),
  filterStatus: "all",
  searchKw: "",
  archiveModalOpened: false,
  pendingArchiveId: null,
  deleteModalOpened: false,
  pendingDeleteId: null,
  existingVersionMeta: {},
  newVersionIds: new Set(),
  newVersionDetails: new Map(),
  serverErrors: {},


  // ── List actions ──
  setVersions: (versions) => set({ versions }),
  setSelectedId: (selectedId) => set({ selectedId }),
  setIsListLoaded: (isListLoaded) => set({ isListLoaded }),

  // ── Criteria actions ──
  setEditedCriteria: (editedCriteria) => set({ editedCriteria }),
  setExpandedIds: (updater) =>
    set((s) => ({ expandedIds: updater(s.expandedIds) })),

  // ── Filter / search actions ──
  setFilterStatus: (filterStatus) => set({ filterStatus }),
  setSearchKw: (searchKw) => set({ searchKw }),

  // ── Archive modal actions ──
  openArchiveModal: (id) =>
    set({ archiveModalOpened: true, pendingArchiveId: id }),
  closeArchiveModal: () =>
    set({ archiveModalOpened: false, pendingArchiveId: null }),
  setPendingArchiveId: (pendingArchiveId) => set({ pendingArchiveId }),

  // ── Deltee modal actions ──
  openDeleteModal: (id) =>
    set({ deleteModalOpened: true, pendingDeleteId: id }),
  closeDeleteModal: () =>
    set({ deleteModalOpened: false, pendingDeleteId: null }),
  setPendingDeleteModal: (pendingDeleteId) => set({ pendingDeleteId }),

  setExistingVersionMeta: (meta) =>
    set((s) => ({ existingVersionMeta: { ...s.existingVersionMeta, ...meta } })),
  resetExistingVersionMeta: () => set({ existingVersionMeta: {} }),


  // ── New versions actions ──
  addNewVersionId: (id) =>
    set((s) => {
      const next = new Set(s.newVersionIds);
      next.add(id);
      return { newVersionIds: next };
    }),
  deleteNewVersionId: (id) =>
    set((s) => {
      const next = new Set(s.newVersionIds);
      next.delete(id);
      return { newVersionIds: next };
    }),
  setNewVersionDetail: (id, detail) =>
    set((s) => {
      const next = new Map(s.newVersionDetails);
      next.set(id, detail);
      return { newVersionDetails: next };
    }),
  deleteNewVersionDetail: (id) =>
    set((s) => {
      const next = new Map(s.newVersionDetails);
      next.delete(id);
      return { newVersionDetails: next };
    }),

  setServerErrors: (serverErrors) => set({ serverErrors }),
  clearErrorForId: (id) =>
    set((s) => {
      if (!s.serverErrors[id]) return s;
      const next = { ...s.serverErrors };
      delete next[id];
      return { serverErrors: next };
    }),
}));
