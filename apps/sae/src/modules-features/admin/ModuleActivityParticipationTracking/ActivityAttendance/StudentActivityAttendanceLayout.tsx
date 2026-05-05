"use client";

import { service_standard } from "@/api/services/service_standard";
import { Card, Flex, Group, Tabs, Text } from "@mantine/core";
import { useState } from "react";
import ActivityAttendanceTable from "./ActivityAttendanceTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";

export default function StudentActivityAttendanceLayout() {
  const standandSelect = useState<number | undefined>(undefined);
  const Q_Standard = useCustomReactQuery({
    queryKey: ["StudentActivityAttendanceLayout_Standard_GetAll"],
    axiosFn: () => service_standard.getAll(),
  });

  return (
    <CustomFieldset title="Danh sách hoạt động ngoại khoá">
      <Flex gap="md" justify="center" direction="column">
        <Tabs defaultValue="all">
          <Tabs.List>
            <Tabs.Tab value="all" onClick={() => standandSelect[1](undefined)}>
              Tất cả
            </Tabs.Tab>
            {Q_Standard &&
              Q_Standard.data
                ?.sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
                .map((item, index) => (
                  <Tabs.Tab
                    key={item.code}
                    value={item.id?.toString() || ""}
                    onClick={() => {
                      item.id !== undefined && standandSelect[1](item.id);
                    }}
                  >
                    {"Điều " + (index + 1)}
                  </Tabs.Tab>
                ))}
          </Tabs.List>
          {Q_Standard &&
            Q_Standard.data
              ?.sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
              .map((item) => (
                <Tabs.Panel mt={10} key={item.id} value={item.id?.toString() || ""}>
                  <Card
                    bg="var(--mantine-color-cyan-1)"
                    shadow="sm"
                    fz={"sm"}
                    padding="sm"
                    radius="md"
                    withBorder
                  >
                    <Group gap={8}>
                      <Text fz={"sm"} fw={"bold"} c="#055160">
                        Điều:
                      </Text>
                      <Text fz={"sm"} c="#055160">
                        {item.name}
                      </Text>
                    </Group>
                    <Group gap={8}>
                      <Text fz={"sm"} fw={"bold"} c="#055160">
                        Điểm:
                      </Text>
                      <Text fz={"sm"} c="#055160">
                        {item.maxPoint}
                      </Text>
                    </Group>
                    <Group gap={8}>
                      <Text fz={"sm"} fw={"bold"} c="#055160">
                        Tỉ lệ Điểm Hoạt Động cố định:
                      </Text>
                      <Text fz={"sm"} c="#055160">
                        {item.minPoint}/{item.maxPoint}
                      </Text>
                    </Group>
                  </Card>
                </Tabs.Panel>
              ))}
        </Tabs>
        <ActivityAttendanceTable standardId={standandSelect[0]} />
      </Flex>
    </CustomFieldset>
  );
}
