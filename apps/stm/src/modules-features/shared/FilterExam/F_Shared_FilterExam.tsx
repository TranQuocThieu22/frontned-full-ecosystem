'use client'
import MySelect from "@/components/Combobox/Select/MySelect"
import useQ_Exam_GetAll from "@/hooks/query-hooks/Exam/useQ_Exam_GetAll"
import { useEffect } from "react"
import useS_Shared_FilterExam from "./useS_Shared_FilterExam"

export default function F_Shared_FilterExam() {
    const query = useQ_Exam_GetAll()
    const store = useS_Shared_FilterExam()
    useEffect(() => {
        if (!query.data) return
        store.setProperty("examId", query.data[0]?.id)
    }, [query.data])
    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra"
    return (
        <MySelect
            data={query.data?.map(item => ({
                label: item.name!,
                value: item.id?.toString()!
            })) || []}
            value={store.state.examId?.toString()}
            onChange={(e) => {
                store.setProperty("examId", parseInt(e!))
                // Lấy lại programId từ query
                const selectedExam = query.data?.find(x => x.id === parseInt(e!))
                if (selectedExam) {
                    store.setProperty("programId", selectedExam.programId)
                }
            }}
        />
    )
}
