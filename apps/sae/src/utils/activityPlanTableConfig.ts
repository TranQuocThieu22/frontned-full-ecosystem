import { MRT_TableOptions, MRT_Row } from "mantine-react-table";
import { ActivityPlan } from "@/interfaces/activityPlan";

export const ACTIVITY_PLAN_TABLE_CONFIG = {
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 30,
        DEFAULT_PAGE_INDEX: 0,
    },
    SORTING: {
        DEFAULT_SORT_COLUMN: "standardCode",
        DEFAULT_SORT_DESC: false,
    },
} as const;

export const getDefaultTableInitialState = (): Partial<MRT_TableOptions<ActivityPlan>['initialState']> => ({
    showColumnFilters: false,
    pagination: {
        pageIndex: ACTIVITY_PLAN_TABLE_CONFIG.PAGINATION.DEFAULT_PAGE_INDEX,
        pageSize: ACTIVITY_PLAN_TABLE_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
    },
    sorting: [
        {
            id: ACTIVITY_PLAN_TABLE_CONFIG.SORTING.DEFAULT_SORT_COLUMN,
            desc: ACTIVITY_PLAN_TABLE_CONFIG.SORTING.DEFAULT_SORT_DESC,
        },
    ],
    expanded: true,
});

export const getRowId = (
    row: ActivityPlan,
    index: number,
    parentRow?: MRT_Row<ActivityPlan>
): string => {
    if (row.events) {
        return `plan-${row.id}-planIndex-${index}`;
    }
    return `event-${row.id}-eventIndex-${index}-parent-${parentRow?.original?.id ?? "root"}`;
};

export const getSubRows = (row: ActivityPlan): ActivityPlan[] => {
    return (row.events as ActivityPlan[]) || [];
};
