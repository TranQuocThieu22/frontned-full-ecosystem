import { Group, GroupProps, Text, TextProps } from '@mantine/core';
import { ReactNode } from 'react';

interface CustomLabelValueRowProps {
    label?: ReactNode;
    value?: ReactNode;
    labelProps?: TextProps,
    valueProps?: TextProps,
    groupProps?: GroupProps
    size?: TextProps["size"]
}

export function CustomLabelValueRow({
    label,
    value,
    labelProps,
    valueProps,
    groupProps,
    size
}: CustomLabelValueRowProps) {
    return (
        <Group gap={5} wrap="nowrap" align='center' {...groupProps}>
            <Text fw={"bolder"} size={size} {...labelProps}>{label}:</Text>
            <Text size={size} {...valueProps}>{value}</Text>
        </Group>
    );
};
