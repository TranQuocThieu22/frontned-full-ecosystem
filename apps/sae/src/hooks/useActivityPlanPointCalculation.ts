import { useEffect } from "react";
import { ActivityPlan } from "@/interfaces/activityPlan";
import { Event } from "@/interfaces/event";

interface UseActivityPlanPointCalculationOptions {
    data: ActivityPlan[] | undefined;
    hideRequired: boolean;
    onPointsCalculated: (ratio: string) => void;
}

/**
 * Calculates total min/max points from required activities
 * and calls the callback with the formatted ratio
 */
export const useActivityPlanPointCalculation = ({
    data,
    hideRequired,
    onPointsCalculated,
}: UseActivityPlanPointCalculationOptions) => {
    useEffect(() => {
        // Don't calculate if we're not hiding required activities
        if (!hideRequired || !data) {
            return;
        }

        let totalMinPoint = 0;
        let totalMaxPoint = 0;

        data.forEach((row) => {
            row.events?.forEach((event) => {
                const evt = event as Event;
                // Only count required activities
                if (evt.isRequired) {
                    totalMinPoint += evt.minPoint || 0;
                    totalMaxPoint += evt.maxPoint || 0;
                }
            });
        });

        onPointsCalculated(`${totalMinPoint}/${totalMaxPoint}`);
    }, [data, hideRequired, onPointsCalculated]);
};
