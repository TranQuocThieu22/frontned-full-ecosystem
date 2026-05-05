'use client'
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Button, Fieldset, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import AQButtonExportData from "@/components/ui/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/ui/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import MyFlexColumn from "@/components/ui/Layouts/FlexColumn/MyFlexColumn";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile } from "aq-fe-framework/components";
import F_zvsdgn3tko_Create from "./F_zvsdgn3tko_Create";
import F_zvsdgn3tko_Delete from "./F_zvsdgn3tko_Delete";
import F_zvsdgn3tko_Update from "./F_zvsdgn3tko_Update";

export interface I_zvsdgn3tko_Read {
    id?: number;
    campusCode?: string;         // Mã khuôn viên
    campusName?: string;         // Tên khuôn viên
    usageType?: string;          // Hình thức sử dụng
    landArea?: number;           // Diện tích đất
    campusCoefficient?: number;  // Hệ số khuôn viên
    convertedArea?: number;      // Diện tích quy đổi
    address?: string;            // Địa chỉ
    remarks?: string;            // Ghi chú
    nguoiCapNhat?: string; // Người cập nhật
    ngayCapNhat?: Date;   // Ngày cập nhật
}


export default function F_zvsdgn3tko_Read() {
    const [importData, setImportData] = useState(false);
    const form_multiple = useForm<I_zvsdgn3tko_Read>({
        initialValues: {
        },
    })

    // Query to fetch the mock menuData
    const AllUserQuery = useQuery<I_zvsdgn3tko_Read[]>({
        queryKey: ["F_zvsdgn3tko_Read"],
        queryFn: async () => data,
    });

    const columns = useMemo<MRT_ColumnDef<I_zvsdgn3tko_Read>[]>(() => [
        { header: "Mã khuôn viên", accessorKey: "campusCode" },
        { header: "Tên khuôn viên", accessorKey: "campusName" },
        { header: "Hình thức sử dụng", accessorKey: "usageType" },
        {
            header: "Diện tích đất",
            accessorKey: "landArea",
        },
        { header: "Hệ số khuôn viên", accessorKey: "campusCoefficient" },
        {
            header: "Diện tích quy đổi",
            accessorKey: "convertedArea",
        },
        {
            header: "Địa chỉ",
            accessorKey: "address",
        },
        {
            header: "Ghi chú",
            accessorKey: "remarks",
        },
        { header: "Người cập nhật", accessorKey: "nguoiCapNhat" },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (originalRow) =>
                originalRow.ngayCapNhat ? U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat)) : "",
        },
    ], []);


    const exportConfig = {
        fields: [
            { fieldName: "id", header: "STT" },
            { fieldName: "campusCode", header: "Mã khuôn viên" },
            { fieldName: "campusName", header: "Tên khuôn viên" },
            { fieldName: "usageType", header: "Hình thức sử dụng" },
            { fieldName: "landArea", header: "Diện tích đất" },
            { fieldName: "campusCoefficient", header: "Hệ số khuôn viên" },
            { fieldName: "convertedArea", header: "Diện tích quy đổi" },
            { fieldName: "address", header: "Địa chỉ" },
            { fieldName: "remarks", header: "Ghi chú" },
            { fieldName: "nguoiCapNhat", header: "Người cập nhật" },
            { fieldName: "ngayCapNhat", header: "Ngày cập nhật" },
        ],
    };


    if (AllUserQuery.isLoading) return "Loading...";

    return (
        <Fieldset legend={`Danh sách khuôn viên`}>
            <MyFlexColumn>

                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    renderTopToolbarCustomActions={({ table }) => {
                        return (
                            <>
                                <Group>
                                    <F_zvsdgn3tko_Create />
                                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                                        console.log(form_multiple.values);

                                    }} >s</AQButtonCreateByImportFile>
                                    <AQButtonExportData
                                        isAllData={true}
                                        objectName="dsKhoa"
                                        data={data}
                                        exportConfig={exportConfig}
                                    />
                                    <Button color="red" leftSection={<IconTrash />}>Xóa</Button>

                                </Group>
                            </>
                        )
                    }}
                    columns={columns}
                    data={AllUserQuery.data || []}
                    renderRowActions={({ row }) => {
                        return (

                            <MyCenterFull>
                                <F_zvsdgn3tko_Update values={row.original} />
                                <F_zvsdgn3tko_Delete id={row.original.id!} campusCode={row.original.campusCode!} />
                            </MyCenterFull>
                        )
                    }}
                />
            </MyFlexColumn>
        </Fieldset>
    );
}

const data: I_zvsdgn3tko_Read[] = [
    {
        id: 1,
        campusCode: "CSC",
        campusName: "Trụ sở chính",
        usageType: "Sở hữu",
        landArea: 260000,
        campusCoefficient: 2.5,
        convertedArea: 650000,
        address: "2A Nguyễn Sỹ Sách",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 2,
        campusCode: "PDN",
        campusName: "Phân hiệu Đà Nẵng",
        usageType: "Liên kết",
        landArea: 15000,
        campusCoefficient: 1,
        convertedArea: 15000,
        address: "1 Song Hàn",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
    {
        id: 3,
        campusCode: "PCM",
        campusName: "Phân hiệu Cà Mau",
        usageType: "Thuê lâu năm",
        landArea: 15000,
        campusCoefficient: 1,
        convertedArea: 15000,
        address: "5 Thích Quảng Đức",
        remarks: "",
        nguoiCapNhat: "Admin",
        ngayCapNhat: new Date("2023-12-31"),
    },
];