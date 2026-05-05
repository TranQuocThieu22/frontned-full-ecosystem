'use client';

import { Box, Button, Divider, Flex, Paper, ScrollArea, Stack, Text, ActionIcon } from "@mantine/core";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import SurveyDeleteFlow from "./SurveyDeleteFlow";
import SurveyEditFlow from "./SurveyEditFlow";
import SurveyAddFlow from "./SurveyAddFlow";

interface IFlowData { id: string; name: string }

interface FlowSidebarProps {
  opened: boolean;
  width?: number;
  onToggle: () => void;
  flows: IFlowData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SurveyFlowSidebar({
  opened,
  width = 350,
  onToggle,
  flows,
  selectedId,
  onSelect,
}: FlowSidebarProps) {
  const collapsedWidth = 50;
  return (
    <Paper
      w={opened ? width : collapsedWidth}
      bg="gray.0"
      h="70vh"
      shadow="md"
      radius="md"
      style={{
        position: "relative",
        transition: "width .2s",
        borderRight: "1.5px solid #eee",
        overflow: "hidden",
      }}
    >
      {/* Nút toggle */}
      <ActionIcon
        onClick={onToggle}
        variant="light"
        size="sm"
        radius="xl"
        style={{
          position: "absolute",
          top: 16,
          right: 12,
          zIndex: 10,
        }}
      >
        {opened ? <IconChevronsLeft size={18} /> : <IconChevronsRight size={18} />}
      </ActionIcon>

      {opened && (
        <Box px={20} pt={20}>
          {/* Tiêu đề sidebar */}
          <Text fw={700} fz={18} c="teal.7" mb={6} style={{ letterSpacing: 0.2 }}>
            Danh sách điều hướng
          </Text>
          <Divider my={8} />

          {/* Nút thêm */}
          <SurveyAddFlow/>
        </Box>
      )}

      {/* List flows */}
      {opened && (
        <ScrollArea h={`calc(80vh - 160px)`} px={12}>
          <Stack gap={8}>
            {flows.map((flow) => (
              <Paper
                key={flow.id}
                radius="md"
                p={10}
                withBorder
                bg={selectedId === flow.id ? "teal.1" : "white"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderColor: selectedId === flow.id ? "#12b886" : "#eee",
                  cursor: "pointer",
                  transition: "background .15s"
                }}
                onClick={() => onSelect(flow.id)}
              >
                <Flex align="center" justify="space-between" w="100%">
                  <Text fz={15} fw={500} truncate style={{ flex: 1 }}>
                    {flow.name}
                  </Text>
                  <Flex gap={4}>
                    <SurveyEditFlow data={flow} />
                    <SurveyDeleteFlow data={flow} />
                  </Flex>
                </Flex>
              </Paper>
            ))}
          </Stack>
        </ScrollArea>
      )}
    </Paper>
  );
}
