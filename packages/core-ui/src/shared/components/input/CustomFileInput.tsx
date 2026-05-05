import { FileInput, FileInputProps } from '@mantine/core'

interface CustomFileInputProps extends FileInputProps {
    label?: string
}


export function CustomFileInput({ label, ...rest }: CustomFileInputProps) {
    return (
        <FileInput
            label={label}
            placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""}
            {...rest}
        />
    )
}
