import { Flex, FlexProps } from "@mantine/core";
import { ReactNode } from "react";

interface CustomlexColumnProps extends FlexProps {
    children?: ReactNode;
}

export function CustomFlexColumn({ children, ...rest }: CustomlexColumnProps) {
    return (
        <Flex direction={"column"} gap={"md"} {...rest}>
            {children}
        </Flex>
    );
}
