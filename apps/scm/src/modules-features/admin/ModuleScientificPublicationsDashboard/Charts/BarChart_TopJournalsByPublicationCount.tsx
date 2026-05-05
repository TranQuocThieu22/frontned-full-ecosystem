"use client";

import { BarChart } from '@mantine/charts';
import { Paper, Text, useMantineColorScheme } from "@mantine/core";

const topJournalsData = [
  { journal: 'IEEE Access', count: 45 },
  { journal: 'Springer Nature', count: 38 },
  { journal: 'Tạp chí Khoa học và Công nghệ (Trong nước)', count: 30 },
  { journal: 'Elsevier', count: 27 },
  { journal: 'Nhà xuất bản Giáo dục Việt Nam', count: 22 },
  { journal: 'Journal of Intelligent Systems', count: 18 },
  { journal: 'Kỷ yếu Hội nghị Quốc tế về AI & Robotics', count: 15 },
];

export default function BarChart_TopJournalsByPublicationCount() {
  const colorTheme = useMantineColorScheme()

  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={700} fz={16} mb={8}>Top 10 Tạp chí/Nhà xuất bản có nhiều Công bố nhất</Text>
      <BarChart
        barProps={{
          label: {
            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'muted',
            fontSize: 12,
            position: 'right',
            value: 'amount',
          }
        }}
        h={350}
        data={topJournalsData}
        maxBarWidth={20}
        dataKey="journal"
        series={[
          { name: 'count', color: 'orange.6', label: 'Số lượng' },
        ]}
        orientation="vertical"
        yAxisProps={{
          width: 200,
          fontSize: 11
        }}
        xAxisLabel="Số lượng"
        yAxisLabel="Danh sách tạp chí/NXB"
        withTooltip
        tooltipAnimationDuration={200}
        gridAxis="x"
        tickLine="x"
      />
    </Paper>
  );
} 