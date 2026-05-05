import { Badge } from "@mantine/core";
import { TablerIcon } from "@tabler/icons-react";

type DisplayEnumBadgeProps<T extends number> = {
    enumStatus?: T;
    enumLabel: Record<T, string>;
    enumColor: Record<T, string>;
    enumIcon?: Record<T, TablerIcon>;
};

export function DisplayEnumBadge<T extends number>({
    enumStatus,
    enumLabel,
    enumColor,
    enumIcon,
    ...rest
}: DisplayEnumBadgeProps<T>) {
    if (enumStatus === undefined) return null;
    const IconComponent = enumIcon ? enumIcon[enumStatus] as TablerIcon | undefined : undefined;
    const iconLabel = enumLabel[enumStatus];

    return (
        iconLabel
            ? <Badge
                w="100%"
                leftSection={IconComponent ? <IconComponent /> : undefined}
                variant="light"
                color={enumColor[enumStatus]}
                radius="lg"
                {...rest}
            >
                {enumLabel[enumStatus]}
            </Badge>
            : <></>
    );
}
