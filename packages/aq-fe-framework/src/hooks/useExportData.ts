import { MRT_RowData, MRT_TableInstance } from "mantine-react-table";

/**
 * Lấy danh sách data gốc (original) từ table:
 * - Nếu có row được chọn -> trả về các row được chọn
 * - Nếu không -> trả về toàn bộ data (prePagination)
 */
export function useExportData<T extends MRT_RowData>(table: MRT_TableInstance<T>) {
    const selectedRows = table.getSelectedRowModel().rows;
    const allRows = table.getPrePaginationRowModel().rows;

    const isUsingSelected = selectedRows.length > 0;
    const rows = isUsingSelected ? selectedRows : allRows;

    return {
        data: rows.map((r) => r.original),
        count: rows.length,
        isUsingSelected,
    };
}