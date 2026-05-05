"use client";

import { Box, Button, Flex, Group, ScrollArea, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { VersionListItem } from "./VersionListItem";
import { CreateVersionButton } from "../modal/CreateVersionButton";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { UseScoreFrameworkVersion } from "../shared/useScoreFrameworkVersion";
import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { useDebouncedValue } from "@mantine/hooks";


const STATUS_LABELS: Record<number | "all", string> = {
  all: "Tất cả",
  [ScoreFrameworkVersionStateEnum.Draft]: "Nháp",
  [ScoreFrameworkVersionStateEnum.Published]: "Đang hoạt động",
  [ScoreFrameworkVersionStateEnum.Archived]: "Lưu trữ",
};

const STATUS_COLORS: Record<number | "all", string> = {
  all: "#1A2744",
  [ScoreFrameworkVersionStateEnum.Draft]: "#B8810A",
  [ScoreFrameworkVersionStateEnum.Published]: "#2D7D46",
  [ScoreFrameworkVersionStateEnum.Archived]: "#6B7280",
};


export function LeftPanel() {
  const versions = useScoreFrameworkVersionStore((s) => s.versions);
  const selectedId = useScoreFrameworkVersionStore((s) => s.selectedId);
  const filterStatus = useScoreFrameworkVersionStore((s) => s.filterStatus);
  const searchKw = useScoreFrameworkVersionStore((s) => s.searchKw);

  const setSelectedId = useScoreFrameworkVersionStore((s) => s.setSelectedId);
  const setFilterStatus = useScoreFrameworkVersionStore((s) => s.setFilterStatus);
  const setSearchKw = useScoreFrameworkVersionStore((s) => s.setSearchKw);
  const openArchiveModal = useScoreFrameworkVersionStore((s) => s.openArchiveModal);
  const hook = UseScoreFrameworkVersion();
  const handleCreateVersion = hook.handleCreateVersion;
  const validateCodeDuplicate = hook.validateCodeDuplicate;
  const [debouncedSearchKw] = useDebouncedValue(searchKw, 300);

  const filtered = versions.filter((v) => {
    const matchStatus = filterStatus === "all" || v.state === filterStatus;
    const matchKw =
      !searchKw ||
      (v.code?.toLowerCase().includes(debouncedSearchKw.toLowerCase()) ?? false) ||
      v.name?.toLowerCase().includes(debouncedSearchKw.toLowerCase());
    return matchStatus && matchKw;
  });

  return (
    <Box
      style={{
        background: "#FFFFFF",
        borderRight: "1px solid #E8E2D9",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* ── Header ── */}
      <Box px="md" py="md" style={{ borderBottom: "1px solid #E8E2D9", flexShrink: 0 }}>
        <Flex justify="space-between" align="center" mb="md">
          <Box>
            <Text size="sm" fw={800} style={{ color: "#1A2744", fontFamily: "'Roboto', sans-serif", fontSize: "16px", letterSpacing: "-0.01em" }}>
              Khung điểm ĐRL
            </Text>
            <Text size="xs" style={{ color: "#9E9689", fontFamily: "'Roboto', sans-serif" }}>
              Cấu hình version
            </Text>
          </Box>
          <CreateVersionButton onCreate={handleCreateVersion} validateCode={validateCodeDuplicate} />

        </Flex>

        {/* Search */}
        <TextInput
          placeholder="Tìm kiếm..."
          leftSection={<IconSearch size={14} color="#9E9689" />}
          value={searchKw}
          onChange={(e) => setSearchKw(e.target.value)}
          size="xs"
          radius="md"
          styles={{ input: { background: "#FAF8F5", border: "1px solid #E8E2D9", color: "#1A2744", fontFamily: "'Roboto', sans-serif", fontSize: "12px" } }}
        />

        {/* Status filters */}
        <Group gap={4} mt="sm">
          {(["all", ScoreFrameworkVersionStateEnum.Draft, ScoreFrameworkVersionStateEnum.Published, ScoreFrameworkVersionStateEnum.Archived] as const).map((s) => (
            <Button
              key={s}
              size="xs"
              radius="sm"
              variant={filterStatus === s ? "filled" : "default"}
              onClick={() => setFilterStatus(s)}
              style={
                filterStatus === s
                  ? { background: STATUS_COLORS[s], color: "white", fontFamily: "'Roboto', sans-serif", fontWeight: 700, fontSize: "11px" }
                  : { background: "transparent", border: "1px solid #E8E2D9", color: "#7A746B", fontFamily: "'Roboto', sans-serif", fontWeight: 600, fontSize: "11px" }
              }
            >
              {STATUS_LABELS[s]}
            </Button>
          ))}
        </Group>
      </Box>

      {/* ── List ── */}
      <ScrollArea style={{ flex: 1, minHeight: 0 }} py="xs">
        {filtered.length > 0 ? (
          filtered.map((version) => (
            <VersionListItem
              key={version.id}
              version={version}
              isActive={version.id === selectedId}
              onSelect={() => setSelectedId(version.id!)}
              onEdit={() => setSelectedId(version.id!)}
              onArchive={() => openArchiveModal(version.id!)}
              onDelete={() => hook.openDeleteModal_(version.id!)}
            />
          ))
        ) : (
          <Box p="xl" style={{ textAlign: "center" }}>
            <Text size="sm" style={{ color: "#9E9689", fontFamily: "'Roboto', sans-serif" }}>
              Không tìm thấy version
            </Text>
          </Box>
        )}
      </ScrollArea>
    </Box>
  );
}
