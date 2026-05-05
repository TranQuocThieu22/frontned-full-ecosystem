import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";

export type DashboardViewType = "empty" | "expired" | "unused" | "all";

interface EvidenceDashboardState {
  selectedDepartmentId?: number;
  activeView: DashboardViewType;
  refreshKey: number;
}

export const useEvidenceDashboardStore = createGenericStore<EvidenceDashboardState>({
  initialState: {
    selectedDepartmentId: undefined,
    activeView: "all",
    refreshKey: 0,
  },
});
