'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_yzjremzglu_Create from "./F_yzjremzglu_Create";
import F_yzjremzglu_Delete from "./F_yzjremzglu_Delete";
import F_yzjremzglu_Update from "./F_yzjremzglu_Update";




export interface I_yzjremzglu {
    id: number; // STT
    programCode: string; // Mã chương trình
    programName: string; // Tên chương trình
    managingUnit: string; // Đơn vị quản lý
}

// Component hiển thị bảng dữ liệu
export default function F_yzjremzglu_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_yzjremzglu[]>({
        queryKey: ["F_jfnvucxvym_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                programCode: "HTTT",
                programName: "Hệ thống thông tin",
                managingUnit: "Khoa Công nghệ thông tin",
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
    const columns = useMemo<MRT_ColumnDef<I_yzjremzglu>[]>(() => [
        {
            header: "Mã chương trình",
            accessorKey: "programCode",
        },
        {
            header: "Tên chương trình",
            accessorKey: "programName",
        },
        {
            header: "Đơn vị quản lý",
            accessorKey: "managingUnit",
        },

    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            exportAble
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <F_yzjremzglu_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_yzjremzglu_Update data={row.original} />
                        <F_yzjremzglu_Delete id={row.original.id} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
