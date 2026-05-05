"use client";

import { MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";

/**
 * Các trang auth (login, …) luôn dùng light scheme,
 * không bị ảnh hưởng bởi dark mode đã chọn ở phần còn lại của app.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <MantineProvider forceColorScheme="light">
            {children}
        </MantineProvider>
    );
}
