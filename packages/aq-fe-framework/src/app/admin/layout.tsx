"use client"
import { MyPageContent } from "@/components";
import { BasicAppShell } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import { menuData } from "../../data/menuData";

export default function Layout({ children }: { children?: React.ReactNode }) {
    // const menu = getAllMenuWithPageId(menuData)
    // console.log(generateEnumFromPageList(menuaa, '', 'pageId'));
    // const config = useConfig({ key: "baseURL" })
    // console.log(config.data);

    return (
        <BasicAppShell isDev={true} menu={menuData}>
            <MyPageContent>
                {children}
            </MyPageContent>
        </BasicAppShell>
    );
}
