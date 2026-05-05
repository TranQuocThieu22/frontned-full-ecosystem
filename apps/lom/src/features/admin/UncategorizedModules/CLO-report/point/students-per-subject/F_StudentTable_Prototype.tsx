'use client'
import { MyDataTable } from "@/components/ui/DataDisplay/DataTable/MyDataTable";
import { CustomFlexColumn } from "@aq-fe/core-ui/shared/components/layout/CustomFlexColumn";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

//fgmpowiqop

export interface I_StudentTable_prototype {
    id?: number;
    maSinhVien?: string;
    hoTen?: string;
    ngaySinh?: string;
    gioiTinh?: string;
    cot11?: number;
    cot12?: number;
    cot13?: number;
    cot14?: number;
    cot21?: number;
    cot22?: number;
    cot31?: number;
    tongKetCLO?: number;
    tongKetHocVu?: number;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date;
}


export default function F_StudentTable_Prototype() {

    const query = useQuery<I_StudentTable_prototype[]>({
        queryKey: ['IfgmpowiqopData'],
        queryFn: async () => sampleData
    })


    const columns = useMemo<MRT_ColumnDef<I_StudentTable_prototype>[]>(() => [
        {
            header: "STT",
            accessorKey: "id",

        },
        {
            header: "Mã Sinh Viên",
            accessorKey: "maSinhVien",

        },
        {
            header: "Họ và Tên",
            accessorKey: "hoTen",

        },

        {
            header: "Ngày sinh",
            accessorKey: "ngaySinh",

        },
        {
            header: "Giới tính",
            accessorKey: "gioiTinh",

        },
        {
            header: "1.1",
            accessorKey: "cot11",

        },
        {
            header: "1.2",
            accessorKey: "cot12",

        },
        {
            header: "1.3",
            accessorKey: "cot13",

        },
        {
            header: "1.4",
            accessorKey: "cot14",

        },
        {
            header: "2.1",
            accessorKey: "cot21",

        },
        {
            header: "2.2",
            accessorKey: "cot22",

        },
        {
            header: "3.1",
            accessorKey: "cot31",

        },
        {
            header: "Tổng kết CLO",
            accessorKey: "tongKetCLO",

        },
        {
            header: "Tổng kết học vụ",
            accessorKey: "tongKetHocVu",

        },
        // Thêm các cột khác tại đây nếu cần
    ], []);

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";
    return (
        <CustomFlexColumn>
            {/* <Flex direction={{ base: 'column', sm: 'row' }} gap="lg">
                <MySelect label="Chương trình" data={["Kế toán"]} defaultValue="Kế toán" />
                <MySelect label="Khóa" data={["Kế toán 2024"]} defaultValue="Kế toán 2024" />
                <MySelect label="Môn học" data={["Nguyên lí kế toán"]} defaultValue="Nguyên lí kế toán" />
                <MySelect label="Lớp" data={["Kế toán 2024-01"]} defaultValue="Kế toán 2024-01" />

            </Flex> */}
            <MyDataTable
                exportAble
                enableRowSelection={true}
                enableRowNumbers={false}
                columns={columns}
                data={sampleData}
            />
        </CustomFlexColumn>
    );
}



const sampleData: I_StudentTable_prototype[] = [
    {
        id: 1,
        maSinhVien: "SV00001",
        hoTen: "Tô Ngọc Lâm",
        ngaySinh: "01/02/2000",
        gioiTinh: "Nam",
        cot11: 6.78,
        cot12: 6.32,
        cot13: 7.65,
        cot14: 8.5,
        cot21: 7.36,
        cot22: 8.35,
        cot31: 7.65,
        tongKetCLO: 7.68,
        tongKetHocVu: 7.53,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 2,
        "maSinhVien": "SV00002",
        "hoTen": "Tô Ngọc La",
        "ngaySinh": "01/02/2000",
        "gioiTinh": "Nam",
        cot11: 6.78,
        cot12: 6.32,
        cot13: 7.65,
        cot14: 8.5,
        cot21: 7.36,
        cot22: 8.35,
        cot31: 7.65,
        "tongKetCLO": 7.68,
        "tongKetHocVu": 7.53,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 3,
        "maSinhVien": "SV00003",
        "hoTen": "Tô Ngọc Li",
        "ngaySinh": "01/02/2000",
        "gioiTinh": "Nam",
        cot11: 6.78,
        cot12: 6.32,
        cot13: 7.65,
        cot14: 8.5,
        cot21: 7.36,
        cot22: 8.35,
        cot31: 7.65,
        "tongKetCLO": 7.68,
        "tongKetHocVu": 7.53,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 4,
        "maSinhVien": "SV00004",
        "hoTen": "Tô Ngọc Ly",
        "ngaySinh": "01/02/2000",
        "gioiTinh": "Nam",
        cot11: 6.78,
        cot12: 6.32,
        cot13: 7.65,
        cot14: 8.5,
        cot21: 7.36,
        cot22: 8.35,
        cot31: 7.65,
        "tongKetCLO": 7.68,
        "tongKetHocVu": 7.53,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 5,
        "maSinhVien": "SV00005",
        "hoTen": "Tô Ngọc Lân",
        "ngaySinh": "01/02/2000",
        "gioiTinh": "Nam",
        cot11: 6.78,
        cot12: 6.32,
        cot13: 7.65,
        cot14: 8.5,
        cot21: 7.36,
        cot22: 8.35,
        cot31: 7.65,
        "tongKetCLO": 7.68,
        "tongKetHocVu": 7.53,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 6,
        "maSinhVien": "SV00006",
        "hoTen": "Tô Ngọc Linh",
        "ngaySinh": "01/02/2000",
        "gioiTinh": "Nam",
        cot11: 6.78,
        cot12: 6.32,
        cot13: 7.65,
        cot14: 8.5,
        cot21: 7.36,
        cot22: 8.35,
        cot31: 7.65,
        "tongKetCLO": 7.68,
        "tongKetHocVu": 7.53,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    },
    {
        "id": 7,
        "maSinhVien": "SV00007",
        "hoTen": "Tô Ngọc Lý",
        "ngaySinh": "01/02/2000",
        "gioiTinh": "Nam",
        cot11: 6.78,
        cot12: 6.32,
        cot13: 7.65,
        cot14: 8.5,
        cot21: 7.36,
        cot22: 8.35,
        cot31: 7.65,
        "tongKetCLO": 7.68,
        "tongKetHocVu": 7.53,
        nguoiCapNhat: "Nguyễn Văn A",
        ngayCapNhat: new Date("2021-07-11T15:00:00Z")
    }
]
