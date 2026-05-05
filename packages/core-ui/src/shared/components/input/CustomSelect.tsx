import { colorsObject } from '@aq-fe/core-ui/shared/consts/object/colorsObject';
import { Loader, Select, SelectProps } from '@mantine/core';
import React, { ReactNode } from 'react';

function extractTextFromReactNode(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractTextFromReactNode).join(' ');
    if (React.isValidElement(node)) {
        // Explicitly assert the element type here
        const element = node as React.ReactElement<{ children?: React.ReactNode }>;
        return extractTextFromReactNode(element.props.children);
    }
    return '';
}
export interface CustomSelectProps extends SelectProps {
    label?: ReactNode;
    isLoading?: boolean;
    isError?: boolean;
}

export function CustomSelect({ label, isLoading, isError, ...rest }: CustomSelectProps) {
    let placeholder = '';
    if (isError) {
        placeholder = 'Đã xảy ra lỗi!';
    } else if (isLoading) {
        placeholder = 'Đang tải...';
    } else if (label) {
        const plainTextLabel = extractTextFromReactNode(label).toLowerCase().trim();
        placeholder = `Chọn ${plainTextLabel}`;
    }
    return (
        <Select
            allowDeselect={false}
            searchable
            label={label}
            placeholder={placeholder}
            error={isError ? true : undefined}
            rightSection={isLoading ? <Loader size="xs" /> : undefined}
            // disabled={isLoading || isError}
            styles={(theme) => ({
                input: rest.readOnly
                    ? {
                        backgroundColor: colorsObject.mantineBackgroundTertiary,
                        fontWeight: 500,
                        cursor: 'default',
                        borderColor: theme.colors.gray[4],
                    }
                    : {},
            })}
            {...rest}
        />
    );
}