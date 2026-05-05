"use client";
import {
    AQButtonExportData,
    MyDataTable,
    MyFieldset,
    MyCheckbox,
    MyButtonModal,
    MyButtonViewPDF,
    MyCenterFull,
} from "aq-fe-framework/components";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import F_utilb90u23_DsHanhKhachDaGuiThongBao from "./F_utilb90u23_DsHanhKhachDaGuiThongBao";

export default function F_utilb90u23_DanhSachThongBao() {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const disclosure = useDisclosure();

    // Query
    const danhSachThongBaoQuery = useQuery<I_utilb90u23_ThongBao[]>({
        queryKey: ["F_utilb90u23_DanhSachThongBao"],
        queryFn: async () => {
            return mockData;
        },
    });

    // export confirm
    const exportConfig = {
        fields: [
            {
                header: "Loại thông báo",
                fieldName: "loaiThongBao",
            },
            {
                header: "Loại đối tượng",
                fieldName: "loaiDoiTuong",
            },
            {
                header: "Nội dung",
                fieldName: "noiDung",
            },
            {
                header: "Zalo",
                fieldName: "zalo",
            },
            {
                header: "Email",
                fieldName: "email",
            },
            {
                header: "SMS",
                fieldName: "sms",
            },
            {
                header: "Ngày gửi",
                fieldName: "ngayGui",
            },
        ],
    };

    // column table
    const columns = useMemo<MRT_ColumnDef<I_utilb90u23_ThongBao>[]>(
        () => [
            {
                header: "Loại thông báo",
                accessorKey: "loaiThongBao",
            },
            {
                header: "Loại đối tượng",
                accessorKey: "loaiDoiTuong",
            },
            {
                header: "Danh sách",
                accessorFn: (row) =><MyCenterFull><F_utilb90u23_DsHanhKhachDaGuiThongBao label="Xem chi tiết" /></MyCenterFull> 
            },
            {
                header: "Nội dung",
                accessorKey: "noiDung",     
            },
            {
                header: "File đính kèm",
                accessorFn: (row) => <MyCenterFull><MyButtonViewPDF label="Xem file" src={row.fileDinhKem} /></MyCenterFull> 
            },
            {
                header: "Zalo",
                accessorKey: "zalo",
                accessorFn: (row) => <MyCheckbox checked={row.zalo} readOnly />
            },
            {
                header: "Email",
                accessorKey: "email",
                accessorFn: (row) => <MyCheckbox checked={row.email} readOnly />
            },
            {
                header: "SMS",
                accessorFn: (row) => <MyCheckbox checked={row.sms} readOnly />
            },
            {
                header: "Ngày gửi",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngayGui!)
            },
        ],
        []
    );

    if (danhSachThongBaoQuery.isLoading) return "Đang tải dữ liệu...";
    if (danhSachThongBaoQuery.isError) return "Lỗi tải dữ liệu";

    return (
        <>
            <MyButtonModal
                label="Xem chi tiết"
                modalSize={"80%"}
                disclosure={disclosure}
                fullScreen={isFullScreen}
            >
                <MyFieldset title="Danh sách thông báo đã gửi">
                    <MyDataTable
                        enableRowSelection
                        data={danhSachThongBaoQuery.data!}
                        columns={columns}
                        onIsFullScreenChange={(isFullScreen) => { setIsFullScreen(isFullScreen) }}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Group>
                                <AQButtonExportData
                                    data={danhSachThongBaoQuery.data!}
                                    exportConfig={exportConfig}
                                    objectName="DanhSachThongBaoDaGui"
                                />
                            </Group>
                        )}
                    />
                </MyFieldset>
            </MyButtonModal>
        </>
    );
}


const mockData: I_utilb90u23_ThongBao[] = [
    {
        id: 1,
        loaiThongBao: "Học sinh không có mặt",
        loaiDoiTuong: "Cá nhân",
        noiDung: "Em To Ngoc Lâm không có mặt tại điểm đón",
        fileDinhKem: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
        zalo: true,
        email: true,
        sms: true,
        ngayGui: new Date("02/15/2025"),
    },
];


interface I_utilb90u23_ThongBao {
    id?: number;
    loaiThongBao?: string;
    loaiDoiTuong?: string;
    noiDung?: string;
    fileDinhKem?: string;
    zalo?: boolean;
    email?: boolean;
    sms?: boolean;
    ngayGui?: Date;
}