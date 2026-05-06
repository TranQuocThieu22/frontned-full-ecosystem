import { activityPlanService } from "@aq-fe/aq-legacy-framework/shared/APIs/activityPlanService";
import { CustomSelectAPI } from "@aq-fe/aq-legacy-framework/shared/components/withAPI/CustomSelectAPI";
import { useLegacyReactQuery } from "@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery";
import { ActivityPlan } from "@aq-fe/aq-legacy-framework/shared/interfaces/ActivityPlan";
import { useSemesterStore } from "./useSemesterStore";

export default function SemesterSelect() {
    const semesterQuery = useLegacyReactQuery<ActivityPlan[]>({
        queryKey: ["Semesters"],
        axiosFn: () => {
            return activityPlanService.activityPlanOnlyGetAll()
        },
    });
    const semesterStore = useSemesterStore()
    return (
        <CustomSelectAPI
            w={300}
            autoSelectFirst
            defaultSelectCondition={(item) => item.isCurrent == true}
            query={semesterQuery}
            value={semesterStore.state.semester?.id}
            onChange={(value, item) => semesterStore.setProperty("semester", item)}
        />
    )
}
