import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useQuery } from "@tanstack/react-query";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_jzmczvppf6_ThanhToan from "./F_jzmczvppf6_ThanhToan";


export interface I_jzmczvppf6 {
    id?: number,
    maHocVien?: string,
    hoTen?: string,
    gioiTinh: string,
    ngaySinh: string,
    soDienThoai?: string,
    email?: string,
    phaiThu: number,
    daThu: number,
    mienGiam: number,
    conNo: number,
}

export default function F_jzmczvppf6_Read() {

    const congNoHocVienQuery = useQuery<I_jzmczvppf6[]>({
        queryKey: [`F_jzmczvppf6_Read`],
        queryFn: async () => {
            return mokData;
        }
    })

    const columns = useMemo<MRT_ColumnDef<I_jzmczvppf6>[]>(
        () => [
            {
                header: "Mã học viên",
                accessorKey: "maHocVien",
            },
            {
                header: "Họ tên",
                accessorKey: "hoTen"
            },
            {
                header: "Giới tính",
                accessorKey: "gioiTinh"
            },
            {
                header: "Ngày sinh",
                accessorFn: (row) => utils_date_dateToDDMMYYYString(new Date(row.ngaySinh))
            },
            {
                header: "Số điện thoại",
                accessorKey: "soDienThoai"
            },
            {
                header: "Email",
                accessorKey: "email"
            },
            {
                header: "Phải thu",
                accessorFn: (row) => row.phaiThu?.toLocaleString('vi-VN'),
            },
            {
                header: "Đã thu",
                accessorFn: (row) => row.daThu?.toLocaleString('vi-VN'),
            },
            {
                header: "Miễn giảm",
                accessorFn: (row) => row.mienGiam?.toLocaleString('vi-VN'),
            },
            {
                header: "Còn nợ",
                accessorFn: (row) => row.conNo?.toLocaleString('vi-VN'),
            },
        ],
        []
    );

    const exportConfig = {
        fields: [
            {
                header: "Mã học viên",
                fieldName: "maHocVien",
            },
            {
                header: "Họ tên",
                fieldName: "hoTen"
            },
            {
                header: "Giới tính",
                fieldName: "gioiTinh"
            },
            {
                header: "Ngày sinh",
                fieldName: "ngaySinh"
            },
            {
                header: "Số điện thoại",
                fieldName: "soDienThoai"
            },
            {
                header: "Email",
                fieldName: "email"
            },
            {
                header: "Phải thu",
                fieldName: "phaiThu"
            },
            {
                header: "Đã thu",
                fieldName: "daThu"
            },
            {
                header: "Miễn giảm",
                fieldName: "mienGiam"
            },
            {
                header: "Còn nợ",
                fieldName: "conNo"
            },
        ]
    };

    if (congNoHocVienQuery.isLoading) return "Đang tải dữ liệu..."
    if (congNoHocVienQuery.isError) return "Không có dữ liệu..."

    return (
        <MyFieldset title="Danh sách đăng ký khóa học">
            <MyDataTable
                columns={columns}
                data={congNoHocVienQuery.data!}
                enableRowSelection
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <F_jzmczvppf6_ThanhToan />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}





const mokData: I_jzmczvppf6[] = [
    {
        maHocVien: "HV0001",
        hoTen: "Tô Ngọc Lan",
        gioiTinh: "Nam",
        ngaySinh: "01/01/1990",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        phaiThu: 15250000,
        daThu: 14000000,
        mienGiam: 0,
        conNo: 1250000
    },
    {
        maHocVien: "HV0002",
        hoTen: "Tô Ngọc Linh",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        phaiThu: 15250000,
        daThu: 14000000,
        mienGiam: 0,
        conNo: 1250000
    },
    {
        maHocVien: "HV0003",
        hoTen: "Tô Ngọc Bảo",
        gioiTinh: "Nam",
        ngaySinh: "1990-01-01",
        soDienThoai: "0896585235",
        email: "a@gmail.com",
        phaiThu: 15250000,
        daThu: 14000000,
        mienGiam: 0,
        conNo: 1250000
    }
]