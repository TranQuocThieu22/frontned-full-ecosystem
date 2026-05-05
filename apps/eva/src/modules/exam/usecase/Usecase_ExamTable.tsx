import { Button, Group } from "@mantine/core"
import { MyCenterFull, MyDataTable, MyDataTableProps } from "aq-fe-framework/components"
import { MyActionIcon } from "aq-fe-framework/core"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo } from "react"

export interface ExamTableDomain {
    id?: string
    examCode?: string, // Mã đề chuẩn
    examName?: string, // Tên đề chuẩn
    numberOfQuestion?: number, // Số lượng câu hỏi
    difficultys?: {
        name?: string // Tên độ khó,
        numberOfDifficulty?: number
    }[]
}

interface Usecase_ExamTableProps extends Omit<MyDataTableProps<ExamTableDomain>, "columns"> {
    data: ExamTableDomain[],
    onCreate?: () => void
    onPrintExam?: () => void
    onPrintAnswer?: () => void
    onUpdate?: (row: ExamTableDomain) => void
    onDelete?: (row: ExamTableDomain) => void

}

export default function Usecase_ExamTable({
    data,
    onCreate,
    onPrintExam,
    onPrintAnswer,
    onUpdate,
    onDelete,
}: Usecase_ExamTableProps) {
    const columns = useMemo<MRT_ColumnDef<ExamTableDomain>[]>(() => {
        const difficultySet = new Set(
            data.flatMap(item => item.difficultys?.map(d => d.name).filter(Boolean) as string[])
        )

        return [
            {
                header: "Mã đề chuẩn",
                accessorKey: "examCode"
            },
            {
                header: "Tên đề chuẩn",
                accessorKey: "examName"
            },
            {
                header: "Số lượng câu hỏi",
                accessorKey: "numberOfQuestion"
            },
            ...Array.from(difficultySet).map(name => ({
                header: name,
                id: `difficulty-${name}`,
                accessorFn: (row) =>
                    row.difficultys?.find(d => d.name === name)?.numberOfDifficulty ?? 0
            })) as MRT_ColumnDef<ExamTableDomain>[]
        ]
    }, [data])
    return (
        <MyDataTable
            data={data || []}
            columns={columns}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <Button color="teal" hidden={!!onCreate} onClick={onCreate}>
                        Tạo đề chuẩn
                    </Button>
                    <Button variant="default" hidden={!!onPrintExam} onClick={onPrintExam}>
                        In đề
                    </Button>
                    <Button variant="default" hidden={!!onPrintAnswer} onClick={onPrintAnswer}>
                        In đáp án
                    </Button>
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <MyActionIcon
                        actionType="update"
                        onClick={() => onUpdate?.(row.original)}
                    />
                    <MyActionIcon
                        actionType="delete"
                        onClick={() => onDelete?.(row.original)}
                    />
                </MyCenterFull>
            )}

        />
    )
}
