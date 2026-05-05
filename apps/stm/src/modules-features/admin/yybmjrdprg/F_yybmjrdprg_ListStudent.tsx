'use client'
import { MyButton } from '@/components/Buttons/Button/MyButton';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

export interface I_yybmjrdprg {
    tieuDe: string;
    loaiDoituong?: string;
    nguoiNhan?: string;
    noidung?: string;
    filedk?: File;
}
export interface I {
    maHV?: string;
    name?: string;
    sex?: string;
    dateOfBirth?: string;
    sdt?: string;
    email?: string;
    cccd?: string;
    ngaycap?: string;
    noicap?: string;
    diachi?: string;
    soqd?: string;
    ngayqd?: string;
    chungchi?: string;
    maKH?: string;
    maKT?: string;
}
export default function F_yybmjrdprg_ListStudent({ disclosure }: { disclosure: ReturnType<typeof useDisclosure> }) {
    const query = useQuery<I[]>({
        queryKey: ['F_yybmjrdprg_AddRoom'],
        queryFn: async () => [
            {
                maHV: "HV0001",
                name: "Nguyễn Văn A",
                sex: "Nam",
                dateOfBirth: "01/01/1990",
                sdt: "0896585235",
                email: "a@gmail.com",
                cccd: "",
                noicap: "",
                ngaycap: "",
                diachi: "",
                soqd: "QD125/CN",
                ngayqd: "01/02/2025",
                chungchi: "Tin học văn phòng",
                maKH: "THVP2501",
                maKT: "THVP2501"
            }
        ]
    })

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã học viên",
            accessorKey: "maHV"
        },
        {
            header: "Họ tên",
            accessorKey: "name"
        },
        {
            header: "Giới Tính",
            accessorKey: "sex"
        },
        {
            header: "Ngày sinh",
            accessorKey: "dateOfBirth"
        },
        {
            header: "Số điện thoại",
            accessorKey: "sdt"
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: "CCCD",
            accessorKey: "cccd"
        },
        {
            header: "Ngày cấp",
            accessorKey: "ngaycap"
        },
        {
            header: "Nơi cấp",
            accessorKey: "noicap"
        },
        {
            header: "Địa chỉ",
            accessorKey: "diachi"
        },
        {
            header: "Số quyết định",
            accessorKey: "soqd"
        },
        {
            header: "Ngày quyết định",
            accessorKey: "ngayqd"
        },
        {
            header: "Chứng chỉ",
            accessorKey: "chungchi"
        },
        {
            header: "Mã khoá học",
            accessorKey: "maKH"
        },
        {
            header: "Mã khoá thi",
            accessorKey: "maKT"
        },
    ], [])

    return (
        <>
            <Modal
                size={"90%"}
                opened={disclosure[0]}
                onClose={disclosure[1].close}
                title="Danh sách học viên"
            >
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <MyButton color='green'>Chọn</MyButton>
                        )
                    }}
                    data={query.data!} columns={columns} />
            </Modal >
        </>
    );
}
