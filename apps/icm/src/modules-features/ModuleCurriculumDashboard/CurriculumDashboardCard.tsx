import { Box, Container, Group, Paper, Stack, Text } from "@mantine/core";
import { MyFlexRow } from "aq-fe-framework/components";

export default function CurriculumDashboardCard(
    { label, value, titleC, subtitleC }: { label: string, value: number, titleC?: string, subtitleC?: string }) {
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
            }>
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
                            {label}
                        </Text>
                    </MyFlexRow>
                    
                </Box>
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
    )
}