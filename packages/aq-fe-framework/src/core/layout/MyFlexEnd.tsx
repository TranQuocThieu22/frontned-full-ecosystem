import { Group, GroupProps } from "@mantine/core";
import { ReactNode } from "react";

interface MyFlexEndProps extends GroupProps {
    children: ReactNode;
}

export function MyFlexEnd({ children, ...rest }: MyFlexEndProps) {
    return (
        <Group justify="end" mt={"md"} {...rest}>
            {children}
        </Group>
    );
}
