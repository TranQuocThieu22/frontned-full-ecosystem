import { BarChart, LineChart } from "@mantine/charts";
import { Card, Grid, Group, Image, Stack, Text, Title } from "@mantine/core";
import { Criteria } from "../mockData";
import { ProgressHistoryChart } from "./ProgressHistoryChart";

interface CriteriaDashboardProps {
  criteria: Criteria | null;
}

export default function CriteriaDashboard({
  criteria,
}: CriteriaDashboardProps) {
  if (!criteria?.criteriaDetails || criteria?.criteriaDetails.length === 0) {
    return (
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title order={4}>{criteria?.title}</Title>
        <Text size="sm" c="dimmed">
          Không có dữ liệu chi tiết để hiển thị
        </Text>
      </Card>
    );
  }

  // 📈 Trường hợp chartType = 1 → vẽ multi-line chart từ progressHistory
  if (criteria.chartType == 1) {
    return (
      <Stack gap="md">
        {criteria.criteriaDetails?.map((detail) => (
          <ProgressHistoryChart key={detail.id} detail={detail} />
        ))}
      </Stack>
    );
  }

  // 📊 Trường hợp chartType = 2 → quota vs enrolled
  if (criteria.chartType == 2) {
    const chartData = criteria.criteriaDetails.map((d) => ({
      year: d.date ? new Date(d.date).getFullYear() : d.name,
      quota: d.total ?? 0,
      enrolled: d.count ?? 0,
      ratio: d.total && d.count ? (d.count / d.total) * 100 : d.value ?? 0,
    }));

    const latest = chartData[chartData.length - 1];
    const prev = chartData[chartData.length - 2];
    const change = (latest?.ratio || 0) - (prev?.ratio || 0);

    return (
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Title order={3} mb="md">
          {criteria.title}
        </Title>

        <Group mb="lg">
          <Card withBorder p="md" radius="md">
            <Text size="sm" c="dimmed">
              Năm {latest?.year}
            </Text>
            <Text fw={700} fz="xl">
              {latest?.ratio?.toFixed(2)}%
            </Text>
            <Text size="sm" c={change >= 0 ? "green" : "red"}>
              {change >= 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`}{" "}
              so với năm {prev?.year}
            </Text>
          </Card>
        </Group>

        <Grid>
          <Grid.Col span={6}>
            <LineChart
              h={300}
              data={chartData}
              dataKey="year"
              series={[
                { name: "ratio", label: "Tỉ lệ nhập học (%)", color: "blue.6" },
              ]}
              curveType="linear"
              valueFormatter={(v) => `${v.toFixed(1)}%`}
              withDots
              withTooltip
              withXAxis
              withYAxis
              xAxisProps={{ tickFormatter: (y) => y.toString() }}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <BarChart
              h={300}
              data={chartData}
              dataKey="year"
              series={[
                { name: "quota", label: criteria.totalTitle, color: "gray.6" },
                {
                  name: "enrolled",
                  label: criteria.countTitle,
                  color: "green.6",
                },
              ]}
              withTooltip
              withXAxis
              withYAxis
            />
          </Grid.Col>
        </Grid>
      </Card>
    );
  }

  // fallback
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Image
        radius="md"
        src="https://content.imageresizer.com/images/memes/Megamind-Peeking-meme-4.jpg"
      />
    </Card>
  );
}
