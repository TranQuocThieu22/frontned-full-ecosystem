import { Group, Text } from "@mantine/core";

interface CustomIconTextProps {
    icon?: React.ElementType;
    text?: string;
}

export function CustomIconText({ icon: Icon, text }: CustomIconTextProps) {
    return (
        <Group wrap="nowrap" gap={10} mt={3}>
            {Icon && <Icon stroke={1.5} size={16} />}
            <Text fz="lg" c="dimmed">
                {text}
            </Text>
        </Group>
    );
}