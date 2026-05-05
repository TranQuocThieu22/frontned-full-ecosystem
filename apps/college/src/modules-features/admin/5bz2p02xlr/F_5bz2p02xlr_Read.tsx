'use client';
//import library
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

//import module function
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import F_5bz2p02xlr_Create from "./F_5bz2p02xlr_Create";

//implement interface
export interface IDanhSachSinhVienDangKyThiLai {
    maSinhVien?: string, // Mã sinh viên
    hoTen?: string, // Họ tên
    ngaySinh?: Date, // Ngày sinh
    gioiTinh?: string, // Giới tính
    maLop?: string, // Mã lớp
    maKhoa?: string,    // Mã khoa
    maMonHoc?: string, // Mã môn học
    tenMonHoc?: string, // Tên môn học
    nhomHoc?: string, // Nhóm học
    NHHKHoc?: string, // NHHK học
    chuyenCan?: number, // Chuyên cần
    giuaKy?: number, // Giữa kỳ
    cuoiKyL1?: number // Cuối kỳ L1
}

export interface ISelectSemester {
    year?: string, // năm học kỳ
    semester?: string, // học kỳ
}

//===pseudo data===
const mockRetestStudentData: IDanhSachSinhVienDangKyThiLai[] = [
    {
        maSinhVien: "SV001",
        hoTen: "Nguyễn Văn A",
        ngaySinh: new Date("2000-01-01"),
        gioiTinh: "Nam",
        maLop: "IT2001",
        maKhoa: "IT24",
        maMonHoc: "IT2024",
        tenMonHoc: "Lập trình phần mềm",
        nhomHoc: "01",
        NHHKHoc: "2024-1",
        chuyenCan: 10,
        giuaKy: 10,
        cuoiKyL1: 10
    },
    {
        maSinhVien: "SV002",
        hoTen: "Nguyễn Văn B",
        ngaySinh: new Date("2004-01-01"),
        gioiTinh: "Nam",
        maLop: "IT2001",
        maKhoa: "IT24",
        maMonHoc: "IT2024",
        tenMonHoc: "Lập trình phần mềm",
        nhomHoc: "01",
        NHHKHoc: "2024-1",
        chuyenCan: 1,
        giuaKy: 5,
        cuoiKyL1: 2
    },
    {
        maSinhVien: "SV003",
        hoTen: "Nguyễn Văn C",
        ngaySinh: new Date("2002-01-01"),
        gioiTinh: "Nam",
        maLop: "IT2001",
        maKhoa: "IT24",
        maMonHoc: "IT2024",
        tenMonHoc: "Lập trình phần mềm",
        nhomHoc: "01",
        NHHKHoc: "2024-1",
        chuyenCan: 7,
        giuaKy: 2,
        cuoiKyL1: 4
    },
]

const mockSelectSemesterData: ISelectSemester[] = [
    {
        year: "Năm học 2024-2025",
        semester: "Học kỳ 1"
    },
    {
        year: "Năm học 2024-2025",
        semester: "Học kỳ 2"
    },
    {
        year: "Năm học 2025-2026",
        semester: "Học kỳ 1"
    },
    {
        year: "Năm học 2025-2026",
        semester: "Học kỳ 2"
    },
]

export default function F_5bz2p02xlr_Read() {
    //===implement===
    const [importData, setImportData] = useState(false);

    const form = useForm<any>({
        initialValues: {
            importedData: []
        }
    }
    );

    //===pseudo data===
    const studentDataQuery = useQuery<IDanhSachSinhVienDangKyThiLai[]>({
        queryKey: [`ListOFRetestStudent`],
        queryFn: async () => mockRetestStudentData
    });

    const selectSemesterDataQuery = useQuery<ISelectSemester[]>({
        queryKey: [`ListOfSemester`],
        queryFn: async () => mockSelectSemesterData
    });

    //===functions===
    const exportConfig = {
        fields: [
            { fieldName: "maSinhVien", header: "Mã sinh viên" },
            { fieldName: "hoTen", header: "Họ Tên" },
            { fieldName: "ngaySinh", header: "Ngày sinh" },
            { fieldName: "gioiTinh", header: "Giới tính" },
            { fieldName: "maLop", header: "Mã Lớp" },
            { fieldName: "maMonHoc", header: "Mã môn học" },
            { fieldName: "tenMonHoc", header: "Tên môn học" },
            { fieldName: "nhomHoc", header: "Nhóm học" },
            { fieldName: "NHHKHoc", header: "NHHK học" },
            { fieldName: "chuyenCan", header: "Chuyên cần" },
            { fieldName: "giuaKy", header: "Giữa kỳ" },
            // { fieldName: "cuoiKyL1", header: "Cuối kỳ L1" },
        ]
    }

    //===column components===
    const columns = useMemo<MRT_ColumnDef<IDanhSachSinhVienDangKyThiLai>[]>(() => [
        {
            header: "Mã sinh viên",
            accessorKey: "maSinhVien",
            size: 165,
        },
        {
            header: "Họ Tên",
            accessorKey: "hoTen",
        },
        {
            header: "Ngày sinh",
            accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngaySinh!)),
            size: 145,
        },
        {
            header: "Giới tính",
            accessorKey: "gioiTinh",
            size: 140,
        },
        {
            header: "Mã Lớp",
            accessorKey: "maLop",
            size: 140,
        },
        {
            header: "Mã Khóa",
            accessorKey: "maKhoa",
        },
        {
            header: "Mã môn học",
            accessorKey: "maMonHoc",
        },
        {
            header: "Tên môn học",
            accessorKey: "tenMonHoc",
        },
        {
            header: "Nhóm học",
            accessorKey: "nhomHoc",
            size: 150,
        },
        {
            header: "NHHK học",
            accessorKey: "NHHKHoc",
        },
        {
            header: "Chuyên cần",
            accessorKey: "chuyenCan",
        },
        {
            header: "Giữa kỳ",
            accessorKey: "giuaKy",
        },
        {
            header: "Cuối kỳ L1",
            accessorKey: "cuoiKyL1",
        },
    ], []);


    //===query stage condition===
    if (studentDataQuery.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (studentDataQuery.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    return (
        <>
            <MyFieldset title="Danh sách sinh viên đăng ký thi lại">
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    data={studentDataQuery.data!}
                    renderTopToolbarCustomActions={() =>
                        <>
                            <F_5bz2p02xlr_Create />
                            <AQButtonCreateByImportFile
                                setImportedData={setImportData}
                                form={form}
                                onSubmit={() => {}}
                            />
                            <AQButtonExportData
                                isAllData={true}
                                data={studentDataQuery.data!}
                                exportConfig={exportConfig}
                                objectName="dsDangKyThiLai"
                            />
                            <MyButton crudType="delete" />
                        </>
                    }
                />
            </MyFieldset>
        </>

    );
}