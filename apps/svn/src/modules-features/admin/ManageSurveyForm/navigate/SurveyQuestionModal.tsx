"use client";

import { Modal, Paper, Text, ScrollArea, Button, Flex } from "@mantine/core";
import { IFlowBlock } from "./SurveyFlowTable";
import { IconAsteriskSimple } from "@tabler/icons-react";

interface SurveyQuestionModalProps {
  opened: boolean;
  onClose: () => void;
  questionList: IFlowBlock[]; // hoặc IFlowBlock[] nếu có nhiều loại
  onSelect: (questionId: string) => void;
}

export function SurveyQuestionModal({
  opened,
  onClose,
  questionList,
  onSelect,
}: SurveyQuestionModalProps) {
  return (
    <Modal
      
      opened={opened}
      onClose={onClose}
      title="Chọn một câu hỏi"
      size="90%"
      centered
      scrollAreaComponent={ScrollArea.Autosize}
      overlayProps={{ blur: 2 }}
    >
      <ScrollArea h={420}>
        {questionList.map((q, idx) => (
          <Paper
            key={q.id}
            radius="md"
            p={12}
            withBorder
            mb={12}
            style={{ cursor: "pointer", background: "#f8fafc" }}
            onClick={() => onSelect(q.id)}
            tabIndex={0}
          >
            <Flex>
              <Text fw={700} c="blue.8" m={10}>
                {idx + 1}
              </Text>
              <Paper
                key={q.id}
                shadow="xs"
                p="md"
                w={"100%"}
                radius="md"
                withBorder
                mt="sm"
              >
                <Flex>
                  {q.required ? (
                    <IconAsteriskSimple
                      style={{
                        width: "12px",
                        height: "12px",
                        paddingRight: 3,
                        paddingTop: 3,
                      }}
                      color="red"
                      stroke={3}
                    />
                  ) : (
                    <></>
                  )}
                  <Text>
                    <Text fw={500} c="#0F5799" td="underline" pr={4} span>
                      {q.id}
                    </Text>
                    {q.title}
                  </Text>
                </Flex>
              </Paper>
            </Flex>
          </Paper>
        ))}
      </ScrollArea>
    </Modal>
  );
}
