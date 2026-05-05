'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Checkbox, Fieldset, Group, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { MyButton } from "@/components/Buttons/Button/MyButton";

interface IBuyContract {
    id?: number;
    code?: string;
    departmentOfRequest?: string;
    assetName?: string;
    category?: string
    specification?: string;
    unit?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    noteAcceptance?: string;
    usageStatus?: string;
    transferalDate?: Date | undefined;
    receiver?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

const mockData: IBuyContract[] = [
    {
        id: 1,
        code: "KH001",
        departmentOfRequest: "Phòng quản trị kinh doanh",
        assetName: "Máy in",
        category: undefined,
        specification: undefined,
        unit: "Cái",
        quantity: 10,
        unitPrice: 5000000,
        totalPrice: 50000000,
        noteAcceptance: "Đã sử dụng được.",
        usageStatus: "1",
        transferalDate: new Date("2025-01-10"),
        receiver: "Nguyễn Văn A",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-01-02"),
    },
    {
        id: 2,
        code: "KH002",
        departmentOfRequest: "Phòng CNTT",
        assetName: "Router",
        category: undefined,
        specification: undefined,
        unit: "Cái",
        quantity: 5,
        unitPrice: 2000000,
        totalPrice: 10000000,
        noteAcceptance: "Đã sử dụng được.",
        usageStatus: "1",
        transferalDate: new Date("2025-02-10"),
        receiver: "Nguyễn Văn B",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-02-02"),
    },
    {
        id: 3,
        code: "KH003",
        departmentOfRequest: "Phòng nhân sự",
        assetName: "Máy tính",
        category: undefined,
        specification: undefined,
        unit: "Cái",
        quantity: 20,
        unitPrice: 15000000,
        totalPrice: 300000000,
        noteAcceptance: "Đã sử dụng được.",
        usageStatus: "2",
        transferalDate: new Date("2025-03-25"),
        receiver: "Trần Thị C",
        nguoiCapNhat: "user2",
        ngayCapNhat: new Date("2025-03-21"),
    },
    {
        id: 4,
        code: "KH004",
        departmentOfRequest: "Phòng kế toán",
        assetName: "Máy photocopy",
        category: undefined,
        specification: undefined,
        unit: "Cái",
        quantity: 2,
        unitPrice: 30000000,
        totalPrice: 60000000,
        noteAcceptance: "Đã sử dụng được.",
        usageStatus: "1",
        transferalDate: new Date("2025-04-15"),
        receiver: "Nguyễn Văn D",
        nguoiCapNhat: "user3",
        ngayCapNhat: new Date("2025-04-11"),
    },
    {
        id: 5,
        code: "KH005",
        departmentOfRequest: "Phòng kinh doanh",
        assetName: "Máy chiếu",
        category: undefined,
        specification: undefined,
        unit: "Cái",
        quantity: 3,
        unitPrice: 10000000,
        totalPrice: 30000000,
        noteAcceptance: "Đã sử dụng được.",
        usageStatus: "3",
        transferalDate: new Date("2025-05-10"),
        receiver: "Lê Thị E",
        nguoiCapNhat: "user4",
        ngayCapNhat: new Date("2025-05-02"),
    },
];

export default function F3_2_2AcceptBuyContract() {
    const [fileData, setFileData] = useState<any[]>([]);

    const buyContractList = useQuery<IBuyContract[]>({
        queryKey: [`F3_2_2AcceptBuyContract`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return mockData
        },
    })


    const columns = useMemo<MRT_ColumnDef<IBuyContract>[]>(() => [
        {
            header: "Đơn vị yêu cầu",
            accessorKey: "departmentOfRequest",
        },
        {
            header: "Tên vật tư",
            accessorKey: "assetName",
        },
        {
            header: "Phân loại",
            accessorKey: "category",
        },
        {
            header: "Quy cách",
            accessorKey: "specification",
        },
        {
            header: "Đơn vị tính",
            accessorKey: "unit",
        },
        {
            header: "Số lượng",
            accessorKey: "quantity",
        },
        {
            header: "Đơn giá",
            accessorKey: "unitPrice",
        },
        {
            header: "Thành tiền",
            accessorKey: "totalPrice",
        },
        {
            header: "Ghi chú nghiệm thu",
            accessorKey: "noteAcceptance",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.noteAcceptance}
                />
        },
        {
            header: "Trạng thái sử dụng",
            accessorKey: "usageStatus",
            accessorFn: (row) =>
                <Select
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.usageStatus}
                    data={[
                        {
                            value: "1",
                            label: "Sử dụng tốt"
                        },
                        {
                            value: "2",
                            label: "Cần theo dõi thêm"
                        },
                        {
                            value: "3",
                            label: "Không sử dụng được"
                        },
                    ]}
                />
        },
        {
            header: "Ngày bàn giao",
            accessorKey: "handoverDate",
            accessorFn: (row) =>
                <DateInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.transferalDate || undefined}
                />
        },
        {
            header: "Người nhận bàn giao",
            accessorKey: "receiver",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.receiver}
                />
        },
        {
            header: "Người cập nhật",
            accessorKey: "nguoiCapNhat",

        },
        {
            header: "Ngày cập nhật",
            accessorKey: "ngayCapNhat",
            accessorFn: (row) =>
                row.ngayCapNhat ? U0DateToDDMMYYYString(new Date(row.ngayCapNhat)) : "",

        }
    ], []);


    if (buyContractList.isLoading) return "Đang tải dữ liệu..."
    if (buyContractList.isError) return "Không có dữ liệu..."
    return (
        <>
            <Group align="end" mb={20}>
                <Select
                    flex={1}
                    clearable
                    searchable
                    placeholder='Chọn hợp đồng'
                    label='Chọn hợp đồng'
                    data={[
                        {
                            value: "1",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2024"
                        },
                        {
                            value: "2",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2025"
                        },
                        {
                            value: "3",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2026"
                        },
                    ]}
                />
                <MyFileInput flex={1} label="Đính kèm biên bản nghiệm thu"
                    placeholder="Chọn file"
                />
                <Button w={"10%"} color="green">Lưu</Button>

            </Group>
            <Fieldset legend="Danh sách tài sản mua sắm">
                <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    enableRowNumbers={true}
                    data={buyContractList.data!}
                    exportAble
                />
            </Fieldset>
        </>
    )
}




