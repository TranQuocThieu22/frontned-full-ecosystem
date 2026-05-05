'use client';
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F8_3_3Update from "./F8_3_3Update";

export interface I8_3_3ListOfConference {
    id?: number; // STT
    tenHoiNghi?: string; // Tên hội nghị hội thảo
    donViToChuc?: string; // Đơn vị tổ chức
    donViPhoiHop?: string; // Đơn vị phối hợp
    soLgDuKien?: number; // Số lượng đại biểu dự kiến
    noiDung?: string; // Nội dung hội nghị, hội thảo
    time?: string; // Thời gian thực hiện
    điaiem?: string; // Địa điểm tổ chức
    soLgThamDu?: number; // Số lượng đại biểu tham dự
    soLgBaiVietThamDu?: number; // Số lượng bài viết gửi tham dự
    soLuongBaiDcBaoCao?: number; // Số lượng bài được báo cáo
    soLuongBaoDcCongBo?: number; // Số lượng bài được công bố
    tongKinhPhi?: number; // Tổng kinh phí
}

export default function ReadTemplate() {
    const query = useQuery<I8_3_3ListOfConference[]>({
        queryKey: [`ListOfConference`],
        queryFn: async () => [
            {
                id: 1,
                tenHoiNghi: "Hội nghị Khoa học Công nghệ 2024",
                donViToChuc: "Đại học ABC",
                donViPhoiHop: "Viện XYZ",
                soLgDuKien: 200,
                noiDung: "Giới thiệu các kết quả nghiên cứu mới.",
                time: "12/12/2024",
                điaiem: "Hội trường lớn Đại học ABC",
                soLgThamDu: 180,
                soLgBaiVietThamDu: 50,
                soLuongBaiDcBaoCao: 30,
                soLuongBaoDcCongBo: 20,
                tongKinhPhi: 100000000,
            },
            {
                id: 2,
                tenHoiNghi: "Hội thảo Quốc tế AI 2024",
                donViToChuc: "Trường Đại học DEF",
                donViPhoiHop: "Công ty AI Global",
                soLgDuKien: 300,
                noiDung: "Thảo luận về AI trong đời sống.",
                time: "15/01/2024",
                điaiem: "Khách sạn XYZ",
                soLgThamDu: 250,
                soLgBaiVietThamDu: 70,
                soLuongBaiDcBaoCao: 40,
                soLuongBaoDcCongBo: 35,
                tongKinhPhi: 150000000,
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I8_3_3ListOfConference>[]>(() => [

        {
            header: "Tên hội nghị, hội thảo",
            accessorKey: "tenHoiNghi",
        },
        {
            header: "Đơn vị tổ chức",
            accessorKey: "donViToChuc",
        },
        {
            header: "Đơn vị phối hợp",
            accessorKey: "donViPhoiHop",
        },
        {
            header: "Số lượng đại biểu dự kiến",
            accessorKey: "soLgDuKien",
        },
        {
            header: "Nội dung",
            accessorKey: "noiDung",
        },
        {
            header: "Thời gian thực hiện",
            accessorKey: "time",
        },
        {
            header: "Địa điểm tổ chức",
            accessorKey: "điaiem",
        },
        {
            header: "Số lượng đại biểu tham dự",
            accessorKey: "soLgThamDu",
        },
        {
            header: "Số lượng bài viết gửi tham dự",
            accessorKey: "soLgBaiVietThamDu",
        },
        {
            header: "Số lượng bài được báo cáo",
            accessorKey: "soLuongBaiDcBaoCao",
        },
        {
            header: "Số lượng bài được công bố",
            accessorKey: "soLuongBaoDcCongBo",
        },
        {
            header: "Tổng kinh phí",
            accessorKey: "tongKinhPhi",
            Cell: ({ cell }) => `${cell.getValue<number>()?.toLocaleString()} VND`,
        },
        {
            header: "File kế hoạch",
            accessorFn: () =>
                <MyButtonViewPDF src={"https://example.com/sample-evaluation.pdf"} />
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        <F8_3_3Update values={row.original} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
