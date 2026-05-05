import { Checkbox, CheckboxProps } from "@mantine/core";

interface I extends CheckboxProps { }

export function MyCheckbox({ ...rest }: I) {
    return (
        <Checkbox {...rest}></Checkbox>
    )
}
