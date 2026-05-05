"use client"
import { HeaderMegaMenu } from "aq-fe-framework/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children?: ReactNode }) {
    return <HeaderMegaMenu>{children}</HeaderMegaMenu>
}
