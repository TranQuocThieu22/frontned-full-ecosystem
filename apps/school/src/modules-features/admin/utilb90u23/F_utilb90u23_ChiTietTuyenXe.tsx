"use client";
import {
    AQButtonExportData,
    MyDataTable,
    MyFieldset,
    MyCheckbox,
    MyButtonModal,
} from "aq-fe-framework/components";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export default function F_utilb90u23_ChiTietTuyenXe() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const disclosure = useDisclosure();

    // Query
    const chiTietTuyenXeQuery = useQuery<I_utilb90u23_ChiTietTuyenXe[]>({
        queryKey: ["F_utilb90u23_ChiTietTuyenXe"],
        queryFn: async () => {
            return mockData;
        },
    });

    // export confirm
    const exportConfig = {
        fields: [
            {
                header: "Mã học sinh",
                fieldName: "maHocSinh",
            },
            {
                header: "Họ tên",
                fieldName: "hoTen",
            },
            {
                header: "Lớp",
                fieldName: "lop",
            },
            {
                header: "Giới tính",
                fieldName: "gioiTinh",
            },
            {
                header: "Lên",
                fieldName: "len",
            },
            {
                header: "Xuống",
                fieldName: "xuong",
            },
        ],
    };

    // column table
    const columns = useMemo<MRT_ColumnDef<I_utilb90u23_ChiTietTuyenXe>[]>(
        () => [
            {
                header: "Mã học sinh",
                accessorKey: "maHocSinh",
            },
            {
                header: "Họ tên",
                accessorKey: "hoTen",
            },
            {
                header: "Lớp",
                accessorKey: "lop",
            },
            {
                header: "Giới tính",
                accessorKey: "gioiTinh",
            },
            {
                header: "Lên",
                accessorKey: "len",
                Cell({ row }) {
                    return (<MyCheckbox checked={row.original.len} readOnly />);
                },
            },
            {
                header: "Xuống",
                accessorKey: "xuong",
                Cell({ row }) {
                    return (<MyCheckbox checked={row.original.xuong} readOnly />);
                },
            },
        ],
        []
    );

    if (chiTietTuyenXeQuery.isLoading) return "Đang tải dữ liệu...";
    if (chiTietTuyenXeQuery.isError) return "Lỗi tải dữ liệu";

    return (
        <>
            <MyButtonModal
                label="Xem chi tiết"
                modalSize={"100%"}
                disclosure={disclosure}
                fullScreen={isFullScreen}
            >
                <MyFieldset title="Danh sách tuyến xe đưa đoán học sinh">
                    <MyDataTable
                        enableRowSelection
                        data={chiTietTuyenXeQuery.data!}
                        columns={columns}
                        onIsFullScreenChange={(isFullScreen) => { setIsFullScreen(isFullScreen) }}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <AQButtonExportData
                                    data={chiTietTuyenXeQuery.data!}
                                    exportConfig={exportConfig}
                                    objectName="ChiTietTuyenXe"
                                />
                            </Group>
                        )}
                    />
                </MyFieldset>
            </MyButtonModal>
        </>
    );
}


const mockData: I_utilb90u23_ChiTietTuyenXe[] = [
    {
        id: 1,
        maHocSinh: "HS000001",
        hoTen: "To Ngoc Lam",
        lop: "11A6",
        gioiTinh: "Nam",
        len: true,
        xuong: true,
    },
];


interface I_utilb90u23_ChiTietTuyenXe {
    id?: number;
    maHocSinh?: string;
    hoTen?: string;
    lop?: string;
    gioiTinh?: string;
    len?: boolean;
    xuong?: boolean;
}