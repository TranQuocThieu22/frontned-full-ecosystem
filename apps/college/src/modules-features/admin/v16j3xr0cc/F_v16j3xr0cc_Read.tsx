'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_v16j3xr0cc_Delete from "./F_v16j3xr0cc_Delete";
import F_v16j3xr0cc_UpdateBox from "./F_v16j3xr0cc_UpdateBox";

export enum HinhThuc {
    tinhnhutinchi = "Tính như tín chỉ",
    nienchecotinh = "Tính như niên chế, có tính",
    nienchekhong = "Tính như niên chế, không",
    khongtinhhocphi = "Không tính học phí"
}
export interface I_v16j3xr0cc {
    sothutu?: number; // STT
    malop?: string; // Mã lớp
    tenlop?: string; // Tên lớp
    makhoa?: string; // Mã khóa
    tenkhoa?: string; // Tên khóa
    makhoa1?: string; //mã khoa
    tenkhoa1?: string; // tên khoa
    mabache?: string; // Mã bậc hệ
    tenbache?: string; // tên bậc hệ
    machuongtrinh?: string; // Mã chương trình/Ngành/Nghề
    hinhthuc?: HinhThuc; // Hình thức tính học phí
}

// Component hiển thị bảng dữ liệu
export default function F_v16j3xr0cc_Read() {
    const [importData, setImportData] = useState(false);
    const [fileData, setFileData] = useState<any[]>([]);
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_v16j3xr0cc[]>({
        queryKey: ["F_v16j3xr0cc_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                sothutu: 1,
                malop: "IT2401",
                tenlop: "Công nghệ thông tin 2024 lớp 1",
                makhoa: "IT24",
                tenkhoa: "IT24",
                makhoa1: "CNTT",
                tenkhoa1: "Công nghệ thông tin",
                mabache: "DHCQ",
                tenbache: "Đại học chính quy",
                machuongtrinh: "IT",
                hinhthuc: HinhThuc.tinhnhutinchi,
            },
            {
                sothutu: 2,
                malop: "IT2402",
                tenlop: "Công nghệ thông tin 2024 lớp 2",
                makhoa: "IT24",
                tenkhoa: "IT24",
                makhoa1: "CNTT",
                tenkhoa1: "Công nghệ thông tin",
                mabache: "DHCQ",
                tenbache: "Đại học chính quy",
                machuongtrinh: "IT",
                hinhthuc: HinhThuc.nienchecotinh,
            },
            {
                sothutu: 3,
                malop: "IT2403",
                tenlop: "Công nghệ thông tin 2024 lớp 3",
                makhoa: "IT24",
                tenkhoa: "IT24",
                makhoa1: "CNTT",
                tenkhoa1: "Công nghệ thông tin",
                mabache: "DHCQ",
                tenbache: "Đại học chính quy",
                machuongtrinh: "IT",
                hinhthuc: HinhThuc.nienchekhong,
            },
            {
                sothutu: 4,
                malop: "IT2404",
                tenlop: "Công nghệ thông tin 2024 lớp 4",
                makhoa: "IT24",
                tenkhoa: "IT24",
                makhoa1: "CNTT",
                tenkhoa1: "Công nghệ thông tin",
                mabache: "DHCQ",
                tenbache: "Đại học chính quy",
                machuongtrinh: "IT",
                hinhthuc: HinhThuc.khongtinhhocphi,
            },
        ],
    });

    // const exportConfig = {
    //     fields: [
    //         { fieldName: "sothutu", header: "STT" },
    //         { fieldName: "malop", header: "Mã lớp" },
    //         { fieldName: "tenlop", header: "Tên lớp" },
    //         { fieldName: "makhoa", header: "Mã khóa" },
    //         { fieldName: "tenkhoa", header: "Tên khóa" },
    //         { fieldName: "makhoa1", header: "Mã khoa" },
    //         { fieldName: "tenkhoa1", header: "Tên khoa" },
    //         { fieldName: "mabache", header: "Mã bậc hệ" },
    //         { fieldName: "tenbache", header: "Tên bậc hệ" },
    //         { fieldName: "machuongtrinh", header: "Mã chương trình/Ngành/Nghề" },
    //         { fieldName: "hinhthuc", header: "Hình thức tính học phí" },
    //     ]
    // };

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_v16j3xr0cc>[]>(() => [
        {
            header: "Mã lớp",
            accessorKey: "malop",
        },
        {
            header: "Tên lớp",
            accessorKey: "tenlop",
        },
        {
            header: "Mã khóa",
            accessorKey: "makhoa",
        },
        {
            header: "Tên khóa",
            accessorKey: "tenkhoa",
        },
        {
            header: "Mã khoa",
            accessorKey: "makhoa1",
        },
        {
            header: "Tên khoa",
            accessorKey: "tenkhoa1",
        },
        {
            header: "Mã bậc hệ",
            accessorKey: "mabache",
        },
        {
            header: "Tên bậc hệ",
            accessorKey: "tenbache",
        },
        {
            header: "Mã chương trình/ Ngành/ nghề",
            accessorKey: "machuongtrinh",
        },
        {
            header: "Hình thức tính học phí",
            accessorKey: "hinhthuc",
            accessorFn(originalRow) {
                return <Select
                    placeholder="Chọn hình thức"
                    data={Object.values(HinhThuc).map(ht => ({ value: ht, label: ht }))}
                    defaultValue={originalRow.hinhthuc}
                    // clearable
                    searchable
                // onChange={(value) => console.log("Hình thức chọn:", value)}
                />
            },
        },

    ], []);
    const exportConfig = {
        fields: [
            {
                fieldName: "malop",
                header: "Mã lớp"
            },
            {
                fieldName: "tenlop",
                header: "Tên lớp"
            },
            {
                fieldName: "makhoa",
                header: "Mã khóa"
            },
            {
                fieldName: "tenkhoa",
                header: "Tên khóa"
            },
            {
                fieldName: "makhoa1",
                header: "Mã khoa"
            },
            {
                fieldName: "tenkhoa1",
                header: "Tên khoa"
            },
            {
                fieldName: "mabache",
                header: "Mã bậc hệ"
            },
            {
                fieldName: "tenbache",
                header: "Tên bậc hệ"
            },
            {
                fieldName: "machuongtrinh",
                header: "Mã chương trình"
            },
        ]
    };

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);
                    }} >s</AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsModuleNguonKinhPhi"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <F_v16j3xr0cc_Delete />
                    <F_v16j3xr0cc_UpdateBox />
                    <Button color="green">Lưu</Button>
                </>
            }
        />
    );
}