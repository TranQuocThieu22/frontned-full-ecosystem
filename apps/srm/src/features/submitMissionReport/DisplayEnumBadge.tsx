import { Badge, BadgeProps } from "@mantine/core";
import { TablerIcon } from "@tabler/icons-react";

type DisplayEnumBadgeProps<T extends number> = {
    enumStatus?: T;
    enumLabel: Record<T, string>;
    enumColor?: Record<T, string>;
    enumIcon?: Record<T, TablerIcon>;
} & BadgeProps;

export function DisplayEnumBadge<T extends number>({
    enumStatus,
    enumLabel,
    enumColor,
    enumIcon,
    ...rest
}: DisplayEnumBadgeProps<T>) {
    if (enumStatus === undefined || enumStatus === null) return null;
    const IconComponent = enumIcon ? enumIcon[enumStatus] as TablerIcon | undefined : undefined;
    const label = enumLabel[enumStatus];

    return (
        label
            ? <Badge
                leftSection={IconComponent ? <IconComponent /> : undefined}
                variant="light"
                color={enumColor?.[enumStatus]}
                radius="lg"
                {...rest}
            >
                {enumLabel[enumStatus]}
            </Badge>
            : <></>
    );
}
