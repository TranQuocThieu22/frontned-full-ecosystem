import { Flex, FlexProps } from "@mantine/core";
import { ReactNode } from "react";

interface CustomFlexRowProps extends FlexProps {
    children: ReactNode;
}

export function CustomFlexRow({ children, ...rest }: CustomFlexRowProps) {
    return (
        <Flex gap={"md"} align={"center"} {...rest}>
            {children}
        </Flex>
    );
}
