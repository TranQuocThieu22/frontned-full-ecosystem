'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IChiTietThoiGian {
    id?: number,
    thoiGianBatDau?: string,
    soPhut?: number,
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}
export default function F_fmldebrgvj_Read_2() {
    const query = useQuery<IChiTietThoiGian[]>({
        queryKey: ['F_fmldebrgvj_Read_2'],
        queryFn: async () => chiTietThoiGianData,
    })

    const columns = useMemo<MRT_ColumnDef<IChiTietThoiGian>[]>(
        () => [
            {
                header: "Thời gian bắt đầu",
                accessorKey: "thoiGianBatDau"
            },
            {
                header: "Số phút",
                accessorKey: "soPhut"
            },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }
        ],
        []
    );

    if (query.isLoading) return "Đang tải dữ liệu..."
    if (query.isError) return "Có lỗi xảy ra!"
    return (
        <MyDataTable
            columns={columns}
            enableRowNumbers={true}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() => (
                <Group>
                    
                    <Button>Lưu</Button>
                    <MyButton crudType="import" />
                </Group>
            )
            }
        />
    )
}



const chiTietThoiGianData: IChiTietThoiGian[] = [
    {
        id: 1,
        thoiGianBatDau: "07:00",
        soPhut: 90,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 2,
        thoiGianBatDau: "08:30",
        soPhut: 120,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 3,
        thoiGianBatDau: "10:45",
        soPhut: 60,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 4,
        thoiGianBatDau: "13:00",
        soPhut: 75,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 5,
        thoiGianBatDau: "14:30",
        soPhut: 90,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 6,
        thoiGianBatDau: "16:00",
        soPhut: 120,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 7,
        thoiGianBatDau: "18:15",
        soPhut: 60,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    },
    {
        id: 8,
        thoiGianBatDau: "19:45",
        soPhut: 45,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2024-01-05")
    }
];
