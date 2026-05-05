import { activityPlanService } from "../../APIs/activityPlanService";
import { CustomSelectAPI } from "../../components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "../../hooks/useCustomReactQuery";
import { ActivityPlan } from "../../interfaces/ActivityPlan";
import { useSemesterStore } from "./useSemesterStore";

export default function SemesterSelect() {
    const semesterQuery = useCustomReactQuery<ActivityPlan[]>({
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
