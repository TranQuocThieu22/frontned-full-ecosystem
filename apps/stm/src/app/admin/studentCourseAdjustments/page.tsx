'use client'
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_pcsestxdlb_Read from "@/modules-features/admin/pcsestxdlb/F_pcsestxdlb_Read";

//Cấu hình thông số xếp lịch học
export default function Page() {
    return (
        <MyPageContent>
            <F_pcsestxdlb_Read />
        </MyPageContent>
    )
}

