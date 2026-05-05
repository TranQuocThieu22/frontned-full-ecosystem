'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Checkbox, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
// REVIEW : 48272 F6_5Read


interface IApproveRequest {
    id?: number;
    planCode?: string;
    requestCode?: string;
    barCode?: string;
    requestDate?: Date | undefined;
    usageUnit?: string
    isSurvey?: boolean
    surveyDate?: Date | undefined;
    surveyOutput?: string;
    note?: string;
    replaceCostEstimate?: number;
    employCostEstimate?: number;
    totalCostEstimate?: number;
    validateUser?: string;
    validateDate?: Date | undefined;
    validateNote?: string;
    status?: string;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

export default function F6_5Read() {
    const [fileData, setFileData] = useState<any[]>([]);
    const [tempData, setTempData] = useState<IApproveRequest[]>([]);
    const [checked, setChecked] = useState(false);



    const stockCheck = useQuery<IApproveRequest[]>({
        queryKey: [`F6_5Read`],
        queryFn: async () => {
            // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
            return approveRequests
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


    const columns = useMemo<MRT_ColumnDef<IApproveRequest>[]>(
        () => [

            {
                header: "Mã kế hoạch",
                accessorKey: "planCode",
            },

            {
                header: "Mã yêu cầu",
                accessorKey: "requestCode",
            },
            {
                header: "Mã vạch",
                accessorKey: "barCode",
            },
            {
                header: "Ngày yêu cầu",
                accessorKey: "requestDate",
                accessorFn: (row) =>
                    row.requestDate ? U0DateToDDMMYYYString(new Date(row.requestDate)) : "",

            },
            {
                header: "Đơn vị sử dụng",
                accessorKey: "usageUnit", // Assuming usageUnit is being used for this column
            },
            {
                header: "Đã khảo sát",
                accessorKey: "isSurvey",
                accessorFn: (row) => {
                    return (
                        <Checkbox
                            checked={row.isSurvey}
                            onChange={(event) => setChecked(event.currentTarget.checked)}

                        />
                    )
                }
            },
            {
                header: "Ngày khảo sát",
                accessorFn: (row) =>
                    row.surveyDate ? U0DateToDDMMYYYString(new Date(row.surveyDate)) : "",
            },
            {
                header: "Kết quả khảo sát",
                accessorKey: "surveyOutput", // Assuming this is the field you want to display
            },

            {
                header: "Ước tính chi phí thay thế",
                accessorKey: "replaceCostEstimate",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.replaceCostEstimate}></MyNumberFormatter>
                    )
                },
            },
            {
                header: "Ước tính chi phí nhân công",
                accessorKey: "employCostEstimate",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.employCostEstimate}></MyNumberFormatter>
                    )
                },
            },
            {
                header: "Ước tính tổng chi phí",
                accessorKey: "totalCostEstimate",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.totalCostEstimate}></MyNumberFormatter>
                    )
                },
            },

            {
                header: "Người phê duyệt",
                accessorKey: "validateUser",
            },
            {
                header: "Ngày phê duyệt",
                accessorFn: (row) =>
                    row.validateDate ? U0DateToDDMMYYYString(new Date(row.validateDate)) : "",
            },
            {
                header: "Ghi chú duyệt",
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
                    <Select
                        data={[
                            { value: "1", label: "Chờ duyệt" },
                            { value: "2", label: "Đã duyệt" },
                            { value: "3", label: "Không duyệt" },
                        ]}
                        defaultValue={row.status}
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
            },

        ],
        []
    );


    if (stockCheck.isLoading) return "Đang tải dữ liệu..."
    if (stockCheck.isError) return "Không có dữ liệu..."
    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            enableRowNumbers={true}
            data={tempData}
            exportAble
            renderTopToolbarCustomActions={({ table }) => {
                return (
                    <>
                        <Group>
                            <Button color="green">Lưu</Button>
                        </Group>
                    </>
                )
            }}

        />
    )
}
const approveRequests: IApproveRequest[] = [
    {
        id: 1,
        planCode: "KH001",
        requestCode: "REQ001",
        barCode: "BAR001",
        requestDate: new Date("2025-01-01"),
        usageUnit: "Unit A",
        isSurvey: true,
        surveyDate: new Date("2025-01-05"),
        surveyOutput: "Survey output for plan 1.",
        note: "Lập kế hoạch cho các hoạt động năm mới.",
        replaceCostEstimate: 10000000,
        employCostEstimate: 20000000,
        totalCostEstimate: 30000000,
        validateUser: "admin",
        validateDate: new Date("2025-01-10"),
        validateNote: "Validating the yearly plan.",
        status: "1",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-10"),
    },
    {
        id: 2,
        planCode: "KH002",
        requestCode: "REQ002",
        barCode: "BAR002",
        requestDate: new Date("2025-02-15"),
        usageUnit: "Unit B",
        isSurvey: true,
        surveyDate: new Date("2025-02-20"),
        surveyOutput: "Survey output for training plan.",
        note: "Chuẩn bị tài liệu đào tạo cho nhân viên mới.",
        replaceCostEstimate: 15000000,
        employCostEstimate: 20000000,
        totalCostEstimate: 35000000,
        validateUser: "user1",
        validateDate: new Date("2025-02-16"),
        validateNote: "Validating the training plan.",
        status: "2",
        nguoiCapNhat: "user1",
        ngayCapNhat: new Date("2025-02-16"),
    },
    {
        id: 3,
        planCode: "KH003",
        requestCode: "REQ003",
        barCode: "BAR003",
        requestDate: new Date("2025-03-01"),
        usageUnit: "Unit C",
        isSurvey: false,
        surveyDate: new Date("2025-02-20"),
        surveyOutput: "No survey required for maintenance.",
        note: "Bảo trì định kỳ hệ thống máy chủ.",
        replaceCostEstimate: 20000000,
        employCostEstimate: 20000000,
        totalCostEstimate: 40000000,
        validateUser: "user2",
        validateDate: new Date("2025-03-02"),
        validateNote: "Validating the maintenance plan.",
        status: "2",
        nguoiCapNhat: "user2",
        ngayCapNhat: new Date("2025-03-02"),
    },
    {
        id: 4,
        planCode: "KH004",
        requestCode: "REQ004",
        barCode: "BAR004",
        requestDate: new Date("2025-04-10"),
        usageUnit: "Unit D",
        isSurvey: true,
        surveyDate: new Date("2025-04-12"),
        surveyOutput: "Survey output for the event plan.",
        note: "Tổ chức ngày hội gia đình công ty.",
        replaceCostEstimate: 5000000,
        employCostEstimate: 20000000,
        totalCostEstimate: 25000000,
        validateUser: "user3",
        validateDate: new Date("2025-04-11"),
        validateNote: "Validating the event plan.",
        status: "1",
        nguoiCapNhat: "user3",
        ngayCapNhat: new Date("2025-04-11"),
    },
    {
        id: 5,
        planCode: "KH005",
        requestCode: "REQ005",
        barCode: "BAR005",
        requestDate: new Date("2025-05-01"),
        usageUnit: "Unit E",
        isSurvey: false,
        surveyDate: new Date("2025-02-20"),
        surveyOutput: "No survey required for inventory.",
        note: "Kiểm kê tài sản công ty quý II.",
        replaceCostEstimate: 12000000,
        employCostEstimate: 20000000,
        totalCostEstimate: 32000000,
        validateUser: "admin",
        validateDate: new Date("2025-05-02"),
        validateNote: "Validating the inventory plan.",
        status: "3",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-05-02"),
    },
];
