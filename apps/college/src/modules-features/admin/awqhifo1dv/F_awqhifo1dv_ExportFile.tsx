'use client';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Group, Modal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import { I } from './F_awqhifo1dv_Read';

interface ConfirmButtonProps {
    isOpen: boolean;
    onClose: () => void; // Add a callback to notify the parent when the modal closes
}

export default function F_awqhifo1dv_ExportFile({
    isOpen,
    onClose,
}: ConfirmButtonProps) {
    const examActivityPointsQuery = useQuery<I[]>({
        queryKey: [`ListOfReasons`],
        queryFn: async () => [
            {
                id: 1,
                mssv: "34234234",
                name: "Nguyễn Văn A",
                size: 34,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            },
            {
                id: 2,
                mssv: "36324233",
                name: "Nguyễn Văn B",
                size: 37,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            },
            {
                id: 3,
                mssv: "342223344",
                name: "Nguyễn Văn C",
                size: 23,
                note: "Một vài thông tin",
                abbreviationName: "Nguyễn A",
            }
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        { header: "Mã field", accessorKey: "mssv" },
        { header: "Tên field", accessorKey: "name" },
        { header: "Số lượng", accessorKey: "size" },
        { header: "Ghi chú", accessorKey: "note" },
        { header: "Tên viết tắt", accessorKey: "abbreviationName" },
    ], []);

    return (
        <Modal
            size="auto"
            opened={isOpen} // Use isOpen directly to control the modal
            onClose={onClose} // Call the onClose callback when the modal is closed
            title={'Data.xlsx'}
            centered
        >
            <Group mt="md">
                <MyDataTable
                    enableRowNumbers={false}
                    enableRowSelection={false}
                    columns={columns}
                    data={examActivityPointsQuery.data ?? []}
                    renderTopToolbarCustomActions={() => <></>}
                />
            </Group>
        </Modal>
    );
}