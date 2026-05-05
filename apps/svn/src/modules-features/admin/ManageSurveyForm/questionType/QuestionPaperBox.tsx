import React from "react";
import { Paper, rem, Group } from "@mantine/core";

interface QuestionPaperBoxProps {
  onClick?: () => void;
  onDelete?: (e: React.MouseEvent) => void;
  onAdd?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  isAnswerRequired?: boolean;
}

export const QuestionPaperBox: React.FC<QuestionPaperBoxProps> = ({
  onClick,
  onDelete,
  onAdd,
  children,
  isAnswerRequired = false,
}) => (
  <Group align="flex-start" gap={8} style={{ width: "100%" }}>
    <Paper
      onClick={onClick}
      radius={12}
      p={16}
      w="100%"
      style={{
        position: "relative",
        cursor: "pointer",
      }}
    >
      {isAnswerRequired && (
        <span
          style={{
            color: "red",
            position: "absolute",
            top: rem(4),
            left: rem(8),
            fontSize: 18,
            fontWeight: 700,
            zIndex: 2,
            userSelect: "none",
          }}
        >
          *
        </span>
      )}
      {children}
    </Paper>
  </Group>
);
