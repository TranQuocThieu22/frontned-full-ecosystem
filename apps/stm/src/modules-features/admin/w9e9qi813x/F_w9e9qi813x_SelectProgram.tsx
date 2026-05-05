'use client'
import useQ_Exam_GetAll from '@/hooks/query-hooks/Exam/useQ_Exam_GetAll'
import { Select } from "@mantine/core"
import { useEffect } from 'react'
import useS_w9e9qi813x from './useS_w9e9qi813x'

export default function F_w9e9qi813x_SelectProgram() {
    const query = useQ_Exam_GetAll()
    const store = useS_w9e9qi813x()
    useEffect(() => {
        if (!query.data) return
        store.setProperty("examId", query.data[0]?.id)
    }, [query.data])

    if (query.isLoading) return ""
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <Select w={300}
            label="Khóa thi"
            data={query.data?.map(item => ({
                value: item.id?.toString()!,
                label: item.code! + " - " + item.name!
            }))}
            value={store.state.examId?.toString()}
            onChange={(e) => {
                store.setProperty("examId", parseInt(e!))
            }}
        />
    )
}
