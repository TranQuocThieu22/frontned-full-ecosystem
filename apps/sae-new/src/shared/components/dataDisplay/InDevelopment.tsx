import { Box, Stack, Text } from "@mantine/core";
import { IconHammer } from "@tabler/icons-react";

export default function InDevelopmentPage() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: 400,
      }}
    >
      <Stack align="center" gap="md">
        <IconHammer size={56} color="#9CA3AF" stroke={1.5} />
        <Text
          size="lg"
          fw={700}
          style={{ color: "#6B7280", fontFamily: "'Roboto', sans-serif" }}
        >
          Tính năng đang phát triển
        </Text>
        <Text
          size="sm"
          style={{ color: "#9CA3AF", fontFamily: "'Roboto', sans-serif" }}
        >
          Chức năng này hiện đang được xây dựng và sẽ sớm ra mắt.
        </Text>
      </Stack>
    </Box>
  );
}
