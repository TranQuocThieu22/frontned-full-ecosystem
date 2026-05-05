import MySelect from '@/components/Combobox/Select/MySelect'
import { BarChart, LineChart } from '@mantine/charts'
import { Box, Flex, Group, Paper, Text } from '@mantine/core'
import React from 'react'

export default function F_erpf9rrxyu_ChartIndex() {
    const data2 = [
        { month: 'Tháng 1', datatest1: 120, datatest2: 80 },
        { month: 'Tháng 2', datatest1: 150, datatest2: 95 },
        { month: 'Tháng 3', datatest1: 100, datatest2: 95 },
        { month: 'Tháng 4', datatest1: 130, datatest2: 120 },
        { month: 'Tháng 5', datatest1: 125, datatest2: 100 },
        { month: 'Tháng 6', datatest1: 140, datatest2: 130 },
        { month: 'Tháng 7', datatest1: 160, datatest2: 150 },
    ];
    return (
        <Paper mt={20} p={20}>
            <Box>
                <Group>
                    <Text>Biểu đồ chỉ số cơ thể trong suất quá trình học theo học kỳ của học sinh </Text>
                    <MySelect
                        w={250}
                        placeholder='Tô Ngọc Lâm - 01/15/2000'
                        defaultValue={'Tô Ngọc Lâm - 01/15/2000'}
                        data={["Tô Ngọc Lâm - 01/15/2000", "Nguyễn Văn A - 01/15/2000", "Nguyễn Văn B - 01/15/2000"]}
                        clearable
                    />
                </Group>
                <Flex mt={10}>
                    <Paper h={70} p={8} w={60}>Chỉ số đo</Paper>
                    <Box style={{ flex: 1 }}>
                        <LineChart
                            h={300}
                            data={data2}
                            dataKey="month"
                            withLegend
                            series={[
                                { name: 'datatest1', label: 'Chiều cao', color: 'violet.6' },
                                { name: 'datatest2', label: 'Cân nặng', color: 'blue.6' },
                            ]}
                        />
                        <Paper mt={20} py={2} px={10} w={480}>
                            Chỉ số: Chiều cao, Cân nặng, BMI
                        </Paper>
                    </Box>
                </Flex>
            </Box>
        </Paper>
    )
}
