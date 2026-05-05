'use client'
import { MyActionIcon } from '@/components/ActionIcons/ActionIcon/MyActionIcon';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyNumberFormatter from '@/components/DataDisplay/NumberFormatter/MyNumberFormatter';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group, Paper, Tabs } from '@mantine/core'
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react'

interface I {
    id?: number;
    tenBoPhan?: string; // Màn hình TiVi
    donViTinh?: string; // Cái
    soLuong?: number; // 1
    thoiHanBaoHanh?: Date; // 31/12/2026
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function SF4_1_Tab_4() {
    const query = useQuery<I[]>({
        queryKey: [`ReadBoPhan`],
        queryFn: async () => [
            {
                id: 1,
                tenBoPhan: "Màn hình TiVi",
                donViTinh: "Cái",
                soLuong: 1,
                thoiHanBaoHanh: new Date("2026-12-31T00:00:00Z"),
                ngayCapNhat: new Date("2025-01-15T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
            {
                id: 2,
                tenBoPhan: "Điều khiển TiVi",
                donViTinh: "Cái",
                soLuong: 1,
                thoiHanBaoHanh: new Date("2027-01-01T00:00:00Z"),
                ngayCapNhat: new Date("2025-01-16T00:00:00Z"),
                nguoiCapNhat: "Trần Thị B",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Tên bộ phận",
            accessorKey: "tenBoPhan",
        },
        {
            header: "Đơn vị tính",
            accessorKey: "donViTinh",
        },
        {
            header: "Số lượng",
            accessorKey: "soLuong",
        },
        {
            header: "Thời hạn bảo hành",
            accessorKey: "thoiHanBaoHanh",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.thoiHanBaoHanh!)),
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!)),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Tabs.Panel value='Bộ phận cấu thành'>
            <Paper>
                <MyDataTable
                    columns={columns}
                    data={query.data!}
                    exportAble
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            <MyButton crudType='add' />
                            <MyButton crudType='delete' />
                            <MyButton crudType='import' />
                        </Group>
                    )}
                    renderRowActions={() => (
                        <MyActionIcon crudType='delete' />
                    )}
                />
            </Paper>
        </Tabs.Panel>
    )
}
