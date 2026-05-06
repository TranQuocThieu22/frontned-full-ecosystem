import { CustomButtonDeleteList, CustomButtonDeleteListProps } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonDeleteList";
import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { CustomButtonSafeDeleteList } from "../button/CustomButtonSafeDeleteList";

interface CustomSafeDeleteListAPIProps<TData extends MRT_RowData> extends Omit<CustomButtonDeleteListProps, "onSubmit"> {
    table: MRT_TableInstance<TData>
    safeDeleteListFn: (values: TData[]) => Promise<any>
}

export function CustomButtonSafeDeleteListAPI<TData extends MRT_RowData>({
    safeDeleteListFn,
    table,
    ...rest
}: CustomSafeDeleteListAPIProps<TData>) {
    const selectedRow = table.getSelectedRowModel().flatRows.flatMap((item) => item.original);
    return (
        <CustomButtonSafeDeleteList
            count={selectedRow.length}
            contextData={selectedRow.map((item) => item.code).join(", ")}
            onSubmit={() => safeDeleteListFn(selectedRow)}
            onSuccess={() => table.resetRowSelection()}
            {...rest}
        />
    )
}
