import { CloseButton, MantineColor } from '@mantine/core';
import { IconCircleFilled } from '@tabler/icons-react';
import classes from "./CustomPillColor.module.css";
interface CountryPillProps extends React.ComponentPropsWithoutRef<'div'> {
    color?: MantineColor
    onRemove?: () => void;
    children?: string
}

export function CustomPillColor({ onRemove, color, children, ...others }: CountryPillProps) {
    return (
        <div className={classes.pill} {...others}>
            {color && <IconCircleFilled color={color} style={{ width: 12, height: 12 }} />}
            <div className={classes.label}>{children}</div>
            <CloseButton
                onMouseDown={onRemove}
                variant="transparent"
                color="gray"
                size={22}
                iconSize={14}
                tabIndex={-1}
            />
        </div>
    );
}