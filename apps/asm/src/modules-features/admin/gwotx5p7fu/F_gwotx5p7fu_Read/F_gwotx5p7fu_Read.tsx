'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Checkbox, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SF_gwotx5p7fu_ChonTuDanhMucLoaiThoiGian from "./SF_gwotx5p7fu_ChonTuDanhMucLoaiThoiGian";
import SF_gwotx5p7fu_GiangVienKhongDay2CoSoKhacNhau from "./SF_gwotx5p7fu_GiangVienKhongDay2CoSoKhacNhau";
import SF_gwotx5p7fu_TietBatDauDuocXepLichHoc from "./SF_gwotx5p7fu_TietBatDauDuocXepLichHoc";

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

export default function F_gwotx5p7fu_Read() {
    const query = useQuery<IFetch[]>({
        queryKey: [`F_gwotx5p7fu_Read`],
        queryFn: async () => [
            { id: 1, thongSo: "Loại thời gian dùng để xếp lịch học", ngayCapNhat: new Date("2024-12-20T00:00:00Z"), nguoiCapNhat: "Admin" },
            { id: 2, thongSo: "Có kiểm tra ngày nghỉ lễ", ngayCapNhat: new Date("2024-12-22T00:00:00Z"), nguoiCapNhat: "GV. Nguyễn Văn A" },
            { id: 3, thongSo: "Có kiểm tra tiết nghỉ chung", ngayCapNhat: new Date("2024-12-23T00:00:00Z"), nguoiCapNhat: "Admin" },
            { id: 4, thongSo: "Có giới hạn số tiết dạy tối đa/ ngày của giảng viên", ngayCapNhat: new Date("2024-12-24T00:00:00Z"), nguoiCapNhat: "GV. Nguyễn Thị B" },
            { id: 5, thongSo: "Giảng viên không dạy 2 cơ sở khác nhau", ngayCapNhat: new Date("2024-12-25T00:00:00Z"), nguoiCapNhat: "Admin" },
            { id: 6, thongSo: "Tiết bắt đầu được xếp lịch học", ngayCapNhat: new Date("2024-12-26T00:00:00Z"), nguoiCapNhat: "GV. Trần Văn C" },
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
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderRowActions={({ row }) => {
                if (row.original.thongSo == "Loại thời gian dùng để xếp lịch học") {
                    return <SF_gwotx5p7fu_ChonTuDanhMucLoaiThoiGian />
                }
                if (row.original.thongSo == "Có kiểm tra ngày nghỉ lễ") {
                    return <Checkbox  {...form.getInputProps("coKiemTraNgayNghiLe", { type: "checkbox" })}></Checkbox>
                }
                if (row.original.thongSo == "Có kiểm tra tiết nghỉ chung") {
                    return <Checkbox {...form.getInputProps("coKiemTraTietNghiChung", { type: "checkbox" })}></Checkbox>
                }
                if (row.original.thongSo == "Có giới hạn số tiết dạy tối đa/ ngày của giảng viên") {
                    return <NumberInput {...form.getInputProps("coGioiHanSoTietDayToiDaNgayCuaGiangVien")}></NumberInput>
                }
                if (row.original.thongSo == "Giảng viên không dạy 2 cơ sở khác nhau") {
                    return <SF_gwotx5p7fu_GiangVienKhongDay2CoSoKhacNhau />
                }
                if (row.original.thongSo == "Tiết bắt đầu được xếp lịch học") {
                    return <SF_gwotx5p7fu_TietBatDauDuocXepLichHoc />
                }
            }}
        />
    );
}
