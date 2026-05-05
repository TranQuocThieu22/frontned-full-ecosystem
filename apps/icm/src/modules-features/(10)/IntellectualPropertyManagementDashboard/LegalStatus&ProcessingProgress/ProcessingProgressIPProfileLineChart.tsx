import { Text } from "@mantine/core";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { month: '2024-07', ip1: 7, ip2: 6, ip3: 5, ip4: 7, ip5: 4 },
    { month: '2024-08', ip1: 6, ip2: 6, ip3: 5, ip4: 6, ip5: 4 },
    { month: '2024-09', ip1: 5, ip2: 5, ip3: 5, ip4: 6, ip5: 3 },
    { month: '2024-10', ip1: 4, ip2: 5, ip3: 4, ip4: 5, ip5: 3 },
    { month: '2024-11', ip1: 3, ip2: 4, ip3: 4, ip4: 4, ip5: 2 },
    { month: '2024-12', ip1: 2, ip2: 3, ip3: 3, ip4: 3, ip5: 2 },
    { month: '2025-01', ip1: 1, ip2: 3, ip3: 3, ip4: 2, ip5: 1 },
    { month: '2025-02', ip1: 0, ip2: 2, ip3: 2, ip4: 1, ip5: 1 },
    { month: '2025-03', ip1: 0, ip2: 1, ip3: 1, ip4: 1, ip5: 1 },
    { month: '2025-04', ip1: 0, ip2: 1, ip3: 1, ip4: 0, ip5: 1 },
    { month: '2025-05', ip1: 0, ip2: 0, ip3: 0, ip4: 0, ip5: 0 },
    { month: '2025-06', ip1: 0, ip2: 0, ip3: 0, ip4: 0, ip5: 0 },
];


export default function ProcessingProgressIPProfileLineChart() {
    return (
        <>
            <Text fw={500} mb={10}>Tiến trình xử lý hồ sơ IP</Text>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 20, bottom: 50, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 500 }} angle={-45} textAnchor="end" />
                    <YAxis
                        domain={[0, 7]}
                        tickCount={8}
                        label={{
                            value: 'Số bước còn lại',
                            angle: -90,
                            position: 'insideLeft',
                            offset: 20,
                            style: { textAnchor: 'middle', fontSize: 14, fontWeight: 500 },
                        }}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="ip1" stroke="#1f77b4" dot={false} />
                    <Line type="monotone" dataKey="ip2" stroke="#ff7f0e" dot={false} />
                    <Line type="monotone" dataKey="ip3" stroke="#2ca02c" dot={false} />
                    <Line type="monotone" dataKey="ip4" stroke="#d62728" dot={false} />
                    <Line type="monotone" dataKey="ip5" stroke="#9467bd" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}