"use client";
import { ReactNode } from "react";
import CustomMantineProvider from "./CustomMantineProvider";
import CustomReactQueryProvider from "./CustomReactQueryProvider";

export default function CustomProvider({ children }: { children?: ReactNode }) {
    return (
        <CustomReactQueryProvider>
            <CustomMantineProvider>
                {children}
            </CustomMantineProvider>
        </CustomReactQueryProvider>
    );
}
