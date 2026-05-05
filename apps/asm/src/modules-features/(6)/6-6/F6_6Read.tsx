'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { Center, Checkbox, Group } from "@mantine/core";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import F6_6Form from "./F6_6Form/F6_6Form";
import F6_6Delete from "./F6_6Delete";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import F6_6ButtonViewAssetList from "./F6_6ButtonViewAssetList";

interface I {
    id?: number;
    maHoSo?: string; // HSBT524
    tenHoSo?: string; // Thực hiện sữa chữa tài sản đợt 1 2024
    maKeHoach?: string; // BBT202401
    // danhSachTaiSanLienQuan?: string;
    tongChiPhiUocTinh?: string; // 65.000.000
    fileDinhKem?: string;
    daKy?: boolean;
    ngayKy?: Date;
    nguoiKy?: string;
    ngayCapNhat?: Date; // Thêm trường theo yêu cầu
    nguoiCapNhat?: string; // Thêm trường theo yêu cầu
}

export default function F6_6Read() {
    const query = useQuery<I[]>({
        queryKey: [`F6_6Read`],
        queryFn: async () => [
            {
                id: 1,
                maHoSo: "HSBT524",
                tenHoSo: "Thực hiện sửa chữa tài sản đợt 1 2024",
                maKeHoach: "BBT202401",
                // danhSachTaiSanLienQuan: "TV55SS, TS0123",
                tongChiPhiUocTinh: "65.000.000",
                fileDinhKem: "link-to-file.pdf",
                daKy: true,
                ngayKy: new Date("2025-01-15T00:00:00Z"),
                nguoiKy: "Nguyễn Văn A",
                ngayCapNhat: new Date("2025-01-15T00:00:00Z"),
                nguoiCapNhat: "Nguyễn Văn B",
            },
            {
                id: 2,
                maHoSo: "HSBT525",
                tenHoSo: "Thực hiện sửa chữa tài sản đợt 2 2024",
                maKeHoach: "BBT202402",
                // danhSachTaiSanLienQuan: "TS0150, TS0201",
                tongChiPhiUocTinh: "85.000.000",
                fileDinhKem: "link-to-file.pdf",
                daKy: false,
                ngayKy: new Date("2025-01-16T00:00:00Z"),
                nguoiKy: "Trần Văn C",
                ngayCapNhat: new Date("2025-01-16T00:00:00Z"),
                nguoiCapNhat: "Trần Thị D",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
        {
            header: "Mã hồ sơ",
            accessorKey: "maHoSo",
        },
        {
            header: "Tên hồ sơ",
            accessorKey: "tenHoSo",
        },
        {
            header: "Mã kế hoạch",
            accessorKey: "maKeHoach",
        },
        {
            header: "Danh sách tài sản liên quan",
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            <F6_6ButtonViewAssetList contractId={row.original.id!} />
                        </Center>
                    </>
                )
            },
            size: 160
        },
        {
            header: "Tổng chi phí ước tính",
            accessorKey: "tongChiPhiUocTinh",
            Cell: ({ cell }) => <MyNumberFormatter value={parseFloat(cell.getValue<string>()?.replace(/\./g, "") || "0")} />,
        },
        {
            header: "File đính kèm",
            accessorKey: "file",
            accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <MyButtonViewPDF />
                    </MyCenterFull>
                )
            }
        },
        {
            header: "Đã ký",
            accessorKey: "daKy",
            Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />,
        },
        {
            header: "Ngày ký",
            accessorKey: "ngayKy",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayKy!)),
        },
        {
            header: "Người ký",
            accessorKey: "nguoiKy",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayCapNhat!)),
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",
        },
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!}
            exportAble
            renderTopToolbarCustomActions={() => (
                <Group>
                    <F6_6Form />
                    <MyButton crudType="delete" />
                    <MyButton crudType="import" />
                </Group>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F6_6Form values={row.original} />
                    <F6_6Delete id={row.original.id!} />
                </MyCenterFull>
            )}
        />
    );
}
