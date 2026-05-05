'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyPageContent from "@/components/Layouts/PageContent/MyPageContent";
import F_fkvafnygpz_Read from "@/modules-features/student/fkvafnygpz/F_fkvafnygpz_Read";


//fkvafnygpz
export default function Page() {


    
    return (
        <MyPageContent>
            <MyFlexColumn>
                    <F_fkvafnygpz_Read />
            </MyFlexColumn>
        </MyPageContent>
    )
}

