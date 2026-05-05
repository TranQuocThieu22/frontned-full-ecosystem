'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import { IconZoomScan } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButtonModal } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface IContent {
    id: number;
    code?: string;
    loaiThu?: string;
    tenDichVu?: string;
    donGia?: number;
    loaiUuDai?: string;
    noiDungUuDai?: string;
    mucUuDai?: number;
    phaiDong?: number;
}


export default function F_3cntlaxrnz_Detail() {
    const disc = useDisclosure()

    const ChiTietDanhSachPhieuThuQuery = useQuery<IContent[]>({
        queryKey: [`F_3cntlaxrnz_Content`],
        queryFn: async () => {
            return mockData;
        }
    })

    const columns = useMemo<MRT_ColumnDef<IContent>[]>(
        () => [
            {
                header: "Loại thu",
                accessorKey: "loaiThu"
            },
            {
                header: "Tên dịch vụ",
                accessorKey: "tenDichVu"
            },
            {
                header: "Đơn giá",
                accessorKey: "donGia",
                accessorFn: (row) => row.donGia?.toLocaleString('vi-VN'),
            },
            {
                header: "Loại ưu đãi",
                accessorKey: "loaiUuDai"
            },
            {
                header: "Nội dung ưu đãi",
                accessorKey: "noiDungUuDai"
            },
            {
                header: "Mức ưu đãi",
                accessorKey: "mucUuDai",
                accessorFn: (row) => row.mucUuDai ? row.mucUuDai?.toLocaleString('vi-VN') : "",
            },
            {
                header: "Phải đóng",
                accessorKey: "phaiDong",
                accessorFn: (row) => row.phaiDong?.toLocaleString('vi-VN'),
            }
        ],
        []
    )

    if (ChiTietDanhSachPhieuThuQuery.isLoading) return "Đang tải dữ liệu..."
    if (ChiTietDanhSachPhieuThuQuery.isError) return "Không có dữ liệu..."


    return (
        <MyButtonModal
            title="Chi tiết danh sách nội dung thu"
            modalSize={'100%'}
            disclosure={disc}
            leftSection={<IconZoomScan />}
            label="Xem"
        >
            <MyDataTable
                enableRowSelection={false}
                columns={columns}
                enableRowNumbers={false}
                data={ChiTietDanhSachPhieuThuQuery.data!}
            />
        </MyButtonModal>
    );
}


















const mockData: IContent[] = [
    {
        id: 1,
        loaiThu: "Học phí",
        tenDichVu: "Lập trình web 2401",
        donGia: 1250000,
        loaiUuDai: "Chiết khấu thanh toán",
        noiDungUuDai: "Chiết khấu 25% trước khai giảng",
        mucUuDai: 312500,
        phaiDong: 937500
    },
    {
        id: 2,
        loaiThu: "Lệ phí thi",
        tenDichVu: "Lập trình web",
        donGia: 300000,
        loaiUuDai: "",
        noiDungUuDai: "",
        mucUuDai: 0,
        phaiDong: 300000
    }
];