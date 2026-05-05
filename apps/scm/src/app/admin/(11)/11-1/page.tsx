"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F11_1CreateRoleActivityCategory from "@/modules-features/(11)/11-1/F11_1CreateRoleActivityCategory";
import F11_1ReadRoleActivityCategory from "@/modules-features/(11)/11-1/F11_1ReadRoleActivityCategory";

export default function Page() {
    return (
        <MyPageContent

            title="11.1 Danh mục vai trò hoạt động"
            rightTopBar={<F11_1CreateRoleActivityCategory />}>
            <F11_1ReadRoleActivityCategory />
        </MyPageContent>
    )
}
