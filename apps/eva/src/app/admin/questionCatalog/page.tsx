"use client"
import FeatQuestionCatalogTable from '@/modules-features/admin/questionCatalog/FeatQuestionCatalogTable'
import SharedFilterSubject from '@/shared/features/FilterSubject/SharedFilterSubject'
import { Space } from '@mantine/core'
import { MyFieldset } from 'aq-fe-framework/components'

export default function Page() {
    return (
        <>
            <SharedFilterSubject />
            <Space />
            <MyFieldset title="Danh sách câu hỏi">
                <FeatQuestionCatalogTable />
            </MyFieldset>
        </>
    )
}
