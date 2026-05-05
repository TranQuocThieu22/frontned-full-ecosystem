'use client';

import { Box, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export function EmptyFlowPlaceholder({
  message = "Vui lòng chọn một luồng để xem chi tiết",
}) {
  return (
    <Box
      py={40}
      px={24}
      w={"100%"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
        color: "#adb5bd",
      }}
    >
      <IconAlertCircle size={44} color="#868e96" style={{ marginBottom: 12 }} />
      <Text c="dimmed" ta="center" fz={18} fw={600}>
        {message}
      </Text>
    </Box>
  );
}
