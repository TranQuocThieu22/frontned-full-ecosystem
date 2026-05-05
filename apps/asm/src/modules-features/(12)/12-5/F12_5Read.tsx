'use client';
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_5_Create from "./F12_5Create";

import { U0DateToDDMMYYYString } from "@/utils/date";
import F12_5Update from "./F12_5Update";
import F12_5Delete from "./F12_5Delete";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import { useForm } from "@mantine/form";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

// Interface định nghĩa dữ liệu
export interface I_F12_5 {
    id?: number;
    NccCode?: string; // Mã NCC
    NCCName?: string; // Tên NCC
    NCCType?: string; // Loại NCC
    taxCode?: string; // Mã số thuế
    address?: string; // Địa chỉ
    KH_NCC?: string; // Nhóm KH/NCC
    representers?: string; // Người đại diện
    telephone?: string; // Điện thoại
    telephone2?: string; // Điện thoại 2
    bank?: string; // Ngân hàng Á Châu
    accountName?: string; // Tên chủ TK
    website?: string; // Website
    email?: string; // Email
    email2?: string; // Email 2
    accountNumber?: string; // Số tài khoản
    chiNhanhNH?: string; // Chi nhánh NH
    ngayCapNhat?: Date | undefined;
    nguoiCapNhat?: string;
}

// Component hiển thị bảng dữ liệu
export default function F12_5_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F12_5[]>({
        queryKey: ["supplierData"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                NccCode: "NCC-01",
                NCCName: "Công ty Anh Quân",
                NCCType: "1",
                taxCode: "102892475",
                address: "256 Nguyễn Trãi, Quận 1, TP.HCM",
                KH_NCC: "Nhà cung cấp phần mềm",
                representers: "Nguyễn Văn A",
                telephone: "098635845",
                telephone2: "0901234567",
                bank: "Ngân hàng Á Châu",
                accountName: "Nguyễn Văn A",
                website: "https://aqtech.vn",
                email: "support@aqtech.vn",
                email2: "contact@aqtech.vn",
                accountNumber: "123456789",
                chiNhanhNH: "Chi nhánh TP.HCM",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
            {
                id: 2,
                NccCode: "NCC-02",
                NCCName: "Vật tư Thành",
                NCCType: "2",
                taxCode: "802342475",
                address: "456 Đồng Khởi, Quận 3, TP.HCM",
                KH_NCC: "Nhà cung cấp vật tư",
                representers: "Trần Văn B",
                telephone: "095635435",
                telephone2: "0912345678",
                bank: "Ngân hàng Vietcombank",
                accountName: "Trần Văn B",
                website: "https://vatuthanh.vn",
                email: "thanh@gmail.com",
                email2: "info@vatuthanh.vn",
                accountNumber: "987654321",
                chiNhanhNH: "Chi nhánh Hà Nội",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });

    const exportConfig = {
        fields: [
            {
                fieldName: "NccCode",
                header: "Mã NCC"
            },
            {
                fieldName: "NCCName",
                header: "Tên NCC"
            },
            {
                fieldName: "NCCType",
                header: "Loại NCC"
            },
            {
                fieldName: "NCC_KH_Group",
                header: "Nhóm NCC/ KH"
            },
            {
                fieldName: "taxCode",
                header: "Mã số thuế"
            },
            {
                fieldName: "telephone",
                header: "Số điện thoại"
            },
            {
                fieldName: "email",
                header: "email"
            },
            {
                fieldName: "Người cập nhật",
                header: "nguoicapnhat"
            },
            {
                fieldName: "Ngày cập nhật",
                header: "ngayCapNhat"
            },
        ]
    };

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F12_5>[]>(
        () => [
            { header: "Mã NCC", accessorKey: "NccCode" },
            { header: "Tên NCC", accessorKey: "NCCName" },
            { header: "Loại NCC", accessorKey: "NCCType" },
            { header: "Nhóm NCC/KH", accessorKey: "NCC_KH_Group" },
            { header: "Mã số thuế", accessorKey: "taxCode" },
            { header: "Số điện thoại", accessorKey: "telephone" },
            { header: "Email", accessorKey: "email" },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat",

            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },

            },
        ],
        []
    );

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F12_5_Create /> {/* Nút tạo mới */}
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ");
                            }
                        }
                        form={form_multiple}
                    >s</AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dmDonVi"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button style={{ color: 'white', backgroundColor: 'red' }}
                        leftSection={<IconTrash />}>
                        Xóa
                    </Button>
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F12_5Update data={row.original} />
                        <F12_5Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
