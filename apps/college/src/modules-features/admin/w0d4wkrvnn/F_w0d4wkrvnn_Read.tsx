'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_w0d4wkrvnn_Create from "./F_w0d4wkrvnn_Create";
import F_w0d4wkrvnn_Delete from "./F_w0d4wkrvnn_Delete";
import F_w0d4wkrvnn_Update from "./F_w0d4wkrvnn_Update";


// Interface định nghĩa dữ liệu
export interface I_w0d4wkrvnn {
    id?: number; // STT
    code: string;
    name: string;
    nameEg: string;
    incharge: string;
}

// Component hiển thị bảng dữ liệu
export default function F_w0d4wkrvnn_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_w0d4wkrvnn[]>({
        queryKey: ["dotXetData123"], // Khóa cache dữ liệu
        queryFn: async () => [
            {
                id: 1,
                code: "XNSV",
                name: "Xác nhận sinh viên",
                nameEg: "xacnhansinhvien",
                incharge: "LAMTN",
            },

        ],
    });

    const [importData, setImportData] = useState(false);

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: [],
        },
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_w0d4wkrvnn>[]>(
        () => [
            {
                header: "Mã nhóm",
                accessorKey: "code",
            },
            {
                header: "Tên nhóm",
                accessorKey: "name",
            },
            {
                header: "người chịu trách nhiệm",
                accessorKey: "incharge",
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
            columns={columns} // Các cột hiển thị
            data={query.data!} // Dữ liệu từ useQuery
            renderTopToolbarCustomActions={() => (
                <>
                    <Group>
                        <F_w0d4wkrvnn_Create />
                        <AQButtonCreateByImportFile
                            setImportedData={setImportData}
                            form={form_multiple}
                            onSubmit={() => {
                                console.log(form_multiple.values);
                            }}
                        >
                            Nhập từ file
                        </AQButtonCreateByImportFile>
                    </Group>
                    <Button color="red" leftSection={<IconTrash />}> Xóa </Button>
                </>
            )}
            renderRowActions={({ row }) => {
                return (
                    <MyCenterFull>
                        {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                        <F_w0d4wkrvnn_Update data={row.original} />
                        <F_w0d4wkrvnn_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
