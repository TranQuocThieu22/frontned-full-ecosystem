"use client";
import {
    AQButtonExportData,
    MyDataTable,
    MyFieldset,
    MyDateInput,
    MyCheckbox,
    MyCenterFull,
} from "aq-fe-framework/components";
import { Grid, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_utilb90u23_ChiTietTuyenXe from "./F_utilb90u23_ChiTietTuyenXe";
import F_utilb90u23_DanhSachThongBaoDaGui from "./F_utilb90u23_DanhSachThongBaoDaGui";
import F_utilb90u23_DsHanhKhachDaGuiThongBao from "./F_utilb90u23_DsHanhKhachDaGuiThongBao";
import F_utilb90u23_ChiTietThongBao from "./F_utilb90u23_ChiTietThongBao";

export default function F_utilb90u23_Read() {

    // Query
    const danhSachTuyenXeQuery = useQuery<I_utilb90u23_Read[]>({
        queryKey: ["F_utilb90u23_ReadDanhSachTuyenXe"],
        queryFn: async () => {
            return mockData;
        },
    });

    // export confirm
    const exportConfig = {
        fields: [
            {
                header: "Lượt",
                fieldName: "luot",
            },
            {
                header: "Mã tuyến",
                fieldName: "maTuyen",
            },
            {
                header: "Tên tuyến",
                fieldName: "tenTuyen",
            },
            {
                header: "Số hành khách",
                fieldName: "soHanhKhach",
            },
            {
                header: "Lên xe",
                fieldName: "lenXe",
            },
            {
                header: "Xuống xe",
                fieldName: "xuongXe",
            },
            {
                header: "Đã gửi thông báo",
                fieldName: "daGuiThongBao",
            },
            {
                header: "Đối tượng gửi",
                fieldName: "doiTuongGui",
            },
            {
                header: "Đã xem thông báo",
                fieldName: "daXemThongBao",
            },
        ],
    };

    // column table
    const columns = useMemo<MRT_ColumnDef<I_utilb90u23_Read>[]>(
        () => [
            {
                header: "Lượt",
                accessorKey: "luot",
            },
            {
                header: "Mã tuyến",
                accessorKey: "maTuyen",
            },
            {
                header: "Tên tuyến",
                accessorKey: "tenTuyen",
            },
            {
                header: "Số hành khách",
                accessorKey: "soHanhKhach",
            },
            {
                header: "Lên xe",
                accessorKey: "lenXe",
            },
            {
                header: "Xuống xe",
                accessorKey: "xuongXe",
            },
            {
                header: "Chi tiết",
                accessorFn: (row) => <MyCenterFull><F_utilb90u23_ChiTietTuyenXe /></MyCenterFull>
            },
            {
                header: "Thông báo",
                accessorFn: (row) => <MyCenterFull><F_utilb90u23_ChiTietThongBao /></MyCenterFull>
            },
            {
                header: "Danh sách thông báo",
                accessorFn: (row) => <MyCenterFull><F_utilb90u23_DanhSachThongBaoDaGui /></MyCenterFull>
            },
            {
                header: "Đã gửi thông báo",
                accessorKey: "daGuiThongBao",
                Cell({ row }) {
                    return (<MyCheckbox checked={row.original.daGuiThongBao} readOnly />);
                },
            },
            {
                header: "Đối tượng gửi",
                accessorKey: "doiTuongGui",
            },
            {
                header: "Đã xem thông báo",
                accessorFn: (row) => <MyCenterFull><F_utilb90u23_DsHanhKhachDaGuiThongBao label={row.daXemThongBao} /></MyCenterFull>
            }
        ],
        []
    );

    if (danhSachTuyenXeQuery.isLoading) return "Đang tải dữ liệu...";
    if (danhSachTuyenXeQuery.isError) return "Lỗi tải dữ liệu";

    return (
        <>
            <Group mb={20} ml={20}>
                <MyDateInput label="Ngày" defaultValue={new Date()} />
            </Group>
            <MyFieldset title="Danh sách tuyến xe đưa đoán học sinh">
                <MyDataTable
                    enableRowSelection
                    data={danhSachTuyenXeQuery.data!}
                    columns={columns}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <AQButtonExportData
                                data={danhSachTuyenXeQuery.data!}
                                exportConfig={exportConfig}
                                objectName="DanhSachTuyenXeDuaDoanHocSinh"
                            />
                        </Group>
                    )}
                />
            </MyFieldset>
        </>
    );
}




const mockData: I_utilb90u23_Read[] = [
    {
        id: 1,
        luot: "Đón",
        maTuyen: "TTD",
        tenTuyen: "Thủ Đức - Quận 2 - Quận 9",
        soHanhKhach: 32,
        lenXe: 26,
        xuongXe: 32,
        daGuiThongBao: true,
        doiTuongGui: "Cá nhân",
        daXemThongBao: "16/32",
    },
];


interface I_utilb90u23_Read {
    id?: number;
    luot?: string;
    maTuyen?: string;
    tenTuyen?: string;
    soHanhKhach?: number;
    lenXe?: number;
    xuongXe?: number;
    daGuiThongBao?: boolean;
    doiTuongGui: string;
    daXemThongBao: string;
}