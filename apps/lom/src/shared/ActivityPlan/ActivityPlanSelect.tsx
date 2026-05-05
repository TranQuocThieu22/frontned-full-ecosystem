'use client';

import { ActivityPlan } from '@/interfaces/shared-interfaces/ActivityPlan';
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { CustomApiResponse } from '@aq-fe/core-ui/shared/libs/createBaseApi';
import { Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import useS_Shared_ActivityPlan from './useS_Shared_ActivityPlan';

export default function ActivityPlanSelect() {
    const activityPlanStore = useS_Shared_ActivityPlan();
    const activityPlanQuery = useCustomReactQuery({
        queryKey: ['activityPlanQuery'],
        axiosFn: () => baseAxios.get<CustomApiResponse<ActivityPlan[]>>(`/ActivityPlan/ActivityPlanOnlyGetAll`),
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
