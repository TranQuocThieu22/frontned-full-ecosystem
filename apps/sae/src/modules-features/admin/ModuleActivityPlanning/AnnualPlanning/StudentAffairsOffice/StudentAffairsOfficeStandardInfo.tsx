import { Standard } from "@/interfaces/standard";
import { Flex, Text, Paper, Divider, Badge, useMantineColorScheme } from "@mantine/core";

interface StudentAffairsOfficeStandardInfoProps {
    selectedStandardId: string | null;
    standard: Standard[];
    fixedActivityPointRatio: string; // Changed from number to string
}

export default function StudentAffairsOfficeStandardInfo({
    selectedStandardId,
    standard,
    fixedActivityPointRatio,
}: StudentAffairsOfficeStandardInfoProps) {
    const colorTheme = useMantineColorScheme()
    if (selectedStandardId === null || selectedStandardId === "null") {
        return null;
    }

    const selectedStandard = standard.find(
        (item) => item.id && item.id.toString() === selectedStandardId
    );

    // Don't render if selected standard not found
    if (!selectedStandard) {
        return null;
    }

    return (
        <Paper
            shadow="xs"
            p="md"
            radius="md"
            withBorder
            style={(theme) => ({
                backgroundColor: colorTheme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.blue[0],
                borderColor: colorTheme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.blue[2],
            })}
        >
            <Flex direction="column" gap="sm">
                <Flex align="center" gap="xs">
                    <Text size="sm" fw={600} c="dimmed">
                        Điều:
                    </Text>
                    <Text
                        size="sm"
                        fw={500}
                        c={colorTheme.colorScheme === "dark" ? "blue.4" : "blue"}
                    >
                        {selectedStandard.name || "N/A"}
                    </Text>
                </Flex>

                <Divider my={0} />

                <Flex align="center" gap="xs">
                    <Text size="sm" fw={600} c="dimmed">
                        Điểm tối đa:
                    </Text>
                    <Badge color="blue" variant="light" size="lg">
                        {selectedStandard.maxPoint ?? "N/A"}
                    </Badge>
                </Flex>

                <Flex align="center" gap="xs">
                    <Text size="sm" fw={600} c="dimmed">
                        Tỉ lệ điểm hoạt động cố định:
                    </Text>
                    <Badge color="cyan" variant="light" size="lg">
                        {fixedActivityPointRatio}
                    </Badge>
                </Flex>
            </Flex>
        </Paper>
    );
}
