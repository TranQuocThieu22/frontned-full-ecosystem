import { questionService } from "@/shared/APIs/questionService"
import { enum_questionType, enumLabel_questionType } from "@/shared/consts/enum/enum_questionType"
import { useStoreFilterSubject } from "@/shared/features/FilterSubject/useStoreFilterSubject"
import { Question } from "@/shared/interfaces/Question"
import { Group } from "@mantine/core"
import { MyCenterFull, MyDataTable, MyHtmlWrapper } from "aq-fe-framework/components"
import { useMyReactQuery } from "aq-fe-framework/hooks"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"
import FeatQuestionCatalogCreateUpdate from "./FeatQuestionCatalogCreateUpdate"
import FeatQuestionCatalogDelete from "./FeatQuestionCatalogDelete"

const questionCatalogColumns: MRT_ColumnDef<Question>[] = [
    {
        header: "Mã câu hỏi",
        accessorKey: "code",
    },
    {
        header: "Nội dung câu hỏi",
        accessorKey: "content",
        accessorFn: (row) => <MyHtmlWrapper html={row.content || ""} />
    },
    {
        header: "Loại câu hỏi",
        accessorKey: "evaQuestionTypeId",
        Cell: ({ cell }) => enumLabel_questionType[cell.getValue<enum_questionType>()],
    },
    {
        header: "Số đáp án",
        accessorKey: "soDapAn",
        Cell: ({ row }) => row.original.evaQuestionAnswers?.length
    },
    {
        header: "Mã chương",
        accessorKey: "evaTopic.code",
    },
    {
        header: "Chương chủ đề",
        accessorKey: "evaTopic.name",
    },
    {
        header: "Độ khó",
        accessorKey: "evaDifficultyDetail.name",
    },
    {
        header: "Mức độ nhận thức",
        accessorKey: "evaCognition.name",
    },
    {
        header: "CLO",
        accessorKey: "evaclo.name",
    },
    {
        header: "Trạng thái",
        accessorKey: "trangThai",
    },
]

export default function FeatQuestionCatalogTable() {
    const filterSubjectStore = useStoreFilterSubject()
    const evaSubjectId = filterSubjectStore.state.subject?.id
    const questionQuery = useMyReactQuery({
        queryKey: ["questions", evaSubjectId],
        axiosFn: () => questionService.getQuestion({ evaSubjectId: evaSubjectId! }),
        options: {
            enabled: !!evaSubjectId
        }
    })
    const columns = useMemo(() => questionCatalogColumns, [])
    return (
        <MyDataTable
            data={questionQuery.data || []}
            isLoading={questionQuery.isLoading || questionQuery.data == undefined}
            columns={columns}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <FeatQuestionCatalogCreateUpdate />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <FeatQuestionCatalogCreateUpdate values={row.original} />
                    <FeatQuestionCatalogDelete values={row.original} />
                </MyCenterFull>
            )}
        />

    )
}
