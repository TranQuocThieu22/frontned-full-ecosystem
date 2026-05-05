'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_ulfmjizfvr_Create from "./F_ulfmjizfvr_Create";
import F_ulfmjizfvr_Delete from "./F_ulfmjizfvr_Delete";
import F_ulfmjizfvr_Update from "./F_ulfmjizfvr_Update";

// Interface định nghĩa dữ liệu
export interface Iulfmjizfvr {
    id?: number; // STT
    maDay?: string; // Mã dãy
    tenDay?: string; // Tên dãy
    chiNhanh?: string; // Chi nhánh
    ghiChu?:string 
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function ReadDanhSachDay() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<Iulfmjizfvr[]>({
        queryKey: ["danhSachDay"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1, maDay: "TD01", tenDay: "Dãy 1 Thủ Đức", chiNhanh: "Thủ Đức", ghiChu:"Thành phố Thủ Đức trực thuộc TP.HCM đã được Ủy ban thường vụ Quốc hội chính thức thông qua Nghị quyết thành lập vào ngày 24/7/2020. Nghị quyết được đưa ra trên cơ sở nhập toàn bộ diện tích tự nhiên và dân số của 3 quận gồm: quận 2, quận 9 và quận Thủ Đức. ",nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
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
    const columns = useMemo<MRT_ColumnDef<Iulfmjizfvr>[]>(
        () => [
            {
                header: "Mã dãy", // Tên cột
                accessorKey: "maDay", // Thuộc tính tương ứng trong dữ liệu
            },
            {
                header: "Tên dãy", // Tên cột
                accessorKey: "tenDay", // Thuộc tính tương ứng trong dữ liệu
            },
            {
                header: "Chi nhánh", // Tên cột
                accessorKey: "chiNhanh", // Thuộc tính tương ứng trong dữ liệu
            },
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
            }
        ],
        []
    );

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            enableRowSelection={true}
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <F_ulfmjizfvr_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_ulfmjizfvr_Update data={row.original} />
                        <F_ulfmjizfvr_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
