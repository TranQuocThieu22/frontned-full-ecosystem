"use client";
import { qmesDashboardData } from "@/data/mockData";
import {
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Text
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconTrendingUp
} from "@tabler/icons-react";
import { useState } from "react";
import ContentCard from "./ContentCard";

interface MenuDashboardProps {
  data?: qmesDashboardData;
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

export default function MenuDashboardClone({ data }: MenuDashboardProps) {
  const [openItems, setOpenItems] = useState<(string | number)[]>([]);

  const toggleItem = (value: string | number) => {
    setOpenItems((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <Stack gap="sm">
      {data?.criteria?.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        // const check = checkStatus({
        //   threshold: Number(item.threshold),
        //   thresholdType: item.thresholdType ?? "",
        //   value: Number(item.value),
        // });
        return (
          <Box
            key={item.id}
            p="sm"
            style={{
              border: isOpen
                ? `1px solid ${item.isPass ? "#00af31" : "#f22625"}`
                : "1px solid #ccc",
              borderRadius: 6,
              transition: "all 0.2s ease",
            }}
          >
            <Flex align="center" justify="space-between" gap="md">
              <Text fw={500} flex={1}>
                {data.categoryCode}.{index + 1} {item.title}
              </Text>

              <Flex align="center" gap="sm">
                <Badge
                  size="md"
                  radius={"sm"}
                  color={item.isPass ? "green.7" : "red"}
                >
                  {item.isPass ? "Tốt" : "Cảnh báo"}
                </Badge>

                <Button
                  style={{ border: "none" }}
                  variant="default"
                  size="xs"
                  aria-label="Xem xu hướng"
                >
                  <IconTrendingUp size={18} color="purple" />
                </Button>

                <Button
                  variant="subtle"
                  color={item.isPass ? "#00af31" : "#f22625"}
                  size="xs"
                  onClick={() => toggleItem(item.id)}
                  aria-label="Mở rộng"
                >
                  {isOpen ? <IconChevronUp /> : <IconChevronDown />}
                </Button>
              </Flex>
            </Flex>

            {isOpen && <ContentCard item={item} />}
          </Box>
        );
      })}
    </Stack>
  );
}
