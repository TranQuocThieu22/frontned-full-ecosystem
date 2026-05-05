'use client'
import F_pcsestxdlb_Read from "@/features/admin/pcsestxdlb/F_pcsestxdlb_Read";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";

//Cấu hình thông số xếp lịch học
export default function Page() {
    return (
        <CustomPageContent>
            <F_pcsestxdlb_Read />
        </CustomPageContent>
    )
}

