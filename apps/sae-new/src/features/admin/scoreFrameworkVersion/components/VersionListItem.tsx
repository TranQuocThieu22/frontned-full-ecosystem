"use client";

import { ActionIcon, Badge, Box, Flex, Group, Menu, Text } from "@mantine/core";
import {
  IconArchive,
  IconDotsVertical,
  IconEye,
  IconFilePencil,
  IconTrash,
} from "@tabler/icons-react";
import { STATE_CONFIG } from "../shared/constants";
import { StatusBadge } from "@/shared/components/dataDisplay/StatusBadge";
import {ScoreFrameworkVersionStateEnum} from "@/shared/consts/enum/ScoreFrameworkVersionStateEnum";
import { ScoreFrameworkVersion } from "@/shared/interfaces/ScoreFrameworkVersion";

interface VersionListItemProps {
  version: ScoreFrameworkVersion;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onArchive: () => void;
  onDelete:()=>void;
}

export function VersionListItem({
  version,
  isActive,
  onSelect,
  onEdit,
  onArchive,
  onDelete
}: VersionListItemProps) {
  const cfg = STATE_CONFIG[version.state as ScoreFrameworkVersionStateEnum] ?? {
    label: "Không xác định",
    color: "#6B7280",
    bg: "#F3F4F6",
    dot: "#9CA3AF",
  };

  return (
    <Box
      onClick={onSelect}
      style={{
        padding: "14px 16px",
        borderBottom: "1px solid #F0EDE8",
        cursor: "pointer",
        background: isActive ? "#EEF1F8" : "transparent",
        borderLeft: isActive ? "3px solid #1A2744" : "3px solid transparent",
        boxShadow: isActive ? "inset 0 0 0 1px #C5CEE0" : "none",
        transition: "background 0.15s ease, box-shadow 0.15s ease",
      }}
      className="version-item"
    >
      <Flex justify="space-between" align="flex-start" gap="sm">
        <Box style={{ flex: 1, minWidth: 0 }}>
          {/* Code + Status */}
          <Group gap={6} mb={4}>
            <Box
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: cfg.dot,
                boxShadow: "0 0 0 3px " + cfg.bg,
                flexShrink: 0,
              }}
            />
            <Text
              size="xs"
              fw={700}
              style={{
                fontFamily: "'Roboto', monospace",
                color: "#1A2744",
                letterSpacing: "0.06em",
              }}
            >
              {version.code ?? "—"}
            </Text>
            <StatusBadge label={cfg.label} config={cfg} size="xs" />
          </Group>

          {/* Name */}
          <Text
            size="sm"
            fw={500}
            lineClamp={1}
            mb={4}
            style={{
              color: isActive ? "#1A2744" : "#3A3834",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {version.name}
          </Text>

          {/* Meta row */}
          <Group gap="sm">
            <Text
              size="xs"
              fw={600}
              style={{
                color: "#2D7D46",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              {version.totalMaxScore} điểm
            </Text>
            {version.publishedAt && (
              <>
                <Text size="xs" style={{ color: "#D4C9BC" }}>
                  •
                </Text>
                <Text
                  size="xs"
                  style={{
                    color: "#9E9689",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {new Date(version.publishedAt).toLocaleDateString("vi-VN")}
                </Text>
              </>
            )}
          </Group>

          {/* Academic Years */}
          {version.academicYears ? (
            version.academicYears.length > 0 ? (
              <Group gap={4} mt={4}>
                <Text
                  size="xs"
                  style={{
                    color: "#9E9689",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  Dùng cho:
                </Text>
                {version.academicYears.map((ay) => (
                  <Badge
                    key={ay.id}
                    size="xs"
                    radius="sm"
                    style={{
                      background: "#F0F4FF",
                      color: "#1A2744",
                      fontWeight: 700,
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: "10px",
                      border: "1px solid #C5CEE0",
                    }}
                  >
                    {ay.code ?? ay.name}
                  </Badge>
                ))}
              </Group>
            ) : null
          ) : (
            <Text size="xs" mt={4} style={{ color: "#9E9689", fontFamily: "'Roboto', sans-serif", fontStyle: "italic" }}>
              Không lấy được dữ liệu năm học
            </Text>
          )}
        </Box>

        {/* Actions */}
        <Menu position="bottom-end" withinPortal>
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              radius="sm"
              onClick={(e) => e.stopPropagation()}
            >
              <IconDotsVertical size={14} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {version.state === ScoreFrameworkVersionStateEnum.Published && (
              <Menu.Item
                color="gray"
                leftSection={<IconArchive size={13} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive();
                }}
              >
                Lưu trữ
              </Menu.Item>
            )}
            {version.state === ScoreFrameworkVersionStateEnum.Draft && (
              <Menu.Item
                leftSection={<IconTrash size={13} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                Xóa
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Box>
  );
}
