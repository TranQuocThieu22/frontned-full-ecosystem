import { FileInput, FileInputProps } from '@mantine/core'

interface MyFileInputPreviewProps extends FileInputProps {
    label?: string
}


export function MyFileInputPreview({ label, ...rest }: MyFileInputPreviewProps) {
    return (
        <FileInput
            label={label}
            placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""}
            {...rest}
        />
    )
}
