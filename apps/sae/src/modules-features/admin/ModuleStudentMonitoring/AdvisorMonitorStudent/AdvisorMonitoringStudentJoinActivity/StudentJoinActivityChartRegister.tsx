'use client';

import { StudentTracking } from "@/interfaces/ranking";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { Box, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const series = [
  { name: 'registrationPoint', label: 'Điểm đã đăng ký', color: 'var(--mantine-color-blue-6)' },
  { name: 'reviewedPoint', label: 'Điểm ghi nhận', color: 'var(--mantine-color-green-6)' },
  { name: 'completedPoint', label: 'Điểm công nhận', color: 'var(--mantine-color-orange-8)' },
];

export default function StudentJoinActivityChartRegister({ data }: { data: StudentTracking }) {
  const [hovered, setHovered] = useState<string | null>(null);

  // caculate chart & scroll height
  const rowHeight = 75;
  const maxChartHeight = 500;
  const dynamicHeight = Math.min(Math.max((data?.facultyReportDetails?.length || 0) * rowHeight, 140), maxChartHeight);

  return (
    <CustomFieldset mt={10} title="Bảng thống kê danh sách đăng ký">
      <Group>
        {/* label YAxis */}
        <Text style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(-180deg)',
          textAlign: 'center',
          whiteSpace: 'nowrap'
        }}
        >
          Danh sách sinh viên
        </Text>
        <Stack gap={0} style={{ flex: 1 }}>
          {/* legend */}
          <Group
            justify="flex-end"
            mb={10}
          >
            {series.map((item) => (
              <Box
                key={item.name}
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Box
                  w={12}
                  h={12}
                  style={{
                    borderRadius: 4,
                    backgroundColor: item.color,
                    opacity: hovered && hovered !== item.name ? 0.4 : 1,
                    transition: 'opacity 0.2s',
                  }}
                />
                <Text size="sm">{item.label}</Text>
              </Box>
            ))}
          </Group>
          {/* thanh axisX cố định */}
          <ResponsiveContainer width="100%" height={51}>
            <BarChart
              layout="vertical"
              margin={{ top: 20, right: 50, left: 140, bottom: 0 }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                tickMargin={15}
                orientation="top"
                stroke="#222"
                style={{ fontWeight: 500 }}
                tickFormatter={(value) => `${value} điểm`}
              />
            </BarChart>
          </ResponsiveContainer>
          {/* real chart */}
          <ScrollArea h={dynamicHeight} type="auto" scrollbarSize={10} scrollHideDelay={3000}>
            <ResponsiveContainer width="100%" height={Math.max((data?.facultyReportDetails?.length || 0) * rowHeight, 140)}>
              <BarChart
                data={data.facultyReportDetails || []}
                layout="vertical"
                margin={{ top: 0, right: 50, left: 20, bottom: 0 }}
                barCategoryGap={8}
                barSize={data?.facultyReportDetails?.length === 1 ? 30 : 15}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickLine={false}
                  tick={false}
                />
                <YAxis
                  type="category"
                  dataKey="studentName"
                  width={120}
                  tickMargin={10}
                  stroke="#222"
                  style={{ fontWeight: 500 }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    const found = series.find(s => s.name === name);
                    return [`${value} điểm`, found ? found.label : name];
                  }}
                />
                {series.map((item) => (
                  <Bar
                    key={item.name}
                    dataKey={item.name}
                    fill={item.color}
                    radius={10}
                    opacity={hovered && hovered !== item.name ? 0.4 : 1}
                    isAnimationActive={false}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ScrollArea>
          {/* label XAxis */}
          <Text style={{ textAlign: "center" }}>Điểm số</Text>
        </Stack>
      </Group>
    </CustomFieldset>
  );
}

