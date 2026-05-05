import { Checkbox, CheckboxProps } from "@mantine/core";

interface CustomCheckboxProps extends CheckboxProps { }

export function CustomCheckbox({ ...rest }: CustomCheckboxProps) {
    return (
        <Checkbox {...rest}></Checkbox>
    )
}
