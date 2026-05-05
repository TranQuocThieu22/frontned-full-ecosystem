"use client";

import { Stack, Paper } from "@mantine/core";
import EvidenceDashboardKPICards from "./EvidenceDashboardKPICards";
import EvidenceDashboardFilter from "./EvidenceDashboardFilter";
import EvidenceDashboardTable from "./EvidenceDashboardTable";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function EvidenceDashboardLayout() {
  return (
    <Stack gap="md" h="100%">
      <Paper p="md" radius="md" withBorder>
        <EvidenceDashboardKPICards />
      </Paper>

      <CustomFieldset title="Danh sách minh chứng">
        <EvidenceDashboardFilter />
        <EvidenceDashboardTable />
      </CustomFieldset>
    </Stack>
  );
}
