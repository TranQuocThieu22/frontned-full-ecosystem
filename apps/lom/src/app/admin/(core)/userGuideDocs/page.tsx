"use client"
import { object_documentTypes } from '@/constants/object/object_documentTypes'
import { F_userGuideDocs } from '@aq-fe/core-ui/features/core/userGuideDocs/F_userGuideDocs'
import { CustomPageContent } from '@aq-fe/core-ui/shared/components/layout/CustomPageContent/CustomPageContent'


export default function Page() {
    return (
        <CustomPageContent>
            <F_userGuideDocs GuidelineTypeId={object_documentTypes.Guideline} />
        </CustomPageContent>
    )
}
