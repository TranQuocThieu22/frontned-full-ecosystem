'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Checkbox, FileInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconUpload } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I {
    id?: number;
    tenDeTai?: string;
    linhVuc?: string;
    giangVien?: string;
    donViCongTac?: string;
    kinhPhiDuKien?: number;
    thoiGianDuKien?: number;
    fileThuyetMinhSrc?: string;
    thucHien?: boolean;
    fileThuyetMinhHoanThienSrc?: string;
}

export default function F5_3_4Read() {
    const query = useQuery<I[]>({
        queryKey: [`F5_3_4Read`],
        queryFn: async () => [
            {
                id: 1,
                tenDeTai: "Nghiên cứu AI trong giáo dục",
                linhVuc: "Giáo dục",
                giangVien: "Trần Quốc Thiệu",
                donViCongTac: "Đại học Công nghệ",
                kinhPhiDuKien: 50000000,
                thoiGianDuKien: 12,
                fileThuyetMinhSrc: "/files/thuyet-minh-1.pdf",
                thucHien: true,
                fileThuyetMinhHoanThienSrc: "/files/thuyet-minh-hoan-thien-1.pdf",
            },
            {
                id: 2,
                tenDeTai: "Ứng dụng Blockchain trong quản lý",
                linhVuc: "Công nghệ",
                giangVien: "Nguyễn Văn Định",
                donViCongTac: "Viện Nghiên cứu Blockchain",
                kinhPhiDuKien: 75000000,
                thoiGianDuKien: 18,
                fileThuyetMinhSrc: "/files/thuyet-minh-2.pdf",
                thucHien: false,
                fileThuyetMinhHoanThienSrc: "/files/thuyet-minh-hoan-thien-2.pdf",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Tên đề tài",
            accessorKey: "tenDeTai",
        },
        {
            header: "Lĩnh vực",
            accessorKey: "linhVuc",
        },
        {
            header: "Giảng viên",
            accessorKey: "giangVien",
        },
        {
            header: "Đơn vị công tác",
            accessorKey: "donViCongTac",
        },
        {
            header: "Kinh phí dự kiến ",
            accessorKey: "kinhPhiDuKien",
            Cell: ({ cell }) => new Intl.NumberFormat("vi-VN").format(cell.getValue<number>()),
        },
        {
            header: "Thời gian dự kiến (tháng)",
            accessorKey: "thoiGianDuKien",
        },
        {
            header: "File thuyết minh",
            accessorKey: "fileThuyetMinhSrc",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />
            },
        },
        {
            header: "Đang thực hiện",
            accessorKey: "thucHien",
            Cell: ({ cell }) => <Checkbox defaultChecked={cell.getValue<boolean>()} />
        },
        {
            header: "File thuyết minh hoàn thiện",
            accessorKey: "fileThuyetMinhHoanThienSrc",
            Cell: ({ cell }) => {
                return <MyButtonViewPDF />
            },
        },
        {
            header: "Cập nhật file thuyết minh hoàn thiện",
            accessorFn: (row) => {
                return <TaiFileThuyetMinhMoi />
            }
        },
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

function TaiFileThuyetMinhMoi() {
    const disc = useDisclosure()
    return (
        <MyButtonModal leftSection={<IconUpload />} title="Tải file thuyết minh" label="Tải file thuyết minh" disclosure={disc}>
            <FileInput label="Chọn file thuyết minh"></FileInput>
            <MyButton crudType="save" onClick={() => {
                disc[1].close()
                notifications.show({
                    message: "Cập nhật thành công"
                })
            }} />
        </MyButtonModal>
    )
}