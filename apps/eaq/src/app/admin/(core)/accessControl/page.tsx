'use client'

import { menuDataVerifyInstitution } from "@/shared/constants/menuData/menuDataVerifyInstitution"
import { menuDataVerifyProgram } from "@/shared/constants/menuData/menuDataVerifyProgram"
import { useStore_Global } from "@/shared/stores/useStore_Global"
import { Feat_accessControl } from "@aq-fe/core-ui/features/core/accessControl/Feat_accessControl"


export default function Page() {
    const store = useStore_Global()
    return (
        <Feat_accessControl menuData={store.state.accreditationType == "Institutional" ? menuDataVerifyInstitution : menuDataVerifyProgram} />
    )
}
