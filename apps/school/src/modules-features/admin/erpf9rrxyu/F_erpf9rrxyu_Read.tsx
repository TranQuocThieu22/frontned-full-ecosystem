import MySelect from '@/components/Combobox/Select/MySelect'
import { AreaChart, BarChart, LineChart, PieChart } from '@mantine/charts';
import { Box, Flex, Group, Paper, Text } from '@mantine/core'
import React from 'react'
import F_erpf9rrxyu_ChartTakecare from './F_erpf9rrxyu_ChartTakecare';
import F_erpf9rrxyu_ChartStatus from './F_erpf9rrxyu_ChartStatus';
import F_erpf9rrxyu_ChartIndex from './F_erpf9rrxyu_ChartIndex';

export default function F_erpf9rrxyu_Read() {
    return (
        <Paper p={20}>
            <Group>
                <Text>Chọn lớp</Text>
                <MySelect
                    w={100}
                    placeholder='10A2'
                    defaultValue={'10A2'}
                    data={["10A2", "11C2", "12D2"]}
                    clearable
                />
            </Group>
            <F_erpf9rrxyu_ChartStatus />
            <F_erpf9rrxyu_ChartTakecare />
            <F_erpf9rrxyu_ChartIndex />
        </Paper>
    )
}
