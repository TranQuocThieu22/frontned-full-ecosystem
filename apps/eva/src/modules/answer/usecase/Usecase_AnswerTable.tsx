import { Switch } from "@mantine/core"
import { MyCenterFull, MyDataTable, MyDataTableProps, MyHtmlWrapper } from "aq-fe-framework/components"
import { MyActionIcon } from "aq-fe-framework/core"
import { MRT_ColumnDef, MRT_Row } from "mantine-react-table"
import { useMemo } from "react"
import { IAnswerDomain } from "../domain/IAnswerDomain"

interface Props extends Omit<MyDataTableProps<IAnswerDomain>, "columns"> {
    data: IAnswerDomain[]
    onChange: (value: IAnswerDomain[]) => void
    onTempUpdate?: (row: MRT_Row<IAnswerDomain>) => void
    onTempDelete?: (row: MRT_Row<IAnswerDomain>) => void
    visibleColumnKeys?: (keyof IAnswerDomain)[]
}
export default function Usecase_AnswerTable({
    data,
    onChange,
    onTempUpdate,
    onTempDelete,
    visibleColumnKeys,
    ...rest
}: Props) {
    const handleToggleCorrect = (index: number) => {
        const newData = [...data]
        newData[index]!.isCorrect = !newData[index]!.isCorrect
        onChange(newData)
    }
    const allColumns = useMemo<MRT_ColumnDef<IAnswerDomain>[]>(() => [
        {
            header: "Nội dung lựa chọn",
            accessorKey: "content",
            Cell: ({ row }) => <MyHtmlWrapper html={row.original.content || ""} />
        },
        {
            header: "Đáp án",
            accessorKey: "isCorrect",
            Cell: ({ row }) => {
                const index = row.index
                const isCorrect = row.original.isCorrect
                return (
                    <Switch
                        checked={isCorrect}
                        label={isCorrect ? "Đáp án đúng" : "Đáp án sai"}
                        onChange={() => handleToggleCorrect(index)}
                    />
                )
            }
        },
        {
            header: "Tỷ trọng",
            accessorKey: "proportion"
        },
        {
            header: "Phân tích đáp án",
            accessorKey: "explain",
            Cell: ({ row }) => <MyHtmlWrapper html={row.original.explain || ""} />
        },
        {
            header: "Các tiêu chí",
            accessorKey: "criteria"
        }
    ], [data])
    // const columns = useMemo(() => {
    //     const visible = utils_mantineReactTable_filterColumnsByVisibleKeys(allColumns, visibleColumnKeys);
    //     return utils_mantineReactTable_sortColumnsByKeyOrder(visible, visibleColumnKeys);
    // }, [allColumns, visibleColumnKeys]);
    return (
        <MyDataTable
            columns={allColumns}
            data={data || []}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <MyActionIcon hidden={!onTempUpdate} actionType="tempUpdate" onClick={() => onTempUpdate?.(row)} />
                    <MyActionIcon hidden={!onTempDelete} actionType="tempDelete" onClick={() => onTempDelete?.(row)} />
                </MyCenterFull>
            )}
            {...rest}
        />
    )
}
