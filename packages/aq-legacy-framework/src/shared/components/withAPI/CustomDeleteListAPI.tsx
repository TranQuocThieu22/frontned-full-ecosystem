import { CustomButtonDeleteList, CustomButtonDeleteListProps } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonDeleteList";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { CustomButtonSafeDeleteList } from "../button/CustomButtonSafeDeleteList";

interface CustomDeleteListAPIProps<TData extends MRT_RowData> extends Omit<CustomButtonDeleteListProps, "onSubmit"> {
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
        <CustomButtonDeleteList
            count={selectedRow.length}
            onSubmit={() => deleteListFn(selectedRow.map(item => item.id!))}
            onSuccess={() => table.resetRowSelection()}
            {...rest}
        />

    )
}
