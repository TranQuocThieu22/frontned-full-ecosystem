'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_jpsfdbcmfp_Read from "@/modules-features/admin/jpsfdbcmfp/F_jpsfdbcmfp_Read";



export default function Page() {
    return (
        <MyPageContent >
            <F_jpsfdbcmfp_Read />
        </MyPageContent>
    )
}