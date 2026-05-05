"use client";

import { BarChart } from '@mantine/charts';
import { Group, Paper, Text, useMantineColorScheme } from "@mantine/core";

const publicationByFieldData = [
  { field: 'AI', count: 8 },
  { field: 'Vật liệu mới', count: 5 },
  { field: 'Y học có truyền', count: 4 },
  { field: 'Năng lượng tái tạo', count: 3 },
  { field: 'Khác', count: 3 },
];

export default function BarChart_PublicationCountByField() {
  const colorTheme = useMantineColorScheme()

  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={700} fz={16} mb={8}>Tổng số Công bố theo Lĩnh vực</Text>
      <BarChart
        barProps={{
          label: {
            fill: colorTheme.colorScheme === 'dark' ? 'gray' : 'muted',
            fontSize: 12,
            position: 'top',
            value: 'amount',
          }
        }}
        data={publicationByFieldData}
        dataKey="field"
        gridAxis="x"
        h={320}
        maxBarWidth={20}
        orientation="vertical"
        series={[
          { name: 'count', color: 'green.6', label: 'Số lượng' },
        ]}
        tickLine="x"
        tooltipAnimationDuration={200}
        withTooltip
        xAxisProps={{ domain: [0, 100], orientation: 'bottom', tickCount: 11 }}
        yAxisProps={{
          width: 120,
          fontSize: 12
        }}
        xAxisLabel="Số lượng"
        yAxisLabel="Danh sách lĩnh vực"
      />
      <Group justify="center" gap="lg" mt={16}>
        {publicationByFieldData.map((item, index) => (
          <Group key={index} wrap="nowrap" gap="xs">
            <Text fz={11} fw={500}>{item.field} ({item.count})</Text>
          </Group>
        ))}
      </Group>
    </Paper>
  );
} 