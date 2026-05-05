import { Text } from '@mantine/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: '2015', line1: 1 },
    { name: '2016', line1: 2 },
    { name: '2017', line1: 3 },
    { name: '2018', line1: 5 },
    { name: '2019', line1: 8 },
    { name: '2020', line1: 12 },
    { name: '2021', line1: 11 },
    { name: '2022', line1: 15 },
    { name: '2023', line1: 20 },
    { name: '2024', line1: 21 },
];

export default function NumberOfMiningContractsLineChart() {
    return (
        <>
            <Text fw={500} mb={10}>Số lượng hợp đồng khai thác</Text>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, bottom: 50, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
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
                            return [`${value}`, "Số lượng hợp đồng"];
                        }}
                    />
                    <Line type="natural" dataKey="line1" stroke="#82ca9d" strokeWidth={3} dot />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
