"use client"
import { filterMenuDataBySchool } from '@/utils/filterMenuDataBySchool'
import { Feat_accessControlLevel } from '@aq-fe/core-ui/features/core/accessControlLevel/Feat_accessControlLevel'

export default function Page() {
    return (
        <Feat_accessControlLevel menuData={filterMenuDataBySchool()} />
    )
}
