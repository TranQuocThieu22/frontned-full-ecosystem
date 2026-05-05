
import { Group, Text } from '@mantine/core';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { duAn: 'Dự án A', duKien: 5000000000, thucTe: 3500000000 },
    { duAn: 'Dự án B', duKien: 3000000000, thucTe: 2800000000 },
];


export default function ProjectBudgetProgressBarChar() {
    return (
        <>
            <Text fw={500} mb={10}>Tiến độ Ngân sách Dự án</Text>
            <Group gap={0} align='flex-start' wrap='nowrap'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ bottom: 50, top: 20 }}>
                        <CartesianGrid horizontal={true} vertical={false} stroke="#eee" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="duAn"
                            interval={0}
                            tick={{ fontSize: 13, fontWeight: 500 }}
                        />
                        <YAxis
                            tick={{ fontSize: 13 }}
                            tickFormatter={formatVietnameseNumber}
                            label={{
                                value: 'Số tiền',
                                angle: -90,
                                position: 'insideLeft',
                                offset: 10,
                                style: { textAnchor: 'middle', fontSize: 14, fontWeight: 500 },
                            }}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => {
                                const labelMap: Record<string, string> = {
                                    duKien: 'Dự kiến',
                                    thucTe: 'Thực tế',
                                };
                                return [`${formatVietnameseNumber(Number(value))}`, labelMap[name] ?? name];
                            }}
                        />
                        <Bar dataKey="duKien" fill="rgba(0, 143, 251, 0.85)" label={<CustomBarLabel />} />
                        <Bar dataKey="thucTe" fill="var(--mantine-color-green-6)" label={<CustomBarLabel />} />
                    </BarChart>
                </ResponsiveContainer>
            </Group>
        </>
    )
}

const CustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
        <text
            x={x + width / 2}
            y={y - 8}
            fill="#000"
            textAnchor="middle"
            fontSize={12}
            fontWeight={500}
        >
            {formatVietnameseNumber(value)}
        </text>
    );
};


function formatVietnameseNumber(value: number): string {
    if (value >= 1_000_000_000_000) {
        return (value / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + ' ngàn';
    } else if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + ' tỷ';
    } else if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' triệu';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(1).replace(/\.0$/, '') + ' nghìn';
    } else {
        return value.toString();
    }
}
