import { OnChangeFn } from "@tanstack/table-core";
import { MRT_RowSelectionState } from "mantine-react-table";

export const utils_mantineReactTable_createRowSelectionHandler = <T extends { id?: number }>(
    data: T[] | undefined,
    setSelectedRows: (rows: T[]) => void,
    setRowSelection: (updater: (prev: MRT_RowSelectionState) => MRT_RowSelectionState) => void
): OnChangeFn<MRT_RowSelectionState> => {
    return (updaterOrValue) => {
        setRowSelection((prevSelection) => {
            const newSelection = typeof updaterOrValue === "function"
                ? updaterOrValue(prevSelection)
                : updaterOrValue;

            setSelectedRows(data?.filter(row => newSelection[row.id?.toString() ?? ""]) ?? []);
            return newSelection;
        });
    };
};

export function utils_mantineReactTable_getEditedRows<T extends { id?: number; isEnabled?: boolean;[key: string]: any }>(
    initialData: T[],
    rowSelection: MRT_RowSelectionState,
    idKey: keyof T
): Record<string, T> {
    const dataMap = new Map(
        initialData.map((item) => [item[idKey]!.toString(), item])
    );

    const updatedRows: Record<string, T> = {};

    // Kiểm tra các mục bị xóa (có trong init nhưng không có trong rowSelection)
    initialData.forEach((item) => {
        if (!rowSelection[item[idKey]!.toString()]) {
            updatedRows[item[idKey]!.toString()] = {
                ...item,
                isEnabled: false, // Đánh dấu xóa
            };
        }
    });

    // Kiểm tra các mục được thêm mới (có trong rowSelection nhưng không có trong init)
    Object.keys(rowSelection).forEach((id) => {
        if (!dataMap.has(id)) {
            updatedRows[id] = {
                [idKey]: id, // Gán ID động theo key
                id: 0, // Thêm mới
                isEnabled: true,
            } as T;
        }
    });

    return updatedRows;
}