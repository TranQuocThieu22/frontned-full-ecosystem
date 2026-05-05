"use client";

import { Stack } from "@mantine/core";
import EvidenceTypeTable from "./EvidenceTypeTable";
import EvidenceTypeFilterPanel from "./EvidenceTypeFilterPanel";

export default function EvidenceTypeLayout() {
  return (
    <Stack gap="md" h="100%">
      <EvidenceTypeFilterPanel />
      <EvidenceTypeTable />
    </Stack>
  );
}
