"use client"
import { F_userGuideDocs } from '@/modules-features/admin/core/userGuideDocs/F_userGuideDocs'
import { documentTypesObject } from '@/shared/consts/documentTypesObject'

export default function Page() {
    return (
        <F_userGuideDocs GuidelineTypeId={documentTypesObject.Guideline} />
    )
}
