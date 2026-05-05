import { colorsObject } from '@aq-fe/core-ui/shared/consts/object/colorsObject';
import { TextInput, TextInputProps } from '@mantine/core';

export interface MyTextInputProps extends TextInputProps {
    label?: string;
}


export function CustomTextInput({ label, ...rest }: MyTextInputProps) {
    return (
        <TextInput
            inputWrapperOrder={['label', 'input', 'error', 'description']}
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
