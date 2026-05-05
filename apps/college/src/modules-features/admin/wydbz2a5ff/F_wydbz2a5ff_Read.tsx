    'use client';
    import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
    import MyCenterFull from "@/components/CenterFull/MyCenterFull";
    import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
    import { U0DateToDDMMYYYString } from "@/utils/date";
    import { useForm } from "@mantine/form";
    import { useQuery } from "@tanstack/react-query";
    import { MRT_ColumnDef } from "mantine-react-table";
    import { useMemo, useState } from "react";
    import F_wydbz2a5ff_Create from "./F_wydbz2a5ff_Create";
    import F_wydbz2a5ff_Delete from "./F_wydbz2a5ff_Delete";
    import F_wydbz2a5ff_Update from "./F_wydbz2a5ff_Update";
    import { Button, Checkbox, Group } from "@mantine/core";
    import { IconTrash } from "@tabler/icons-react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";


    // Interface định nghĩa dữ liệu
    export interface I_wydbz2a5ff {
        id?: number; 
        code: string; 
        name: string; 
        bodem: string; 
        filemauin: string; 
        nhomGCN: string; 
        maudon: string; 
        minhchung: boolean; 
        choin: boolean;
        soluong: number;
        note?: string;
    }

    // Component hiển thị bảng dữ liệu
    export default function F_wydbz2a5ff_Read() {
        // Sử dụng useQuery để lấy dữ liệu
        const query = useQuery<I_wydbz2a5ff[]>({
            queryKey: ["Danhmugiaychungnhan"],
            queryFn: async () => [
                {
                    id: 1,
                    code: "NVQS",
                    name: "nghĩa vụ quân sự", 
                    bodem: "GCN01",
                    filemauin: "",
                    nhomGCN: "Chứng nhận sinh viên",
                    maudon: "", 
                    minhchung: true,
                    choin: false,
                    soluong: 1,
                    note: "",
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
        const columns = useMemo<MRT_ColumnDef<I_wydbz2a5ff>[]>(
            () => [
                {
                    header: "Mã GCN",
                    accessorKey: "code",
                },
                {
                    header: "Tên GCN",
                    accessorKey: "name",
                },
                {
                    header: "Bộ đệm",
                    accessorKey: "bodem",
                },
                {
                    header: "File mẫu in",
                    accessorKey: "filemauin",
                    Cell: ({ row }) => (
                        <MyButtonViewPDF
                          label={"Xem file"}
                        />
                      )
                },
                {
                    header: "Nhóm GCN",
                    accessorKey: "nhomGCN",
                },
                {
                    header: "Mẫu đơn cho sinh viên tải",
                    accessorKey: "maudon",

                    Cell: ({ row }) => (
                        <MyButtonViewPDF
                          label={"Xem file"}
                          
                        />
                      )
                },
                {
                    header: "Minh chứng",
                    accessorKey: "minhchung",
                    Cell: ({ row }) => (
                      <Checkbox
                        checked={row.original.minhchung}
                        onChange={(event) => console.log(event.target.checked)}
                      />
                    ),
                },
                {
                    header: "Cho in trên web",
                    accessorKey: "choin",
                    Cell: ({ row }) => (
                      <Checkbox
                        checked={row.original.choin}
                        onChange={(event) => console.log(event.target.checked)}
                      />
                    ),
                },
                {
                    header: "Số lượng",
                    accessorKey: "soluong",
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
                        <F_wydbz2a5ff_Create />
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
                            <F_wydbz2a5ff_Update data={row.original} />
                            <F_wydbz2a5ff_Delete id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        );
    }
