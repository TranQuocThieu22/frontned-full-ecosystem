import { ActivityPlan } from "@/interfaces/activityPlan";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import StudentAffairsOfficeActivityCreateUpdateModal from "./CreateUpdate/StudentAffairsOfficeActivityCreateUpdateModal";
import ExtracurricularPlanInfoDeleteButton from "./Delete/ExtracurricularPlanInfoDeleteButton";

interface StudentAffairsOfficeRowActionsProps {
    activityPlan: ActivityPlan;
    isLoading: boolean;
}

export const StudentAffairsOfficeRowActions = ({
    activityPlan,
    isLoading,
}: StudentAffairsOfficeRowActionsProps) => {
    if (activityPlan.events) return null;

    return (
        <CustomCenterFull>
            <StudentAffairsOfficeActivityCreateUpdateModal
                values={activityPlan}
                futurePlanId={activityPlan.id!}
                loadingActionIcon={isLoading}
            />
            <ExtracurricularPlanInfoDeleteButton
                code={activityPlan.code!}
                id={activityPlan.id!}
                loading={isLoading}
            />
        </CustomCenterFull>
    );
};
