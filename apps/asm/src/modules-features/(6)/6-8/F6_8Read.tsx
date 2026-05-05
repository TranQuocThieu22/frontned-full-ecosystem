'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Checkbox, Group, Select, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import { DateInput } from "@mantine/dates";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { MyButton } from "@/components/Buttons/Button/MyButton";
// REVIEW : 48296 F6_8Read


interface Iacceptance {
    id?: number;
    planCode?: string;
    requestCode?: string;
    requestDate?: Date | undefined;
    usageUnit?: string
    note?: string;
    status?: string;
    handoverDate?: Date | undefined;
    receiver?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;

}

export default function F6_8Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<Iacceptance[]>([]);




    const stockCheck = useQuery<Iacceptance[]>({
        queryKey: [`F6_8Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return plans
        },
    })

    useEffect(() => {
        if (stockCheck.data) {
            setTempData(stockCheck.data); // Sao chép dữ liệu từ query
        }
    }, [stockCheck.data]);

    const handleDeleteAllRows = () => {
        setTempData([]); // Xóa toàn bộ dữ liệu
    };

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    })

    const formatFunctions = {
        birthDate: (value: string) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-GB"); // e.g., "07/11/2024" (DD/MM/YYYY format)
        },
        isEnabled: (value: boolean) => (value ? "Đã kích hoạt" : "Chưa kích hoạt")
    };


    const columns = useMemo<MRT_ColumnDef<Iacceptance>[]>(() => [
        {
            header: "Mã kế hoạch",
            accessorKey: "planCode",

        },
        {
            header: "Mã yêu cầu",
            accessorKey: "requestCode",

        },
        {
            header: "Ngày yêu cầu",
            accessorKey: "requestDate",
            accessorFn: (row) =>
                row.requestDate ? U0DateToDDMMYYYString(new Date(row.requestDate)) : "",

        },
        {
            header: "Đơn vị sử dụng",
            accessorKey: "usageUnit",

        },
        {
            header: "Ghi chú nghiệm thu",
            accessorKey: "note",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.note}
                />
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            accessorFn: (row) =>
                <TextInput
                    variant="unstyled"
                    onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                    onBlur={(event) => event.currentTarget.style.border = 'none'}
                    defaultValue={row.status}
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
                    defaultValue={row.handoverDate || undefined} // Pass the Date object directly
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


    if (stockCheck.isLoading) return "Đang tải dữ liệu..."
    if (stockCheck.isError) return "Không có dữ liệu..."
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
                            value: "Thực hiện sửa chữa tài sản đợt 1 2024 ",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2024"
                        },
                        {
                            value: "Thực hiện sửa chữa tài sản đợt 1 2025",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2025"
                        },
                        {
                            value: "Thực hiện sửa chữa tài sản đợt 1 2026",
                            label: "Thực hiện sửa chữa tài sản đợt 1 2026"
                        },
                    ]}
                />
                <MyFileInput flex={1} label="Đính kèm biên bản nghiệm thu"
                    placeholder="Chọn file"
                />
                <Button w={"10%"} color="green">Lưu</Button>

            </Group>
            <MyDataTable
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={tempData}
                exportAble

            />
        </>
    )
}

const plans: Iacceptance[] = [
    {
        id: 1,
        planCode: "KH001",
        requestCode: "REQ001",
        requestDate: new Date("2025-01-01"),
        usageUnit: "Khoa quản trị kinh doanh",
        note: "Đã sử dụng được.",
        status: "Sử dụng tốt",
        handoverDate: new Date("2025-01-10"),
        receiver: "Nguyễn Văn A",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-01-02"),
    },
    {
        id: 2,
        planCode: "KH002",
        requestCode: "REQ002",
        requestDate: new Date("2025-02-01"),
        usageUnit: "Phòng CNTT",
        note: "Đã sử dụng được.",
        status: "Sử dụng tốt",
        handoverDate: new Date("2025-02-10"),
        receiver: "Nguyễn Văn B",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-02-02"),
    },
    {
        id: 3,
        planCode: "KH003",
        requestCode: "REQ003",
        requestDate: new Date("2025-03-20"),
        usageUnit: "Phòng nhân sự",
        note: "Đã sử dụng được.",
        status: "Sử dụng tốt",
        handoverDate: new Date("2025-03-25"),
        receiver: "Trần Thị C",
        nguoiCapNhat: "user2",
        ngayCapNhat: new Date("2025-03-21"),
    },
    {
        id: 4,
        planCode: "KH004",
        requestCode: "REQ004",
        requestDate: new Date("2025-04-10"),
        usageUnit: "Phòng kế toán",
        note: "Đã sử dụng được.",
        status: "Sử dụng tốt",
        handoverDate: new Date("2025-04-15"),
        receiver: "Nguyễn Văn D",
        nguoiCapNhat: "user3",
        ngayCapNhat: new Date("2025-04-11"),
    },
    {
        id: 5,
        planCode: "KH005",
        requestCode: "REQ005",
        requestDate: new Date("2025-05-01"),
        usageUnit: "Phòng kinh doanh",
        note: "Đã sử dụng được.",
        status: "Sử dụng tốt",
        handoverDate: new Date("2025-05-10"),
        receiver: "Lê Thị E",
        nguoiCapNhat: "user4",
        ngayCapNhat: new Date("2025-05-02"),
    },
];


