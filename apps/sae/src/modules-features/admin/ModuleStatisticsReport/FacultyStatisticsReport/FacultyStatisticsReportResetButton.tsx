import { service_ranking } from '@/api/services/service_ranking'
import useS_Shared_ActivityPlan from '@/shared/features/ActivityPlan/useS_Shared_ActivityPlan'
import { CustomButton } from '@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton'
import { useCustomReactMutation } from '@aq-fe/core-ui/shared/hooks/useCustomReactMutation'
import React from 'react'

export default function FacultyStatisticsReportResetButton() {
    const activityPlanStore = useS_Shared_ActivityPlan()
    const mutation = useCustomReactMutation({
        axiosFn: () => service_ranking.DeleteTemporaryStudentPoints({
            id: activityPlanStore.state.ActivityPlan?.id
        }),
        successNotification: "Reset dữ liệu thành công!"
    })
    return (
        <CustomButton
            color='green'
            loading={mutation.isPending}
            onClick={() => mutation.mutate()}
        >
            Reset
        </CustomButton>
    )
}
