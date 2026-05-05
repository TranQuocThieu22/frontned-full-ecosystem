"use client";

import { Box, Group, Paper, Text } from "@mantine/core";

interface ActivityStatsProps {
  totalActivities: number;
  totalPoints: number;
  openCount: number;
}

export function ActivityStats({ totalActivities, totalPoints, openCount }: ActivityStatsProps) {
  return (
    <Paper p="lg" bd="1px solid #F5F5F5" shadow="md">
      <Group gap="lg">
        <Box style={{ textAlign: "center" }}>
          <Text
            mb={5}
            size="xs"
            fw={700}
            style={{
              color: "#9E9689",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Tổng hoạt động
          </Text>
          <Text
            fw={800}
            style={{
              fontSize: 20,
              fontFamily: "'Roboto', sans-serif",
              color: "#1A2744",
              lineHeight: 1.2,
            }}
          >
            {totalActivities}
          </Text>
        </Box>
        <Box
          style={{
            width: 1,
            height: 40,
            background: "#E8E2D9",
          }}
        />
        <Box style={{ textAlign: "center" }}>
          <Text
            mb={5}
            size="xs"
            fw={700}
            style={{
              color: "#9E9689",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Điểm tối đa
          </Text>
          <Text
            fw={800}
            style={{
              fontSize: 20,
              fontFamily: "'Roboto', sans-serif",
              color: "#F0A500",
              lineHeight: 1.2,
            }}
          >
            {totalPoints}
          </Text>
        </Box>
        <Box
          style={{
            width: 1,
            height: 40,
            background: "#E8E2D9",
          }}
        />
        <Box style={{ textAlign: "center" }}>
          <Text
            mb={5}
            size="xs"
            fw={700}
            style={{
              color: "#9E9689",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Đang mở
          </Text>
          <Text
            fw={800}
            style={{
              fontSize: 20,
              fontFamily: "'Roboto', sans-serif",
              color: "#D4623B",
              lineHeight: 1.2,
            }}
          >
            {openCount}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
}