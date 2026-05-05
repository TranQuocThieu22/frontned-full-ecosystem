"use client"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { T0MANTINE_SIZE } from "@/types/types";
import { Button, ButtonProps, Fieldset, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineReactTable, MRT_ColumnDef, MRT_RowData, MRT_RowSelectionState, MRT_TableInstance, MRT_TableOptions, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import { ReactNode, useEffect, useState } from "react";

interface IAQSelectTableByOpenModal<TData extends MRT_RowData>
    extends MRT_TableOptions<TData>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "style">,
    ButtonProps {
    label?: string;
    listLabel?: string;
    title?: string;
    modalSize?: T0MANTINE_SIZE;
    objectName?: string
    fullScreen?: boolean;
    setSelectedData?: any;
    data: TData[];
    columns: MRT_ColumnDef<TData>[];
    closeAfterSelect?: boolean;
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<TData>;
    }) => ReactNode) | undefined,
    // rowActionSize?: number;
    selectMultiRow: boolean;
    idField?: string;
    defaultSelectedRowIds: Record<number | string, boolean>;
}

export default function AQSelectTableByOpenModal<TData extends MRT_RowData>({
    setSelectedData,
    data,
    columns,
    modalSize,
    title,
    label,
    listLabel,
    objectName,
    fullScreen = false,
    closeAfterSelect = true,
    renderTopToolbarCustomActions,
    // rowActionSize,
    selectMultiRow = true,
    idField,
    defaultSelectedRowIds,
    ...rest
}: IAQSelectTableByOpenModal<TData>) {
    const disclosure = useDisclosure(false)
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>(defaultSelectedRowIds);

    useEffect(() => {
        setRowSelection(defaultSelectedRowIds);
    }, [defaultSelectedRowIds]);

    const table = useMantineReactTable({
        columns,
        data,
        enableMultiRowSelection: selectMultiRow,
        enableRowSelection: true,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    {renderTopToolbarCustomActions && renderTopToolbarCustomActions({ table: table })}
                    <Button onClick={() => {
                        handleOnClickSelectButton();
                    }}>
                        Chọn
                    </Button>
                </Group>
            );
        },
        enableRowNumbers: true,
        positionActionsColumn: "last",
        enableColumnResizing: true,
        layoutMode: "semantic",
        // displayColumnDefOptions: {
        //     "mrt-row-actions": {
        //         header: "Thao tác",
        //         size: rowActionSize,
        //     },
        //     "mrt-row-numbers": {
        //         Header: "STT",
        //         size: 70
        //     },
        // },
        enableColumnPinning: true,
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 30 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false
            }
        },
        mantineTableHeadCellProps: {
            style: {
                verticalAlign: "middle",
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        mantineTableBodyCellProps: {
            style: {
                paddingTop: "2px",
                paddingBottom: "2px",
            },
        },
        localization: MRT_Localization_VI,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        getRowId: (originalRow) => idField ? originalRow[idField] : originalRow.id,
        ...rest, // Override default table options
    });

    useEffect(() => {
        if (rowSelection) {
            const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original); //read entire rows
            setSelectedData(selectedRows)
        }
    }, [table.getState().rowSelection]);

    const handleOnClickSelectButton = () => {
        // const rowSelection = table.getState().rowSelection; //read state
        const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original); //read entire rows
        setSelectedData(selectedRows)
        closeAfterSelect && disclosure[1].close()
    }
    return (
        <>
            <Button
                onClick={disclosure[1].open}
                {...rest}
            >
                {label ? label : `Chọn từ danh sách`}
            </Button>
            <Modal
                fullScreen={fullScreen}
                size={modalSize}
                title={title}
                opened={disclosure?.[0]}
                onClose={disclosure[1].close}
            >
                <MyFlexColumn>
                    <Fieldset legend={listLabel ? listLabel : "Danh sách"}>
                        {data == undefined ? "Đang tải dữ liệu..." :
                            <MantineReactTable table={table} />
                        }
                    </Fieldset>
                </MyFlexColumn>
            </Modal>
        </>
    )
}