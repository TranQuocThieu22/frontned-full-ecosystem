import { Text } from '@mantine/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: 'Q2-2022', line1: 3 },
    { name: 'Q3-2022', line1: 5 },
    { name: 'Q4-2022', line1: 4 },
    { name: 'Q1-2023', line1: 3 },
    { name: 'Q2-2023', line1: 6 },
    { name: 'Q3-2023', line1: 3 },
    { name: 'Q4-2023', line1: 5 },
    { name: 'Q1-2024', line1: 4 },
    { name: 'Q2-2024', line1: 3 },
    { name: 'Q3-2024', line1: 6 },
    { name: 'Q4-2024', line1: 7 },
    { name: 'Q1-2025', line1: 6 },
];

export default function NewIPRegistrationTrendLineChart() {
    return (
        <>
            <Text fw={500} mb={10}>Xu hướng Đăng ký IP mới theo thời gian</Text>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, bottom: 60, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        angle={-45}
                        textAnchor="end"
                        dataKey="name"
                        label={{
                            value: 'Theo từ quý của 3 năm gần nhất',
                            position: 'insideBottom',
                            offset: -50,
                            style: { textAnchor: 'middle', fontSize: 14, fontWeight: 500 },
                        }}
                        tick={{ fontSize: 12, fontWeight: 500 }}
                    />
                    <YAxis
                        label={{
                            value: 'Số lượng',
                            angle: -90,
                            position: 'insideLeft',
                            offset: 20,
                            style: { textAnchor: 'middle', fontSize: 14, fontWeight: 500 },
                        }}
                    />
                    <Tooltip
                        formatter={(value, name) => {
                            return [`${value}`, "Số lượng IP"];
                        }}
                    />
                    <Line type="natural" dataKey="line1" stroke="#82ca9d" strokeWidth={3} dot />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
