'use client';
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { U0DateToDDMMYYYString } from "@/utils/date";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Button, Center, TextInput } from "@mantine/core";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyButtonUpload from "@/components/Buttons/ButtonViewPDF/MyButtonUpload";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import AQButtonExportData from "@/components/Buttons/ButtonCRUD/AQButtonExportData";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import F6_9_ButtonViewAssetList from "./F6_9_ButtonViewAssetList";


// Interface định nghĩa dữ liệu
export interface I_F6_9_Read {
    id?: number; // STT
    contractCode?: string; // Mã hợp đồng
    contractDate?: Date; // Ngày hợp đồng
    fileCode?: string; // Mã hồ sơ
    fileName?: string; // Tên hồ sơ
    planCode?: string; // Mã kế hoạch
    list?: string; // Danh sách tài sản liên quan
    totalEstimatedCost?: number; // Tổng chi phí ước tính
    totalActualCost?: number; // Tổng chi phí thực tế
    paymentStatus?: string; // Trạng thái thanh toán
    paymentDate?: Date // Ngày thanh toán
    paymentVoucher?: string; // Chứng từ thanh toán
    acceptanceReport?: string; // Biên bản nghiệm thu
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F6_9Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F6_9_Read[]>({
        queryKey: ["f6_9Data"], // Khóa cache
        queryFn: async () => [
            {
                id: 1,
                contractCode: "HD251",
                contractDate: new Date("2025-01-22"),
                fileCode: "HSBT524",
                fileName: "Thực hiện sửa chữa tài sản đợt 1 2024",
                planCode: "BT202401",
                list: "Tài sản 1, Tài sản 2",
                totalEstimatedCost: 65000000,
                totalActualCost: 52000000,
                paymentStatus: "Đã thanh toán",
                paymentDate: new Date("02/02/2025"),
                paymentVoucher: "CTT001",
                acceptanceReport: "BBNT001",
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },

        ],
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F6_9_Read>[]>(
        () => [
            { header: "Mã hợp đồng", accessorKey: "contractCode" },
            {
                header: "Ngày hợp đồng", accessorKey: "contractDate", Cell: ({ cell }) => {
                    const date = cell.getValue() as Date;
                    return new Date(date).toLocaleDateString("vi-VN");
                }
            },
            { header: "Mã hồ sơ", accessorKey: "fileCode" },
            { header: "Tên hồ sơ", accessorKey: "fileName" },
            { header: "Mã kế hoạch", accessorKey: "planCode" },
            {
                header: "Danh sách tài sản liên quan",
                Cell: ({ row }) => {
                    return (
                        <>
                            <Center>
                                <F6_9_ButtonViewAssetList contractId={row.original.id!} />
                            </Center>
                        </>
                    )
                },
                size: 160
            },
            { header: "Tổng chi phí ước tính", accessorKey: "totalEstimatedCost", Cell: ({ cell }) => cell.getValue()?.toLocaleString() },
            {
                header: "Tổng chi phí thực tế", accessorKey: "totalActualCost", accessorFn: (row) =>
                    <TextInput
                        variant="unstyled"
                        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                        onBlur={(event) => event.currentTarget.style.border = 'none'}
                        defaultValue={row.totalActualCost}
                    />
            },
            {
                header: "Trạng thái thanh toán", accessorKey: "paymentStatus", accessorFn: (row) =>
                    <MySelect
                        variant="unstyled"
                        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                        onBlur={(event) => event.currentTarget.style.border = 'none'}
                        defaultValue={row.paymentStatus} data={['Đã thanh toán', 'Chưa thanh toán']} />
            },
            {
                header: "Ngày thanh toán",
                accessorKey: "paymentDate",

                accessorFn: (row) => (
                    <MyDateInput
                        variant="unstyled"
                        onFocus={(event) => event.currentTarget.style.border = '1px solid #000'}
                        onBlur={(event) => event.currentTarget.style.border = 'none'}
                        defaultValue={row.paymentDate}
                    />

                ),
            },

            {
                header: "Chứng từ thanh toán", accessorKey: "paymentVoucher"
                , accessorFn: (row) =>
                    <MyFlexRow>
                        <MyButtonUpload />
                        <MyButtonViewPDF />
                    </MyFlexRow>
            },
            { header: "Biên bản nghiệm thu", accessorKey: "acceptanceReport", accessorFn: (row) => <MyButtonViewPDF id={undefined} /> },
            {
                header: "Người cập nhật",
                accessorKey: "nguoiCapNhat"
            },
            {
                header: "Ngày cập nhật",
                accessorKey: "ngayCapNhat",
                accessorFn(originalRow) {
                    return U0DateToDDMMYYYString(new Date(originalRow.ngayCapNhat!));
                },
            }
        ],
        []
    );

    const exportConfig = {
        fields: [
            {
                fieldName: "contractCode",
                header: "Mã hợp đồng"
            },
            {
                fieldName: "contractDate",
                header: "Ngày hợp đồng"
            },
            {
                fieldName: "fileCode",
                header: "Mã hồ sơ"
            },
            {
                fieldName: "fileName",
                header: "Tên hồ sơ"
            },
            {
                fieldName: "planCode",
                header: "Mã kế hoạch"
            },
            {
                fieldName: "list",
                header: "Danh sách tài sản liên quan"
            },
            {
                fieldName: "totalEstimatedCost",
                header: "Tổng chi phí ước tính"
            },
            {
                fieldName: "totalActualCost",
                header: "Tổng chi phí thực tế"
            },
            {
                fieldName: "paymentStatus",
                header: "Trạng thái thanh toán"
            },
            {
                fieldName: "paymentDate",
                header: "Ngày thanh toán"
            },
            {
                fieldName: "paymentVoucher",
                header: "Chứng từ thanh toán"
            },
            {
                fieldName: "acceptanceReport",
                header: "Biên bản nghiệm thu"
            },
            {
                fieldName: "Người cập nhập",
                header: "nguoiCapNhap"
            },
            {
                fieldName: "Ngày cập nhập",
                header: "ngayCapNhap"
            }
        ]
    };
    // Xử lý trạng thái tải dữ liệu
    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Không có dữ liệu...";

    return (
        <MyDataTable
            enableRowSelection={true}
            columns={columns}
            data={query.data!}
            renderTopToolbarCustomActions={() => (
                <>
                    <AQButtonExportData
                        isAllData={true}
                        objectName="dsYeuCau"
                        data={query.data!}
                        exportConfig={exportConfig}
                    />
                    <MyButton crudType="save" />
                </>
            )}

        />
    );
}
