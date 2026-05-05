"use client";

import { PieChart } from '@mantine/charts';
import { Box, Group, Paper, Text } from "@mantine/core";

const publicationTypeData = [
  { name: 'Bài báo tạp chí', value: 50, color: '#1f77b4' },
  { name: 'Báo cáo hội nghị', value: 25, color: '#ff7f0e' },
  { name: 'Sách chuyên khảo', value: 15, color: '#2ca02c' },
  { name: 'Giáo trình', value: 7, color: '#d62728' },
  { name: 'Bằng sáng chế', value: 3, color: '#9467bd' },
];

export default function PieChart_PublicationTypeDistribution() {
  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={700} fz={16} mb={8}>Tỷ lệ Công bố theo Loại</Text>

      <Box>
        <PieChart
          h={300}
          data={publicationTypeData}
          mx="auto"
          withLabelsLine
          withLabels
          labelsPosition="outside"
          labelsType="percent"
          withTooltip
          tooltipDataSource="segment"
          strokeWidth={0}
          startAngle={90}
          endAngle={-270}
          size={240}
          pieProps={{
            cx: '50%',
            cy: '50%',
            innerRadius: 0,
            outerRadius: 80,
          }}
        />

        <Group justify="center" gap="md" mt={16} wrap="wrap">
          {publicationTypeData.map((item, index) => (
            <Group key={index} wrap="nowrap" gap="xs">
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: item.color,
                  borderRadius: '50%',
                  flexShrink: 0
                }}
              ></div>
              <Text fz={11} fw={500}>{item.name}</Text>
            </Group>
          ))}
        </Group>
      </Box>
    </Paper>
  );
} 