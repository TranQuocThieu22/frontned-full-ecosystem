'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_xcivliulbu_Read from "@/modules-features/admin/xcivliulbu/F_xcivliulbu_Read";



export default function Page() {
    return (
        <MyPageContent >
            <F_xcivliulbu_Read />
        </MyPageContent>
    )
}