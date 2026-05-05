'use client';
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_w0d4wkrvnn_Create from "./F_w0d4wkrvnn_Tab_1_Create";
import F_w0d4wkrvnn_Delete from "./F_w0d4wkrvnn_Tab_1_Delete";
import F_w0d4wkrvnn_Update from "./F_w0d4wkrvnn_Tab_1_Update";
import { Button, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";



// Interface định nghĩa dữ liệu
export interface I_w0d4wkrvnn {
    id?: number;
    order?: number;
    code: string;
    name: string;
    songayxuli: number;
    tennghiepvu: string;
}

// Component hiển thị bảng dữ liệu
export default function F_w0d4wkrvnn_Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_w0d4wkrvnn[]>({
                queryKey: ["dotXetData"], // Khóa cache dữ liệu
                queryFn: async () => [
                    {
                        order: 1,
                        code: "BaoTN",
                        name: "Tô Ngọc Bảo",
                        songayxuli: 1,
                        tennghiepvu: "Kiểm tra hồ sơ nhập học",
                    },
                    {
                        order: 2,
                        code: "LyTN",
                        name: "Tô Ngọc Ly",
                        songayxuli: 1,
                        tennghiepvu: "Kiểm tra học phí",
                    },
                    {
                        order: 3,
                        code: "LinhTN",
                        name: "Tô Ngọc Linh",
                        songayxuli: 1,
                        tennghiepvu: "Trình ký",
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
                header: "Username",
                accessorKey: "code",
            },
            {
                header: "Tên đầy đủ",
                accessorKey: "name",
            },
            {
                header: "Số ngày xử lý",
                accessorKey: "songayxuli",
            },
            {
                header: "Tên nghiệp vụ xử lí",
                accessorKey: "tennghiepvu",
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
                        <F_w0d4wkrvnn_Update data={row.original} />
                        <F_w0d4wkrvnn_Delete id={row.original.id!} />
                    </MyCenterFull>
                );
            }}
        />
    );
}
