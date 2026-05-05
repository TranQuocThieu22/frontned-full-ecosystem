"use client";

import { useState } from "react";
import { Box, Button, Flex, Group, Text, TextInput } from "@mantine/core";
import { IconArchive, IconCheck, IconX } from "@tabler/icons-react";
import { STATE_CONFIG } from "../shared/constants";
import { ScoreIndicator } from "./ScoreIndicator";
import { StatusBadge } from "@/shared/components/dataDisplay/StatusBadge";
import { ScoreFrameworkVersionStateEnum } from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { useScoreFrameworkVersionStore } from "@/shared/stores/scoreFrameworkVersionStore";
import { UseScoreFrameworkVersion } from "../shared/useScoreFrameworkVersion";

export function RightPanelHeader() {
  const hookController = UseScoreFrameworkVersion();
  const totalScore = hookController.totalScore;
  const version = hookController.versionDetailWithCriteria || {};
  const totalValid = hookController.totalValid;
  const isExistingVersion = hookController.isExistingVersion;
  const canEdit = hookController.canEdit;
  const onUpdateMeta = hookController.updateVersionMeta

  const selectedId = useScoreFrameworkVersionStore((s) => s.selectedId);
  const openArchiveModal = useScoreFrameworkVersionStore((s) => s.openArchiveModal);
  const existingVersionMeta = useScoreFrameworkVersionStore((s) => s.existingVersionMeta);
  const newVersionDetails = useScoreFrameworkVersionStore((s) => s.newVersionDetails);
  const newVersionIds = useScoreFrameworkVersionStore((s) => s.newVersionIds);

  // Derive display name reactively from store — handles both new and existing versions
  const isNewVersion = selectedId != null && newVersionIds.has(selectedId);
  const newVersionMeta = isNewVersion ? newVersionDetails.get(selectedId ?? "") : null;
  const displayName =
    (isNewVersion ? newVersionMeta?.name : existingVersionMeta.name) ?? version.name ?? "";
  const displayCode = isNewVersion
    ? (newVersionMeta?.code ?? version.code ?? "")
    : (version.code ?? "");

  // ── Inline edit state ──
  const [editingCode, setEditingCode] = useState(false);
  const [editCode, setEditCode] = useState(version.code ?? "");
  const [editingName, setEditingName] = useState(false);
  const [editName, setEditName] = useState("");

  const cfg = STATE_CONFIG[version.state as ScoreFrameworkVersionStateEnum] ?? {
    label: "Không xác định",
    color: "#6B7280",
    bg: "#F3F4F6",
    dot: "#9CA3AF",
  };

  function commitCode() {
    const trimmed = editCode.trim();
    if (trimmed && trimmed !== displayCode) {
      onUpdateMeta({ code: trimmed });
    }
    setEditingCode(false);
  }

  function commitName() {
    const trimmed = editName.trim();
    if (trimmed && trimmed !== displayName) {
      onUpdateMeta({ name: trimmed });
    }
    setEditingName(false);
  }

  function cancelCode() {
    setEditCode(displayCode);
    setEditingCode(false);
  }

  function cancelName() {
    setEditName(displayName);
    setEditingName(false);
  }

  return (
    <Box
      px="xl"
      py="md"
      style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E2D9", flexShrink: 0 }}
    >
      <Flex justify="space-between" align="flex-start" gap="md" wrap="wrap">
        {/* ── Meta ── */}
        <Box>
          {/* Code + Badge */}
          <Group gap={8} mb={4}>
            {editingCode ? (
              <Group gap={4}>
                <TextInput
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  size="xs"
                  radius="md"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitCode();
                    if (e.key === "Escape") cancelCode();
                  }}
                  styles={{
                    input: {
                      fontFamily: "'Roboto', monospace",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#1A2744",
                      border: "1px solid #1A2744",
                      background: "#F7F5F2",
                      width: 120,
                    },
                  }}
                />
                <Button size="xs" variant="filled" color="dark" radius="md" px={6} onClick={commitCode}>
                  <IconCheck size={12} />
                </Button>
                <Button size="xs" variant="default" radius="md" px={6} onClick={cancelCode}>
                  <IconX size={12} />
                </Button>
              </Group>
            ) : (
              <Text
                fw={800}
                style={{
                  color: "#1A2744",
                  fontFamily: "'Roboto', monospace",
                  fontSize: "18px",
                  letterSpacing: "-0.02em",
                  cursor: !isExistingVersion ? "text" : "default",
                  textDecoration: !isExistingVersion ? "underline" : "none",
                  textDecorationStyle: !isExistingVersion ? "dashed" : undefined,
                  textUnderlineOffset: "3px",
                }}
                onClick={() => {
                  if (!isExistingVersion) {
                    setEditCode(displayCode);
                    setEditingCode(true);
                  }
                }}
              >
                {displayCode || "—"}
              </Text>
            )}
            <StatusBadge label={cfg.label} config={cfg} size="sm" />
          </Group>

          {/* Name */}
          {editingName ? (
            <Group gap={4} mb={4}>
              <TextInput
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                size="sm"
                radius="md"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitName();
                  if (e.key === "Escape") cancelName();
                }}
                styles={{
                  input: {
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    color: "#3A3834",
                    border: "1px solid #1A2744",
                    background: "#F7F5F2",
                    minWidth: 240,
                  },
                }}
              />
              <Button size="sm" variant="filled" color="dark" radius="md" px={6} onClick={commitName}>
                <IconCheck size={12} />
              </Button>
              <Button size="sm" variant="default" radius="md" px={6} onClick={cancelName}>
                <IconX size={12} />
              </Button>
            </Group>
          ) : (
            <Text
              size="sm"
              fw={500}
              style={{
                color: "#3A3834",
                fontFamily: "'Roboto', sans-serif",
                marginBottom: 6,
                cursor: canEdit ? "text" : "default",
                textDecoration: canEdit ? "underline" : "none",
                textDecorationStyle: canEdit ? "dashed" : undefined,
                textUnderlineOffset: "3px",
              }}
              onClick={() => {
                if (canEdit) {
                  setEditName(displayName);
                  setEditingName(true);
                }
              }}
            >
              {displayName}
            </Text>
          )}

          <Group gap="md">
            {version.publishedAt && (
              <Text size="xs" style={{ color: "#9E9689", fontFamily: "'Roboto', sans-serif" }}>
                Phát hành: <Text span fw={600} style={{ color: "#3A3834" }}>{new Date(version.publishedAt).toLocaleDateString("vi-VN")}</Text>
              </Text>
            )}
            {version.academicYears && version.academicYears.length > 0 && (
              <>
                <Text size="xs" style={{ color: "#D4C9BC" }}>•</Text>
                <Text size="xs" style={{ color: "#9E9689", fontFamily: "'Roboto', sans-serif" }}>
                  Dùng cho:{" "}
                  {version.academicYears.map((ay, i) => (
                    <Text key={ay.id} component="span" fw={700} style={{ color: "#1A2744", fontFamily: "'Roboto', sans-serif" }}>
                      {i > 0 && <Text component="span" style={{ color: "#D4C9BC", marginLeft: 4, marginRight: 4 }}>•</Text>}
                      {ay.code}
                    </Text>
                  ))}
                </Text>
              </>
            )}
          </Group>
        </Box>

        {/* ── Actions + Score ── */}
        <Flex align="flex-start" gap="md" wrap="wrap">
          {version.state === ScoreFrameworkVersionStateEnum.Published && (
            <Button
              variant="light"
              size="sm"
              radius="md"
              leftSection={<IconArchive size={14} />}
              onClick={() => openArchiveModal(selectedId!)}
              styles={{ root: { background: "#F7F5F2", color: "#6B7280", border: "1px solid #E8E2D9", fontFamily: "'Roboto', sans-serif", fontWeight: 700 } }}
            >
              Lưu trữ
            </Button>
          )}
          <ScoreIndicator totalScore={totalScore} totalValid={totalValid} />
        </Flex>
      </Flex>
    </Box>
  );
}
