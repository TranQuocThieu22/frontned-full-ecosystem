import { CustomDataTable } from "@aq-fe/aq-legacy-framework/shared/components/dataDisplay/CustomDataTable"
import { colorsObject } from "@aq-fe/aq-legacy-framework/shared/const/object/colorsObject"
import { UseQueryResult } from "@tanstack/react-query"
import { MRT_ColumnDef, MRT_RowData } from "mantine-react-table"
import { useEffect, useMemo } from "react"

export function CustomDataTableSelectOne<TData extends MRT_RowData>({
    columns,
    queryResult,
    idSelection,
    onSelect
}: {
    columns: MRT_ColumnDef<TData>[],
    queryResult: UseQueryResult<TData[], Error>,
    idSelection?: number,
    onSelect: (id?: number, row?: TData) => void
}) {
    const columnsState = useMemo(() => columns, [])
    useEffect(() => {
        // Set row click và userID trong store bằng giá trị đầu tiên 
        if (!queryResult.data) return
        onSelect(queryResult.data[0]?.id, queryResult.data[0])
    }, [queryResult.data])

    return (
        <CustomDataTable
            //  state={selectionState[0]}
            columns={columnsState}
            data={queryResult.data || []}
            isLoading={queryResult.isLoading}
            isError={queryResult.isError}
            getRowId={(row) => row.id?.toString()}
            mantineTableBodyRowProps={({ row }) => ({
                onClick: () => {
                    onSelect(row.original.id, row.original)
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