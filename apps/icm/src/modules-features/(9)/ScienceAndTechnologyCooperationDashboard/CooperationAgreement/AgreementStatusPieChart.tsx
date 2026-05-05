import { Group, SimpleGrid, Text } from "@mantine/core";
import {
    Cell,
    Pie,
    PieChart,
    Tooltip
} from "recharts";

const data = [
    { name: "Còn hiệu lực", value: 68 },
    { name: "Sắp hết hiệu lực", value: 12 },
    { name: "Đã hết hiệu lực", value: 30 },
    { name: "Đã hủy", value: 5 },
];

const COLORS = ["rgb(52, 179, 231)", "rgb(254, 207, 22)", "rgb(246, 164, 23)", "rgb(235, 95, 26)"];

export default function AgreementStatusPieChart() {
    return (
        <>
            <Text fw={500} mb={10}>Trạng thái Thỏa thuận</Text>
            <Group wrap="nowrap">
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        startAngle={90}
                        endAngle={-270}
                        labelLine={false}
                        outerRadius={140}
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name) => {
                            return [`${value}%`, name];
                        }}
                    />
                </PieChart>
                <SimpleGrid cols={1}>
                    {data.map((item, index) => (
                        <Group key={item.name} wrap='nowrap'>
                            <div
                                style={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: COLORS[index],
                                    borderRadius: 2,
                                }}
                            />
                            <Text size="sm">{`${item.name} (${item.value}%)`}</Text>
                        </Group>
                    ))}
                </SimpleGrid>
            </Group>
        </>
    );
}