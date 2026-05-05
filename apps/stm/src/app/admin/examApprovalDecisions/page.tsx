'use client'
import F_pfkendystd_Read from "@/features/admin/pfkendystd/F_pfkendystd_Read";
import { CustomPageContent } from "@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent";


export default function Page() {
    return (
        <CustomPageContent>
            <F_pfkendystd_Read />
        </CustomPageContent>
    )
}

