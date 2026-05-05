import { Switch, SwitchProps } from "@mantine/core";

interface CustomSwitchProps extends SwitchProps { }

export function CustomSwitch({ ...rest }: CustomSwitchProps) {
    return (
        <Switch
            {...rest}
        />
    )
}
