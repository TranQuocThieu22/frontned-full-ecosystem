import { Box, Group, Paper, PaperProps, Text } from "@mantine/core";
import { ReactNode } from "react";

interface PaperLayoutProps extends PaperProps {
  title: string;
  leftIcon?: ReactNode;
  rightButton?: ReactNode;
  children: ReactNode;
}

export default function PaperLayout({
  title,
  leftIcon,
  rightButton,
  children,
  ...others
}: PaperLayoutProps) {
  return (
    <Paper
      withBorder
      p='md'
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        // Ensure no unsupported style properties are used
      }}
      {...others}
    >
      <Group align="center" justify="space-between">
        <Group>
          {leftIcon && (
            <Box mr={8}>
              {leftIcon}
            </Box>
          )}
          <Text fw={700} tt="uppercase" size="xl">{title}</Text>
        </Group>
        {rightButton}
      </Group>

      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </Box>
    </Paper>
  );
}

