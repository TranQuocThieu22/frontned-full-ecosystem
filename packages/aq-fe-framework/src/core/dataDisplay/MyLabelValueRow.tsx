import { Group, GroupProps, Text, TextProps } from '@mantine/core';
import { ReactNode } from 'react';

interface LabelValueRowProps {
    label?: ReactNode;
    value?: ReactNode;
    spacing?: number;
    labelProps?: TextProps,
    valueProps?: TextProps,
    groupProps?: GroupProps
    size?: TextProps["size"]
}

export function MyLabelValueRow({
    label,
    value,
    labelProps,
    valueProps,
    groupProps,
    size
}: LabelValueRowProps) {
    return (
        <Group gap={5} wrap="nowrap" align='center' {...groupProps}>
            <Text fw={"bolder"} size={size} {...labelProps}>{label}:</Text>
            <Text size={size} {...valueProps}>{value}</Text>
        </Group>
    );
};
