import { DateInput, DateInputProps } from '@mantine/dates';

interface CustomDateInputProps extends DateInputProps {
    label?: string
}

export function CustomDateInput({ label, ...rest }: CustomDateInputProps) {
    return (
        <DateInput label={label} placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""}  {...rest} />
    )
}
