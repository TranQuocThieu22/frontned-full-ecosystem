
import { BasicAppShell } from "@/components/Layouts/BasicAppShell/BasicAppShell";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import { ReactNode } from "react";

const menu = [
    { label: "Đăng ký khóa học", href: "/student/dang-ky-khoa-hoc" },
    { label: "Đăng ký khóa thi", href: "/student/dang-ky-khoa-thi" }
]

export default function Layout({ children }: { children?: ReactNode }) {

    return <BasicAppShell menu={menu}>
        <MyPageContent>
            {children}
        </MyPageContent>
    </BasicAppShell>;
}
