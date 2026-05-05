"use client";
import {
    AQButtonExportData,
    MyDataTable,
    MyFieldset,
    MyCheckbox,
    MyButtonModal,
    MyCenterFull,
} from "aq-fe-framework/components";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";

export default function F_utilb90u23_DsHanhKhachDaGuiThongBao({ label }: { label: string }) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const disclosure = useDisclosure();

    // Query
    const danhSachKhachHangDaGuiThongBaoQuery = useQuery<I_utilb90u23_KhachHangDaGuiThongBao[]>({
        queryKey: ["F_utilb90u23_DsHanhKhachDaGuiThongBao"],
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
                header: "Ngày sinh",
                fieldName: "ngaySinh",
            },
            {
                header: "Ngày gửi",
                fieldName: "ngayGui",
            },
            {
                header: "Đã đọc",
                fieldName: "daDoc",
            },
            {
                header: "Ngày đọc",
                fieldName: "ngayDoc",
            },
        ],
    };

    // column table
    const columns = useMemo<MRT_ColumnDef<I_utilb90u23_KhachHangDaGuiThongBao>[]>(
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
                header: "Ngày sinh",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngaySinh!)
            },
            {
                header: "Ngày gửi",
                accessorFn: (row) => {
                    const date = utils_date_dateToDDMMYYYString(row.ngayGui)
                    const time = row.ngayGui.toLocaleTimeString("VI");
                    return `${date} ${time}`
                }
            },
            {
                header: "Đã đọc",
                accessorFn: (row) => <MyCheckbox checked={row.daDoc} readOnly />
            },
            {
                header: "Ngày đọc",
                accessorFn: (row) => {
                    const date = utils_date_dateToDDMMYYYString(row.ngayDoc)
                    const time = row.ngayDoc.toLocaleTimeString("VI");
                    return `${date} ${time}`
                }
            }
        ],
        []
    );

    if (danhSachKhachHangDaGuiThongBaoQuery.isLoading) return "Đang tải dữ liệu...";
    if (danhSachKhachHangDaGuiThongBaoQuery.isError) return "Lỗi tải dữ liệu";

    return (
        <>
            <MyButtonModal
                label={label}
                modalSize={"100%"}
                disclosure={disclosure}
                fullScreen={isFullScreen}
            >
                <MyFieldset title="Danh sách khách hàng đã gửi thông báo">
                    <MyDataTable
                        enableRowSelection
                        data={danhSachKhachHangDaGuiThongBaoQuery.data!}
                        columns={columns}
                        onIsFullScreenChange={(isFullScreen) => { setIsFullScreen(isFullScreen) }}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <AQButtonExportData
                                    data={danhSachKhachHangDaGuiThongBaoQuery.data!}
                                    exportConfig={exportConfig}
                                    objectName="DanhSachTuyenXeDuaDoanHocSinh"
                                />
                            </Group>
                        )}
                    />
                </MyFieldset>
            </MyButtonModal>
        </>
    );
}


const mockData: I_utilb90u23_KhachHangDaGuiThongBao[] = [
    {
        id: 1,
        maHocSinh: "HS000001",
        hoTen: "To Ngoc Lam",
        lop: "11A6",
        ngaySinh: new Date("01/15/2000"),
        ngayGui: new Date("02/15/2025 07:10:23"),
        daDoc: true,
        ngayDoc: new Date("02/15/2025 15:14:23"),
    },
];


interface I_utilb90u23_KhachHangDaGuiThongBao {
    id: number;
    maHocSinh: string;
    hoTen: string;
    lop: string;
    ngaySinh: Date;
    ngayGui: Date;
    daDoc: boolean;
    ngayDoc: Date;
}