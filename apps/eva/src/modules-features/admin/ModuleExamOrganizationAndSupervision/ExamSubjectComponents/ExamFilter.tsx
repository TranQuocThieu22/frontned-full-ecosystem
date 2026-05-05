'use client';

import { Group, Paper, Text } from "@mantine/core";
import { IconCalendar, IconCalendarEvent } from "@tabler/icons-react";
import { MySelect } from "aq-fe-framework/components";
import { useState } from "react";

export default function ExamFilter() {
    const [suject, setSuject] = useState<string | undefined | null>("1");

    return (
        <>
            <Paper shadow="sm" p="10" radius="sm" withBorder mb="lg">
                <Group gap="md">
                    <MySelect
                        w={{ base: "100%", md: "48%" }}
                        label="Chọn kỳ thi"
                        data={[
                            { value: "1", label: "Z2024T1D1 - Thi cuối học kỳ Đợt 1 năm học 2024 - học kỳ 1" },
                            { value: "2", label: "Z2024T1D2 - Thi cuối học kỳ Đợt 2 năm học 2024 - học kỳ 1" },
                        ]}
                        value={suject}
                        onChange={(value) => setSuject(value ?? undefined)}
                    />

                    <Group
                        mt={24}
                        w={{ base: "100%", md: "48%" }}
                        justify="space-between" grow
                    >
                        <Paper p="7" radius="sm" bg="green.0" withBorder>
                            <Group align="center" gap="xs">
                                <IconCalendar size={18} color="var(--mantine-color-green-6)" />
                                <Text size="sm" fw={500} c="green.8">
                                    Ngày bắt đầu:
                                </Text>
                                <Text size="sm" fw={700} c="green.9">
                                    20/03/2025
                                </Text>
                            </Group>
                        </Paper>

                        <Paper p="7" radius="sm" bg="red.0" withBorder>
                            <Group align="center" gap="xs">
                                <IconCalendarEvent size={18} color="var(--mantine-color-red-6)" />
                                <Text size="sm" fw={500} c="red.8">
                                    Ngày kết thúc:
                                </Text>
                                <Text size="sm" fw={700} c="red.9">
                                    27/03/2025
                                </Text>
                            </Group>
                        </Paper>
                    </Group>

                </Group>
            </Paper>
        </>
    )
}