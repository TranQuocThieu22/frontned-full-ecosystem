import { service_activityPlan } from "@/api/services/service_activityPlan";
import { CustomActionIconDelete } from "@aq-fe/core-ui/shared/components/button/CustomActionIconDelete";

export default function SemesterDeleteButton({ id, code }: { id: number, code: string }) {
    return (
        <CustomActionIconDelete contextData={code} onSubmit={() => {
            service_activityPlan.delete(id)
        }} />
    );
}
