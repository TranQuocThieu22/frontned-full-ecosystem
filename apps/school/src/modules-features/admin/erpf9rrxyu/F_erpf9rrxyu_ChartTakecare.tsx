import { LineChart, PieChart } from '@mantine/charts'
import { Box, Flex, Paper, Text } from '@mantine/core'
import React from 'react'

export default function F_erpf9rrxyu_ChartTakecare() {
    const data2 = [
        { month: 'Tháng 1', datatest1: 120, datatest2: 80 },
        { month: 'Tháng 2', datatest1: 150, datatest2: 95 },
        { month: 'Tháng 3', datatest1: 100, datatest2: 95 },
        { month: 'Tháng 4', datatest1: 130, datatest2: 120 },
        { month: 'Tháng 5', datatest1: 125, datatest2: 100 },
        { month: 'Tháng 6', datatest1: 140, datatest2: 130 },
        { month: 'Tháng 7', datatest1: 160, datatest2: 150 },
    ];
    const pieData = [
        {
            name: 'datatest1',
            label: 'Nghỉ tại trường',
            value: data2.reduce((acc, cur) => acc + cur.datatest1, 0),
            color: 'violet.6',
        },
        {
            name: 'datatest2',
            label: 'Nghỉ tại nhà',
            value: data2.reduce((acc, cur) => acc + cur.datatest2, 0),
            color: 'blue.6',
        },
    ];
    return (
        <Paper mt={20} p={20}>
            <Flex mt={20} justify={'space-between'}>
                <Box>
                    <Text>Biểu đồ chắm sóc sức khỏe theo tháng</Text>
                    <Flex mt={10}>
                        <Paper h={70} p={8} w={60}>Số lượng</Paper>
                        <Box style={{ flex: 1 }}>
                            <LineChart
                                h={300}
                                w={450}
                                data={data2}
                                dataKey="month"
                                withLegend
                                series={[
                                    { name: 'datatest1', label: 'Đang chăm sóc', color: 'violet.6' },
                                    { name: 'datatest2', label: 'Nghỉ ngơi', color: 'blue.6' },
                                ]}
                            />
                            <Paper mt={20} py={2} px={10} w={480}>
                                Số lượng học sinh được chăm sóc sức khỏe
                            </Paper>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                    <Text>Biểu đồ tỷ lệ đề nghị y tế sau chăm sóc sức khỏe</Text>
                    <Flex mt={10}>
                        <Paper h={40} p={8} w={60}>Tỷ lệ</Paper>
                        <Box>
                            <PieChart
                                h={300}
                                w={450}
                                data={pieData}
                                withTooltip
                            />
                            <Paper mt={20} py={2} px={10} w={480}>
                                Loại đề nghị: Nghỉ ngơi tại trường, Phụ huynh đón về, Chuyển viện, Khám phá chuyên khoa, Phòng dịch bệnh
                            </Paper>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Paper>
    )
}
