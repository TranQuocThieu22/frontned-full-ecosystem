import {
    Button,
    Group,
    Paper,
    RingProgress,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import { IconCheck, IconLogout, IconX } from "@tabler/icons-react";

// Helper component for displaying stats (Correct, Incorrect, etc.)
// This makes the main component cleaner and is reusable.
interface StatCardProps {
    label: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
    return (
        <Paper withBorder radius="md" p="sm">
            <Group>
                <ThemeIcon color={color} variant="light" size={36} radius="md">
                    {icon}
                </ThemeIcon>
                <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                        {label}
                    </Text>
                    <Text fw={600} size="lg">
                        {value}
                    </Text>
                </Stack>
            </Group>
        </Paper>
    );
}


export default function F_TestRoom_Complete() {
    const correctAnswers = 11;
    const totalQuestions = 20;
    const score = 5.5; // Made it 5.5 to show decimal handling
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
        // Use a max-width to keep the component centered and readable on large screens
        <Paper shadow="lg" withBorder p="xl" mx="auto">
            <Stack align="center" gap="xl">
                <Stack align="center" gap={4}>
                    <Title
                        order={2}
                        ta="center"
                        variant="gradient"
                    >
                        🎉 Hoàn thành bài thi!
                    </Title>
                    <Text c="dimmed" size="sm">
                        Đây là kết quả của bạn.
                    </Text>
                </Stack>

                <RingProgress
                    size={180}
                    thickness={14}
                    roundCaps
                    sections={[
                        { value: percentage, color: "teal", tooltip: `${percentage}% Chính xác` },
                    ]}
                    label={
                        <Stack align="center" justify="center" gap={0}>
                            <Text c="teal" fw={700} ta="center" size="3.5rem" lh={1}>
                                {score.toFixed(1)}
                            </Text>
                            <Text c="dimmed" ta="center" size="sm">
                                Điểm
                            </Text>
                        </Stack>
                    }
                />

                <SimpleGrid cols={2} w="100%">
                    <StatCard
                        label="Trả lời đúng"
                        value={`${correctAnswers}/${totalQuestions}`}
                        icon={<IconCheck size={22} stroke={2.5} />}
                        color="green"
                    />
                    <StatCard
                        label="Trả lời sai"
                        value={`${totalQuestions - correctAnswers}/${totalQuestions}`}
                        icon={<IconX size={22} stroke={2.5} />}
                        color="red"
                    />
                </SimpleGrid>

                <Button
                    variant="filled"
                    color="blue" // Or 'teal', 'red', etc. depending on desired emphasis
                    size="md"
                    leftSection={<IconLogout size={18} />}
                    mt="md" // Added margin-top for spacing
                    fullWidth // Makes the button take the full width of its container
                >
                    Đăng xuất
                </Button>

            </Stack>
        </Paper>
    );
}