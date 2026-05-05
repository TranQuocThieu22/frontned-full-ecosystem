'use client'
import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Fieldset } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_423j6pu4al_Delete from "./F_423j6pu4al_Delete";
import F_423j6pu4al_InputTraining from "./F_423j6pu4al_InputTraining";

export interface I_423j6pu4al {
    id: number; 
    maLop: string; // Mã lớp
    tenLop: string; // Tên lớp
}

// Component hiển thị bảng dữ liệurn
export default function F_423j6pu4al_Read() {
    const [selectedRow, setSelectedRow] = useState([]);

    // Sử dụng useQuery để lấy dữ liệu
    const classQuery = useQuery<I_423j6pu4al[]>({
        queryKey: ["F_423j6pu4al_Read"], // Khóa cache dữ liệu
        queryFn: async () => [
            { id: 1, maLop: "DCT1201", tenLop: "Công nghệ thông tin" },
            { id: 5, maLop: "DCT1202", tenLop: "Công nghệ thông tin 1" },
            { id: 6, maLop: "DCT1206", tenLop: "Công nghệ thông tin 6" },
        ],
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_423j6pu4al>[]>(() => [

        {
            header: "Mã lớp",
            accessorKey: "maLop",
        },
        {
            header: "Tên lớp",
            accessorKey: "tenLop",
        },

    ], []);

    // Xử lý trạng thái tải dữ liệu
    if (classQuery.isLoading) return "Đang tải dữ liệu...";
    if (classQuery.isError) return "Không có dữ liệu...";

    return (
        <Fieldset legend="Danh sách lớp" radius="sm">
            <MyDataTable
                enableRowSelection
                setSelectedRow={setSelectedRow}
                columns={columns} // Các cột hiển thị
                data={classQuery.data!} // Dữ liệu từ useQuery
                renderTopToolbarCustomActions={() =>
                    <>
                        <MyButton crudType="default" color="green">Export</MyButton>
                        <F_423j6pu4al_Delete data={selectedRow}></F_423j6pu4al_Delete>
                    </>
                }
                renderRowActions={({ row }) => {
                    return (
                        <F_423j6pu4al_InputTraining classId={row.original.maLop} />
                    );
                }}
            />
        </Fieldset>
    );
}
