"use client";

import { BarChart } from '@mantine/charts';
import { Paper, Text, useMantineColorScheme } from "@mantine/core";

const topFieldsData = [
  { field: 'Khoa học Máy tính & AI', hours: 2500 },
  { field: 'Kỹ thuật Điện tử & Viễn thông', hours: 1800 },
  { field: 'Y Dược & Khoa học Sức khỏe', hours: 1500 },
  { field: 'Quản trị Kinh doanh & Kinh tế', hours: 1200 },
  { field: 'Khoa học Vật liệu', hours: 900 },
];

export default function BarChart_TopFieldsByConvertedHours() {
  const colorTheme = useMantineColorScheme()

  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={700} fz={16} mb={8}>Top 10 Lĩnh vực có nhiều Giờ Quy Đổi nhất</Text>
      <BarChart
        barProps={{
          label: {
            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'muted',
            fontSize: 12,
            position: 'top',
            value: 'amount',
          }
        }}
        data={topFieldsData}
        dataKey="field"
        gridAxis="x"
        h={380}
        maxBarWidth={20}
        orientation="vertical"
        series={[
          { name: 'hours', color: 'blue.6', label: 'Giờ Quy Đổi' },
        ]}
        tickLine="x"
        tooltipAnimationDuration={200}
        withTooltip
        xAxisLabel="Giờ Quy Đổi"
        xAxisProps={{ domain: [0, 4000], orientation: 'bottom', tickCount: 11 }}
        yAxisLabel="Danh sách lĩnh vực"
        yAxisProps={{
          fontSize: 12,
          width: 150
        }}
      />
    </Paper>
  );
} 