'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

interface IFetch {
    id?: number;
    thongSo?: string; // Loại thời gian dùng để xếp lịch học, có kiểm tra ngày nghỉ lễ, có kiểm tra tiết nghỉ chung, Có giới hạn số tiết dạy tối đa/ ngày của giảng viên, Giảng viên không dạy 2 cơ sở khác nhau, Tiết bắt đầu được xếp lịch học
    ngayCapNhat?: Date;
    nguoiCapNhat?: string;
}
interface IOutPut {
    coKiemTraNgayNghiLe?: boolean;
    coKiemTraTietNghiChung?: boolean;
    coGioiHanSoTietDayToiDaNgayCuaGiangVien?: number,
}

export default function SF_gwotx5p7fu_GiangVienKhongDay2CoSoKhacNhau() {
    const labelState = useState<string | undefined>('Trong cùng 1 buổi/ Trong cùng 1 ngày')
    const disc = useDisclosure()
    const query = useQuery<IFetch[]>({
        queryKey: [`SF_gwotx5p7fu_GiangVienKhongDay2CoSoKhacNhau`],
        queryFn: async () => [
            { id: 1, thongSo: "Trong cùng 1 buổi/ Trong cùng 1 tuần", ngayCapNhat: new Date("2024-12-20T00:00:00Z"), nguoiCapNhat: "Admin" },
            { id: 2, thongSo: "Trong cùng 1 môn dạy", ngayCapNhat: new Date("2024-12-22T00:00:00Z"), nguoiCapNhat: "GV. Nguyễn Văn A" },
            { id: 3, thongSo: "Trong cùng 1 tuần", ngayCapNhat: new Date("2024-12-23T00:00:00Z"), nguoiCapNhat: "Admin" },
        ],
    });
    const columns = useMemo<MRT_ColumnDef<IFetch>[]>(
        () => [

            {
                header: "Thông số",
                accessorKey: "thongSo",
            },
            {
                header: "Ngày chỉnh sửa",
                accessorKey: "ngayCapNhat",
                accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!)),
            },
            {
                header: "Người chỉnh sửa",
                accessorKey: "nguoiCapNhat",
            },
        ],
        []
    );
    const form = useForm<IOutPut>({
        mode: 'uncontrolled',
        initialValues: {
            coKiemTraNgayNghiLe: true,
            coKiemTraTietNghiChung: false,
            coGioiHanSoTietDayToiDaNgayCuaGiangVien: 10,
        }
    })



    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal disclosure={disc} label={labelState[0]} modalSize={'xl'} >
            <MyDataTable
                columns={columns}
                data={query.data!}
                exportAble
                renderRowActions={({ row }) => {
                    return <Button onClick={() => {
                        labelState[1](row.original.thongSo)
                        disc[1].close()
                        notifications.show({ title: 'Chọn thành công', message: `Đã chọn ${row.original.thongSo}` })
                    }}>Chọn</Button>
                }}
            />
        </MyButtonModal>
    );
}
