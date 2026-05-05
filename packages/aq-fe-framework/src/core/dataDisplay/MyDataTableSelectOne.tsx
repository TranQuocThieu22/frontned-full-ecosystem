import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable"
import { colorsObject } from "@/shared/consts/colorsObject"
import { UseQueryResult } from "@tanstack/react-query"
import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table"
import { useEffect, useMemo } from "react"

export function MyDataTableSelectOne<TData extends MRT_RowData>({
    columns,
    queryResult,
    idSelection,
    setIdSelection
}: {
    columns: MRT_ColumnDef<TData>[],
    queryResult: UseQueryResult<TData[], Error>,
    idSelection: string | number | undefined,
    setIdSelection: (id: string | number | undefined) => void
}) {
    const columnsState = useMemo(() => columns, [])
    useEffect(() => {
        // Set row click và userID trong store bằng giá trị đầu tiên 
        if (!queryResult.data) return
        setIdSelection(queryResult.data[0].id)
    }, [queryResult.data])

    return (
        <MyDataTable
            //  state={selectionState[0]}
            columns={columnsState}
            data={queryResult.data || []}
            isLoading={queryResult.isLoading}
            isError={queryResult.isError}
            getRowId={(row) => row.id?.toString()}
            mantineTableBodyRowProps={({ row }) => ({
                onClick: () => {
                    setIdSelection(row.original.id)
                },
                style: {
                    cursor: 'pointer',
                    backgroundColor: row.original.id == idSelection ?
                        colorsObject.mantineBackgroundTealLight
                        :
                        'transparent',
                },
            })}

        />
    );
}