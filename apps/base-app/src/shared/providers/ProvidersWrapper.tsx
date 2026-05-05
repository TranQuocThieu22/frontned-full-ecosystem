"use client";
import { theme } from "@/shared/libs/mantine/theme";
import CustomMantineProvider from "@aq-fe/core-ui/shared/providers/CustomMantineProvider";
import CustomReactQueryProvider from "@aq-fe/core-ui/shared/providers/CustomReactQueryProvider";
import { ReactNode } from "react";
export default function ProvidersWrapper({ children }: { children: ReactNode }) {
    return (
        <CustomMantineProvider theme={theme}>
            <CustomReactQueryProvider>
                {children}
            </CustomReactQueryProvider>
        </CustomMantineProvider>
    );
}