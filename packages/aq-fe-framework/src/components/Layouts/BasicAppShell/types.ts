import { ReactNode } from "react";

export interface I_BasicAppShell_LinkItem {
    pageId?: number;
    name?: string;
    label: string;
    status?: "Default" | "Prototype" | "New" | "Menu" | "Change";
    link?: string;
    linkPrototype?: string;
    links?: I_BasicAppShell_LinkItem[];
    note?: string;
    icon?: ReactNode;
}

export interface BasicAppShellProps {
    isDev?: boolean
    children: React.ReactNode;
    menu: I_BasicAppShell_LinkItem[];
    extraTopRight?: React.ReactNode;
    title?: string;
    logoutRedirect?: string;

}