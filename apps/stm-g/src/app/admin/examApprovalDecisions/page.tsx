'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_pfkendystd_Read from "@/modules-features/admin/pfkendystd/F_pfkendystd_Read";


export default function Page() {
    return (
        <MyPageContent>
            <F_pfkendystd_Read />
        </MyPageContent>
    )
}

