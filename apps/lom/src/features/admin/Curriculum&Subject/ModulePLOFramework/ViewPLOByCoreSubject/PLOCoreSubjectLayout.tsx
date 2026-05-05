'use client'

import FilterGradeSelect from "@/shared/features/FilterGradeSelect/FilterGradeSelect"
import { Space } from "@mantine/core"
import CoreSubjectTable from "./CoreSubjectTable"

export default function PLOCoreSubjectLayout() {
    return (
        <>
            <FilterGradeSelect />
            <Space />
            <CoreSubjectTable />
        </>
    )
}