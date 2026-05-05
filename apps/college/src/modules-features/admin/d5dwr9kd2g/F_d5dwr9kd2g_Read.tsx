    'use client';
    import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
    import MyCenterFull from "@/components/CenterFull/MyCenterFull";
    import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
    import { U0DateToDDMMYYYString } from "@/utils/date";
    import { useForm } from "@mantine/form";
    import { useQuery } from "@tanstack/react-query";
    import { MRT_ColumnDef } from "mantine-react-table";
    import { useMemo, useState } from "react";
    import F_d5dwr9kd2g_Create from "./F_d5dwr9kd2g_Create";
    import F_d5dwr9kd2g_Delete from "./F_d5dwr9kd2g_Delete";
    import F_d5dwr9kd2g_Update from "./F_d5dwr9kd2g_Update";
    import { Button, Checkbox, Group } from "@mantine/core";
    import { IconTrash } from "@tabler/icons-react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";


    // Interface định nghĩa dữ liệu
    export interface I_d5dwr9kd2g {
        id?: number; 
        code: string; 
        name: string; 
        birthday: Date; 
        sex: string; 
        class: string; 
        block: string;
        subject: string;
        namesubject: string;
        numbercredit: number;
        point: number; 
        avaragepoint: boolean;
        note?: string;
    }

    // Component hiển thị bảng dữ liệu
    export default function F_d5dwr9kd2g_Read() {
        // Sử dụng useQuery để lấy dữ liệu
        const query = useQuery<I_d5dwr9kd2g[]>({
            queryKey: ["Danhmugiaychungnhan"],
            queryFn: async () => [
                {
                    id: 1,
                    code: "SV001",
                    name: "Tô Ngọc Lâm",
                    birthday: new Date("2000-01-1"),
                    sex: "Nam",
                    class: "IT2001",
                    block: "IT24",
                    subject: "MH001",
                    namesubject: "Hệ quản trị cơ sở dữ liệu",
                    numbercredit: 2,
                    point: 3,
                    avaragepoint: false,
                    note: ""
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
        const columns = useMemo<MRT_ColumnDef<I_d5dwr9kd2g>[]>(
            () => [
                {
                    header: "Mã sinh viên",
                    accessorKey: "code",
                },
                {
                    header: "Họ tên",
                    accessorKey: "name",
                },{
                    header: "Ngày sinh",
                    accessorKey: "birdthday",
                    Cell: ({ row }) => new Date(row.original.birthday).toLocaleDateString("vi-VN"),
                },
                {
                    header: "Giới tính",
                    accessorKey: "sex",
                },
                {
                    header: "Mã lớp",
                    accessorKey: "class",
                },
                {
                    header: "Mã khoá",
                    accessorKey: "block",
                },
                {
                    header: "Mã môn học",
                    accessorKey: "subject",
                },
                {
                    header: "Tên môn học",
                    accessorKey: "namesubject",
                },
                {
                    header: "Số TC",
                    accessorKey: "numbercredit",
                },
                {
                    header: "Điểm TK",
                    accessorKey: "point",
                },
                {
                    header: "Không tính DTB",
                    accessorKey: "avaragepoint",
                    Cell: ({ row }) => (
                        <Checkbox
                            defaultChecked={row.original.avaragepoint}
                        />
                    ),
                },
                {
                    header: "Ghi chú",
                    accessorKey: "note",
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
                columns={columns} // Các cột hiển thị
                data={query.data!} // Dữ liệu từ useQuery
                renderTopToolbarCustomActions={() => (
                    <>
                    <Group>
                        <F_d5dwr9kd2g_Create />
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
                        <Button color="red" leftSection={<IconTrash/>}> Xóa </Button>
                    </>
                )}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            {/* Thêm chức năng chỉnh sửa hoặc xóa tại đây */}
                            <F_d5dwr9kd2g_Update data={row.original} />
                            <F_d5dwr9kd2g_Delete id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        );
    }
