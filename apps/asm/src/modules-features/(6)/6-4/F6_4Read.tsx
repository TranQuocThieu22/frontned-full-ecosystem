'use client';
import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Center, Checkbox, Group } from "@mantine/core";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import F6_4Update from "./F6_4Update";
import { U0DateToDDMMYYYString } from "@/utils/date";
import F6_4ButtonViewAssetList from "./F6_4ButtonViewAssetList";

// Interface định nghĩa dữ liệu
export interface I_F6_4Read {
    id?: number; // STT
    requestCode?: string; // Mã yêu cầu
    requestDate?: Date; // Ngày yêu cầu
    unit?: string; // Đơn vị sử dụng
    sender?: string; // Người gửi
    note?: string; // Ghi chú
    requestFile?: string; // File yêu cầu
    list?: string; // Danh sách tài sản
    valid?: boolean; // Hợp lệ
    survey?: boolean; // Đã khảo sát
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Giả lập mockData
const mockData: I_F6_4Read[] = [
    {
        id: 1,
        requestCode: "YCBT2536",
        requestDate: new Date("2024-01-15"),
        unit: "Phòng kế toán",
        sender: "Tô Ngọc Lâm",
        note: "TV đen màn hình",
        requestFile: "file1.pdf",
        list: "Tài sản 1, Tài sản 2",
        valid: true,
        survey: true,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
];

export default function F6_4Read() {


    // Sử dụng useQuery để tải dữ liệu
    const query = useQuery<I_F6_4Read[]>({
        queryKey: ["F6_4Read"],
        queryFn: async () => {
            // Trả về mockData giả lập, có thể thay bằng API thực tế
            return mockData;
        },
    });

    const columns = useMemo<MRT_ColumnDef<I_F6_4Read>[]>(() => [
        {
            header: "Mã yêu cầu",
            accessorKey: "requestCode",
        },
        {
            header: "Ngày yêu cầu",
            accessorKey: "requestDate",
            accessorFn: (row) => new Date(row.requestDate!).toLocaleDateString("vi-VN"),
        },
        {
            header: "Đơn vị sử dụng",
            accessorKey: "unit",
        },
        {
            header: "Người gửi",
            accessorKey: "sender",
        },
        {
            header: "Ghi chú",
            accessorKey: "note",
        },
        {
            header: "File yêu cầu",
            accessorKey: "requestFile",
            accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <MyButtonViewPDF id={row.id} />
                    </MyCenterFull>
                );
            },
        },
        {
            header: "Danh sách tài sản liên quan",
            Cell: ({ row }) => {
                return (
                    <>
                        <Center>
                            <F6_4ButtonViewAssetList contractId={row.original.id!} />
                        </Center>
                    </>
                )
            },
            size: 160
        },
        {
            header: "Hợp lệ",
            accessorKey: "valid",
            accessorFn: (row) => (
                <Checkbox
                    checked={row.valid}
                    readOnly
                />
            )
        },
        {
            header: "Đã khảo sát",
            accessorKey: "survey",
            accessorFn: (row) => (
                <Checkbox
                    checked={row.survey}
                    readOnly
                />
            )
        },
        {
            header: "Khảo sát",
            accessorFn: (row) => (
                <F6_4Update data={row.id!} />
            )
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat"
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn(originalRow) {
                return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
            },
        }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "requestCode", header: "Mã yêu cầu" },
            { fieldName: "requestDate", header: "Ngày yêu cầu" },
            { fieldName: "unit", header: "Đơn vị sử dụng" },
            { fieldName: "sender", header: "Người gửi" },
            { fieldName: "note", header: "Ghi chú" },
            { fieldName: "list", header: "Danh sách tài sản" },
            { fieldName: "valid", header: "Hợp lệ" },
            { fieldName: "survey", header: "Đã khảo sát" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            columns={columns}
            data={query.data!} // Sử dụng dữ liệu từ React Query
            enableRowSelection={true}
            enableRowNumbers={true}
            renderTopToolbarCustomActions={() => (
                <Group>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="Danh sách yêu cầu"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                </Group>
            )}

        />
    );
}
