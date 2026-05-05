'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Fieldset } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SendMail from "./F5_5_1SendMail";

export interface I {
    id?: number;
    maDeTai?: string;
    tenDeTai?: string;
    chuNhiem?: string;
    soDienThoaiChuNhiem?: string;
    thoiGianBatDau?: Date;
    thoiGianKetThuc?: Date;
    kinhPhi?: number;
    trangThai?: string; // Còn hạn / Đã báo cáo / Trễ hạn
    denNgayBaoCao?: string; // Còn 2 ngày / Còn 3 ngày
    trangThaiThucHien?: string; // Đang thực hiện / Đã thanh lý / Quá hạn
}

export default function F5_5_1ReadListOfResearchTopics() {
    const query = useQuery<I[]>({
        queryKey: [`F5_5_1ReadListOfResearchTopics`],
        queryFn: async () => [
            {
                id: 1,
                maDeTai: "DT001",
                tenDeTai: "Nghiên cứu khoa học",
                chuNhiem: "Nguyễn Văn A",
                soDienThoaiChuNhiem: "0123456789",
                thoiGianBatDau: new Date("2023-01-01"),
                thoiGianKetThuc: new Date("2024-01-01"),
                kinhPhi: 10000000,
                trangThai: "Còn hạn",
                denNgayBaoCao: "Còn 3 ngày",
                trangThaiThucHien: "Đang thực hiện",
            },
            {
                id: 2,
                maDeTai: "DT002",
                tenDeTai: "Phát triển phần mềm",
                chuNhiem: "Trần Thị B",
                soDienThoaiChuNhiem: "0987654321",
                thoiGianBatDau: new Date("2023-06-01"),
                thoiGianKetThuc: new Date("2024-06-01"),
                kinhPhi: 20000000,
                trangThai: "Đã báo cáo",
                denNgayBaoCao: "Còn 7 ngày",
                trangThaiThucHien: "Đã thanh lý",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã đề tài",
            accessorKey: "maDeTai",
        },
        {
            header: "Tên đề tài",
            accessorKey: "tenDeTai",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "chuNhiem",
        },
        {
            header: "Số điện thoại chủ nhiệm",
            accessorKey: "soDienThoaiChuNhiem",
        },
        {
            header: "Thời gian bắt đầu",
            accessorKey: "thoiGianBatDau",
            Cell: ({ cell }) => U0DateToDDMMYYYString(new Date(cell.getValue<Date>())),
        },
        {
            header: "Thời gian kết thúc",
            accessorKey: "thoiGianKetThuc",
            Cell: ({ cell }) => U0DateToDDMMYYYString(new Date(cell.getValue<Date>())),
        },
        {
            header: "Kinh phí",
            accessorKey: "kinhPhi",
        },
        {
            header: "Trạng thái",
            accessorKey: "trangThai",
        },
        {
            header: "Đến ngày báo cáo",
            accessorKey: "denNgayBaoCao",
        },
        {
            header: "Trạng thái thực hiện",
            accessorKey: "trangThaiThucHien",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend="Danh mục đề tài NCKH giảng viên theo dõi báo cáo">
            <MyDataTable
                enableRowSelection
                renderTopToolbarCustomActions={() => {
                    return <SendMail />
                }}
                columns={columns}
                data={query.data!}
            />
        </Fieldset>
    );
}
