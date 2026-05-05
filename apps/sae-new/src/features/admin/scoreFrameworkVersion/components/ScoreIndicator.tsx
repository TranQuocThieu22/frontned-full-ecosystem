"use client";

import { Box, Flex, Text } from "@mantine/core";
import { MAX_TOTAL } from "../shared/constants";

interface ScoreIndicatorProps {
  totalScore: number;
  totalValid: boolean;
}

export function ScoreIndicator({ totalScore, totalValid }: ScoreIndicatorProps) {
  return (
    <Box
      style={{
        background: "#FAF8F5",
        border: `1px solid ${totalValid ? "#2D7D46" : "#E8E2D9"}`,
        borderRadius: 12,
        padding: "12px 20px",
        textAlign: "center",
        minWidth: 120,
      }}
    >
      <Text
        size="xs"
        fw={700}
        style={{
          color: totalValid ? "#2D7D46" : "#9E9689",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'Roboto', sans-serif",
          marginBottom: 2,
        }}
      >
        Tổng điểm
      </Text>
      <Flex align="baseline" gap={4} justify="center">
        <Text
          fw={800}
          style={{
            fontSize: 32,
            color: totalValid ? "#2D7D46" : "#D4623B",
            fontFamily: "'Roboto', sans-serif",
            lineHeight: 1,
          }}
        >
          {totalScore}
        </Text>
        <Text
          size="sm"
          fw={600}
          style={{
            color: "#9E9689",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          / {MAX_TOTAL}
        </Text>
      </Flex>
      {/* Progress bar */}
      <Box
        style={{
          height: 4,
          borderRadius: 99,
          background: "#E8E2D9",
          marginTop: 8,
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            height: "100%",
            width: `${Math.min((totalScore / MAX_TOTAL) * 100, 100)}%`,
            background: totalValid ? "#2D7D46" : "#D4623B",
            borderRadius: 99,
            transition: "width 0.3s ease",
          }}
        />
      </Box>
      {!totalValid && (
        <Text
          size="xs"
          style={{
            color: "#D4623B",
            fontFamily: "'Roboto', sans-serif",
            marginTop: 4,
            fontWeight: 500,
          }}
        >
          Cần đủ {MAX_TOTAL - totalScore} điểm nữa
        </Text>
      )}
    </Box>
  );
}
