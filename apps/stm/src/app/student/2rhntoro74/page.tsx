'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import F_2rhntoro74_Read from "@/features/student/2rhntoro74/F_2rhntoro74_Read";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";


//2rhntoro74
export default function Page() {



    return (
        <CustomPageContent>
            <MyFlexColumn>
                <F_2rhntoro74_Read />
            </MyFlexColumn>
        </CustomPageContent>
    )
}

