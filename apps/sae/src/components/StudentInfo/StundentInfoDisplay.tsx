import { CurrentUser } from '@/interfaces/currentUser'
import { Paper, Group, ThemeIcon, Title, Badge, Divider, Flex, Box, Text, useMantineColorScheme } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import React from 'react'
interface Props {
    eventQuantityCount?: number
    eventTotalScoreArchived?: number
    currentUser: CurrentUser
}
export default function UserInfoDisplay({ currentUser, eventQuantityCount, eventTotalScoreArchived }: Props) {
    const colorTheme = useMantineColorScheme()
    return (
        <Paper withBorder p="lg" radius="md" shadow="sm" mb={20}>
            <Group justify="space-between" mb="md">
                <Group>
                    <ThemeIcon variant="light" size="xl" radius="md" color="blue">
                        <IconUser size={24} />
                    </ThemeIcon>
                    <div>
                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Thông tin cá nhân</Text>
                        <Title order={3}>{currentUser.fullName || "N/A"}</Title>
                    </div>
                </Group>
                <Badge size="lg" variant="dot" color="blue">Sinh viên</Badge>
            </Group>

            <Divider my="sm" variant="dashed" />

            <Flex gap="xl" wrap="wrap" align="center">
                <Box>
                    <Text size="sm" c="dimmed">Mã sinh viên:</Text>
                    <Text fw={500}>{currentUser.code || "—"}</Text>
                </Box>
                <Box>
                    <Text size="sm" c="dimmed">Email:</Text>
                    <Text fw={500}>{currentUser.email || "—"}</Text>
                </Box>
                <Box>
                    <Text size="sm" c="dimmed">Ngành:</Text>
                    <Text fw={500}>{"—"}</Text>
                </Box>
                <Box>
                    <Text size="sm" c="dimmed">Khoa:</Text>
                    <Text fw={500}>{"—"}</Text>
                </Box>
                <Group ml="auto">
                    <Paper
                        withBorder
                        p="xs"
                        radius="sm"
                        bg={colorTheme.colorScheme === "dark" ? "dark.6" : "blue.0"}
                        style={{
                            borderColor: colorTheme.colorScheme === "dark"
                                ? 'var(--mantine-color-dark-4)'
                                : 'var(--mantine-color-blue-2)'
                        }}
                    >
                        <Group gap="xl">
                            <Text
                                fw={600}
                                size="sm"
                                c={colorTheme.colorScheme === "dark" ? "blue.4" : "blue.9"}
                            >
                                Số lượng hoạt động đã tham gia: <Text span fw={800}>{eventQuantityCount}</Text>
                            </Text>
                            <Text
                                fw={600}
                                size="sm"
                                c={colorTheme.colorScheme === "dark" ? "blue.4" : "blue.9"}
                            >
                                Tổng điểm tích lũy của các hoạt động: <Text span fw={800}>{eventTotalScoreArchived}</Text>
                            </Text>
                        </Group>
                    </Paper>
                </Group>
            </Flex>
        </Paper>
    )
}
