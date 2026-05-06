import { colorsObject } from '@aq-fe/aq-legacy-framework/shared/const/object/colorsObject';
import { Group, Paper, PaperProps, Stack, Text } from '@mantine/core';

export interface MyInfoBoxItem {
    label: string;
    value: React.ReactNode;
}

export interface MyInfoBoxProps {
    title?: string;
    data: MyInfoBoxItem[];
    paperProps?: PaperProps //
}


export function CustomInfoBox({ title, data, paperProps }: MyInfoBoxProps) {
    return (
        <Paper withBorder shadow="xs" radius="md" p="md" bg={colorsObject.mantineBackgroundBlueLight} {...paperProps}>
            <Stack >
                {title && (
                    <Text fw={600} size="sm">
                        {title}
                    </Text>
                )}

                {data.map((item, index) => (
                    <Group key={index} justify="space-between">
                        <Text size="sm" fw={500} c={'dimmed'}>
                            {item.label}
                        </Text>
                        <Text size="sm" fw={500}>
                            {item.value}
                        </Text>
                    </Group>
                ))}
            </Stack>
        </Paper>
    );
}
