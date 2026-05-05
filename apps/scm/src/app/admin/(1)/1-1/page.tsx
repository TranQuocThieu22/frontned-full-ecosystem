'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F1_1CreateUser from "@/modules-features/(1)/1-1/F1_1CreateUser";
import F1_1ReadUser from "@/modules-features/(1)/1-1/F1_1ReadUser";

export default function Page() {
    return (
        <MyPageContent title="1.1 Quản lí tài khoản" rightTopBar={<F1_1CreateUser />} >
            <F1_1ReadUser />
        </MyPageContent>
    )
}
