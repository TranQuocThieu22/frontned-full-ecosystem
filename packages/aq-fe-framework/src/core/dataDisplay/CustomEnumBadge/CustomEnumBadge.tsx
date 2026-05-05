import { Badge, BadgeProps } from "@mantine/core";
import { TablerIcon } from "@tabler/icons-react";

type CustomEnumBadgeProps<T extends number> = {
    value?: T;
    enumLabel: Record<T, string>;
    enumColor?: Record<T, string>;
    enumIcon?: Record<T, TablerIcon>;
} & BadgeProps;

export function CustomEnumBadge<T extends number>({
    value,
    enumLabel,
    enumColor,
    enumIcon,
    ...rest
}: CustomEnumBadgeProps<T>) {
    if (value === undefined || value === null) return null;
    const IconComponent = enumIcon ? enumIcon[value] as TablerIcon | undefined : undefined;
    const label = enumLabel[value];

    return (
        label
            ? <Badge
                w="100%"
                leftSection={IconComponent ? <IconComponent /> : undefined}
                variant="light"
                color={enumColor ? enumColor[value] : undefined}
                radius="lg"
                {...rest}
            >
                {enumLabel[value]}
            </Badge>
            : <></>
    );
}
