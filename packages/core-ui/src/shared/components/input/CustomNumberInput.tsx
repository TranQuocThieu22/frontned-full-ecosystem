import { NumberInput, NumberInputProps } from "@mantine/core";
import { IconCurrencyDollar, IconNumbers } from "@tabler/icons-react";

export interface CustomNumberInputProps extends NumberInputProps {
    label?: string;
    inputType?: "number" | "currency";
}

export function CustomNumberInput({ min, label, inputType = "number", ...rest }: CustomNumberInputProps) {
    const isCurrency = inputType === "currency";
    return (
        <NumberInput
            inputWrapperOrder={['label', 'input', 'error', 'description']}
            label={label}
            min={min || 0}
            thousandSeparator={isCurrency}
            placeholder={label ? `Nhập ${label?.toLowerCase()}` : ""}
            rightSection={isCurrency ? <IconCurrencyDollar /> : <IconNumbers />}
            {...rest}
        />
    );
}
