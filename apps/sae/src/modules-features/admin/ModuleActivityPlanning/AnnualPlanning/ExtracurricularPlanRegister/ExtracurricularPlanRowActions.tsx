import { ActivityPlan } from "@/interfaces/activityPlan";
import { Event } from "@/interfaces/event";
import { CustomCenterFull } from "@aq-fe/core-ui/shared/components/layout/CustomCenterFull";
import { Text } from "@mantine/core";
import { useActivityPlanPermissions } from "@/hooks/useActivityPlanPermissions";
import ExtracurricularPlanRegisterCreateUpdateModal from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/ExtracurricularPlanRegister/CreateUpdate/ExtracurricularPlanRegisterCreateUpdateModal";
import ExtracurricularPlanRegisterDeleteButton from "@/modules-features/admin/ModuleActivityPlanning/AnnualPlanning/ExtracurricularPlanRegister/Delete/ExtracurricularPlanRegisterDeleteButton";

interface ExtracurricularPlanRowActionsProps {
    activityPlan: ActivityPlan;
    isLoading: boolean;
}

export const ExtracurricularPlanRowActions = ({
    activityPlan,
    isLoading,
}: ExtracurricularPlanRowActionsProps) => {
    const permissions = useActivityPlanPermissions(activityPlan);

    if (activityPlan.events) return null;

    if (!permissions.canEdit) {
        return (
            <CustomCenterFull>
                <Text c="dimmed" size="sm">
                    Hoạt động của đơn vị tổ chức khác
                </Text>
            </CustomCenterFull>
        );
    }

    const event = activityPlan as Event;

    return (
        <CustomCenterFull>
            <ExtracurricularPlanRegisterCreateUpdateModal
                values={activityPlan}
                futurePlanId={event.futurePlanId || 0}
                loadingActionIcon={isLoading}
            />
            <ExtracurricularPlanRegisterDeleteButton
                code={activityPlan.code!}
                id={activityPlan.id!}
                loading={isLoading}
            />
        </CustomCenterFull>
    );
};
