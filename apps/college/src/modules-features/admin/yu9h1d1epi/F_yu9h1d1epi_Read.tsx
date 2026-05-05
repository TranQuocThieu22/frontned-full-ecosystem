'use client';
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useForm } from '@mantine/form';
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_yu9h1d1epi_Create from "./F_yu9h1d1epi_Create";

export interface I_yu9h1d1epi_Read {
    id?: number;
    maSinhVien?: string;
    hoTen?: string;
    ngaySinh?: string;
    gioiTinh: string;
    maLop: string;
    maKhoa: string;
    maMonHoc: string;
    tenMonHoc: string;
    nhomHoc: string;
    nhhk: string;
}

export default function F_yu9h1d1epi_Read() {
    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    const danhSachHoanThiQuery = useQuery<I_yu9h1d1epi_Read[]>({
        queryKey: [`I_yu9h1d1epi_Read`],
        queryFn: async () => [
            {
                id: 1,
                maSinhVien: "SV001",
                hoTen: "To Ngoc Lam",
                ngaySinh: "2001-01-01",
                gioiTinh: "Nam",
                maLop: "IT01",
                maKhoa: "CNTT",
                maMonHoc: "MH001",
                tenMonHoc: "Lập trình cơ bản",
                nhomHoc: "01",
                nhhk: "2024-1",
            },
        ],
    });

    const columns = useMemo<MRT_ColumnDef<I_yu9h1d1epi_Read>[]>(() => [
        { header: "Mã sinh viên", accessorKey: "maSinhVien" },
        { header: "Họ tên", accessorKey: "hoTen" },
        { header: "Ngày sinh", accessorKey: "ngaySinh" },
        { header: "Giới tính", accessorKey: "gioiTinh" },
        { header: "Mã lớp", accessorKey: "maLop" },
        { header: "Mã khóa", accessorKey: "maKhoa" },
        { header: "Mã môn học", accessorKey: "maMonHoc" },
        { header: "Tên môn học", accessorKey: "tenMonHoc" },
        { header: "Nhóm học", accessorKey: "nhomHoc" },
        { header: "NHHK học", accessorKey: "nhhk" },
    ], []);

    const exportConfig = {
        fields: [
            {
                header: "Mã môn học",
                fieldName: "maMonHoc",
            },
            {
                header: "Tên môn học",
                fieldName: "tenMonHoc",
            },
            {
                header: "Nhóm học",
                fieldName: "nhomHoc",
            },
            {
                header: "Mã lớp",
                fieldName: "maLop",
            },
            {
                header: "Sĩ số TKB",
                fieldName: "siSoTKB",
            },
            {
                header: "Đã ĐK",
                fieldName: "soLuongDaDangKy",
            },
            {
                header: "Không thi",
                fieldName: "laKhongThi",
            },
        ]
    };


    if (danhSachHoanThiQuery.isLoading) return "Đang tải dữ liệu...";
    if (danhSachHoanThiQuery.isError) return "Không có dữ liệu...";

    return (
        <MyFieldset title="Danh sách sinh viên đăng ký hoãn thi">
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                data={danhSachHoanThiQuery.data!}
                renderTopToolbarCustomActions={() =>
                    <>
                        <F_yu9h1d1epi_Create />
                        <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                            console.log(form_multiple.values);

                        }} />
                        <AQButtonExportData
                            isAllData
                            objectName={"DanhSachNhomHocKhongThi"}
                            data={danhSachHoanThiQuery.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete"></MyButton>
                    </>
                }
            />
        </MyFieldset>

    );
}
