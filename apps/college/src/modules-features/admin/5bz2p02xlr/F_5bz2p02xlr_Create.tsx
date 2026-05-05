'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MySelect from "@/components/Combobox/Select/MySelect";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

export interface IDanhSachKetQuaDangKyCuaSinhVien {
    maSinhVien?: string, // Mã sinh viên
    hoTen?: string, // Họ tên
    ngaySinh?: Date, // Ngày sinh
    gioiTinh?: string, // Giới tính
    maLop?: string, // Mã lớp
    maKhoa?: string,
    maMonHoc?: string, // Mã môn học
    tenMonHoc?: string, // Tên môn học
    nhomHoc?: string, // Nhóm học
    NHHKHoc?: string, // NHHK học
    chuyenCan?: number, // Chuyên cần
    giuaKy?: number, // Giữa kỳ
    cuoiKy?: number // Cuối kỳ L1
}

export interface ISelectStudent {
    label?: string, // tên và id sinh viên
    id?: string, // id sinh viên
}

const mockRegisterResultData: IDanhSachKetQuaDangKyCuaSinhVien[] = [
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
        cuoiKy: 10
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
        cuoiKy: 2
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
        cuoiKy: 4
    },
]

const mockSelectStudentData: ISelectStudent[] = [
    { label: "SV001 - Nguyễn Văn A", id: "SV001" },
    { label: "SV002 - Nguyễn Văn B", id: "SV002" },
    { label: "SV003 - Nguyễn Văn C", id: "SV003" },
]

export default function F_5bz2p02xlr_Create() {

    //===implement===
    const disclosure = useDisclosure()
    const tableTitle = "Danh sách kết quả đăng ký môn học trong học kỳ theo sinh viên";

    //===pseudo data===
    const queryStudentData = useQuery<IDanhSachKetQuaDangKyCuaSinhVien[]>({
        queryKey: [`ListOFRegisterResult`],
        queryFn: async () => mockRegisterResultData
    })

    const querySelectStudentData = useQuery<ISelectStudent[]>({
        queryKey: [`ListOFStudentsIdName`],
        queryFn: async () => mockSelectStudentData
    })

    //===function===

    //===components===
    const columns = useMemo<MRT_ColumnDef<IDanhSachKetQuaDangKyCuaSinhVien>[]>(() => [
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
            header: "Cuối kỳ",
            accessorKey: "cuoiKy",
        },
    ], []);

    //===query stage condition===
    if (queryStudentData.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (queryStudentData.isError) {
        return "Lỗi Tải dữ liệu!";
    }

    //===query stage condition===
    if (querySelectStudentData.isLoading) {
        return "Đang tải dữ liệu...";
    }

    if (querySelectStudentData.isError) {
        return "Lỗi Tải dữ liệu!";
    }



    return (
        <MyButtonModal modalSize={"80%"} crudType="create" disclosure={disclosure} title={tableTitle}>
            <Group gap={'sm'}>
                <Text>Chọn sinh viên</Text>
                <MySelect
                    data={querySelectStudentData.data!.map(s => s.label!)}
                    defaultValue={querySelectStudentData.data![0]?.label}
                    allowDeselect={false} />
            </Group>
            <MyFieldset title="Danh sách kết quả đăng ký của sinh viên">
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    data={queryStudentData.data!}
                    renderTopToolbarCustomActions={() =>
                        <MyButton crudType="default" color="green">Chọn</MyButton>
                    }
                />
            </MyFieldset>
        </MyButtonModal>
    )
}