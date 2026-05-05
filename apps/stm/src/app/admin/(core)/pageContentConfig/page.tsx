"use client"
import { adminMenuData } from '@/data/adminMenuData'
import PageContentTable from '@aq-fe/core-ui/features/core/pageContent/PageContentTable'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'

export default function Page() {
    return (
        <CustomPageContent>
            <PageContentTable menuData={adminMenuData} />
        </CustomPageContent>
    )
}