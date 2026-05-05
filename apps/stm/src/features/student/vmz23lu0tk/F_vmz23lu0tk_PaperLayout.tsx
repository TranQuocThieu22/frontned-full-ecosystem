import { Box, Divider, Group, Paper, PaperProps, Text } from "@mantine/core";
import { ReactNode } from "react";

interface F_vmz23lu0tk_PaperLayoutProps extends PaperProps {
  title: string;
  leftIcon?: ReactNode;
  rightButton?: ReactNode;
  children: ReactNode;
}

export default function F_vmz23lu0tk_PaperLayout({
  title,
  leftIcon,
  rightButton,
  children,
  ...others
}: F_vmz23lu0tk_PaperLayoutProps) {
  return (
    <Paper
      withBorder
      p='md'
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
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
          <Text tt="uppercase" size="sm" fw={600}>{title}</Text>
        </Group>
        {rightButton}
      </Group>
      <Divider variant="dashed" w="100%" mt="sm" />
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </Box>
    </Paper>
  );
}
