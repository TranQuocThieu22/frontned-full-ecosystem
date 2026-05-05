'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Checkbox } from "@mantine/core";
import { IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    maDeTai?: string;
    tenDeTai?: string;
    linhVuc?: string;
    chuNhiem?: string;
    donViCongTac?: string;
    kinhPhi?: number;
    thoiGian?: number;
    fileThuyetMinhSrc?: string;
    daDuyet?: boolean;
    fileThuyetMinhHoanThienCapTruongSrc?: string;
}

export default function F5_4_2Read() {
    const query = useQuery<I[]>({
        queryKey: [`F5_4_2Read`],
        queryFn: async () => [
            {
                id: 1,
                maDeTai: "DT-001",
                tenDeTai: "Ứng dụng AI trong giáo dục",
                linhVuc: "Công nghệ thông tin",
                chuNhiem: "Nguyễn Văn A",
                donViCongTac: "ĐH Công nghệ",
                kinhPhi: 1000000,
                thoiGian: 12,
                fileThuyetMinhSrc: "/files/thuyet-minh-1.pdf",
                daDuyet: true,
                fileThuyetMinhHoanThienCapTruongSrc: "/files/thuyet-minh-hoan-thien-1.pdf",
            },
            {
                id: 2,
                maDeTai: "DT-002",
                tenDeTai: "Phát triển công nghệ Blockchain",
                linhVuc: "Công nghệ thông tin",
                chuNhiem: "Trần Thị B",
                donViCongTac: "ĐH Khoa học tự nhiên",
                kinhPhi: 2000000,
                thoiGian: 18,
                fileThuyetMinhSrc: "/files/thuyet-minh-2.pdf",
                daDuyet: false,
                fileThuyetMinhHoanThienCapTruongSrc: "/files/thuyet-minh-hoan-thien-2.pdf",
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
            header: "Lĩnh vực",
            accessorKey: "linhVuc",
        },
        {
            header: "Chủ nhiệm",
            accessorKey: "chuNhiem",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "donViCongTac",
        },
        {
            header: "Kinh phí",
            accessorKey: "kinhPhi",
        },
        {
            header: "Thời gian (tháng)",
            accessorKey: "thoiGian",
        },
        {
            header: "Đã duyệt",
            accessorKey: "daDuyet",
            Cell: ({ cell }) => <Checkbox onChange={() => { }} checked={cell.getValue<boolean>()} />,
        },
        {
            header: "File thuyết minh",
            accessorKey: "fileThuyetMinhSrc",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
        },
        {
            header: "File thuyết minh hoàn thiện cấp trường",
            accessorKey: "fileThuyetMinhHoanThienCapTruongSrc",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />;
            },
        },
        {
            header: "Cập nhật thuyết minh hoàn thiện cấp trường",
            accessorFn: () => {
                return <Button leftSection={<IconUpload />} color="yellow">Cập nhật file</Button>
            }
        }
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
        />
    );
}
