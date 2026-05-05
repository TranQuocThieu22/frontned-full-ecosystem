"use client"
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F11_4CreateAcademicYearCategory from "@/modules-features/(11)/11-4/F11_4CreateAcademicYearCategory";
import F11_4ReadAcademicYearCategory from "@/modules-features/(11)/11-4/F11_4ReadAcademicYearCategory";

export default function Page() {
    return (
        <MyPageContent

            title="11.4 Danh mục năm học"
            rightTopBar={<F11_4CreateAcademicYearCategory />}>
            <F11_4ReadAcademicYearCategory />
        </MyPageContent>
    )
}
