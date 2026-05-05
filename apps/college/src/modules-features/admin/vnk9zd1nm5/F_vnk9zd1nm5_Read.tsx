    'use client';
    import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
    import MyCenterFull from "@/components/CenterFull/MyCenterFull";
    import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
    import { U0DateToDDMMYYYString } from "@/utils/date";
    import { useForm } from "@mantine/form";
    import { useQuery } from "@tanstack/react-query";
    import { MRT_ColumnDef } from "mantine-react-table";
    import { useMemo, useState } from "react";
    import F_vnk9zd1nm5_Create from "./F_vnk9zd1nm5_Create";
    import F_vnk9zd1nm5_Delete from "./F_vnk9zd1nm5_Delete";
    import F_vnk9zd1nm5_Update from "./F_vnk9zd1nm5_Update";
    import { Button, Checkbox, Group } from "@mantine/core";
    import { IconTrash } from "@tabler/icons-react";


    // Interface định nghĩa dữ liệu
    export interface I_vnk9zd1nm5 {
        id?: number; // STT
        code: string; // Mã môn học
        name: string; // Tên môn học
        credit: number; // Số tín chỉ
        creditFee: number; // Số tín chỉ học phí
        creditFeeLT: number; // Số tín chỉ học phí LT (Lý thuyết)
        feeRateLT: number; // Mức đóng giá LT
        creditFeeTH: number; // Số tín chỉ học phí TH (Thực hành)
        feeRateTH: number; // Mức đóng giá TH
        creditFeeTN: number; // Số tín chỉ học phí TN (Thí nghiệm)
        feeRateTN: number; // Mức đóng giá TN
        exempted?: boolean; // Không miễn giảm
        note?: string; // Ghi chú
    }

    // Component hiển thị bảng dữ liệu
    export default function F_vnk9zd1nm5_Read() {
        // Sử dụng useQuery để lấy dữ liệu
        const query = useQuery<I_vnk9zd1nm5[]>({
            queryKey: ["dotXetData"], // Khóa cache dữ liệu
            queryFn: async () => [
                {
                    id: 1,
                    code: "MH0001",
                    name: "Research Methods in Education",
                    credit: 3,
                    creditFee: 3,
                    creditFeeLT: 3,
                    feeRateLT: 1,
                    creditFeeTH: 0,
                    feeRateTH: 0,
                    creditFeeTN: 0,
                    feeRateTN: 0,
                    exempted: false,
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
        const columns = useMemo<MRT_ColumnDef<I_vnk9zd1nm5>[]>(
            () => [
                {
                    header: "Mã môn học",
                    accessorKey: "code",
                },
                {
                    header: "Tên môn học",
                    accessorKey: "name",
                },
                {
                    header: "Số tín chỉ",
                    accessorKey: "credit",
                },
                {
                    header: "Số tín chỉ HP",
                    accessorKey: "creditFee",
                },
                {
                    header: "Số tín chỉ HPLT",
                    accessorKey: "creditFeeLT",
                },
                {
                    header: "Mức đơn giá LT",
                    accessorKey: "feeRateLT",
                },
                {
                    header: "Số tín chỉ HPTH",
                    accessorKey: "creditFeeTH",
                },
                {
                    header: "Mức đơn giá TH",
                    accessorKey: "feeRateTH",
                },
                {
                    header: "Số tín chỉ lệ phí thi",
                    accessorKey: "creditFeeTN",
                },
                {
                    header: "Mức đơn giá lệ phí thi",
                    accessorKey: "feeRateTN",
                },
                {
                    header: "Không miễn giảm",
                    accessorKey: "exempted",
                    Cell: ({ row }) => (
                      <Checkbox
                        checked={row.original.exempted}
                        onChange={(event) => console.log(event.target.checked)}
                      />
                    ),
                  },
                {
                    header: "Ghi chú",
                    accessorKey: "note",
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
                        <F_vnk9zd1nm5_Create />
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
                            <F_vnk9zd1nm5_Update data={row.original} />
                            <F_vnk9zd1nm5_Delete id={row.original.id!} />
                        </MyCenterFull>
                    );
                }}
            />
        );
    }
