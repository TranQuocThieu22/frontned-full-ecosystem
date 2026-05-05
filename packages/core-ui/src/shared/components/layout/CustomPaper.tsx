import { Paper, PaperProps, useComputedColorScheme } from "@mantine/core";
import { ReactNode } from "react";

export interface CustomPaperProps extends PaperProps {
    children?: ReactNode
}

export default function CustomPaper({
    children,
    ...rest
}: CustomPaperProps) {
    const theme = useComputedColorScheme()
    return (
        <Paper
            p="md"
            bg={theme == "light" ? "#fafafa" : "#27272a"}
            style={{
                borderRadius: "8px",
                boxShadow:
                    "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)"
            }}
            {...rest}
        >
            {children}
        </Paper>
    )
}
