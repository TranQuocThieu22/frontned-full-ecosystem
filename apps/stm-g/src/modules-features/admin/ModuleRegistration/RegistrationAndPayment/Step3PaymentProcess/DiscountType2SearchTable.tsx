"use client"
import { Button, Group } from '@mantine/core'
import { MantineReactTable, MRT_ColumnDef, MRT_RowSelectionState, useMantineReactTable } from 'mantine-react-table'
import { MRT_Localization_VI } from 'mantine-react-table/locales/vi/index.cjs'
import { useEffect, useMemo, useState } from 'react'
import { IDiscountViewModel } from './Interfaces/Interfaces'


export default function DiscountType2SearchTable(
    { allDiscountData, discSearchDiscountTable, selectedDiscount, setSelectedDiscount }:
        { allDiscountData: IDiscountViewModel[], discSearchDiscountTable: any, selectedDiscount?: IDiscountViewModel, setSelectedDiscount: any }
) {

    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>(
        { [selectedDiscount?.id! && selectedDiscount.id.toString()]: true }
    );

    useEffect(() => {
        if (Object.keys(rowSelection).length === 0) {
            setSelectedDiscount({});
        }
    }, [rowSelection])


    const DiscountSelectMRTColumns = useMemo<MRT_ColumnDef<IDiscountViewModel>[]>(() => [
        {
            header: "Mã chiết khấu",
            accessorKey: "code",
        },
        {
            header: "Tên chiết khấu",
            accessorKey: "name",
        },
        {
            header: "Số tiền giảm",
            accessorKey: "price",
        },
        {
            header: "Phần trăm giảm",
            accessorFn(originalRow) {
                return `${originalRow.percent}%`;
            },
        },
    ], []);

    const DiscountSelectMRT = useMantineReactTable({
        columns: DiscountSelectMRTColumns,
        data: allDiscountData,
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-numbers": {
                Header: "STT",
                size: 70
            },
        },
        enableColumnPinning: true,
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        state: { rowSelection },
        getRowId: (originalRow: IDiscountViewModel) => originalRow.id!.toString(),
        initialState: {
            density: "md",
            pagination: { pageIndex: 0, pageSize: 10 },
            columnPinning: { right: ["mrt-row-actions"] },
            columnVisibility: {
                nguoiCapNhat: false,
                ngayCapNhat: false
            }
        },
        enableColumnResizing: true,
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
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <Group>
                    <Button
                        onClick={handleOnClickSelectDiscountButton}
                    >
                        Chọn
                    </Button>
                </Group>
            );
        }
    });

    const handleOnClickSelectDiscountButton = () => {
        if (Object.keys(rowSelection).length === 0) {
            setSelectedDiscount({});
        } else {
            setSelectedDiscount(DiscountSelectMRT.getSelectedRowModel().rows[0]?.original);
        }

        discSearchDiscountTable[1].close();
    }

    return (
        <>
            <MantineReactTable
                table={DiscountSelectMRT}
            />
        </>
    )
}

