'use client';
import { ActionIcon, Space } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { MyCenterFull, MyNumberFormatter } from "aq-fe-framework/components";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_VI } from "mantine-react-table/locales/vi/index.cjs";
import { useMemo } from "react";
import { useSelectedServiceStore } from "../Store/SelectedServiceStore";
import { IAvailableServiceInfoViewModel } from "./Interfaces/Interfaces";
import ViewTotalPrice from "./ViewTotalPrice";

export default function SelectedServiceTable({ step }: { step?: number }) {
    const selectedServiceStore = useSelectedServiceStore();

    const availableMRTColumns = useMemo<MRT_ColumnDef<IAvailableServiceInfoViewModel>[]>(() => [
        {
            header: "Loại thu",
            accessorFn(originalRow) {
                return originalRow.type === 2 ? "Lệ phí thi" : "Học phí";
            },
            size: 100,
        },
        {
            header: "Tên dịch vụ",
            accessorKey: "name",
        },
        {
            header: "Đơn giá",
            accessorKey: "price",
            Cell: ({ cell }) => {
                return <MyNumberFormatter value={cell.getValue<number>()} />
            },
            size: 120,
        },
        // {
        //     header: "Người cập nhật",
        //     accessorKey: "nguoiCapNhat"
        // },
        // {
        //     header: "Ngày cập nhật",
        //     accessorKey: "ngayCapNhat",
        // }
    ], []);

    const selectedServiceMRT = useMantineReactTable({
        columns: availableMRTColumns,
        data: selectedServiceStore.selectedServices,
        enableRowNumbers: true,
        layoutMode: "semantic",
        displayColumnDefOptions: {
            "mrt-row-numbers": {
                Header: "STT",
                size: 10
            },
        },
        enableColumnPinning: true,
        enableRowSelection: (step === 1) ? true : false,
        getRowId: (originalRow: IAvailableServiceInfoViewModel) => originalRow.id!.toString(),
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
        enableRowActions: step === 1 ? true : false,
        renderRowActions: ({ row }) => {
            return (
                <MyCenterFull>
                    <ActionIcon
                        variant="light" color='red'
                        onClick={() => handleRemoveServiceSelection(row.original)}
                    >
                        <IconX />
                    </ActionIcon>
                </MyCenterFull>
            )
        }
    });

    const handleRemoveServiceSelection = (row: IAvailableServiceInfoViewModel) => {
        selectedServiceStore.removeSelectedService(row.id!);
    }

    return (
        <>
            <MantineReactTable
                table={selectedServiceMRT}
            />
            <Space />
            {(step === 1 || step === 3) && <ViewTotalPrice step={step} />}
        </>
    );
}
