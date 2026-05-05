import React from 'react';
import { Group, Text, ActionIcon } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { QuestionPaperBox } from './QuestionPaperBox';
import { IBreakPageQuestionInfoViewModel } from './interfaces/IBreakPageQuestionInfoViewModel';

export default function BreakPageQuestion({
  data,
  onChange,
}: {
  readonly data?: IBreakPageQuestionInfoViewModel;
  readonly onChange?: (data: IBreakPageQuestionInfoViewModel) => void;
}) {
  return (
    <QuestionPaperBox>
        <Group justify="space-between" align="center">
            <ActionIcon variant="filled" color="orange" radius="xl" size="sm">
                <IconChevronLeft />
            </ActionIcon>
            <Text fw={500}>Trang 1/n</Text>
            <ActionIcon variant="filled" color="orange" radius="xl" size="sm">
                <IconChevronRight />
            </ActionIcon>
        </Group>
    </QuestionPaperBox>
  );
} 