'use client'
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { U0DateToDDMMYYYString } from '@/utils/date';


interface I {
    id?: number;
    donViYeuCau?: string;
    tenVatTu?: string;
    phanLoai?: string;
    quyCach?: string;
    mucDich?: string;
    chiec?: string;
    soLuong?: number;
    donGia?: string;
    thanhTien?: string;
    hinhThuc?: string;
    thoiGianMua?: Date;
}

export default function F3_6Xemdanhsach() {
    const disc = useDisclosure(false)
    const query = useQuery<I[]>({
        queryKey: [`F3_6Xemdanhsach`],
        queryFn: async () => [
            {
                id: 1,
                donViYeuCau: "Phòng đào tạo",
                tenVatTu: "Xe bán tải ISUZU",
                phanLoai: "",
                quyCach: "",
                mucDich: "Vận chuyển nhanh tài liệu giữa các cơ sở",
                chiec: "Chiếc",
                soLuong: 1,
                donGia: "785.000.000",
                thanhTien: "785.000.000",
                thoiGianMua: new Date('2025-02-20'),
                hinhThuc: "Đấu thầu"
            },
            {
                id: 2,
                donViYeuCau: "Phòng hành chính",
                tenVatTu: "Máy in Canon",
                phanLoai: "",
                quyCach: "",
                mucDich: "In ấn tài liệu",
                chiec: "Chiếc",
                soLuong: 2,
                donGia: "5.000.000",
                thanhTien: "10.000.000",
                thoiGianMua: new Date('2025-03-15'),
                hinhThuc: "Mua trực tiếp"
            },
            {
                id: 3,
                donViYeuCau: "Phòng kế toán",
                tenVatTu: "Máy tính xách tay Dell",
                phanLoai: "",
                quyCach: "",
                mucDich: "Xử lý công việc kế toán",
                chiec: "Chiếc",
                soLuong: 3,
                donGia: "20.000.000",
                thanhTien: "60.000.000",
                thoiGianMua: new Date('2025-04-10'),
                hinhThuc: "Đấu thầu"
            },
            {
                id: 4,
                donViYeuCau: "Phòng IT",
                tenVatTu: "Máy chủ HP",
                phanLoai: "",
                quyCach: "",
                mucDich: "Lưu trữ dữ liệu",
                chiec: "Chiếc",
                soLuong: 1,
                donGia: "150.000.000",
                thanhTien: "150.000.000",
                thoiGianMua: new Date('2025-05-05'),
                hinhThuc: "Đấu thầu"
            },
            {
                id: 5,
                donViYeuCau: "Phòng nghiên cứu",
                tenVatTu: "Kính hiển vi",
                phanLoai: "",
                quyCach: "",
                mucDich: "Nghiên cứu mẫu vật",
                chiec: "Chiếc",
                soLuong: 5,
                donGia: "10.000.000",
                thanhTien: "50.000.000",
                thoiGianMua: new Date('2025-06-01'),
                hinhThuc: "Mua trực tiếp"
            }
        ]
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Đơn vị yêu cầu",
            accessorKey: "donViYeuCau",
        },
        {
            header: "Tên vật tư",
            accessorKey: "tenVatTu",
        },
        {
            header: "Phân loại",
            accessorKey: "phanLoai",
        },
        {
            header: "Quy cách",
            accessorKey: "quyCach",
        },
        {
            header: "Mục đích sử dụng",
            accessorKey: "mucDich",
        },
        {
            header: "Đơn vị tính",
            accessorKey: "chiec",
        },
        {
            header: "Số lượng",
            accessorKey: "soLuong",
        },
        {
            header: "Đơn giá",
            accessorKey: "donGia",
        },
        {
            header: "Thành tiền",
            accessorKey: "thanhTien",
        },
        {
            header: "Thời gian mua sắm dự kiến",
            accessorKey: "thoiGianMua",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.thoiGianMua!));
            },
        },
        {
            header: "Hình thức mua sắm",
            accessorKey: "hinhThuc",
        }

    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal title="Danh sách vật tư trong kế hoạch mua sắm đã duyệt" modalSize={'100%'} label="Xem" disclosure={disc}>
            <MyDataTable
                // renderTopToolbarCustomActions={() => {
                //     return <Button onClick={() => {
                //         notifications.show({
                //             message: "Chọn thành công",
                //             color: "green"
                //         })
                //         disc[1].close()
                //     }}>Chọn</Button>
                // }}
                exportAble
                columns={columns}
                data={query.data!}
                enableRowSelection
            />
        </MyButtonModal>
    );
}
