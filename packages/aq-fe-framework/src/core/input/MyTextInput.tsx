import { colorsObject } from '@/shared/consts/colorsObject';
import { TextInput, TextInputProps } from '@mantine/core';

export interface MyTextInputProps extends TextInputProps {
    label?: string;
    defaultValue?: string,
}


export function MyTextInput({ label, ...rest }: MyTextInputProps) {
    return (
        <TextInput
            placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}
            label={label}
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
    )
}
