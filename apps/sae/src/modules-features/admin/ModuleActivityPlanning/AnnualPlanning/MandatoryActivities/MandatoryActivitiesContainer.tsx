'use client'

import { service_standard } from "@/api/services/service_standard";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { Card, Group, Stack, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import MandatoryActivitiesTable from "./MandatoryActivitiesTable";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function MandatoryActivitiesContainer() {
    const [fixedActivityPointRatio, setFixedActivityPointRatio] = useState<string>("0/0")

    const standandSelect = useState<number | undefined>(undefined)
    const Q_Standard = useCustomReactQuery({
        queryKey: ["MandatoryActivitiesContainer", "Standard", "GetAll"],
        axiosFn: () => service_standard.getAll(),
    });

    return (
        <CustomFieldset title="Lập kế hoạch năm mới - Hoạt động bắt buộc cấp Trường">
            <Stack gap="xs">
                <Tabs>
                    <Tabs.List>
                        <Tabs.Tab value="all" onClick={() => standandSelect[1](undefined)} >
                            Tất cả
                        </Tabs.Tab>
                        {Q_Standard && Q_Standard.data?.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)).map((item, index) => (
                            <Tabs.Tab key={item.code} value={item.id?.toString() || ''}
                                onClick={() => { item.id !== undefined && standandSelect[1](item.id) }}
                            >
                                {'Điều ' + (index + 1)}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                    {Q_Standard && Q_Standard.data?.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)).map((item) => (
                        <Tabs.Panel mt={10} key={item.id} value={item.id?.toString() || ''}>
                            <Card bg="var(--mantine-color-cyan-1)" shadow="sm" fz={'sm'} padding="sm" radius="md" withBorder>
                                <Group gap={8}>
                                    <Text fz={'sm'} fw={'bold'} c="#055160">Điều:</Text>
                                    <Text fz={'sm'} c="#055160">{item.name}</Text>
                                </Group>
                                <Group gap={8}>
                                    <Text fz={'sm'} fw={'bold'} c="#055160">Điểm:</Text>
                                    <Text fz={'sm'} c="#055160">{item.maxPoint}</Text>
                                </Group>
                                <Group gap={8}>
                                    <Text fz={'sm'} fw={'bold'} c="#055160">Tỉ lệ Điểm Hoạt Động cố định:</Text>
                                    <Text fz={'sm'} c="#055160">{fixedActivityPointRatio}</Text>
                                </Group>
                            </Card>
                        </Tabs.Panel>
                    ))}
                </Tabs>
                <MandatoryActivitiesTable standardId={standandSelect[0]} setFixedActivityPointRatio={setFixedActivityPointRatio} />
            </Stack>
        </CustomFieldset>
    );
}
