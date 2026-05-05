import { Group, SimpleGrid, Text } from "@mantine/core";
import {
    Cell,
    Pie,
    PieChart,
    Tooltip
} from "recharts";

const data = [
    { name: "Sáng chế", value: 45 },
    { name: "Bản quyền", value: 30 },
    { name: "Nhãn hiệu", value: 15 },
    { name: "Kiểu dáng", value: 5 },
    { name: "Giải pháp hữu ích", value: 5 },
];

const COLORS = ["rgb(52, 179, 231)", "rgb(254, 207, 22)", "rgb(246, 164, 23)", "rgb(235, 95, 26)", "rgb(122, 42, 160)"];

export default function IPTypePieChart() {
    return (
        <>
            <Text fw={500} mb={10}>Phân loại IP theo loại hình SHTT</Text>
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