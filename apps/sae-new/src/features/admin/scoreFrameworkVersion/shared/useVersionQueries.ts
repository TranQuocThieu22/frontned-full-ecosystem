"use client";

import { useEffect, useMemo, useRef } from "react";

import { useCustomReactQuery } from "@aq-fe/aq-core-framework/shared/hooks/useCustomReactQuery";
import { scoreFrameworkVersionService } from "@/shared/APIs/scoreFrameworkVersionService";
import { MAIN_TENANT_ID } from "@/shared/consts/data/mainTenantId";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { ScoreFrameworkVersionDetail } from "@/shared/interfaces/ScoreFrameworkVersion";
import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { MAX_TOTAL } from "./constants";
import { Criterion, mapCriteriaToTree } from "./types";

interface UseVersionQueriesProps {
  filterStatus: string;
  debouncedSearchKw: string;
  selectedId: string | null;
  newVersionIds: Set<string>;
  newVersionDetails: Map<string, { code: string; name: string; criteria: Criterion[] }>;
  existingVersionMeta: { name?: string };
}

interface UseVersionQueriesReturn {
  listQuery: ReturnType<typeof useCustomReactQuery>;
  detailQuery: ReturnType<typeof useCustomReactQuery>;
  versionDetail: ScoreFrameworkVersionDetail | undefined;
  isDetailLoading: boolean;
  isExistingVersion: boolean;
  apiCriteria: Criterion[];
  newVersionCriteria: Criterion[];
  editorCriteria: Criterion[];
  versionDetailWithCriteria: ScoreFrameworkVersionDetail | undefined;
}

export function useVersionQueries({
  filterStatus,
  debouncedSearchKw,
  selectedId,
  newVersionIds,
  newVersionDetails,
  existingVersionMeta,
}: UseVersionQueriesProps): UseVersionQueriesReturn {
  // ── List query ───────────────────────────
  const listQuery = useCustomReactQuery({
    queryKey: ["rl-versions", MAIN_TENANT_ID, filterStatus, debouncedSearchKw],
    serviceFn: () =>
      scoreFrameworkVersionService.getAll({
        tenantId: MAIN_TENANT_ID,
        params: {
          state: filterStatus === "all" ? undefined : filterStatus as unknown as ScoreFrameworkVersionStateEnum,
          include: "academicYears,totalMaxScore",
          codeOrName: debouncedSearchKw || undefined,
        },
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Sync list from API — preserve any unsaved new versions already in the store.
  // Invariant: versions and newVersionIds in the store are mutated ONLY as a consequence of this
  // effect running (when listQuery.data changes). Therefore, adding them to deps would be
  // redundant — getState() always reads the latest store snapshot at effect-run time.
  useEffect(() => {
    const data = listQuery.data;
    if (!data) return;

    const s = useScoreFrameworkVersionStore.getState();
    const unsaved = s.versions.filter((v) => v.id != null && s.newVersionIds.has(v.id));
    const merged = unsaved.length > 0 ? [...unsaved, ...data] : data;

    s.setVersions(merged);
    s.setIsListLoaded(true);

    const stillExists = merged.some((v) => v.id === s.selectedId);
    if (!stillExists) {
      s.setSelectedId(merged[0]?.id ?? null);
    }
  }, [listQuery.data]);

  // ── Detail query ──────────────────────────
  const detailQuery = useCustomReactQuery({
    queryKey: ["rl-version-detail", selectedId],
    serviceFn: () =>
      selectedId && !newVersionIds.has(selectedId)
        ? scoreFrameworkVersionService.getById(MAIN_TENANT_ID, selectedId, {
            include: "criterias,totalMaxScore",
          })
        : Promise.resolve(null as any),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!selectedId && !newVersionIds.has(selectedId),
  });

  const versionDetail = detailQuery.data as ScoreFrameworkVersionDetail | undefined;
  const isExistingVersion = selectedId != null && !newVersionIds.has(selectedId);

  const isDetailLoading =
    !isExistingVersion ? false : detailQuery.isLoading && !!selectedId;

  // Criteria tree from API detail
  const apiCriteria = useMemo<Criterion[]>(() => {
    if (!versionDetail) return [];
    return mapCriteriaToTree(versionDetail.criterias ?? []);
  }, [versionDetail]);

  // Criteria for new versions (from store)
  const newVersionCriteria = useMemo(
    () => newVersionDetails.get(selectedId ?? "")?.criteria ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId, newVersionDetails],
  );

  const editorCriteria = isExistingVersion ? apiCriteria : newVersionCriteria;

  // Merge API detail (or new-version stub) with criteria
  const versionDetailWithCriteria = useMemo<ScoreFrameworkVersionDetail | undefined>(() => {
    if (isExistingVersion && versionDetail) {
      return {
        ...versionDetail,
        name: existingVersionMeta.name ?? versionDetail.name,
        criteria: editorCriteria,
      };
    }
    if (!isExistingVersion && selectedId) {
      const detail = newVersionDetails.get(selectedId);
      if (!detail) return undefined;
      return {
        id: selectedId,
        code: detail.code,
        name: detail.name,
        state: ScoreFrameworkVersionStateEnum.Draft,
        publishedAt: null,
        totalMaxScore: MAX_TOTAL,
        academicYears: null,
        criterias: [],
        criteria: editorCriteria,
      } as ScoreFrameworkVersionDetail;
    }
    return undefined;
  }, [isExistingVersion, versionDetail, selectedId, newVersionDetails, editorCriteria, existingVersionMeta]);

  // Keep a ref to track previous selectedId for version-switch detection
  const prevSelectedIdRef = useRef<string | null>(null);

  // Sync edited criteria when switching versions
  useEffect(() => {
    const prev = prevSelectedIdRef.current;
    if (prev === selectedId) return;
    prevSelectedIdRef.current = selectedId;

    useScoreFrameworkVersionStore.getState().resetExistingVersionMeta();

    if (isExistingVersion) {
      useScoreFrameworkVersionStore.getState().setEditedCriteria(apiCriteria);
    } else {
      useScoreFrameworkVersionStore.getState().setEditedCriteria(newVersionCriteria);
    }
  }, [selectedId, apiCriteria, newVersionCriteria]);

  // Also sync when apiCriteria updates (detail finishes loading)
  useEffect(() => {
    if (isExistingVersion && apiCriteria.length > 0) {
      useScoreFrameworkVersionStore.getState().setEditedCriteria(apiCriteria);
    }
  }, [isExistingVersion, apiCriteria]);

  return {
    listQuery,
    detailQuery,
    versionDetail,
    isDetailLoading,
    isExistingVersion,
    apiCriteria,
    newVersionCriteria,
    editorCriteria,
    versionDetailWithCriteria,
  };
}
