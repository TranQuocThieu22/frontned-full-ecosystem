import { BadgeVariant, Loader, Select, SelectProps } from "@mantine/core";
import { IconPlugConnectedX } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
    defaultColor?: string,
    variant?: BadgeVariant,
    isLoading?: boolean,
    isError?: boolean
} & SelectProps

export default function ConclusionSelectShared({ defaultColor, variant, onChange, isLoading, isError, ...rest }: Props) {
    const [comboboxItemSelected, setComboxItemSelected] = useState<any>({ color: defaultColor });

    return <Select
        disabled={isError || isLoading}
        rightSection={isLoading ? <Loader size="xs" /> : isError ? <IconPlugConnectedX size="xs" color="red" stroke={2.5} /> : undefined}
        styles={(theme) => {
            const colors = theme.variantColorResolver({
                color: comboboxItemSelected?.color || "gray",
                theme,
                variant: variant || "filled",
                autoContrast: true,
            });

            return {
                input: {
                    backgroundColor: colors.background,
                    color: colors.color,
                    borderColor: colors.border,
                    fontWeight: 600,
                },
            };
        }}
        chevronColor={comboboxItemSelected?.color || undefined}
        onChange={(value, option) => {
            setComboxItemSelected(option);
            onChange?.(value, option);
        }}
        {...rest}
    />
}