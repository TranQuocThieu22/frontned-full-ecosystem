'use client'
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import F_hmjzs1n8ly_Read from "@/features/lecturer/hmjzs1n8ly/F_hmjzs1n8ly_Read";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";


//hmjzs1n8ly
export default function Page() {



    return (
        <CustomPageContent>
            <MyFlexColumn>
                <F_hmjzs1n8ly_Read />
            </MyFlexColumn>
        </CustomPageContent>
    )
}

