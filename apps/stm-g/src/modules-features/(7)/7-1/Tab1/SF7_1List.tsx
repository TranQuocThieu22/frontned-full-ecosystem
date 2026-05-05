'use client'
import MyDataTableSelect from "@/components/RESTAPIComponents/DataTableSelect/MyDataTableSelect";
import { Anchor, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    maKhoaHoc?: number;
    tenKhoaHoc?: string;
    tenChuongTrinh?: string;
    loaiChuongTrinh?: string;
    ngayKhaiGiang?: string;
    ngayThi?: Date;
    coToChucThi?: boolean;
    tongSoTiet?: number;
    tongSoGio?: number;
    hocPhi?: number;
    cumThoiGian?: string;
    soLuongHocViendangKy?: string;
    soLuongDaXepLop?: number;
    xepLop?: boolean
}

export default function SF7_1List({ listState }: { listState: ReturnType<typeof useListState<I>> }) {
    const query = useQuery<I[]>({
        queryKey: [`ListSelectTemplate`],
        queryFn: async () => [
            {
                id: 1,
                maKhoaHoc: 2401,
                tenKhoaHoc: "Lập trình web khóa 2024",
                tenChuongTrinh: "Lập trình web",
                loaiChuongTrinh: "Đào tạo ngắn hạn",
                ngayKhaiGiang: "12/01/2024",
                ngayThi: new Date("2024-05-12"),
                coToChucThi: true,
                tongSoTiet: 120,
                tongSoGio: 90,
                hocPhi: 9500000,
                cumThoiGian: "Tối thứ 2 4 6",
                soLuongHocViendangKy: "35",
                soLuongDaXepLop: 35,
                xepLop: true
            },
            {
                id: 2,
                maKhoaHoc: 2402,
                tenKhoaHoc: "Lập trình Python khóa 2024",
                tenChuongTrinh: "Lập trình Python",
                loaiChuongTrinh: "Đào tạo ngắn hạn",
                ngayKhaiGiang: "15/01/2024",
                ngayThi: new Date("2024-06-01"),
                coToChucThi: false,
                tongSoTiet: 100,
                tongSoGio: 75,
                hocPhi: 8500000,
                cumThoiGian: "Tối thứ 3 5 7",
                soLuongHocViendangKy: "25",
                soLuongDaXepLop: 25,
                xepLop: false
            },
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã khóa học",
            accessorKey: "maKhoaHoc",
        },
        {
            header: "Tên khóa học",
            accessorKey: "tenKhoaHoc",
        },
        {
            header: "Tên chương trình",
            accessorKey: "tenChuongTrinh",
        },
        {
            header: "Loại chương trình",
            accessorKey: "loaiChuongTrinh",
        },
        {
            header: "Ngày khai giảng",
            accessorKey: "ngayKhaiGiang",
        },
        {
            header: "Ngày thi dự kiến",
            accessorKey: "ngayThi",
            Cell: ({ cell }) => (cell.getValue<Date>() ? new Date(cell.getValue<Date>()).toLocaleDateString("vi-VN") : "Chưa xác định"),
        },
        {
            header: "Có tổ chức thi",
            accessorKey: "coToChucThi",
            Cell: ({ cell }) => (cell.getValue<boolean>() ? "Có" : "Không"),
        },
        {
            header: "Tổng số tiết",
            accessorKey: "tongSoTiet",
        },
        {
            header: "Tổng số giờ",
            accessorKey: "tongSoGio",
        },
        {
            header: "Học phí",
            accessorKey: "hocPhi",
            Cell: ({ cell }) => cell.getValue<number>()?.toLocaleString("vi-VN"),
        },
        {
            header: "Cụm thời gian",
            accessorKey: "cumThoiGian",
        },
        {
            header: "Số lượng học viên đăng ký",
            accessorKey: "soLuongHocViendangKy",
        },
        {
            header: "Số lượng đã xếp lớp",
            accessorKey: "soLuongDaXepLop",
        },
        {
            header: "Danh sách học viên",
            accessorFn: () => <Anchor>Xem</Anchor>
        },
        {
            header: "Xếp lớp",
            accessorFn: (row) => {
                if (row.xepLop) return <Text>Đã xếp lớp</Text>
                return <Text>Chưa xếp lớp</Text>
            }
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTableSelect selectButtonlabel="Chọn khóa học" listLabel="Khóa học" columns={columns} listState={listState as any} data={query.data} />
    );
}
