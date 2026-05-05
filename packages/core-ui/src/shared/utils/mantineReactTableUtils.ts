import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { MRT_RowData } from "mantine-react-table";

export const mantineReactTableUtils = {
    filterColumnsByVisibleKeys<T extends MRT_RowData>(
        allColumns: CustomColumnDef<T>[],
        visibleFields?: (keyof T)[]
    ): CustomColumnDef<T>[] {
        if (!visibleFields || visibleFields.length === 0) return allColumns;

        return allColumns.filter(
            (col) =>
                typeof col.accessorKey === "string" &&
                visibleFields.includes(col.accessorKey as keyof T)
        );
    },
    sortColumnsByKeyOrder<T extends MRT_RowData>(
        columns: CustomColumnDef<T>[],
        orderedKeys?: (keyof T)[]
    ): CustomColumnDef<T>[] {
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