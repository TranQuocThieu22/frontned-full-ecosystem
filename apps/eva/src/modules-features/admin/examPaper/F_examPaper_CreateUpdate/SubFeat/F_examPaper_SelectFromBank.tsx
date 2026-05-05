import { questionService } from "@/shared/APIs/questionService";
import { enum_questionType, enumLabel_questionType } from "@/shared/consts/enum/enum_questionType";
import { Question } from "@/shared/interfaces/Question";
import { MyDataTable, MyHtmlWrapper } from "aq-fe-framework/components";
import { MyButton } from "aq-fe-framework/core";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { useS_examPaper } from "../../useS_examPaper";
import { useS_examPaper_CreateUpdate } from "../useS_examPaper_CreateUpdate";


export default function F_examPaper_SelectFromBank() {
    const examPaperStore = useS_examPaper()
    const examPaperCreateUpdateStore = useS_examPaper_CreateUpdate()
    const query = useMyReactQuery({
        queryKey: ['questions'],
        axiosFn: () => questionService.getQuestion({
            evaSubjectId: parseInt(examPaperStore.state.subjectId!)
        }),
        options: {
            enabled: !!examPaperStore.state.subjectId
        }
    })
    const columns = useMemo<MRT_ColumnDef<Question>[]>(() => [
        {
            header: "Mã câu hỏi",
            accessorKey: "code"
        },
        {
            header: "Nội dung câu hỏi",
            accessorKey: "content",
            accessorFn: (row) => <MyHtmlWrapper html={row.content || ""} />
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
        }
    ], [])
    return (
        <MyDataTable
            data={query.data || []} columns={columns}
            renderRowActions={() => <MyButton actionType="select" />}
            enableRowSelection
            setSelectedRow={(row) => { examPaperCreateUpdateStore.setProperty("questions", row) }}
        />
    )
}
