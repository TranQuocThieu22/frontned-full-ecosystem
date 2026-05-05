import React from "react";
import { Box, Text, ActionIcon, Flex, Switch } from "@mantine/core";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { MyFlexColumn, MySelect } from "aq-fe-framework/components";

export default function ContentConfigSidebar({
  opened,
  width = 380,
  onToggle,
}: {
  opened: boolean;
  width?: number;
  onToggle: () => void;
}) {
  const collapsedWidth = 40;

  return (
    <Box
      w={opened ? width : collapsedWidth}
      bg="gray.1"
      h="65vh"
      style={{ borderRadius: "8px", position: "relative" }}
    >
      <ActionIcon
        onClick={onToggle}
        variant="light"
        size="sm"
        radius="xl"
        style={{
          position: "absolute",
          top: 20,
          left: 10,
          zIndex: 9,
        }}
      >
        {opened ? <IconChevronsRight size={18} /> : <IconChevronsLeft size={18} />}
      </ActionIcon>

      {opened && (
        <Box px={20} py={16}>
          <Text ml={24} fw={600}>
            Cấu hình nội dung
          </Text>
          <MyFlexColumn gap={12} mt={10}>
            <Flex justify="space-between" align="center" gap={8}>
              <Text size="sm">Kiểu nội dung</Text>
              <MySelect
                placeholder="Lựa chọn đơn"
                data={[{ value: "1", label: "Lựa chọn đơn" }]}
                clearable={false}
              />
            </Flex>
            <Flex justify="space-between" gap={8}>
              <Text size="sm">Cấu hình câu hỏi bắt buộc trả lời</Text>
              <Switch />
            </Flex>
            <Flex justify="space-between" gap={8}>
              <Text size="sm">Thêm hình ảnh dưới nội dung</Text>
              <Switch />
            </Flex>
            <Flex justify="space-between" gap={8}>
              <Text size="sm">Có nội dung hướng dẫn cho người khảo sát</Text>
              <Switch />
            </Flex>
            <Flex justify="space-between" gap={8}>
              <Text size="sm">Ngẫu nhiên hoá thứ tự lựa chọn</Text>
              <Switch />
            </Flex>
            <Flex justify="space-between" gap={8}>
              <Text size="sm">Nội dung khác</Text>
              <Switch />
            </Flex>
          </MyFlexColumn>
        </Box>
      )}
    </Box>
  );
}
