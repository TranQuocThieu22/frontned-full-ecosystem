'use client';

import { MyButtonModal, MyDataTable, AQButtonExportData, MyButtonViewPDF } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { Checkbox } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";

export interface NotificationSent {
    id: number;
    loaiThongBao: string;
    maHocSinh: string;
    hoTen: string;
    noiDung: string;
    fileDinhKem: string;
    zalo: boolean;
    email: boolean;
    sms: boolean;
    ngayGui: Date;
}

export default function F_2f0q7vzvsg_NotificationSent() {
    const disclosure = useDisclosure(false);

    const mockData: NotificationSent[] = [
        {
            id: 1,
            loaiThongBao: "Thông báo sự kiện",
            maHocSinh: "HS0001",
            hoTen: "Tô Ngọc Lâm",
            noiDung: "Bạn đã đăng ký thành công",
            fileDinhKem: "https://datafiles.chinhphu.vn/cpp/files/vbpq/2016/07/85.signed.pdf",
            zalo: true,
            email: true,
            sms: false,
            ngayGui: new Date("2025-02-15"),
        },
    ];

    const exportConfig = {
        fields: [
            { fieldName: "loaiThongBao", header: "Loại thông báo" },
            { fieldName: "maHocSinh", header: "Mã học sinh" },
            { fieldName: "hoTen", header: "Họ tên" },
            { fieldName: "noiDung", header: "Nội dung" },
            { fieldName: "fileDinhKem", header: "File đính kèm" },
            { fieldName: "zalo", header: "Zalo" },
            { fieldName: "email", header: "Email" },
            { fieldName: "sms", header: "SMS" },
            { fieldName: "ngayGui", header: "Ngày gửi" },
        ],
    };

    const columns = useMemo<MRT_ColumnDef<NotificationSent>[]>(() => [
        { accessorKey: "loaiThongBao", header: "Loại thông báo" },
        { accessorKey: "maHocSinh", header: "Mã học sinh" },
        { accessorKey: "hoTen", header: "Họ tên" },
        { accessorKey: "noiDung", header: "Nội dung" },
        {
            accessorFn: (row) => <MyCenterFull><MyButtonViewPDF src={row.fileDinhKem}></MyButtonViewPDF></MyCenterFull>,
            header: "File đính kèm",
        },
        {
            accessorKey: "zalo",
            header: "Zalo",
            Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />,
        },
        {
            accessorKey: "email",
            header: "Email",
            Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />,
        },
        {
            accessorKey: "sms",
            header: "SMS",
            Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} readOnly />,
        },
        { accessorFn: (row) => utils_date_dateToDDMMYYYString(row.ngayGui), header: "Ngày gửi" },
    ], []);

    return (
        <MyButtonModal
            label="Xem chi tiết"
            title="Danh sách thông báo đã gửi"
            disclosure={disclosure}
            crudType="default"
            modalSize="90%"
        >
            <MyDataTable
                columns={columns}
                data={mockData}
                enableRowSelection={true}
                enableRowNumbers={true}
                renderTopToolbarCustomActions={() => (<>
                    <AQButtonExportData
                        exportConfig={exportConfig}
                        data={mockData}
                        objectName={'Danh sách đăng ký sự kiện'}
                    />
                </>
                )}
            />
        </MyButtonModal>
    );
}