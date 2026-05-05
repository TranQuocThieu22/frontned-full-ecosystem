"use client"

import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Checkbox } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButtonModal } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface ICourse {
    id?: number
    maKhoaHoc?: string,
    tenKhoaHoc?: string,
    tenChuongTrinh?: string,
    loaiChuongTrinh?: string,
    ngayKhaiGiang: string,
    ngayKetThuc: string,
    trangThai: string,
    ngayThi: string,
    coToChuc: boolean,
    tongSoTiet: number,
    tongSoGio: number,
    hocPhi: number,
    cumThoiGian: string
}

export default function F_05tb8fc3wi_CreateInSide() {
    const disc = useDisclosure();

    const courseQuery = useQuery<ICourse[]>({
        queryKey: [`F_05tb8fc3wi_CreateInSide`],
        queryFn: async () => {
            return [
                {
                    id: 1,
                    maKhoaHoc: "LTB24101",
                    tenKhoaHoc: "Lập trình web 2022",
                    tenChuongTrinh: "Lập trình web",
                    loaiChuongTrinh: "Đào tạo ngắn hạn",
                    ngayKhaiGiang: "2025-07-01",
                    ngayKetThuc: "2025-09-30",
                    trangThai: "Đang mở đăng ký",
                    ngayThi: "2025-10-05",
                    coToChuc: true,
                    tongSoTiet: 120,
                    tongSoGio: 90,
                    hocPhi: 3000000,
                    cumThoiGian: "Tối thứ 2 4 6 Tối thứ 3 5 7"
                },
            ]
        }
    })

    const columns = useMemo<MRT_ColumnDef<ICourse>[]>(() => [
        {
            header: "Mã khóa học",
            accessorKey: "maKhoaHoc"
        },
        {
            header: "Tên khóa học",
            accessorKey: "tenKhoaHoc"
        },
        {
            header: "Tên chương trình",
            accessorKey: "tenChuongTrinh"
        },
        {
            header: "Loại chương trình",
            accessorKey: "loaiChuongTrinh"
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "ngayKhaiGiang",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayKhaiGiang))
        },
        {
            header: "Ngày kết thúc (dự kiến)",
            accessorKey: "ngayKetThuc",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayKetThuc))
        },
        {
            header: "Ngày thi",
            accessorKey: "ngayThi",
            accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngayThi))
        },
        {
            header: "Trạng thái",
            accessorKey: "trangThai"
        },
        {
            header: "Có tổ chức thi",
            accessorFn: (row) => <Checkbox defaultChecked={row.coToChuc} readOnly />
        },
        {
            header: "Tổng số tiết",
            accessorKey: "tongSoTiet",
        },
        {
            header: "Tổng số giờ",
            accessorKey: "tongSoGio"
        },
        {
            header: "Học phí",
            accessorKey: "hocPhi"
        },
        {
            header: "Cụm thời gian",
            accessorKey: "cumThoiGian"
        }
    ], [])

    if (courseQuery.isLoading) return "Đang tải dữ liệu..."
    if (courseQuery.isError) return "Không có dữ liệu..."

    return (
        <MyButtonModal
            label="Thêm"
            bg={"green"}
            modalSize={"90%"}
            disclosure={disc}
            title="Danh sách khóa học"
            leftSection={<IconPlus />}
        >
            <MyDataTable columns={columns} data={courseQuery.data || []}
                enableRowSelection={true}
                enableRowNumbers={false}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <Button color="green">Chọn</Button>
                        </>
                    )
                }}
            />
        </MyButtonModal>

    )
}