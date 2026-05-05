"use client"
import MyButtonModalExport from '@/components/Buttons/ButtonModalExport/MyButtonModalExport';
import { Group } from '@mantine/core';
import {
    MantineReactTable,
    MRT_TableInstance,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_RowData, //default shape of TData (Record<string, any>)
    type MRT_TableOptions
} from 'mantine-react-table';
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import { ReactNode, useEffect } from 'react';


interface IDataTable<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
    columns: MRT_ColumnDef<TData>[]; // Table columns
    data: TData[]; // Table data
    rowActionSize?: number; // Row action button size
    exportAble?: boolean; // Flag to enable export all data
    renderTopToolbarCustomActions?: ((props: {
        table: MRT_TableInstance<TData>;
    }) => ReactNode) | undefined,
    setSelectedRow?: (rows: TData[]) => void;
    setSelectedRowId?: (data: any) => void;
}




export function MyDataTable<TData extends MRT_RowData>(
    {
        columns,
        data,
        exportAble = false,
        rowActionSize,
        renderTopToolbarCustomActions,
        setSelectedRow,
        setSelectedRowId,
        ...rest
    }: IDataTable<TData>
) {
    const { renderRowActions } = { ...rest };

    const table = useMantineReactTable({
        columns,
        data,
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    {renderTopToolbarCustomActions && renderTopToolbarCustomActions({ table: table })}
                    {exportAble &&
                        <MyButtonModalExport columns={columns} data={data} />
                    }
                </Group>
            );
        },
        enableRowNumbers: true,
        enableRowSelection: exportAble,
        enableEditing: renderRowActions ? true : false,
        positionActionsColumn: "last",
        enableColumnResizing: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Thao tác",
                size: rowActionSize,
            },
            "mrt-row-numbers": {
                Header: "STT",
                size: 70
            },
        },
        enableColumnPinning: true,
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 30 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false,
                modifiedWhen: false,
                modifiedFullName: false
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
        ...rest, // Override default table options
    });

    useEffect(() => {
        setSelectedRowId && setSelectedRowId(table.getSelectedRowModel().rows.map((row) => row.original.id));
        setSelectedRow && setSelectedRow(table.getSelectedRowModel().rows.map(row => row.original));
    }, [table.getState().rowSelection]);

    if (data == undefined) return
    return (
        <MantineReactTable table={table} />
    )
}
