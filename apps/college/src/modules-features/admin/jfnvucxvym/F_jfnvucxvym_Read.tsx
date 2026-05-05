'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";

import F_vzyvakcrbp_Create from "./F_jfnvucxvym_Create";
import F_jfnvucxvym_Delete from "./F_jfnvucxvym_Delete";
import F_jfnvucxvym_Update from "./F_jfnvucxvym_Update";



export interface I_jfnvucxvym {
    id: number;
    code: string;
    name: string;
    note?: string;
}

// Component hiển thị bảng dữ liệu
export default function F_jfnvucxvym_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_jfnvucxvym[]>({
        queryKey: ["F_jfnvucxvym_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, code: "LT", name: "Lý thuyết" },
            { id: 2, code: "TH", name: "Tin học" },
        ]
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_jfnvucxvym>[]>(() => [


        {
            header: "Mã tính chất",
            accessorKey: "code",
        },
        {
            header: "Tên tính chất",
            accessorKey: "name",
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
                    <F_vzyvakcrbp_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_jfnvucxvym_Update data={row.original} />
                        <F_jfnvucxvym_Delete id={row.original.id} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
