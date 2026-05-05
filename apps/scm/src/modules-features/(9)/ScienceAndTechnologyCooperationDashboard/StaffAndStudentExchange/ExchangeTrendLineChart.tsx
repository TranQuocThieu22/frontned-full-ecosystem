import { Text } from '@mantine/core';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { month: '06-2024', lineGo: 1, lineBack: 1 },
    { month: '07-2024', lineGo: 2, lineBack: 4 },
    { month: '08-2024', lineGo: 3, lineBack: 5 },
    { month: '09-2024', lineGo: 5, lineBack: 7 },
    { month: '10-2024', lineGo: 7, lineBack: 10 },
    { month: '11-2024', lineGo: 10, lineBack: 14 },
    { month: '12-2024', lineGo: 13, lineBack: 15 },
    { month: '01-2025', lineGo: 16, lineBack: 16 },
    { month: '02-2025', lineGo: 18, lineBack: 17 },
    { month: '03-2025', lineGo: 21, lineBack: 18 },
    { month: '04-2025', lineGo: 25, lineBack: 19 },
    { month: '05-2025', lineGo: 30, lineBack: 25 },
];


export default function ExchangeTrendLineChart() {
    return (
        <>
            <Text fw={500} mb={10}>Xu hướng trao đổi</Text>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 30, bottom: 50, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        style={{ fontSize: 14, fontWeight: 500 }}
                        dataKey="month"
                        angle={-45}
                        textAnchor="end"
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
                            const nameMap: Record<string, string> = {
                                lineGo: "Lượt đi",
                                lineBack: "Lượt về",
                            };

                            return [`${value}`, nameMap[name] || name];
                        }}
                    />
                    <Line type="natural" dataKey="lineGo" stroke="#82ca9d" strokeWidth={3} dot />
                    <Line type="natural" dataKey="lineBack" stroke="rgb(240, 197, 113)" strokeWidth={3} dot />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
