import { AreaChart, BarChart } from "@mantine/charts";
import { Card, Title } from "@mantine/core";
import { CriteriaDetail, progressHistory } from "../mockData";

const palette = [
  "blue.6",
  "green.6",
  "red.6",
  "orange.6",
  "violet.6",
  "cyan.6",
  "teal.6",
  "pink.6",
  "yellow.6",
  "indigo.6",
];


// gom menuData từ progressHistory thành chart menuData multi-series (chỉ cho type=1)
function mapProgressHistoryToChart(detail: CriteriaDetail) {
  if (!detail.progressHistory) return [];

  // group theo content (VD: từng khoa)
  const groups: Record<string, { date: string; value: number }[]> = {};
  for (const r of detail.progressHistory) {
    // sửa phần tính percent
    let percent: number;
    if (r.total != null && r.total > 0) {
      percent = (r.value / r.total) * 100;
    } else {
      percent = r.value; // giá trị trực tiếp, coi như % nếu cần
    }

    const d = new Date(r.date);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    if (!groups[r.content]) groups[r.content] = [];
    groups[r.content]?.push({ date: dateStr, value: percent });
  }

  // gom tất cả mốc thời gian
  const allDates = Array.from(
    new Set(
      detail.progressHistory.map(
        (r: progressHistory) => {
          const d = new Date(r.date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        }
      )
    )
  ).sort();

  // tạo chartData [{date: "2023-01", "Khoa CNTT": 80, "Khoa KT": 70}, ...]
  const chartData = allDates.map((d) => {
    const row: any = { date: d };
    for (const [dept, values] of Object.entries(groups)) {
      const found = values.find((v) => v.date === d);
      row[dept] = found ? found.value : null;
    }
    return row;
  });

  return chartData;
}


export function ProgressHistoryChart({ detail }: { detail: CriteriaDetail }) {
  if (!detail.progressHistory || detail.progressHistory.length === 0) return null;

  const firstType = detail?.progressHistory[0]?.type;

  // --- TYPE 1: AreaChart ---
  const renderType1 = () => {
    const chartData = mapProgressHistoryToChart(detail);
    const series = Array.from(
      new Set(detail.progressHistory?.map((r: progressHistory) => r.content))
    ).map((dept, idx) => ({
      name: dept,
      label: dept,
      color: palette[idx % palette.length] || '',
    }));

    return (
      <AreaChart
        h={350}
        data={chartData}
        dataKey="date"
        series={series}
        withDots
        withTooltip
        withXAxis
        withYAxis
        valueFormatter={(v) => `${v?.toFixed?.(2)}%`}
        curveType="linear"
      />
    );
  };

  // --- TYPE 2: BarChart ---
  const renderType2 = () => {
    const groups: Record<string, any> = {};
    for (const r of detail.progressHistory ?? []) {
      const d = new Date(r.date);
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (!groups[monthStr]) groups[monthStr] = { month: monthStr };

      const completedKey = `${r.content}_completed`;
      const remainingKey = `${r.content}_remaining`;

      groups[monthStr][completedKey] = r.value;
      groups[monthStr][remainingKey] = (r.total ?? 0) - r.value;
    }

    const chartData = Object.values(groups);
    const depts = Array.from(new Set(detail.progressHistory?.map((r) => r.content)));

    const series = depts.flatMap((dept, idx) => [
      {
        name: `${dept}_completed`,
        label: `${dept} - Đã hoàn thành`,
        color: palette[idx % palette.length],
        stackId: dept,
      },
      {
        name: `${dept}_remaining`,
        label: `${dept} - Chưa hoàn thành`,
        color: "gray.4",
        stackId: dept,
      },
    ]);

    return (
      <BarChart
        h={400}
        data={chartData}
        dataKey="month"
        series={series}
        withTooltip
        withXAxis
        withYAxis
        xAxisProps={{
          tickFormatter: (d) => {
            const [y, m] = d.split("-");
            return `${m}/${y}`;
          },
        }}
      />
    );
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        {detail.name}
      </Title>

      {(firstType === 1 || firstType === 3) && renderType1()}
      {/* <Text>...</Text> */}
      {(firstType === 2 || firstType === 3) && renderType2()}
    </Card>
  );
}
