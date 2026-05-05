import { MyFlexRow } from "@/components";
import { Box, Group, Paper, Text } from "@mantine/core";
import { ReactNode } from "react";


export function AQStatCard2({
    title,
    value,
    unit = "",
    icons,
}: {
    title: string;
    value: string;
    unit?: string;
    description?: string;
    icons: ReactNode;
}) {
    return (
        <Paper
            withBorder
            radius="xl"
            p="lg"
            shadow="md"
            style={{
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
            }
        >
            <Group justify="space-between" align="flex-start">
                <Box>
                    <MyFlexRow gap={6} align={'end'}>
                        <Text
                            size="sm"
                            fw={700}
                            tt="uppercase"
                            variant="gradient"
                            gradient={{ from: "indigo.5", to: "cyan.5", deg: 45 }}
                        >
                            {title}
                        </Text>
                    </MyFlexRow>
                    {unit ? (
                        <Text size="sm" c="gray.6">
                            Đơn vị: <strong>{unit}</strong>
                        </Text>
                    ) : (
                        <Text size="sm" style={{ visibility: "hidden" }}>
                            Đơn vị: _
                        </Text>
                    )}
                </Box>
                <Box>{icons}</Box>
            </Group>

            <Group align="flex-end" gap="xs">
                <Text
                    fz={35}
                    fw={699}
                    style={{
                        letterSpacing: "-1px",
                        transition: "color 0.2s",
                    }}
                >
                    {value}
                </Text>

            </Group>
        </Paper>
    );
}
