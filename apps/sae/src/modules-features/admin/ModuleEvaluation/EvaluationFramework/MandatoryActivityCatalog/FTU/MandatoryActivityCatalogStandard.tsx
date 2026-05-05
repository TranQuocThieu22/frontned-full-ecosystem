import { Standard } from "@/interfaces/standard";
import { Flex, Text, Paper, Divider, Badge } from "@mantine/core";

interface MandatoryActivityCatalogStandardProps {
    selectedStandardId: string | null;
    standard: Standard[],
    fixedActivityPointRate: number;
}

export default function MandatoryActivityCatalogStandard({ selectedStandardId, standard, fixedActivityPointRate }: MandatoryActivityCatalogStandardProps) {

    if (selectedStandardId === null || selectedStandardId === 'null') return null;

    const selectedStandard = standard.find(
        (item) => item.id && item.id.toString() === selectedStandardId
    );

    return (
        <Paper
            shadow="xs"
            p="md"
            mt="md"
            mb="md"
            radius="md"
            withBorder
            bg="blue.0"
            style={(theme) => ({
                backgroundColor: theme.colors.blue[0],
                borderColor: theme.colors.blue[2],
            })}
        >
            <Flex direction="column" gap="sm">
                <Flex align="center" gap="xs">
                    <Text size="sm" fw={600} c="dimmed">
                        Điều:
                    </Text>
                    <Text size="sm" fw={500} color="blue">
                        {selectedStandard?.name || ""}
                    </Text>
                </Flex>

                <Divider my={0} />

                <Flex align="center" gap="xs">
                    <Text size="sm" fw={600} c="dimmed">
                        Điểm:
                    </Text>
                    <Badge color="blue" variant="light" size="lg">
                        {selectedStandard?.maxPoint || ""}
                    </Badge>
                </Flex>

                <Flex align="center" gap="xs">
                    <Text size="sm" fw={600} c="dimmed">
                        Tỉ lệ điểm hoạt động cố định:
                    </Text>
                    <Badge color="cyan" variant="light" size="lg">
                        {fixedActivityPointRate}/{selectedStandard?.maxPoint || ""}
                    </Badge>
                </Flex>
            </Flex>
        </Paper>
    );
}