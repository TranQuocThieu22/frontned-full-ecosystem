import { Paper, PaperProps, Space, Text } from "@mantine/core";
import { ReactNode } from "react";
import MyFlexColumn from "../FlexColumn/MyFlexColumn";

interface MyPaperTitleProps {
  title?: string;
  children?: ReactNode;
  paperProps?: PaperProps;
}

export default function MyPaperTitle({ title = "", children, paperProps }: MyPaperTitleProps) {
  return (
    <Paper p={"md"} {...paperProps}>
      <Text tt="uppercase" size="lg" fw={700} c="dimmed">
        {title}
      </Text>
      <Space />
      <MyFlexColumn>{children}</MyFlexColumn>
    </Paper>
  );
}
