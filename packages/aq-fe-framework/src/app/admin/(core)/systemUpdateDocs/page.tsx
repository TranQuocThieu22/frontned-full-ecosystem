"use client"
import { F_systemUpdateDocs } from '@/modules-features/admin/core/systemUpdateDocs/F_systemUpdateDocs'
import { documentTypesObject } from '@/shared/consts/documentTypesObject'

export default function Page() {
    return (
        <F_systemUpdateDocs RefinementTypeId={documentTypesObject.Refinement} />
    )
}
