
import { Group, Text } from '@mantine/core';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { type: 'Bài báo', count: 20 },
    { type: 'Bằng sáng chế', count: 5 },
    { type: 'Phần mềm', count: 3 },
    { type: 'Báo cáo', count: 15 },
];


export default function OutputsByTypeBarChar() {
    return (
        <>
            <Text fw={500} mb={10}>Số lượng kết quả đầu ra theo loại hình</Text>
            <Group gap={0} align='flex-start' wrap='nowrap'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ bottom: 50, top: 20 }}>
                        <CartesianGrid horizontal={true} vertical={false} stroke="#eee" strokeDasharray="3 3" />
                        <XAxis dataKey="type" interval={0} tick={{ fontSize: 13, fontWeight: 500 }} />
                        <YAxis
                            tick={{ fontSize: 13 }}
                            label={{
                                value: 'Số lượng',
                                angle: -90,
                                position: 'insideLeft',
                                offset: 10,
                                style: { textAnchor: 'middle', fontSize: 14, fontWeight: 500 },
                            }}
                        />
                        <Tooltip
                            formatter={(value, name) => {
                                return [`${value}`, "Số lượng"];
                            }}
                        />
                        <Bar dataKey="count" fill="rgba(0, 143, 251, 0.85)" label={<CustomBarLabel />} />
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
            {value}
        </text>
    );
};