"use client";

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  NumberInput,
  Text,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { IconChevronRight, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import type { Criterion } from "@/shared/interfaces/criterion";

import { DeleteConfirmModal } from "../modal/DeleteConfirmModal";
import { calcChildrenTotal, generateGUID } from "../shared/helper";

interface CriterionRowProps {
  criterion: Criterion;
  level?: number;
  parentMax?: number;
  readonly: boolean;
  expanded: boolean;
  isOverBudget?: boolean;
  onToggleExpand: () => void;
  onUpdate: (updated: Criterion) => void;
  onAddChild?: () => void;
  onDelete: () => void;
  serverErrors?: Record<string, string[]>;
  allServerErrors?: Record<string, Record<string, string[]>>; // needed for recursive children
  clearErrorForId: (id: string) => void;
}

export function CriterionRow({
  criterion,
  level = 0,
  parentMax,
  readonly,
  expanded,
  isOverBudget,
  onToggleExpand,
  onUpdate,
  onDelete,
  serverErrors,
  allServerErrors,
  clearErrorForId,
}: CriterionRowProps) {
  const hasChildren = criterion.children.length > 0;
  const childTotal = calcChildrenTotal(criterion.children);
  const childMismatch =
    criterion.children.length > 0 && childTotal !== criterion.maxScore;
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  function update<K extends keyof Criterion>(key: K, value: Criterion[K]) {
    clearErrorForId(criterion.id);
    onUpdate({ ...criterion, [key]: value });
  }

  const rowBg = level === 0 ? "#FFFFFF" : level === 1 ? "#f8f9fa" : "#f3f4f6";
  const rowBorder = isOverBudget
    ? "#D4623B"
    : level === 0
      ? "#E8E2D9"
      : "#F0EDE8";

  return (
    <Box
      style={{
        border: `1px solid ${rowBorder}`,
        borderLeft: isOverBudget ? `3px solid #D4623B` : undefined,
        borderRadius: 10,
        background: isOverBudget ? "#FFF8F6" : rowBg,
        overflow: "hidden",
        marginBottom: 8,
        marginLeft: level === 1 ? 28 : level === 2 ? 56 : 0,
      }}
    >
      {/* Main row */}
      <Flex gap="sm" align="center" px="md" py="sm" style={{ background: "transparent" }}>
        {/* Expand/Collapse chevron — only when has children in editable mode */}
        <Box style={{ width: 20, flexShrink: 0 }}>
          {hasChildren && !readonly && (
            <ActionIcon
              variant="subtle"
              color="gray"
              size="xs"
              radius="sm"
              onClick={onToggleExpand}
              style={{
                transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.2s ease",
              }}
            >
              <IconChevronRight size={14} />
            </ActionIcon>
          )}
        </Box>

        {/* Code badge */}
        <Badge
          size="sm"
          radius="sm"
          style={{
            background: level === 0 ? "#dedfe1" : level === 1 ? "#c7c9cb" : "#b0b3b6",
            color: level === 0 ? "#1A2744" : level === 1 ? "#000000" : "#3A3834",
            fontWeight: 700,
            fontFamily: "'Roboto', monospace",
            fontSize: "11px",
            minWidth: 44,
            letterSpacing: "0.04em",
            flexShrink: 0,
          }}
        >
          {criterion.code}
        </Badge>

        {/* Name input */}
        <Textarea
          value={criterion.name}
          onChange={(e) => update("name", e.target.value)}
          disabled={readonly}
          minRows={1}
          maxRows={5}
          autosize
          placeholder="Tên tiêu chí"
          error={serverErrors?.name?.[0]}
          styles={{
            input: {
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${readonly ? "#E8E2D9" : serverErrors?.name ? "#D4623B" : "#D4C9BC"}`,
              borderRadius: 5,
              padding: " 7px",
              color: "#1A2744",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: level === 0 ? 600 : 500,
              fontSize: "13px",
            },
          }}
          style={{ flex: 1, minWidth: 0 }}
        />
        {/* Score input */}
        <Flex align="center" gap={4} style={{ flexShrink: 0 }}>
          <NumberInput
            value={criterion.maxScore}
            onChange={(val) => update("maxScore", Math.max(0, Number(val) || 0))}
            disabled={readonly}
            size="xs"
            min={0}
            allowNegative={false}
            hideControls
            clampBehavior="blur"
            w={56}
            error={!!serverErrors?.maxscore || (childMismatch ? "Lỗi tổng con" : false)}
            aria-label={`Điểm tối đa cho ${criterion.name || criterion.code}`}
            styles={{
              input: {
                background: "transparent",
                border: readonly
                  ? "1px solid #E8E2D9"
                  : childMismatch || serverErrors?.maxscore
                    ? "1px solid #D4623B"
                    : "1px solid #d9d4ce",
                borderRadius: 6,
                padding: "4px 6px",
                color: level === 0
                  ? "#1A2744"
                  : childMismatch
                    ? "#D4623B"
                    : "#4A453F",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                textAlign: "center",
                cursor: readonly ? "default" : "text",
              },
            }}
          />
          <Text
            size="xs"
            style={{
              color: "#9E9689",
              fontFamily: "'Roboto', sans-serif",
              fontSize: "11px",
            }}
          >
            điểm
          </Text>
        </Flex>

        {/* Inline score chip — shows child's running total on root rows */}
        {level === 0 && childTotal > 0 && (
          <Tooltip
            label={`Tổng con: ${childTotal} / ${criterion.maxScore} điểm tiêu chí cha`}
            position="top"
          >
            <Box
              px={8}
              py={2}
              style={{
                background: childMismatch ? "#FEF0EC" : "#EEF7F1",
                border: `1px solid ${childMismatch ? "#D4623B" : "#2D7D46"}`,
                borderRadius: 20,
                flexShrink: 0,
              }}
            >
              <Text
                size="xs"
                fw={700}
                style={{
                  color: childMismatch ? "#D4623B" : "#2D7D46",
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                {childTotal}/{criterion.maxScore}
              </Text>
            </Box>
          </Tooltip>
        )}

        {/* Actions */}
        {!readonly && (
          <Flex gap={4} style={{ flexShrink: 0 }}>
            {/* Add child: levels 0 and 1 can add children (max 3-level tree) */}
            {level < 2 && (
              <Tooltip label="Thêm tiêu chí con" position="top">
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  size="sm"
                  radius="sm"
                  onClick={() => {
                    const newChild: Criterion = {
                      id: generateGUID(),
                      code: `${criterion.code}.${criterion.children.length + 1}`,
                      name: "",
                      maxScore: 0,
                      children: [],
                    };
                    onUpdate({ ...criterion, children: [...criterion.children, newChild] });
                  }}
                >
                  <IconPlus size={14} />
                </ActionIcon>
              </Tooltip>
            )}

            {/* Delete — opens confirm modal */}
            <Tooltip label="Xóa" position="top">
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                radius="sm"
                onClick={openDeleteModal}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        )}
      </Flex>

      {/* Delete confirm modal */}
      <DeleteConfirmModal
        opened={deleteModalOpened}
        hasChildren={hasChildren}
        childCount={criterion.children.length}
        onConfirm={onDelete}
        onClose={closeDeleteModal}
      />

      {/* Children — only shown when expanded */}
      {hasChildren && expanded && (
        <Box
          style={{
            borderTop: `1px solid #F0EDE8`,
            padding: "8px 16px 12px 8px",
          }}
        >
          {criterion.children.map((child) => (
            <CriterionRow
              key={child.id}
              criterion={child}
              level={level + 1}
              parentMax={criterion.maxScore}
              readonly={readonly}
              expanded={true}
              serverErrors={allServerErrors?.[child.id]}
              allServerErrors={allServerErrors}
              onToggleExpand={() => { }}
              clearErrorForId={clearErrorForId}
              onUpdate={(updated) => {
                const newChildren = criterion.children.map((c) =>
                  c.id === updated.id ? updated : c
                );
                onUpdate({ ...criterion, children: newChildren });
              }}
              onDelete={() => {
                const remaining = criterion.children.filter((c) => c.id !== child.id);
                const renumbered = remaining.map((c, i) => ({
                  ...c,
                  code: `${criterion.code}.${i + 1}`,
                }));
                onUpdate({ ...criterion, children: renumbered });
              }}
            />
          ))}

          {/* Add child button at bottom of children: levels 0 and 1 */}
          {!readonly && level < 2 && (
            <Button
              variant="subtle"
              size="xs"
              leftSection={<IconPlus size={12} />}
              color="gray"
              radius="sm"
              onClick={() => {
                const newChild: Criterion = {
                  id: generateGUID(),
                  code: `${criterion.code}.${criterion.children.length + 1}`,
                  name: "",
                  maxScore: 0,
                  children: [],
                };
                onUpdate({
                  ...criterion,
                  children: [...criterion.children, newChild],
                });
              }}
              styles={{ label: { fontFamily: "'Roboto', sans-serif", fontSize: "12px" } }}
            >
              Thêm tiêu chí con
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
