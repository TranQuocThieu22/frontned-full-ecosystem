import { Box, Button, Flex, Group, Paper, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { ReactNode } from "react";

interface MyCardInformationProps {
    title?: string,
    value?: string,
    unit?: string,
    description?: string,
    icon?: ReactNode,
    diff?: number,
    extraControl?: ReactNode
}

export function MyCardInformation({
    title,
    value,
    unit = "",
    description,
    icon,
    diff = 0,
    extraControl
}: MyCardInformationProps) {
    return (
        <Paper withBorder
            p="md"
            radius="md"
            key={title}>
            <Group justify="space-between">
                <Flex direction={"column"}>
                    <Text
                        tt="uppercase"
                        size="lg"
                        c="dimmed"
                    >
                        {title}
                    </Text>
                    {unit == "" ?
                        <Text size="xs" style={{ visibility: 'hidden' }}>Đơn vị: <strong>{unit}</strong></Text>
                        :
                        <Text size="xs">Đơn vị: <strong>{unit}</strong></Text>
                    }
                </Flex>
                <Box>
                    {icon}
                </Box>
            </Group>

            <Group
                mt={"5"}
                align="flex-end"
                gap={"xs"}
            >
                <Text
                    fw={700}
                    fz="h1"
                >{value}
                </Text>
                <Text
                    mb={"2"}
                    c={diff > 0 ? 'teal' : 'red'}
                    fz="h2"
                    fw={500}
                >
                    <span>{diff}%</span>{diff > 0 ? <IconArrowUpRight /> : <IconArrowDownRight />}
                </Text>
            </Group>

            <Group justify="space-between">
                <Text tt="uppercase" fz="xs" c="dimmed">
                    {description}
                </Text>
                {extraControl}
            </Group>
        </Paper>
    );
}