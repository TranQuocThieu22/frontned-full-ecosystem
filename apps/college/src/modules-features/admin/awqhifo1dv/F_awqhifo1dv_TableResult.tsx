'use client';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Button, Fieldset, Group, Modal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

interface ConfirmButtonProps {
    confirmTitle?: string;
    confirmMessage?: string;
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void; // New callback to go back to SelectTable
}

interface Idata {
    id: number;
    checkResult?: string;
    size?: number;
    detail?: string;
}

export default function F_awqhifo1dv_TableResult({
    isOpen,
    confirmTitle = 'Import',
    confirmMessage = 'Bạn có chắc chắn muốn tiếp tục?',
    onClose,
    onBack, // Add onBack prop
}: ConfirmButtonProps) {
    const query = useQuery<Idata[]>({
        queryKey: [`ListTableResult`],
        queryFn: async () => [
            { id: 1, checkResult: 'Đã hoàn thành', size: 10, detail: 'Hoàn thành' },
            { id: 2, checkResult: 'Đang xử lý', size: 5, detail: 'Đang làm' },
            { id: 3, checkResult: 'Chưa kiểm tra', size: 7, detail: 'Chờ duyệt' },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<Idata>[]>(() => [
        {
            header: "Kết quả kiểm tra",
            accessorKey: "checkResult",
            size: 300,
        },
        {
            header: "Số lượng",
            accessorKey: "size",
            size: 200,
        },
        {
            header: "Chi tiết",
            accessorKey: "detail",
            size: 200,
        },
    ], []);

    return (
        <Modal
            size="auto"
            opened={isOpen}
            onClose={onClose}
            title={confirmTitle}
            centered
        >
            <Group mt="md">
                <Fieldset legend={"Kết quả kiểm tra"}>
                    <MyDataTable
                        enableRowNumbers={false}
                        enableRowSelection={false}
                        columns={columns}
                        data={query.data ?? []}
                    />
                </Fieldset>
            </Group>
            <Group mt={20} justify="flex-end">
                <Button
                    variant="default"
                    onClick={onBack || onClose} // Use onBack if provided, otherwise just close
                >
                    Quay lại
                </Button>
                <Button bg={"green"} onClick={onClose}>
                    Thực hiện
                </Button>
                <Button variant="default" onClick={onClose}>
                    Đóng
                </Button>
            </Group>
        </Modal>
    );
}