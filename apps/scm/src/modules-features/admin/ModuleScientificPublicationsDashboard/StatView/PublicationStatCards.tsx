"use client";

import { SimpleGrid } from "@mantine/core";
import { IconChecklist, IconClockCog, IconFileWord, IconStopwatch } from "@tabler/icons-react";
import AQStatCard from "../AQStatCard";

export default function PublicationStatCards() {
  return (
    <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 4 }} mb={32}>
      <AQStatCard
        title={"Công bố Đã duyệt"}
        value={"1.250"}
        icons={<IconChecklist opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
      />
      <AQStatCard
        title={"Tổng số Giờ Quy Đổi"}
        value={"8.750"}
        icons={<IconClockCog opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
      />
      <AQStatCard
        title={"Bài Báo Q1/Scopus/WoS"}
        value={"215"}
        icons={<IconFileWord opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
      />
      <AQStatCard
        title={"Công bố Chờ Duyệt"}
        value={"4/23"}
        icons={<IconStopwatch opacity={"0.3"} style={{ width: '100%', height: '100%' }} stroke={1.5} />}
      />
    </SimpleGrid>
  );
} 