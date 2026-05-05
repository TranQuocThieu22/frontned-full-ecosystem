import { useMemo } from "react";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { Event } from "@/interfaces/event";

interface UseFilteredActivityPlansOptions {
    data: ActivityPlan[] | undefined;
    hideRequired?: boolean;
}

export const useFilteredActivityPlans = ({
    data,
    hideRequired = false,
}: UseFilteredActivityPlansOptions): ActivityPlan[] => {
    return useMemo(() => {
        if (!data) return [];
        if (!hideRequired) return data;

        return data
            .filter((row) => {
                const event = row as Event;
                return !event.isRequired;
            })
            .map((row) => ({
                ...row,
                events: row.events?.filter((event) => !(event as Event).isRequired) || [],
            }));
    }, [data, hideRequired]);
};
