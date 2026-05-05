import { Badge, BadgeProps } from "@mantine/core";


export default function DisplayConclusionStatus({ title, ...rest }: { title?: string } & BadgeProps) {
    // const iconName = 'Icon123';
    // const IconComponent = TablerIcons[iconName];

    return (
        title ?
            <Badge
                w="100%"
                // leftSection={IconComponent ? <IconComponent size={16} /> : null}
                variant="light"
                radius="sm"
                styles={{
                    root: {
                        textTransform: 'none'
                    }
                }}
                {...rest}
            >
                {title}
            </Badge>
            : <></>
    );
}