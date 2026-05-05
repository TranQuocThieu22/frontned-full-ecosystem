'use client'
import { MyActionIcon } from '@/components/ActionIcons/ActionIcon/MyActionIcon'
import { MyButton } from '@/components/Buttons/Button/MyButton'
import MyCenterFull from '@/components/CenterFull/MyCenterFull'
import MySelect from '@/components/Combobox/Select/MySelect'
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable'
import MyNumberFormatter from '@/components/DataDisplay/NumberFormatter/MyNumberFormatter'
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn'
import { U0DateToDDMMYYYString } from '@/utils/date'
import { Button, Group, Paper, Select, Tabs } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnDef } from 'mantine-react-table'
import React, { useMemo } from 'react'

interface I {
    ngayChungTu?: Date,
    dienGiai?: string // Mua mới TiVi 55 Inc
    soTien?: number, // 45000000
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function SF4_1_Tab_3() {
    const query = useQuery<I[]>({
        queryKey: [`SF4_1_Tab_3`],
        queryFn: async () => [
            {
                ngayChungTu: new Date("2025-01-10T00:00:00Z"),
                dienGiai: "Mua mới TiVi 55 Inc",
                soTien: 45000000,
                ngayCapNhat: new Date("2025-01-16T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
            {
                ngayChungTu: new Date("2025-01-12T00:00:00Z"),
                dienGiai: "Mua bàn ghế văn phòng",
                soTien: 12000000,
                ngayCapNhat: new Date("2025-01-17T00:00:00Z"),
                nguoiCapNhat: "Trần Thị B",
            },
        ],
    });
    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Ngày chứng từ",
            accessorKey: "ngayChungTu",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayChungTu!)),
        },
        {
            header: "Diễn giải",
            accessorKey: "dienGiai",
        },
        {
            header: "Số tiền",
            accessorKey: "soTien",
            Cell: ({ cell }) => <MyNumberFormatter value={cell.getValue<number>()} />,
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
        <Tabs.Panel value='Nguồn gốc hình thành'>
            <Paper p={'md'}>
                <MyFlexColumn>
                    <Group align='end'>
                        <MySelect w={'400px'} label="Nguồn gốc hình thành" data={['Mua mới', 'Mua cũ']} />
                        <Button>Chọn chứng từ</Button>
                    </Group>
                    <MyDataTable
                        columns={columns}
                        data={query.data!}
                        exportAble
                        renderTopToolbarCustomActions={() => (
                            <Group>
                                <MyButton crudType='delete' />
                                <MyButton crudType='import' />
                            </Group>
                        )}
                        renderRowActions={({ row }) => (
                            <MyCenterFull>
                                <MyActionIcon crudType='delete' />
                            </MyCenterFull>
                        )}
                    />
                </MyFlexColumn>
            </Paper>
        </Tabs.Panel>
    )
}
