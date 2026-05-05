import { Criterion } from "@/data/new_data/IqmesViewModel";
import {
  Badge,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  Progress,
  ScrollArea,
  Table,
  Text,
  Timeline,
  Tooltip,
} from "@mantine/core";
import RingProgress from "./RingProgress";
import { CriteriaDetail } from "@/data/mockData";

interface ContentCardProps {
  item: any;
}

interface CriterionCheck {
  threshold: number;
  thresholdType: string;
  value: number;
}

function checkStatus({
  threshold,
  thresholdType,
  value,
}: CriterionCheck): "Tốt" | "Cảnh báo" {
  if (thresholdType === "max") {
    return value <= threshold ? "Tốt" : "Cảnh báo";
  }

  if (thresholdType === "min") {
    return value >= threshold ? "Tốt" : "Cảnh báo";
  }

  return "Cảnh báo";
}

export default function ContentCard({ item }: ContentCardProps) {
  let progress: number = 0;
  if (item.thresholdType == "max") {
    progress = (Number(item.value) / Number(item.threshold)) * 100;
  } else {
    progress = Number(item.value);
  }

  const check = checkStatus({
    threshold: Number(item.threshold),
    thresholdType: item.thresholdType ?? "",
    value: Number(item.value),
  });

  const bdColor =
    check === "Tốt" ? "rgba(64,192,87,0.3)" : "rgba(232, 2, 2, 0.3";

  return (
    <Card shadow="none" withBorder={false} p="0">
      {item.criteriaDetails && item.criteriaDetails.length > 0 && (
        <Table withColumnBorders withTableBorder p={0} mt={"sm"}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tên tiêu chí</Table.Th>
              <Table.Th>Mô tả</Table.Th>
              <Table.Th>Điểm đánh giá</Table.Th>
              <Table.Th>Ngưỡng đạt</Table.Th>
              <Table.Th>Kết quả</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {item.criteriaDetails.map((d: CriteriaDetail) => (
              <Table.Tr key={d.id}>
                <Table.Td>{d.name}</Table.Td>
                <Table.Td>{d.description}</Table.Td>
                <Table.Td>{d.value?.toFixed(2) ?? "-"}</Table.Td>
                <Table.Td>{d.threshold?.toFixed(2) ?? "-"}</Table.Td>
                <Table.Td>
                  <Badge color={d.isPass ? "green" : "red"}>
                    {d.isPass === null
                      ? "Chưa đánh giá"
                      : d.isPass
                        ? "Đạt"
                        : "Không đạt"}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Card>
  );
}
