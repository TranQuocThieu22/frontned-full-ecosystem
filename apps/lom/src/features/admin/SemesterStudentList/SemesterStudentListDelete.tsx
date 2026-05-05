import { service_studentActivityPlan } from "@/api/services/service_studentActivityPlan";
import useS_Shared_ActivityPlan from "@/shared/ActivityPlan/useS_Shared_ActivityPlan";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";
import { useQueryClient } from "@tanstack/react-query";

export default function SemesterStudentListDelete({ id, code }: { id: number, code: string }) {
    const queryClient = useQueryClient()
    const activityPlanStore = useS_Shared_ActivityPlan()
    return (
        <CustomActionIconDelete
            onSubmit={async () => {
                const res = await service_studentActivityPlan.delete(id)
                queryClient.refetchQueries()
                return res
            }}
            contextData={code}
        />
    );
}