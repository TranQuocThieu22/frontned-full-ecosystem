"use client"
import F_examPaper_FilterExamSection from "@/modules-features/admin/examPaper/F_examPaper_FilterExamSection";
import { useS_examPaper } from "@/modules-features/admin/examPaper/useS_examPaper";
import Adapter_ExamTable from "@/modules/exam/adapter/Adapter_ExamTable";
import { ExamTableDomain } from "@/modules/exam/usecase/Usecase_ExamTable";
import { Divider, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
export default function Page() {
    const store = useS_examPaper()
    const modalDelete = useDisclosure()
    const focusObjectState = useState<ExamTableDomain>()
    return (
        <>
            <Paper p={'md'}>
                <F_examPaper_FilterExamSection />
            </Paper>
            <Divider />
            <Adapter_ExamTable
                examId={Number(store.state.examId)}
                subjectId={Number(store.state.subjectId)}
                onDelete={(row) => {
                    modalDelete[1].open()
                    focusObjectState[1](row)
                }}
            />
            {/* <Adapter_ExamDeleteModal
                examId={Number(focusObjectState[0]?.id)}
                contextData={focusObjectState[0]?.examCode}
                disclosure={modalDelete}
            /> */}
        </>
    )
}
