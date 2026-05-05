'use client';
import {
  Text,
  Paper,
  Tabs,
  Box,
  ActionIcon,
  Stack,
  Group
} from "@mantine/core";
import { useState } from "react";
import FeatSurveyFlowTable from "../navigate/SurveyFlowTable";
import DecorationView from "../decorate/DecorateView";
import DesignerLayout from "./DesignerLayout";

const steps = [
  { value: "step1", label: "Thiết kế" },
  { value: "step2", label: "Điều hướng" },
  { value: "step3", label: "Trang trí" }
];

export default function SurveyDesignMiddleTab() {
  const [activeTab, setActiveTab] = useState("step1");

  return (
    <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)}>
      <Paper radius="md" mb="xs" p={14}>
        <Group justify="space-between" px="15%">
          {steps.map((step, index) => (
            <Stack key={step.value} gap={2} align="center">
              <ActionIcon
                size="lg"
                radius="xl"
                variant="light"
                color={activeTab === step.value ? "white" : "gray"}
                onClick={() => setActiveTab(step.value)}
                style={{
                  background:
                    activeTab === step.value
                      ? "linear-gradient(135deg, rgb(0 145 176), rgb(112 224 0 / 87%))"
                      : undefined,
                  color: activeTab === step.value ? "white" : undefined,
                  boxShadow:
                    activeTab === step.value
                      ? "0 0 10px rgba(56, 176, 0, 0.6)"
                      : "none",
                  transition: "all 0.3s ease"
                }}
              >
                {index + 1}
              </ActionIcon>
              <Text fw={activeTab === step.value ? 600 : 400} c={activeTab === step.value ? "green" : "gray"}>
                {step.label}
              </Text>
            </Stack>
          ))}
        </Group>
      </Paper>

      <Tabs.Panel value="step1">
        <DesignerLayout />
      </Tabs.Panel>

      <Tabs.Panel value="step2">
        <FeatSurveyFlowTable />
      </Tabs.Panel>

      <Tabs.Panel value="step3">
        <DecorationView />
      </Tabs.Panel>
    </Tabs>
  );
}
