import { Button, Center, Group } from "@mantine/core";
import { MyDataTable, MyHtmlWrapper } from "aq-fe-framework/components";
import { MyActionIcon, MyButton } from "aq-fe-framework/core";
import { MRT_ColumnDef, MRT_Row, MRT_TableInstance } from "mantine-react-table";
import { useMemo } from "react";
import { QuestionDomain } from "../domain/QuestionDomain";


interface Usecase_QuestionTableProps {
    data: QuestionDomain[]
    setData?: (data: QuestionDomain[]) => void
    isLoading?: boolean,
    isError?: boolean,
    visibleColumnKeys?: (keyof QuestionDomain)[]

    // Header action
    onCreate?: (table: MRT_TableInstance<QuestionDomain>) => void
    onSelectMultiple?: (table: MRT_TableInstance<QuestionDomain>) => void
    onSelectFromFilter?: (table: MRT_TableInstance<QuestionDomain>) => void // Chọn từ bộ lọc
    onPointDistribution?: (table: MRT_TableInstance<QuestionDomain>) => void // Phân phối điểm

    // Row action
    onSelect?: (row: MRT_Row<QuestionDomain>) => void
    onUpdate?: (row: MRT_Row<QuestionDomain>) => void
    onDelete?: (row: MRT_Row<QuestionDomain>) => void

    visibleTempDelete?: boolean,
}
export default function Usecase_QuestionTable({
    data,
    isLoading,
    isError,
    visibleColumnKeys,
    setData,
    ...rest
}: Usecase_QuestionTableProps) {
    const allColumns = useMemo<MRT_ColumnDef<QuestionDomain>[]>(() => [
        {
            header: "Mã câu hỏi",
            accessorKey: "questionCode"
        },
        {
            header: "Nội dung câu hỏi",
            accessorKey: "questionContent",
            accessorFn: (row) => <MyHtmlWrapper html={row.questionContent || ""} />
        },
        {
            header: "Loại câu hỏi",
            accessorKey: "questionType"
        },
        {
            header: "Số đáp án",
            accessorKey: "numberOfAnswer"
        },
        {
            header: "Mã chương",
            accessorKey: "topicCode"
        },
        {
            header: "Độ khó",
            accessorKey: "difficulty"
        },
        {
            header: "Mức độ nhận thức",
            accessorKey: "levelOfAwareness"
        },
        {
            header: "CLO",
            accessorKey: "cloCode"
        },
        {
            header: "Điểm",
            accessorKey: "point"
        },
        {
            header: "Trạng thái",
            accessorKey: "state"
        }
    ], [])
    // const columns = useMemo(() => {
    //     const visible = utils_mantineReactTable_filterColumnsByVisibleKeys(allColumns, visibleColumnKeys);
    //     return utils_mantineReactTable_sortColumnsByKeyOrder(visible, visibleColumnKeys);
    // }, [allColumns, visibleColumnKeys]);
    return (
        <MyDataTable
            columns={allColumns}
            data={data}
            isLoading={isLoading}
            isError={isError}
            renderTopToolbarCustomActions={({ table }) => (
                <Group>
                    <MyButton
                        hidden={!rest.onCreate}
                        onClick={() => rest.onCreate?.(table)}
                        actionType="create"
                    />
                    <MyButton
                        hidden={!rest.onSelectMultiple}
                        onClick={() => rest.onSelectMultiple?.(table)}
                        actionType="select"
                    />
                    <Button
                        hidden={!rest.onSelectFromFilter}
                        onClick={() => rest.onSelectFromFilter?.(table)}
                    >
                        Chọn từ bộ lọc
                    </Button>
                    <Button
                        hidden={!rest.onPointDistribution}
                    >
                        Phân phối điểm
                    </Button>
                </Group>
            )}
            renderRowActions={({ row }) => (
                <Center w={'100%'}>
                    <MyButton
                        hidden={!rest.onSelect}
                        actionType="select"
                        onClick={() => rest.onSelect?.(row)}
                    />
                    <MyActionIcon
                        hidden={!rest.visibleTempDelete}
                        actionType="tempDelete"
                        onClick={() => {
                            const updatedData = data.filter(item => item.id != row.original.id)
                            setData?.(updatedData)
                        }}
                    />
                    <MyActionIcon
                        hidden={!rest.onUpdate}
                        actionType="update"
                        onClick={() => {
                            rest.onUpdate?.(row)
                        }}
                    />
                    <MyActionIcon
                        hidden={!rest.onDelete}
                        actionType="delete"
                        onClick={() => {
                            rest.onDelete?.(row)
                        }}
                    />

                </Center>
            )}
        />
    )
}
