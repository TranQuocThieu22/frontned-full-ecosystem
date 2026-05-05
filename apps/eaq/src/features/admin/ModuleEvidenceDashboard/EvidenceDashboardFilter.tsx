"use client";

import { useEvidenceDashboardStore } from "./useEvidenceDashboardStore";
import { Grid, Group, Text } from "@mantine/core";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { service_Department } from "@/shared/APIs/service__department";

export default function EvidenceDashboardFilter() {
  const store = useEvidenceDashboardStore((s) => s);
  const selectedDepartmentId = store.state.selectedDepartmentId;

  const query_Unit_GetAll = useCustomReactQuery({
    queryKey: ["query_Unit_GetAll_DashboardFilter"],
    axiosFn: () => service_Department.getAll(),
    options: {
      refetchOnWindowFocus: false,
    },
  });

  return (
    <Group mb="md" mt="md">
      <Group>
        <CustomSelect
          data={
            query_Unit_GetAll.data?.map((item) => ({
              value: String(item.id ?? ""),
              label: String(item.name ?? ""),
            })) ?? []
          }
          placeholder="Lọc theo đơn vị..."
          isLoading={query_Unit_GetAll.isLoading}
          value={selectedDepartmentId ? String(selectedDepartmentId) : null}
          onChange={(val) => {
            store.setProperty(
              "selectedDepartmentId",
              val ? Number(val) : undefined
            );
          }}
          clearable
          style={{ width: 250 }}
        />
      </Group>
    </Group>
  );
}
