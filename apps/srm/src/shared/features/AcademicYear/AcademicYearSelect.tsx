'use client';

import { academicYearService } from '@/shared/APIs/academicYearService';
import { Tooltip } from '@mantine/core';

import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { useCustomReactQuery } from '@aq-fe/core-ui/shared/hooks/useCustomReactQuery';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from 'react';
import useAcademicYearStore from './useAcademicYearStore';

export default function AcademicYearSelect() {
    const isDesktop = useMediaQuery("(min-width: 72em)");
    const academicYearStore = useAcademicYearStore();
    const academicYearQuery = useCustomReactQuery({
        queryKey: ['academicYearQuery'],
        axiosFn: () => academicYearService.academicGetAll(),
        options: {
            select: (data) => {
                return data.filter(item => item.id != 0)
            }
        }

    });
    useEffect(() => {
        const plans = academicYearQuery.data;
        if (!plans) return;

        const current = plans.find((p) => p.isCurrent === true);
        if (!current) academicYearStore.setProperty('academicYear', plans[0])
        else academicYearStore.setProperty('academicYear', current)

    }, [academicYearQuery.data]);
    const handleChange = (value: string | null) => {
        const plan = academicYearQuery.data?.find(
            (p) => String(p.id) === value
        );
        academicYearStore.setProperty('academicYear', plan)

    };
    return (
        <Tooltip label="Năm làm việc">
            <CustomSelect
                w={isDesktop ? 250 : 150}
                isLoading={academicYearQuery.isLoading}
                data={
                    (academicYearQuery.data ?? []).map((p) => ({
                        label: p.name ?? '',
                        value: String(p.id),
                    }))
                }
                value={
                    academicYearStore.state.academicYear?.id?.toString()

                }
                onChange={handleChange}
                placeholder="Chọn năm làm việc"
                clearable={false}
            />
        </Tooltip>
    );
}
