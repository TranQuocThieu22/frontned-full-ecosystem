"use client";

import { LineChart } from '@mantine/charts';
import { Paper, Text } from "@mantine/core";

const publicationCountData = [
  {
    year: '2015',
    'Q1/Scopus/WoS': 45,
    'Quốc gia': 28,
    'Quốc tế khác': 15,
    'Hội nghị': 35,
  },
  {
    year: '2016',
    'Q1/Scopus/WoS': 52,
    'Quốc gia': 35,
    'Quốc tế khác': 22,
    'Hội nghị': 42,
  },
  {
    year: '2017',
    'Q1/Scopus/WoS': 68,
    'Quốc gia': 45,
    'Quốc tế khác': 28,
    'Hội nghị': 55,
  },
  {
    year: '2018',
    'Q1/Scopus/WoS': 85,
    'Quốc gia': 62,
    'Quốc tế khác': 38,
    'Hội nghị': 68,
  },
  {
    year: '2019',
    'Q1/Scopus/WoS': 105,
    'Quốc gia': 78,
    'Quốc tế khác': 45,
    'Hội nghị': 82,
  },
  {
    year: '2020',
    'Q1/Scopus/WoS': 125,
    'Quốc gia': 95,
    'Quốc tế khác': 58,
    'Hội nghị': 98,
  },
  {
    year: '2021',
    'Q1/Scopus/WoS': 148,
    'Quốc gia': 115,
    'Quốc tế khác': 72,
    'Hội nghị': 125,
  },
  {
    year: '2022',
    'Q1/Scopus/WoS': 175,
    'Quốc gia': 138,
    'Quốc tế khác': 88,
    'Hội nghị': 155,
  },
  {
    year: '2023',
    'Q1/Scopus/WoS': 198,
    'Quốc gia': 162,
    'Quốc tế khác': 105,
    'Hội nghị': 185,
  },
  {
    year: '2024',
    'Q1/Scopus/WoS': 215,
    'Quốc gia': 185,
    'Quốc tế khác': 125,
    'Hội nghị': 205,
  },
];

export default function LineChart_PublicationCountByYear() {
  return (
    <Paper p="md" shadow="sm" radius="md" h={450}>
      <Text fw={500} mb={16}>Số lượng Công bố theo Năm</Text>
      <LineChart
        h={350}
        data={publicationCountData}
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
          label: { value: 'Số lượng', angle: -90, position: 'insideLeft' }
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