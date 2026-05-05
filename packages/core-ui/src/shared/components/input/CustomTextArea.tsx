import { Textarea, TextareaProps } from '@mantine/core';

interface CustomTextAreaProps extends TextareaProps {
    label?: string
}

export function CustomTextArea({ label, ...rest }: CustomTextAreaProps) {
    return (
        <Textarea autosize minRows={5} maxRows={5} label={label} placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}{...rest} />
    )
}
