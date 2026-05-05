'use client'
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
// import F_rkgjotusmn_Create from "./F_xfarghqrjw_Create";
// import F_rkgjotusmn_Update from "./F_xfarghqrjw_Update";
// import F_rkgjotusmn_Delete from "./F_xfarghqrjw_Delete";
// import F_xfarghqrjw_Delete from "./F_xfarghqrjw_Delete";
// import F_xfarghqrjw_Update from "./F_xfarghqrjw_Update";
// import F_xfarghqrjw_Create from "./F_xfarghqrjw_Create";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";


export interface I_pirjlnnwhv {
    id?: number;
    maKhoa?: string; // Mã học viên
    nameKhoa?: string; // Họ tên học viên
    nameCt?: string; // Giới tính
    nameBh?: string// Ngày sinh
    nhhkVao?:string
    nhhkRa?:string
    nienKhoa?:string
    ngonNgu?:string
    chiNhanh?:string
}

// Component hiển thị bảng dữ liệu
export default function F_pirjlnnwhv_Read() {
    const disc = useDisclosure(false)
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_pirjlnnwhv[]>({
        queryKey: ["F_pirjlnnwhv_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
               
        maKhoa: "1", // Mã học viên
        nameKhoa: "IT2024-1", // Họ tên học viên
        nameCt: "Công nghệ thông tin khoá 24", // Giới tính
        nameBh: "Đại học chính quy",// Ngày sinh
        nhhkVao:"2024-1",
        nhhkRa:"2028-2",
   
        nienKhoa:"2024-2028",
        ngonNgu:"Tiếng Việt",
        chiNhanh:"Thủ Đức",
            },
        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_pirjlnnwhv>[]>(() => [
        {
            header: "Mã khoá",
            accessorKey: "maKhoa" // Matches the "hoTen" property in I
        },
        {
            header: "Tên khoá",
            accessorKey: "nameKhoa" // Matches the "gioiTinh" property in I
        },
      
        {
            header: "Chương trình",
            accessorKey: "nameCt" // Matches the "soDienThoai" property in I
        },
        {
            header: "Bậc hệ",
            accessorKey: "nameBh" // Matches the "email" property in I
        },
        {
            header: "NHHK vào",
            accessorKey: "nhhkVao" // Matches the "email" property in I
        },
        {
            header: "NHHK ra",
            accessorKey: "nhhkRa" // Matches the "email" property in I
        },
        {
            header: "Niên khoá",
            accessorKey: "nienKhoa" // Matches the "email" property in I
        },
        {
            header: "Ngôn ngữ đào tạo",
            accessorKey: "ngonNgu" // Matches the "email" property in I
        },
        {
            header: "Chi nhánh",
            accessorKey: "chiNhanh" // Matches the "email" property in I
        },

    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyButtonModal label="Đồng bộ"
            modalSize={"100%"} title='Đồng bộ danh mục khoá' disclosure={disc}>

            <MyDataTable
            enableRowSelection
                exportAble={false}
                columns={columns} // Các cột hiển thị
                data={query.data!} // Dữ liệu từ useQuer
                renderTopToolbarCustomActions={() =>
                    <>
                        <Button>Chọn</Button>
                    </>

                }

            />
        </MyButtonModal>

    );
}
