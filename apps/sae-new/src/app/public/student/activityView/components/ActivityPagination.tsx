"use client";

import { Box, Button, Flex, Group, Text } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface ActivityPaginationProps {
  page: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ActivityPagination({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ActivityPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | "...")[]>((acc, p, i, arr) => {
      if (i > 0 && p - (arr[i - 1] as number) > 1) {
        acc.push("...");
      }
      acc.push(p);
      return acc;
    }, []);

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      gap="md"
      pt="md"
      style={{
        borderTop: "1px solid #EDE9E3",
        animation: "cardFadeUp 0.5s ease 0.2s both",
      }}
    >
      <Text
        size="sm"
        style={{
          color: "#7A746B",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Trang{" "}
        <Text span fw={700} style={{ color: "#1A2744" }}>
          {page}
        </Text>{" "}
        /{" "}
        <Text span fw={700} style={{ color: "#1A2744" }}>
          {totalPages}
        </Text>
      </Text>

      <Group gap={6}>
        <Button
          variant="light"
          radius="md"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          styles={{
            root: {
              border: "1px solid #E8E2D9",
              color: "#7A746B",
              background: "white",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 600,
            },
          }}
        >
          <IconChevronLeft size={16} />
        </Button>

        {pages.map((p, i) =>
          p === "..." ? (
            <Text
              key={`ellipsis-${i}`}
              size="sm"
              style={{ color: "#C5BEB4", padding: "0 4px" }}
            >
              …
            </Text>
          ) : (
            <Button
              key={p}
              size="sm"
              radius="md"
              variant={page === p ? "filled" : "light"}
              style={
                page === p
                  ? {
                      background: "#1A2744",
                      color: "white",
                      fontWeight: 700,
                      fontFamily: "'Roboto', sans-serif",
                      minWidth: 36,
                    }
                  : {
                      border: "1px solid #E8E2D9",
                      color: "#7A746B",
                      background: "white",
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: 600,
                      minWidth: 36,
                    }
              }
              onClick={() => onPageChange(p as number)}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="light"
          radius="md"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          styles={{
            root: {
              border: "1px solid #E8E2D9",
              color: "#7A746B",
              background: "white",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 600,
            },
          }}
        >
          <IconChevronRight size={16} />
        </Button>
      </Group>

      {/* Page size selector */}
      <Group gap={10}>
        <Text
          size="xs"
          fw={700}
          style={{
            color: "#9E9689",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Hiển thị
        </Text>
        <Box
          style={{
            width: 1,
            height: 20,
            background: "#E8E2D9",
          }}
        />
        {[10, 20, 50].map((size) => (
          <Button
            key={size}
            size="xs"
            variant={pageSize === size ? "filled" : "subtle"}
            style={
              pageSize === size
                ? {
                    borderRadius: 7,
                    background: "#1A2744",
                    color: "white",
                    fontWeight: 700,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "12px",
                    minWidth: 36,
                  }
                : {
                    borderRadius: 7,
                    background: "transparent",
                    color: "#7A746B",
                    fontWeight: 600,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "12px",
                  }
            }
            onClick={() => onPageSizeChange(size)}
          >
            {size}
          </Button>
        ))}
      </Group>
    </Flex>
  );
}