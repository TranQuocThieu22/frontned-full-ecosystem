
import { Group, Text } from '@mantine/core';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { khoa: 'Đã cấp văn bằng', soLuongIP: 60 },
    { khoa: 'Đang thẩm định', soLuongIP: 45 },
    { khoa: 'Đang nộp đơn', soLuongIP: 40 },
    { khoa: 'Hết hiệu lực', soLuongIP: 35 },
    { khoa: 'Bị đình chỉ', soLuongIP: 25 },
];


export default function IPsByLegalStatusBarChar() {
    return (
        <>
            <Text fw={500} mb={10}>Số lượng IP theo Tình trạng Pháp lý</Text>
            <Group gap={0} align='flex-start' wrap='nowrap'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ bottom: 50, top: 20 }}>
                        <CartesianGrid horizontal={true} vertical={false} stroke="#eee" strokeDasharray="3 3" />
                        <XAxis dataKey="khoa" interval={0} tick={{ fontSize: 13, fontWeight: 500 }} />
                        <YAxis
                            tick={{ fontSize: 13 }}
                            label={{
                                value: 'Số lượng IP',
                                angle: -90,
                                position: 'insideLeft',
                                offset: 10,
                                style: { textAnchor: 'middle', fontSize: 14, fontWeight: 500 },
                            }}
                        />
                        <Tooltip
                            formatter={(value, name) => {
                                return [`${value}`, "Số lượng IP"];
                            }}
                        />
                        <Bar dataKey="soLuongIP" fill="rgba(0, 143, 251, 0.85)" label={<CustomBarLabel />} />
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