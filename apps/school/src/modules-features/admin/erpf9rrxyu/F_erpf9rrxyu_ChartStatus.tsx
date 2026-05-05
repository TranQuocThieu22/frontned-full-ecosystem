import { BarChart } from '@mantine/charts'
import { Box, Flex, Paper, Text } from '@mantine/core'
import React from 'react'

export default function F_erpf9rrxyu_ChartStatus() {
    const data = [
        { month: 'Tháng 1', datatest1: 120, datatest2: 80 },
        { month: 'Tháng 2', datatest1: 150, datatest2: 95 },
    ];
    return (
        <Paper mt={20} p={20}>
            <Flex mt={20} justify={'space-between'}>
                <Box>
                    <Text>Biểu đồ tình trạng sức khỏe</Text>
                    <Flex mt={10}>
                        <Paper h={70} p={8} w={60}>Số lượng</Paper>
                        <Box style={{ flex: 1 }}>
                            <BarChart
                                h={300}
                                w={450}
                                data={data}
                                dataKey="month"
                                withLegend
                                series={[
                                    { name: 'datatest1', label: 'Sức khỏe tốt', color: 'violet.6' },
                                    { name: 'datatest2', label: 'sức khỏe bình thường', color: 'blue.6' },
                                ]}
                            />
                            <Paper mt={20} py={2} px={10} w={480}>
                                Tình trạng sức khỏe: Sức khỏe tốt, Bình thường, Cần theo dõi
                            </Paper>
                        </Box>
                    </Flex>
                </Box>
                <Box>
                    <Text>Biểu đồ trung bình chỉ số cơ thể</Text>
                    <Flex mt={10}>
                        <Paper h={90} p={8} w={60}>Trung bình số đo</Paper>
                        <Box>
                            <BarChart
                                h={300}
                                w={450}
                                data={data}
                                dataKey="month"
                                withLegend
                                series={[
                                    { name: 'datatest1', label: 'Chiều cao', color: 'violet.6' },
                                    { name: 'datatest2', label: 'Cân nặng', color: 'blue.6' },
                                ]}
                            />
                            <Paper mt={20} py={2} px={10} w={480}>Trung bình các chỉ số: Chiều cao, Cân nặng, BMI</Paper>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </Paper>
    )
}
