import { Group, GroupProps } from "@mantine/core";
import { ReactNode } from "react";

interface CustomFlexEndProps extends GroupProps {
    children: ReactNode;
}

export function CustomFlexEnd({ children, ...rest }: CustomFlexEndProps) {
    return (
        <Group justify="end" mt={"md"} {...rest}>
            {children}
        </Group>
    );
}
