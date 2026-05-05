import { MyButtonDeleteList, MyButtonDeleteListProps } from "@/components";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";

interface CustomDeleteListAPIProps<TData extends MRT_RowData> extends Omit<MyButtonDeleteListProps, "onSubmit"> {
    table: MRT_TableInstance<TData>
    deleteListFn: (ids: number[]) => void
}

export function CustomButtonDeleteListAPI<TData extends MRT_RowData>({
    deleteListFn,
    table,
    ...rest
}: CustomDeleteListAPIProps<TData>) {
    const selectedRow = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
    return (
        <MyButtonDeleteList
            count={selectedRow.length}
            onSubmit={() => deleteListFn(selectedRow.map(item => item.id!))}
            onSuccess={() => table.resetRowSelection()}
            {...rest}
        />

    )
}
