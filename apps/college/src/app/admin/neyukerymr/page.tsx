'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_neyukerymr_Read from "@/modules-features/admin/neyukerymr/F_neyukerymr_Read";




export default function Page() {
    return (
        <MyPageContent >
            <F_neyukerymr_Read />
        </MyPageContent>
    )
}