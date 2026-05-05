// components/SectionHeader.tsx
import { Stack, Text } from "@mantine/core";

interface SectionHeaderProps {
    title: string;
    description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
    return (
        <Stack gap={2}>
            <Text size="md" fw={500}>
                {title}
            </Text>
            <Text mb="md" size="sm">
                {description}
            </Text>
        </Stack>
    );
}
