
import { Group, Text } from '@mantine/core';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { linhVuc: 'AI', soLuong: 8 },
    { linhVuc: 'Vật liệu mới', soLuong: 5 },
    { linhVuc: 'Y học cổ truyền', soLuong: 4 },
    { linhVuc: 'Năng lượng tái tạo', soLuong: 3 },
    { linhVuc: 'Khác', soLuong: 3 },
];


export default function ProjectDistributionbyExpertiseBarChar() {
    return (
        <>
            <Text fw={500} mb={10}>Phân bố Dự án theo Lĩnh vực Chuyên môn</Text>
            <Group gap={0} align='flex-start' wrap='nowrap'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{ bottom: 20, top: 5, left: 15, right: 30 }}
                        layout="vertical"
                    >
                        <CartesianGrid horizontal={false} vertical={true} stroke="#eee" strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tick={{ fontSize: 13 }}
                            label={{
                                value: 'Số lượng dự án',
                                position: 'insideBottom',
                                offset: -10,
                                style: { textAnchor: 'middle', fontSize: 14, fontWeight: 500 },
                            }}
                        />

                        <YAxis
                            type="category"
                            dataKey="linhVuc"
                            interval={0}
                            tick={{ fontSize: 13, fontWeight: 500 }}
                        />
                        <Tooltip
                            formatter={(value, name) => {
                                return [`${value}`, "Số lượng dự án"];
                            }}
                        />
                        <Bar dataKey="soLuong" fill="rgba(0, 143, 251, 0.85)" label={<CustomBarLabel />} />
                    </BarChart>
                </ResponsiveContainer>
            </Group>
        </>
    )
}

const CustomBarLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    return (
        <text
            x={x + width + 15}
            y={y + height / 2}
            fill="#000"
            textAnchor="middle"
            fontSize={12}
            fontWeight={500}
        >
            {value}
        </text>
    );
};