import { Switch, SwitchProps } from "@mantine/core";
import { ChangeEvent } from "react";

interface CustomSwitchProps extends Omit<SwitchProps, "onChange"> {
    onChange?: (checked: boolean) => void;
}

export function CustomSwitch({ onChange, ...rest }: CustomSwitchProps) {
    return (
        <Switch
            {...rest}
            onChange={(e) => onChange?.(e.currentTarget.checked)}
        />
    );
}
