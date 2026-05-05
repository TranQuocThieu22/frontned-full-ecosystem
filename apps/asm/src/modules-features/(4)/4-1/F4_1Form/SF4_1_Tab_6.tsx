'use client'
import { MyActionIcon } from '@/components/ActionIcons/ActionIcon/MyActionIcon';
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyNumberFormatter from '@/components/DataDisplay/NumberFormatter/MyNumberFormatter';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyFileInput from '@/components/Inputs/FileInput/MyFileInput';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Button, Group, Paper, SimpleGrid, Space, Tabs, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import React, { useMemo } from 'react'

interface I {
    bienBanGiaoNhan?: string,
    ngayBienBan?: number,
    canCuQuyetDinh?: string,
    ngayQuyetDinh?: string,
    cuaDoiTac?: string,
    diaDiemGiaoNhan?: string,
    giaMua?: number,
    phiVanChuyen?: number,
    phiChayThu?: number,
    taiLieuKyThuat?: string
}

export default function SF4_1_Tab_6() {
    const form = useForm<I>({})
    return (
        <Tabs.Panel value='Biên bản giao nhận'>
            <form>
                <Paper p={'md'}>
                    <MyFlexColumn>
                        <SimpleGrid cols={2}>
                            <MyTextInput label='Biên bản giao nhận' {...form.getInputProps("bienBanGiaoNhan")} />
                            <MyDateInput label='Ngày biên bản' {...form.getInputProps("ngayBienBan")} />
                            <MyTextInput label='Căn cứ quyết định' {...form.getInputProps("canCuQuyetDinh")} />
                            <MyDateInput label='Ngày quyết định' {...form.getInputProps("ngayQuyetDinh")} />
                        </SimpleGrid>
                        <TextInput label='Của đối tác' placeholder='Nhập thông tin đối tác' {...form.getInputProps("cuaDoiTac")} />
                        <Table />
                        <MyTextInput label='Địa điểm giao/ nhận' />
                        <Group>
                            <MyNumberInput thousandSeparator label='Giá mua' />
                            <MyNumberInput thousandSeparator label='Phí vận chuyển' />
                            <MyNumberInput thousandSeparator label='Phí chạy thử' />
                        </Group>
                        <MyFileInput label='Tài liệu kỹ thuật kèm theo' />
                    </MyFlexColumn>
                </Paper>
            </form>
        </Tabs.Panel>
    )
}

interface I {
    hoVaTen?: string, // Tô Ngọc Lâm
    chucVu?: string // Giao hàng
    daiDien?: string // Thế giới di động
}
function Table() {
    interface ITable {
        hoVaTen?: string; // Tô Ngọc Lâm
        chucVu?: string; // Giao hàng
        daiDien?: string; // Thế giới di động
        ngayCapNhat?: Date; // Thêm trường theo yêu cầu
        nguoiCapNhat?: string; // Thêm trường theo yêu cầu
    }
    const query = useQuery<ITable[]>({
        queryKey: [`SF4_1_Tab_6`],
        queryFn: async () => [
            {
                hoVaTen: "Tô Ngọc Lâm",
                chucVu: "Giao hàng",
                daiDien: "Thế giới di động",
                ngayCapNhat: new Date("2025-01-15T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn A",
            },
            {
                hoVaTen: "Trần Văn Hùng",
                chucVu: "Kinh doanh",
                daiDien: "FPT Shop",
                ngayCapNhat: new Date("2025-01-16T00:00:00Z"),
                nguoiCapNhat: "Trần Thị B",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<ITable>[]>(() => [
        {
            header: "Họ tên",
            accessorKey: "hoVaTen",
        },
        {
            header: "Chức vụ",
            accessorKey: "chucVu",
        },
        {
            header: "Đại diện",
            accessorKey: "daiDien",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => new Date(row.ngayCapNhat!).toLocaleDateString("vi-VN"),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
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
    )
}