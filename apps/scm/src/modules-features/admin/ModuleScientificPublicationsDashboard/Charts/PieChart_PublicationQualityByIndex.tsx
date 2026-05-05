"use client";

import { PieChart } from '@mantine/charts';
import { Box, Group, Paper, Text } from "@mantine/core";

const publicationQualityData = [
  { name: 'WoS', value: 45, color: '#1f77b4' },
  { name: 'Scopus', value: 30, color: '#ff7f0e' },
  { name: 'Trong nước', value: 20, color: '#2ca02c' },
  { name: 'Khác', value: 5, color: '#d62728' },
];

export default function PieChart_PublicationQualityByIndex() {
  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={700} fz={16} mb={8}>Tỷ lệ Công bố theo Chỉ mục</Text>

      <Box>
        <PieChart
          data={publicationQualityData}
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

        <Group justify="center" gap="md" mt={16}>
          {publicationQualityData.map((item, index) => (
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
              <Text fz={12} fw={500}>{item.name}</Text>
            </Group>
          ))}
        </Group>
      </Box>
    </Paper>
  );
} 