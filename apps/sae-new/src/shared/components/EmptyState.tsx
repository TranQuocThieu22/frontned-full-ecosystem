import { C } from "@/app/operation/ctsv/pointReview/shared/pointReview.constants";
import { Flex, Box, Text } from "@mantine/core";
import React from "react";
interface Props {
  title?: string
  message?: string;
  SVG?: React.ElementType<{ C: any }>;
}
export default function EmptyState({ message, SVG, title }: Props) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="md"
      py={60}
      style={{ animation: "fadeUp 0.4s ease both" }}
    >
      {SVG ? <SVG C={C} /> : null}
      <Text fw={600} style={{ color: C.navy, fontFamily: "'Roboto', sans-serif" }}>
        {title ?? "Không có dữ liệu"}
      </Text>
      <Text size="sm" style={{ color: C.textMuted, fontFamily: "'Roboto', sans-serif", maxWidth: 280, textAlign: "center" }}>
        {message ?? "Không có dữ liệu"}
      </Text>
    </Flex>
  );
}
