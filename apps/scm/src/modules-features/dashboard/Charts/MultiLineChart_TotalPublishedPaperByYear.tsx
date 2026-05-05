import { LineChart } from '@mantine/charts';
import { Group, Paper, Text } from '@mantine/core';

const data = [
    {
        year: '2020',
        scie: 612,
        ssci: 423,
        scopus: 252,
        quocgia: 234,
    },
    {
        year: '2021',
        scie: 634,
        ssci: 412,
        scopus: 123,
        quocgia: 382,
    },
    {
        year: '2022',
        scie: 723,
        ssci: 234,
        scopus: 512,
        quocgia: 423,
    },
    {
        year: '2023',
        scie: 812,
        ssci: 723,
        scopus: 834,
        quocgia: 512,
    },
    {
        year: '2024',
        scie: 1020,
        ssci: 823,
        scopus: 557,
        quocgia: 168,
    },
];

interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            {/* <Text fw={500} mb={5}>
                {isNaN(Date.parse(label)) ? label : new Date(label.replace(/(\d{2})\/(\d{2})/, '20$2-$1')).toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
            </Text> */}
            {payload.map((item: any) => (
                <Text key={item.name} fz="sm" c={item.color}>
                    {item.name === 'scie' ? 'SCIE' : item.name === 'ssci' ? 'SSCI' : item.name === 'scopus' ? 'Scopus' : 'Quốc gia'}: {item.value}
                </Text>
            ))}
        </Paper>
    );
}

export default function MultiLineChart_TotalPublishedPaperByYear() {
    return (
        <>
            <Group>
                <Text mb={"50"}>Xu hướng bài báo công bố qua các năm</Text>
                <LineChart
                    w={"100%"}
                    h={280}
                    data={data}
                    dataKey="year"
                    series={[
                        { name: 'scie', color: '#59a89c' },
                        { name: 'ssci', color: '#f0c571' },
                        { name: 'scopus', color: '#e02b35' },
                        { name: 'quocgia', color: '#082a54' },

                    ]}
                    tooltipProps={{
                        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                    }}
                    curveType="linear"
                    yAxisLabel="Số lượng bài báo"
                    tickLine="y"
                />
            </Group>
        </>
    );
}