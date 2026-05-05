'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import F_wdft1r324q_Create from "./F_wdft1r324q_Create";
import F_wdft1r324q_Update from "./F_wdft1r324q_Update";
import F_wdft1r324q_Delete from "./F_wdft1r324q_Delete";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { useForm } from "@mantine/form";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

//interface định nghĩa dữ liệu
export interface I_wdft1r324q_Read {
    id: number; // STT - Số thứ tự
    studentId?: string; // Mã sinh viên
    classname?: string; //họ lót
    name?: string; // Họ tên sinh viên
    certificate?: string; // Chứng chỉ
    certificatename?: string; // Chứng chỉ
    diplomaNumber: string; // Số văn bằng
    issueDate?: string; // Ngày cấp
    expiryDate?: string; // Ngày hết hạn
    submissionDate?: string; // Ngày nhập
    note?: string; // Ghi chú
}

//component hiển thị bảng dữ liệu
export default function F_wdft1r324q_Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })
    //query để lấy dữ liệu từ server hoặc mock Data
    const query = useQuery<I_wdft1r324q_Read[]>({
        queryKey: ["F_wdft1r324q_Read"], // Khóa cache
        queryFn: async () => [
    { id: 1, studentId: "sv00001", classname: "Tô Ngọc", name: "Bảo", certificate: "TO35", certificatename: "TO395958", diplomaNumber: "", issueDate: "", expiryDate: "", submissionDate: "", note: "" },
        ]
    });
    console.log(query.data);

    const exportConfig = {
        fields: [
            {
                fieldName: "studentId",
                header: "Mã sinh viên"
            },
            {
                fieldName: "classname",
                header: "Họ lót"
            },
            {
                fieldName: "name",
                header: "Tên"
            },
            {
                fieldName: "certificate",
                header: "Mã chứng chỉ"
            },
            {
                fieldName: "certificatename",
                header: "Tên chứng chỉ"
            },
            {
                fieldName: "diplomaNumber",
                header: "Số văn bằng"
            },
            {
                fieldName: "issueDate",
                header: "Ngày cấp"
            },
            {
                fieldName: "expiryDate",
                header: "Ngày hết hạn"
            },
            {
                fieldName: "submissionDate",
                header: "Ngày nộp"
            },
            {
                fieldName: "note",
                header: "Ghi chú"
            }
        ]
    };

    // định nghĩa các cột của bảng 
    const columns = useMemo<MRT_ColumnDef<I_wdft1r324q_Read>[]>(
        () => [
            { header: "Mã sinh viên", accessorKey: "studentId" },
            { header: "Họ lót", accessorKey: "classname" },
            { header: "Tên", accessorKey: "name" },
            { header: "Mã chứng chỉ", accessorKey: "certificate" },
            { header: "Tên chứng chỉ", accessorKey: "certificatename" },
            { header: "Số văn bằng", accessorKey: "diplomaNumber" },
            { header: "Ngày cấp", accessorKey: "issueDate" },
            { header: "Ngày hết hạn", accessorKey: "expiryDate" },
            { header: "Ngày nộp", accessorKey: "submissionDate" },
            { header: "Ghi chú", accessorKey: "note" }
        ],
        []
    );

    // xử lí trạng thái dữ liệu
    if (query.isLoading) return "đang tải dữ liệu";
    if (query.isError) return "không có dữ liệu";

    return (
        <MyDataTable
            enableRowSelection={true}
            enableRowNumbers={true}
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <F_wdft1r324q_Create /> {/* Nút tạo mới */}
                    <AQButtonCreateByImportFile
                        setImportedData={setFileData}
                        onSubmit={
                            () => {
                                console.log("data: ");
                            }
                        }
                        form={form_multiple}
                    ></AQButtonCreateByImportFile>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dmTHPB"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <Button color="red" leftSection={<IconTrash />}>Xoá</Button>
                </>
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                    <F_wdft1r324q_Update data={row.original} />
                    <F_wdft1r324q_Delete id={row.original.id!} />
                </MyCenterFull>

            )}
        />
    );

}
