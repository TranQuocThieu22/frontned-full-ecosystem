"use client";

import {
  Box,
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import {
  ActivityState,
  ActivityStateColor,
  ActivityStateLabel,
  ActivityType,
  ActivityTypeColor,
  ActivityTypeLabel,
} from "@/shared/interfaces/ActivityStudent";

export type FilterType = "all" | "mandatory" | "optional" | "club";

const FILTER_TYPES: { value: FilterType; label: string; color: string }[] = [
  { value: "all", label: "Tất cả", color: "#1A2744" },
  { value: "mandatory", label: ActivityTypeLabel[ActivityType.Mandatory], color: ActivityTypeColor[ActivityType.Mandatory] },
  { value: "optional", label: ActivityTypeLabel[ActivityType.Optional], color: ActivityTypeColor[ActivityType.Optional] },
  // { value: "club", label: "CLB", color: "#2D7D46" },
];

// Status options mapped from enum
const FILTER_STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "open", label: ActivityStateLabel[ActivityState.Open] },
  { value: "ongoing", label: ActivityStateLabel[ActivityState.Ongoing] },
  { value: "closed", label: ActivityStateLabel[ActivityState.Closed] },
];

const FILTER_CATEGORIES = [
  "Tất cả Điều",
  "Điều I",
  "Điều II",
  "Điều III",
  "Điều IV",
  "Điều V",
];

interface ActivityFiltersProps {
  searchKeyword: string;
  onSearchChange: (value: string) => void;
  selectedType: FilterType;
  onTypeChange: (value: FilterType) => void;
  selectedCategory: string | null;
  onCategoryChange: (value: string | null) => void;
  selectedStatus: string | null;
  onStatusChange: (value: string | null) => void;
}

export function ActivityFilters({
  searchKeyword,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
}: ActivityFiltersProps) {
  const hasActiveFilters =
    selectedType !== "all" ||
    selectedCategory !== "Tất cả Điều" ||
    !!selectedStatus ||
    !!searchKeyword;

  return (
    <Paper
      radius="lg"
      p="lg"
      mb="xl"
      bd="1px solid #F5F5F5"
      shadow="md"
      style={{
        borderRadius: "10px",
        background: "#f8f9fa",
        border: "1px solid #E8E2D9",
        animation: "cardFadeUp 0.5s ease 0.1s both",
      }}
    >
      <Stack gap="md">
        {/* Search + Type filters */}
        <Flex gap="md" wrap="wrap" align="center">
          <TextInput
            placeholder="Tìm kiếm hoạt động..."
            leftSection={<IconSearch size={16} color="#9E9689" />}
            value={searchKeyword}
            onChange={(e) => onSearchChange(e.target.value)}
            radius="md"
            size="sm"
            styles={{
              input: {
                background: "white",
                borderRadius: "5px",
                border: "1px solid #E8E2D9",
                color: "#1A2744",
                fontFamily: "'Roboto', sans-serif",
                "&::placeholder": { color: "#C5BEB4" },
              },
            }}
            style={{ flex: "1 1 260px", minWidth: 200 }}
          />

          {/* Type filter pills */}
          <Group gap={6}>
            {FILTER_TYPES.map((f) => (
              <Button
                key={f.value}
                size="xs"
                radius="md"
                variant={selectedType === f.value ? "filled" : "light"}
                style={
                  selectedType === f.value
                    ? {
                        borderRadius: "5px",
                        background: f.color,
                        color: "white",
                        fontWeight: 700,
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "12px",
                      }
                    : {
                        borderRadius: "5px",
                        background: "white",
                        border: "1px solid #E8E2D9",
                        color: "#7A746B",
                        fontWeight: 600,
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: "12px",
                      }
                }
                onClick={() => onTypeChange(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </Group>
        </Flex>

        {/* Secondary filters */}
        <Flex gap="md" wrap="wrap" align="center">
          {/* <Select
            placeholder="Nhóm tiêu chí"
            data={FILTER_CATEGORIES}
            value={selectedCategory}
            onChange={onCategoryChange}
            size="sm"
            radius="md"
            styles={{
              input: {
                borderRadius: "5px",
                background: "white",
                border: "1px solid #E8E2D9",
                color: "#1A2744",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
              },
              dropdown: {
                background: "white",
                border: "1px solid #E8E2D9",
                fontFamily: "'Roboto', sans-serif",
                borderRadius: "5px",
              },
            }}
            style={{ flex: "0 1 180px" }}
          /> */}

          <Select
            placeholder="Trạng thái"
            data={FILTER_STATUS_OPTIONS}
            value={selectedStatus}
            onChange={onStatusChange}
            size="sm"
            radius="md"
            clearable
            styles={{
              input: {
                background: "white",
                border: "1px solid #E8E2D9",
                color: "#1A2744",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                borderRadius: "5px",
              },
              dropdown: {
                background: "white",
                border: "1px solid #E8E2D9",
                fontFamily: "'Roboto', sans-serif",
                borderRadius: "5px",
              },
            }}
            style={{ flex: "0 1 180px" }}
          />

          {hasActiveFilters && (
            <Button
              variant="subtle"
              size="xs"
              color="gray"
              radius="md"
              onClick={() => {
                onTypeChange("all");
                onCategoryChange("Tất cả Điều");
                onStatusChange(null);
                onSearchChange("");
              }}
              styles={{
                label: {
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "12px",
                },
              }}
            >
              Xóa bộ lọc ✕
            </Button>
          )}
        </Flex>
      </Stack>
    </Paper>
  );
}
