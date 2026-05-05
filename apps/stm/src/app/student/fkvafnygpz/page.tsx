'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import F_fkvafnygpz_Read from "@/features/student/fkvafnygpz/F_fkvafnygpz_Read";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";


//fkvafnygpz
export default function Page() {



    return (
        <CustomPageContent>
            <MyFlexColumn>
                <F_fkvafnygpz_Read />
            </MyFlexColumn>
        </CustomPageContent>
    )
}

