"use client";
import CriteriaCard from "./components/CriteriaCard";
import CriteriaDashboard from "@/data/Charts/newchart";
import { Criteria } from "./FakeData/mockData (1)";
import {
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChartHistogram } from "@tabler/icons-react";
import { useState } from "react";

type CriteriaDetail = {
  id: string;
  name: string;
  value?: string | number;
  threshold?: string | number;
  isPass: boolean | null;
};

type Props = {
  items: Criteria[];
};

export function CategoryPanel({ items }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedCriterion, setSelectedCriterion] = useState<Criteria | null>(
    null
  );

  const handleOpen = (criterion: Criteria) => {
    setSelectedCriterion(criterion);
    open();
  };
  return (
    <Stack gap="sm">
      {items.map((c) => (
        <Card key={c.id} withBorder radius="md" p="md">
          <Group justify="space-between" align="flex-start">
            <Text fw={500} lineClamp={1}>
              {c.title}
            </Text>
            <IconChartHistogram
              size={22} // mặc định 18, tăng lên cho rõ
              color="var(--mantine-color-blue-6)" // màu xanh đậm
              stroke={2} // nét dày hơn
              style={{ cursor: "pointer" }}
              onClick={() => handleOpen(c)}
            />
            {/* {c.content ? (
                <Text size="sm" c="dimmed" mt={2} lineClamp={3}>
                  {c.content}
                </Text>
              ) : null} */}
            {/* <Group gap="xs" mt="xs" wrap="wrap">
                <Badge
                  size="sm"
                  variant="outline"
                  color={c.isPass ? "teal" : "red"}
                >
                  {c.isPass ? "Đạt" : c.isPass === false ? "Chưa đạt" : "—"}
                </Badge>
                {typeof c.criteriaProgress === "number" ? (
                  <Badge size="sm" variant="light" color="indigo">
                    {c.criteriaProgress}%
                  </Badge>
                ) : null}
              </Group> */}
            <CriteriaCard criteria={c} />
          </Group>
          <Modal
            opened={opened}
            onClose={close}
            // title="Authentication"
            size={"xl"}
            centered
          >
            <CriteriaDashboard criteria={selectedCriterion} />
          </Modal>
        </Card>
      ))}
    </Stack>
  );
}
