'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_wxqjwpvhir_Create from "./F_wxqjwpvhir_Create";
import F_wxqjwpvhir_Delete from "./F_wxqjwpvhir_Delete";
import F_wxqjwpvhir_Update from "./F_wxqjwpvhir_Update";

export interface Iwxqjwpvhir {
    id?: number; // STT
    maHocChe?: string; // Mã học chế
    tenHocChe?: string; // Tên học chế
    tenHocCheEg?:string 
    ghiChu?:string
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F_wxqjwpvhir_Read() {
    // Sử dụng useQuery để giả lập lấy dữ liệu
    const query = useQuery<Iwxqjwpvhir[]>({
        queryKey: ["hocCheData"],
        queryFn: async () => [
            {
                id: 1, maHocChe: "TC", tenHocChe: "Tín chỉ", tenHocCheEg:"creadit",ghiChu:" Tín chỉ được coi là đơn vị dùng để đo lường mức độ học tập của một hệ thống ECTS.",nguoiCapNhat: "Quản trị viên",
                ngayCapNhat: new Date("2024-12-23")
            },
            {
                id: 2, maHocChe: "NC", tenHocChe: "Niên chế",tenHocCheEg:"Erea" ,ghiChu:"Là phương thức tổ chức đào tạo theo lớp học tương đối cố định đối với tất cả các học phần bắt buộc của chương trình đào tạo trong toàn khoá học, cho phép sinh viên cùng lớp thực hiện theo kế hoạch học tập chuẩn và theo một thời khóa biểu chung trừ những học phần tự chọn hoặc học lại;",nguoiCapNhat: "Quản trị viên",
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
    // Định nghĩa các cột
    const columns = useMemo<MRT_ColumnDef<Iwxqjwpvhir>[]>(
        () => [
            {
                header: "Mã học chế",
                accessorKey: "maHocChe",
            },
            {
                header: "Tên học chế",
                accessorKey: "tenHocChe",
            },
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
            columns={columns} // Cột
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() =>
                <>
                    <F_wxqjwpvhir_Create />
                    <AQButtonCreateByImportFile setImportedData={setImportData} form={form_multiple} onSubmit={() => {
                        console.log(form_multiple.values);

                    }} >s</AQButtonCreateByImportFile>
                </>

            }
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Chỗ này bạn có thể thêm chức năng cập nhật hoặc xóa */}
                        <F_wxqjwpvhir_Update data={row.original} />
                        <F_wxqjwpvhir_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
