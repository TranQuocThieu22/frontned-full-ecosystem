import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { ActionIcon, Button, Group, MantineSize, Modal } from "@mantine/core";
import { useDisclosure, useListState } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { MRT_ColumnDef, MRT_RowData, MRT_TableInstance, MRT_TableOptions } from "mantine-react-table";
import { ReactNode, useMemo } from "react";

interface IDataTable<TData extends MRT_RowData> extends Omit<MRT_TableOptions<TData>, "data"> {
    listLabel?: string;
    columns: MRT_ColumnDef<TData>[];
    data?: TData[];
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<TData>;
    }) => ReactNode) | undefined;
    listState: ReturnType<typeof useListState<TData>>;
    listStateDelete?: ReturnType<typeof useListState<TData>>
    selectButtonlabel?: string;
    modalSize?: MantineSize;
    afterSelect?: (selectedRows: TData[]) => void;
    modalVisibleColumns?: string[]; // Thêm danh sách tên cột hiển thị trong modal
    modalColumnsState?: Partial<MRT_ColumnDef<TData>>[]; // Thêm tùy chọn cho trạng thái cột trong 
}

export default function MyDataTableSelect<TData extends MRT_RowData>({
    modalSize,
    renderTopToolbarCustomActions,
    data,
    selectButtonlabel,
    listStateDelete,
    listState,
    columns,
    listLabel,
    afterSelect,
    modalVisibleColumns,
    modalColumnsState,
    ...rest
}: IDataTable<TData>) {
    const disc = useDisclosure(false);
    const modalColumns = useMemo(() => {
        if (!modalVisibleColumns && !modalColumnsState) {
            return columns; // Sử dụng columns gốc nếu không có tùy chỉnh
        }

        // Lọc cột dựa trên modalVisibleColumns nếu có
        const filteredColumns = modalVisibleColumns
            ? columns.filter(col =>
                modalVisibleColumns.includes(col.accessorKey as string) ||
                modalVisibleColumns.includes(col.id as string))
            : [...columns];

        // Áp dụng các thay đổi trạng thái cột từ modalColumnsState nếu có
        if (modalColumnsState) {
            return filteredColumns.map(col => {
                const stateOverride = modalColumnsState.find(
                    stateCol =>
                        (stateCol.accessorKey && stateCol.accessorKey === col.accessorKey) ||
                        (stateCol.id && stateCol.id === col.id)
                );
                return stateOverride ? { ...col, ...stateOverride } : col;
            });
        }

        return filteredColumns;
    }, [columns, modalVisibleColumns, modalColumnsState]);
    if (!data) return "Đang tải...";

    return (
        <MyFieldset mt="10" title={listLabel || "Danh sách"}>
            <MyDataTable
                renderTopToolbarCustomActions={({ table }) => (
                    <Group>
                        {renderTopToolbarCustomActions && renderTopToolbarCustomActions({ table })}
                        <Button onClick={disc[1].open}>{selectButtonlabel || "Chọn từ danh sách"}</Button>
                    </Group>
                )}
                columns={columns}
                data={listState[0] as TData[]}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <ActionIcon color="red" onClick={() => {
                            listState[1].remove(row.index)
                            listStateDelete?.[1].append(row.original)
                        }}>
                            <IconX />
                        </ActionIcon>
                    </MyCenterFull>
                )}
                {...rest}
            />

            <Modal opened={disc[0]} onClose={disc[1].close} size={modalSize || "80%"}>
                <MyDataTable
                    renderTopToolbarCustomActions={({ table }) => (
                        <Button
                            onClick={() => {
                                const selectedRows = table.getSelectedRowModel().rows.map(row => row.original);
                                listState[1].setState(selectedRows); // Đồng bộ danh sách đã chọn
                                if (afterSelect) {
                                    afterSelect(selectedRows);
                                }
                                disc[1].close();
                            }}
                        >
                            Chọn
                        </Button>
                    )}
                    enableRowSelection
                    data={data}
                    columns={modalColumns}
                    initialState={{
                        rowSelection: Object.fromEntries(
                            listState[0].map((item) => {
                                const selectedRow = data.findIndex((d) => d.id === item.id);
                                return selectedRow !== -1 ? [selectedRow, true] : [];
                            }).filter((entry) => entry.length > 0)
                        ),
                    }}
                    {...rest}
                />
            </Modal>
        </MyFieldset>
    );
}
