'use client'
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { Anchor, Button, Checkbox, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import { IconTrash } from "@tabler/icons-react";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import { useDisclosure } from "@mantine/hooks";
// REVIEW : 48272 F6_7ReadContractList


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

export default function F6_7AssetList() {
    const [tempData, setTempData] = useState<IApproveRequest[]>([]);
    const [checked, setChecked] = useState(false);
    const dis = useDisclosure()


    const stockCheck = useQuery<IApproveRequest[]>({
        queryKey: [`F6_7ReadContractList`],
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
                header: "Tổng chi phí ước tính",
                accessorKey: "totalCostEstimate",
                accessorFn(originalRow) {
                    return (
                        <MyNumberFormatter value={originalRow.totalCostEstimate}></MyNumberFormatter>
                    )
                },
            },

            {
                header: "Người duyệt",
                accessorKey: "validateUser",
            },
            {
                header: "Ngày duyệt",
                accessorFn: (row) =>
                    row.validateDate ? U0DateToDDMMYYYString(new Date(row.validateDate)) : "",
            },
            {
                header: "Ghi chú duyệt",
                accessorKey: "note",
            },
            {
                header: "Trạng thái",
                accessorKey: "status",
                Cell: ({ row }) => {
                    return (
                        <Anchor>{row.original.status}</Anchor>
                    )
                }
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
        <MyButtonModal disclosure={dis} modalSize={'90%'} label='Xem' title="Danh sách tài sản trong hợp đồng">
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
                                <Button >Chọn</Button>
                            </Group>
                        </>
                    )
                }}

            />
        </MyButtonModal>
    )
}
const approveRequests: IApproveRequest[] = [
    {
        id: 1,
        planCode: "KH001",
        requestCode: "YCBT2536",
        barCode: "TS25963",
        requestDate: new Date("2025-01-01"),
        usageUnit: "Phòng kế toán",
        isSurvey: true,
        surveyDate: new Date("2025-01-05"),
        surveyOutput: "hỏng panel màn hình.",
        replaceCostEstimate: 10000000,
        employCostEstimate: 20000000,
        totalCostEstimate: 30000000,
        validateUser: "Trần Quốc Thiệu",
        validateDate: new Date("2025-01-10"),
        note: "chờ kế hoạch sửa",
        status: "Đã duyệt",
        nguoiCapNhat: "admin",
        ngayCapNhat: new Date("2025-01-10"),
    }
];
