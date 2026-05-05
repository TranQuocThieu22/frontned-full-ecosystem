import { SimpleGrid, SimpleGridProps } from "@mantine/core";
import { ReactNode } from "react";

export interface CustomSimpleGridProps extends SimpleGridProps {
    children?: ReactNode
}

export default function CustomSimpleGrid({
    children,
    ...rest
}: CustomSimpleGridProps) {
    return (
        <SimpleGrid cols={{ base: 1, md: 2 }} {...rest}>
            {children}
        </SimpleGrid>
    )
}
