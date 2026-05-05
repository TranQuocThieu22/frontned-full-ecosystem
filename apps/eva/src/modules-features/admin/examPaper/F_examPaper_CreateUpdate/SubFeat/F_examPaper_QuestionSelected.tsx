import { enum_questionType, enumLabel_questionType } from "@/shared/consts/enum/enum_questionType"
import { Question } from "@/shared/interfaces/Question"
import { MyDataTable, MyHtmlWrapper } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import { useS_examPaper_CreateUpdate } from "../useS_examPaper_CreateUpdate"


export default function F_examPaper_QuestionSelected() {
    const examPaperCreateUpdateStore = useS_examPaper_CreateUpdate()
    const columns = useMemo<MRT_ColumnDef<Question>[]>(() => [
        {
            header: "Mã câu hỏi",
            accessorKey: "code"
        },
        {
            header: "Nội dung câu hỏi",
            accessorKey: "content",
            Cell: ({ row }) => <MyHtmlWrapper html={row.original.content || ''} />
        },
        {
            header: "Loại câu hỏi",
            accessorFn: (row) => enumLabel_questionType[row.evaQuestionTypeId as enum_questionType]
        },
        {
            header: "Số đáp án"
        },
        {
            header: "Mã chương",
            accessorKey: "evaTopic.code"
        },
        {
            header: "Độ khó",
            accessorKey: "evaDifficultyDetail.name"
        },
        {
            header: "Mức độ nhận thức",
            accessorKey: "evaCognition.name"
        },
        {
            header: "CLO",
            accessorKey: "evaclo.name"
        },
        {
            header: "Điểm"
        }
    ], [])
    return (
        <MyDataTable
            columns={columns}
            data={examPaperCreateUpdateStore.state.questions || []}
        />
    )
}
