"use client";

import { Box, Button, Flex, Group, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import { UseScoreFrameworkVersion } from "../shared/useScoreFrameworkVersion";

export function ActionFooter() {
  const hook = UseScoreFrameworkVersion();
  const { canPublish, publishError, saveSuccess, childrenValid, firstChildMismatch, isSaving } = hook;
  return (
    <Box
      px="xl"
      py="md"
      style={{ background: "#FFFFFF", borderTop: "1px solid #E8E2D9", flexShrink: 0 }}
    >
      <Flex justify="space-between" align="center" gap="md" wrap="wrap">
        {/* Validation message */}
        <Box>
          {publishError ? (
            <Box
              px={10}
              py={4}
              style={{ background: "#FEF0EC", border: "1px solid #D4623B", borderRadius: 6 }}
            >
              <Text size="xs" fw={600} style={{ color: "#D4623B", fontFamily: "'Roboto', sans-serif" }}>
                {publishError}
              </Text>
            </Box>
          ) : (
            <Text size="xs" style={{ color: childrenValid ? "#9E9689" : "#D4623B", fontFamily: "'Roboto', sans-serif" }}>
              {childrenValid
                ? "Đang chỉnh sửa bản nháp"
                : firstChildMismatch
                  ? `Tiêu chí ${firstChildMismatch.code}: tổng con phải bằng điểm cha`
                  : "Có lỗi khớp điểm tiêu chí con"}
            </Text>
          )}
        </Box>

        {/* Buttons */}
        <Group gap="sm">
          {saveSuccess && (
            <Flex
              align="center"
              gap={6}
              px="md"
              style={{ background: "#EEF7F1", border: "1px solid #2D7D46", borderRadius: 8, animation: "successPop 0.3s ease both" }}
            >
              <IconCheck size={14} color="#2D7D46" />
              <Text size="xs" fw={700} style={{ color: "#2D7D46", fontFamily: "'Roboto', sans-serif" }}>
                Đã lưu
              </Text>
            </Flex>
          )}

          <Button
            variant="default"
            size="sm"
            radius="md"
            onClick={hook.handleSaveDraft}
            loading={isSaving}
            styles={{ root: { border: "1px solid #E8E2D9", color: "#3A3834", fontFamily: "'Roboto', sans-serif", fontWeight: 600 } }}
          >
            Lưu nháp
          </Button>

          <Button
            size="sm"
            radius="md"
            leftSection={<IconCheck size={14} />}
            disabled={!canPublish || isSaving}
            onClick={hook.handlePublish}
            styles={{
              root: {
                background: canPublish ? "#2D7D46" : "#E8E2D9",
                color: canPublish ? "white" : "#9E9689",
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 700,
                cursor: canPublish ? "pointer" : "not-allowed",
              },
            }}
          >
            Phát hành
          </Button>
        </Group>
      </Flex>
    </Box>
  );
}
