import { MRT_FilterFn } from "mantine-react-table";
import { ActivityPlan } from "@/interfaces/activityPlan";

/**
 * Hierarchical filter that searches both parent and child rows by name
 */
export const hierarchicalNameFilter: MRT_FilterFn<ActivityPlan> = (
    row,
    columnId,
    filterValue
) => {
    if (!filterValue) return true;

    const searchTerm = (filterValue as string).toLowerCase();

    // If this is a parent row (has events)
    if (row.original.events) {
        // Check parent name
        if (row.original.name?.toLowerCase().includes(searchTerm)) {
            return true;
        }
        // Check children names
        return row.original.events.some((event) =>
            event.name?.toLowerCase().includes(searchTerm)
        );
    }

    // If this is a child row
    const rowData = row.original as any;
    return rowData.name?.toLowerCase().includes(searchTerm) ?? false;
};

/**
 * Filter that only searches child rows (ignores parent rows)
 * Used for standardCode and code columns
 */
export const childOnlyFilter: MRT_FilterFn<ActivityPlan> = (
    row,
    columnId,
    filterValue
) => {
    if (!filterValue) return true;

    const searchTerm = (filterValue as string).toLowerCase();

    // If this is a parent row (has events)
    if (row.original.events) {
        // Check children only
        return row.original.events.some((event) => {
            const value = (event as any)[columnId];
            return value && value.toLowerCase().includes(searchTerm);
        });
    }

    // If this is a child row
    const value = (row.original as any)[columnId];
    return value && value.toLowerCase().includes(searchTerm);
};
