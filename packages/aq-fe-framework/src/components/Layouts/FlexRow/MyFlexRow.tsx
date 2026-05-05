import { Flex, FlexProps } from "@mantine/core";
import { ReactNode } from "react";

interface IFlexRow extends FlexProps {
    children: ReactNode;
}

export function MyFlexRow({ children, ...rest }: IFlexRow) {
    return (
        <Flex gap={"md"} align={"center"} {...rest}>
            {children}
        </Flex>
    );
}
