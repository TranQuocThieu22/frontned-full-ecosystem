"use client"
import F11_4CreateAcademicYearCategory from "@/modules-features/admin/SystemMasterData/DM-nam-hoc/F11_4CreateAcademicYearCategory";
import F11_4ReadAcademicYearCategory from "@/modules-features/admin/SystemMasterData/DM-nam-hoc/F11_4ReadAcademicYearCategory";
import { MyPageContent } from "aq-fe-framework/components";

export default function Page() {
    return (
        < MyPageContent >
            <F11_4ReadAcademicYearCategory />
        </MyPageContent>
    )
}
