import { MyColumnDef } from "@/components";
import { MRT_RowData } from "mantine-react-table";

export const utils_mantineReactTable = {
    filterColumnsByVisibleKeys<T extends MRT_RowData>(
        allColumns: MyColumnDef<T>[],
        visibleFields?: (keyof T)[]
    ): MyColumnDef<T>[] {
        if (!visibleFields || visibleFields.length === 0) return allColumns;

        return allColumns.filter(
            (col) =>
                typeof col.accessorKey === "string" &&
                visibleFields.includes(col.accessorKey as keyof T)
        );
    },
    sortColumnsByKeyOrder<T extends MRT_RowData>(
        columns: MyColumnDef<T>[],
        orderedKeys?: (keyof T)[]
    ): MyColumnDef<T>[] {
        if (!orderedKeys) return columns;

        return [...columns].sort((a, b) => {
            const aKey = a.accessorKey as keyof T;
            const bKey = b.accessorKey as keyof T;
            const aIndex = orderedKeys.indexOf(aKey);
            const bIndex = orderedKeys.indexOf(bKey);
            return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
        });
    }
}