"use client";

import { BarChart } from '@mantine/charts';
import { Paper, Text, useMantineColorScheme } from "@mantine/core";

const quarterlyPublicationData = [
  {
    year: '2020',
    Q1: 3,
    Q2: 2,
    Q3: 2,
    Q4: 1,
  },
  {
    year: '2021',
    Q1: 4,
    Q2: 3,
    Q3: 2,
    Q4: 2,
  },
  {
    year: '2022',
    Q1: 5,
    Q2: 4,
    Q3: 3,
    Q4: 2,
  },
  {
    year: '2023',
    Q1: 4,
    Q2: 5,
    Q3: 4,
    Q4: 3,
  },
  {
    year: '2024',
    Q1: 5,
    Q2: 4,
    Q3: 4,
    Q4: 4,
  },
];

export default function BarChart_QuarterlyPublicationByYear() {
  const colorTheme = useMantineColorScheme()

  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={700} fz={16} mb={32}>Số lượng Bài báo Q1/Q2/Q3/Q4 theo Năm</Text>
      <BarChart
        h={300}
        data={quarterlyPublicationData}
        dataKey="year"
        series={[
          { name: 'Q1', color: 'blue.6' },
          { name: 'Q2', color: 'green.6' },
          { name: 'Q3', color: 'orange.6' },
          { name: 'Q4', color: 'red.6' },
        ]}
        yAxisProps={{
          label: { value: 'Số lượng (1 - 5)', angle: -90, position: 'insideLeft' }
        }}
        withLegend
        legendProps={{ verticalAlign: 'bottom', height: 50 }}
        tickLine="xy"
        gridAxis="xy"
        barProps={{
          label: {
            formatter: (value: number) =>
              value
            ,
            position: 'top',
            value: 'amount',
            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'muted',
          }
        }}
      />
    </Paper>
  );
} 