import { Autocomplete, AutocompleteProps } from '@mantine/core';


interface CustomAutocompleteProps extends AutocompleteProps {
    label?: string;
}

export function CustomAutocomplete({ label, ...rest }: CustomAutocompleteProps) {
    return (
        <Autocomplete
            placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}
            label={label}
            {...rest}
        />
    )
}