'use client'

import { menuDataVerifyInstitution } from "@/shared/constants/menuData/menuDataVerifyInstitution"
import { menuDataVerifyProgram } from "@/shared/constants/menuData/menuDataVerifyProgram"
import { useStore_Global } from "@/shared/stores/useStore_Global"
import { Feat_accessControlLevel } from "@aq-fe/core-ui/features/core/accessControlLevel/Feat_accessControlLevel"

export default function Page() {
    const store = useStore_Global()
    return (
        <Feat_accessControlLevel menuData={store.state.accreditationType == "Institutional" ? menuDataVerifyInstitution : menuDataVerifyProgram} />
    )
}
