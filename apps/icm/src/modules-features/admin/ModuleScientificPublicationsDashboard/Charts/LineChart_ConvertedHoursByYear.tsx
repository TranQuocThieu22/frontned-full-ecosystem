"use client";

import { LineChart } from '@mantine/charts';
import { Paper, Text } from "@mantine/core";

const convertedHoursData = [
  {
    year: '2015',
    'Q1/Scopus/WoS': 2.8,
    'Quốc gia': 1.4,
    'Quốc tế khác': 0.6,
    'Hội nghị': 1.2,
  },
  {
    year: '2016',
    'Q1/Scopus/WoS': 3.2,
    'Quốc gia': 1.8,
    'Quốc tế khác': 0.9,
    'Hội nghị': 1.5,
  },
  {
    year: '2017',
    'Q1/Scopus/WoS': 4.1,
    'Quốc gia': 2.3,
    'Quốc tế khác': 1.1,
    'Hội nghị': 1.9,
  },
  {
    year: '2018',
    'Q1/Scopus/WoS': 5.1,
    'Quốc gia': 3.1,
    'Quốc tế khác': 1.5,
    'Hội nghị': 2.4,
  },
  {
    year: '2019',
    'Q1/Scopus/WoS': 6.3,
    'Quốc gia': 3.9,
    'Quốc tế khác': 1.8,
    'Hội nghị': 2.9,
  },
  {
    year: '2020',
    'Q1/Scopus/WoS': 7.5,
    'Quốc gia': 4.8,
    'Quốc tế khác': 2.3,
    'Hội nghị': 3.5,
  },
  {
    year: '2021',
    'Q1/Scopus/WoS': 8.9,
    'Quốc gia': 5.8,
    'Quốc tế khác': 2.9,
    'Hội nghị': 4.5,
  },
  {
    year: '2022',
    'Q1/Scopus/WoS': 10.5,
    'Quốc gia': 6.9,
    'Quốc tế khác': 3.5,
    'Hội nghị': 5.6,
  },
  {
    year: '2023',
    'Q1/Scopus/WoS': 11.9,
    'Quốc gia': 8.1,
    'Quốc tế khác': 4.2,
    'Hội nghị': 6.7,
  },
  {
    year: '2024',
    'Q1/Scopus/WoS': 12.9,
    'Quốc gia': 9.3,
    'Quốc tế khác': 5.0,
    'Hội nghị': 7.4,
  },
];

export default function LineChart_ConvertedHoursByYear() {
  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={500} mb={16}>Giờ Quy Đổi theo Năm</Text>
      <LineChart
        h={350}
        data={convertedHoursData}
        dataKey="year"
        series={[
          { name: 'Q1/Scopus/WoS', color: 'blue.6' },
          { name: 'Quốc gia', color: 'green.6' },
          { name: 'Quốc tế khác', color: 'orange.6' },
          { name: 'Hội nghị', color: 'red.6' },
        ]}
        curveType="natural"
        strokeWidth={2}
        dotProps={{ r: 4, strokeWidth: 2 }}
        yAxisProps={{
          label: { value: 'Tăng số giờ (1000)', angle: -90, position: 'insideLeft' }
        }}
        xAxisProps={{
          label: { value: '', position: 'insideBottom', offset: -5 }
        }}
        gridAxis="xy"
        withLegend
        legendProps={{ verticalAlign: 'bottom', height: 50 }}
      />
    </Paper>
  );
} 