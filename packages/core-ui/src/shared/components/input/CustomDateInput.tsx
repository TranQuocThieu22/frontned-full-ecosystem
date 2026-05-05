import { DateInput, DateInputProps } from '@mantine/dates';

interface CustomDateInputProps extends DateInputProps {
    label?: string
    /** Maximum selectable date. Defaults to 9999-12-31 if not set. */
    maxDate?: Date;
}

export function CustomDateInput({ label, maxDate, ...rest }: CustomDateInputProps) {
    return (
        <DateInput
            label={label}
            placeholder={label ? `Chọn ${label?.toLowerCase()}` : ""}
            maxDate={maxDate ?? new Date('9999-12-31')}
            {...rest}
        />
    )
}
