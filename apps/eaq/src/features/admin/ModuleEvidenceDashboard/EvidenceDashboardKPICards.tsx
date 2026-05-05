"use client";

import { useEvidenceDashboardStore } from "./useEvidenceDashboardStore";
import { Grid, Paper, Group, Text, Box, ActionIcon, Skeleton } from "@mantine/core";
import { IconFileAlert, IconFileTime, IconFileCheck } from "@tabler/icons-react";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { useEffect } from "react";
import { service_EAQEvidence } from "@/shared/APIs/service_EAQEvidence";

export default function EvidenceDashboardKPICards() {
  const store = useEvidenceDashboardStore((s) => s);
  const departmentId = store.state.selectedDepartmentId;
  const activeView = store.state.activeView;
  const refreshKey = store.state.refreshKey;

  const typeMap: Record<string, number | null> = {
    empty: 1,
    expired: 2,
    unused: 3,
    all: null,
  };

  const { data: queryData, isLoading, refetch } = useCustomReactQuery({
    queryKey: ["service_EAQEvidenceDashboard_getData", activeView, departmentId],
    axiosFn: () =>
      service_EAQEvidence.getData({
        type: typeMap[activeView] as any,
        departmentId,
      }),
  });
  const data = (queryData as any) || {};

  useEffect(() => {
    refetch();
  }, [refreshKey, refetch]);

  // UI poller 30s as requested in design log
  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(timer);
  }, [refetch]);

  const cards = [
    {
      type: "empty",
      title: "Minh chứng trống",
      count: data?.emptyCount || 0,
      color: "#DC2626",
      bgColor: "#FEE2E2",
      icon: <IconFileAlert size={28} />,
      description: "Cần bổ sung tài liệu hoặc kiểm tra liên kết tệp tin.",
    },
    {
      type: "expired",
      title: "Minh chứng hết hạn",
      count: data?.expiredCount || 0,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      icon: <IconFileTime size={28} />,
      description: "Các tài liệu đã vượt quá thời gian hiệu lực quy định.",
    },
    {
      type: "unused",
      title: "Minh chứng chưa sử dụng",
      count: data?.unusedCount || 0,
      color: "#4169E1",
      bgColor: "#8496ccff",
      icon: <IconFileCheck size={28} />,
      description: "Minh chứng đã tải lên nhưng chưa gán vào tiêu chuẩn nào.",
    },
  ];

  return (
    <Grid mb="lg">
      {cards.map((card) => {
        const isActive = activeView === card.type;

        return (
          <Grid.Col span={{ base: 12, sm: 4 }} key={card.type}>
            <Paper
              withBorder
              radius="lg"
              onClick={() =>
                store.setProperty("activeView", isActive ? "all" : (card.type as any))
              }
              style={(theme) => ({
                cursor: "pointer",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                backgroundColor: isActive ? `${card.color}15` : "var(--mantine-color-body)",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive ? theme.shadows.md : theme.shadows.sm,
                borderRight: isActive ? `1.5px solid ${card.color}` : `1px solid var(--mantine-color-default-border)`,
                borderTop: isActive ? `1.5px solid ${card.color}` : `1px solid var(--mantine-color-default-border)`,
                borderBottom: isActive ? `1.5px solid ${card.color}` : `1px solid var(--mantine-color-default-border)`,
                borderLeft: `6px solid ${card.color}`,
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows.md,
                },
              })}
            >
              <Group justify="flex-start" wrap="nowrap" align="center" gap="md">
                <Box
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "12px",
                    backgroundColor: `${card.color}1A`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: card.color,
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </Box>

                <Box ml={8}>
                  <Skeleton visible={isLoading} height={32} radius="md">
                    <Text
                      style={{
                        fontSize: "28px",
                        fontWeight: 800,
                        lineHeight: 1,
                        color: "var(--mantine-color-text)",
                        marginBottom: "4px",
                      }}
                    >
                      {card.count}
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--mantine-color-dimmed)", verticalAlign: "middle", marginLeft: "8px" }}>
                        Hồ sơ
                      </span>
                    </Text>
                  </Skeleton>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--mantine-color-text)",
                    }}
                  >
                    {card.title}
                  </Text>
                </Box>
              </Group>

              <Skeleton visible={isLoading} height={16} radius="sm">
                <Text
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "var(--mantine-color-dimmed)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {card.description}
                </Text>
              </Skeleton>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
