import { Standard } from "@/interfaces/standard";
import { Flex, Text, Paper, Divider, Badge, useMantineColorScheme } from "@mantine/core";

interface DeploymentDeployStandardInfoProps {
    standardId: string | null;
    standard: Standard[];
}

export default function DeploymentDeployStandardInfo({
    standardId,
    standard,
}: DeploymentDeployStandardInfoProps) {
    const colorTheme = useMantineColorScheme()
    if (standardId === null || standardId === "all") {
        return null;
    }

    const selectedStandard = standard.find(
        (item) => item.id && item.id.toString() === standardId
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
            bg="blue.0"
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
                        Điểm:
                    </Text>
                    <Badge color="blue" variant="light" size="lg">
                        {selectedStandard.maxPoint ?? "N/A"}
                    </Badge>
                </Flex>
            </Flex>
        </Paper>
    );
}
