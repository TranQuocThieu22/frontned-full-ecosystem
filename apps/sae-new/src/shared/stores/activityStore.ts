/**
 * Activity Store
 * Dùng chung giữa mandatoryActivities & optionalActivities pages.
 * Lưu trữ: selectedId, selectedActivity, last refresh timestamp.
 */

import { createGenericStore } from "@aq-fe/core-ui/shared/libs/createGenericStore";
import type { Activity } from "@/shared/interfaces/Activity";

export interface ActivityState {
    /** ID hoạt động đang được chọn */
    selectedId: string | null;
    /** Chi tiết hoạt động đang được chọn */
    selectedActivity: Activity | null;
    /** Timestamp refresh cuối (để các trang sync lại khi cần) */
    lastRefreshAt: number | null;
}

export const useActivityStore = createGenericStore<ActivityState>({
    initialState: {
        selectedId: null,
        selectedActivity: null,
        lastRefreshAt: null,
    },
    storageKey: "activity-store",
});