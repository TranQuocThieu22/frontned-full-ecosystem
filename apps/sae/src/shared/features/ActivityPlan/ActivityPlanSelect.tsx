'use client';

import { service_activityPlan } from '@/api/services/service_activityPlan';
import { Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import useS_Shared_ActivityPlan from './useS_Shared_ActivityPlan';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';

export default function ActivityPlanSelect() {
    const activityPlanStore = useS_Shared_ActivityPlan();
    const activityPlanQuery = useCustomReactQuery({
        queryKey: ['activityPlanQuery'],
        axiosFn: () => service_activityPlan.getActivityPlans(),
    });
    useEffect(() => {
        const plans = activityPlanQuery.data;
        if (!plans) return;

        const current = plans.find((p) => p.isCurrent === true);
        activityPlanStore.setProperty('ActivityPlan', current)
    }, [activityPlanQuery.data]);
    const handleChange = (value: string | null) => {
        const plan = activityPlanQuery.data?.find(
            (p) => String(p.id) === value
        );
        activityPlanStore.setProperty('ActivityPlan', plan)

    };
    return (
        <Tooltip label="Năm học học kỳ">
            <CustomSelect
                w={250}
                isLoading={activityPlanQuery.isLoading}
                data={
                    (activityPlanQuery.data ?? []).map((p) => ({
                        label: p.name ?? '',
                        value: String(p.id),
                    }))
                }
                value={
                    activityPlanStore.state.ActivityPlan?.id?.toString()

                }
                onChange={handleChange}
                placeholder="Chọn năm học học kỳ"
                clearable={false}
            />
        </Tooltip>
    );
}
