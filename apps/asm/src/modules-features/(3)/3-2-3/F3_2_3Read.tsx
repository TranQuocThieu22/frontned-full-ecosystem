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
import F3_2_3_ButtonViewAssetList from "./F3_2_3ButtonViewAssetList";

export interface I_F3_2_3_Read {
    id?: number;
    code?: string;
    contractDate?: Date;
    planCode?: string;
    totalEstimatedCost?: number;
    totalActualCost?: number;
    paymentStatus?: string;
    paymentDate?: Date
    acceptanceFile?: File | undefined;
    nguoiCapNhat?: string;
    ngayCapNhat?: Date | undefined;
}

// Component hiển thị bảng dữ liệu
export default function F3_2_3Read() {
    // Sử dụng useQuery để lấy dữ liệu
    const query = useQuery<I_F3_2_3_Read[]>({
        queryKey: ["F3_2_3Read"], // Khóa cache
        queryFn: async () => [
            {
                id: 1,
                code: "HD251",
                contractDate: new Date("2025-01-22"),
                planCode: "BT202401",
                totalEstimatedCost: 65000000,
                totalActualCost: 52000000,
                paymentStatus: "Đã thanh toán",
                paymentDate: new Date("2025-02-02"),
                acceptanceFile: undefined,
                nguoiCapNhat: "Nguyễn Văn A",
                ngayCapNhat: new Date("2021-07-11T15:00:00Z")
            },
        ],
    });

    // Định nghĩa các cột của bảng
    const columns = useMemo<MRT_ColumnDef<I_F3_2_3_Read>[]>(
        () => [
            { header: "Mã hợp đồng", accessorKey: "code" },
            {
                header: "Ngày hợp đồng", accessorKey: "contractDate", Cell: ({ cell }) => {
                    const date = cell.getValue() as Date;
                    return new Date(date).toLocaleDateString("vi-VN");
                }
            },
            { header: "Mã kế hoạch", accessorKey: "planCode" },
            {
                header: "Danh sách tài sản liên quan",
                Cell: ({ row }) => {
                    return (
                        <>
                            <Center>
                                <F3_2_3_ButtonViewAssetList contractId={row.original.id!} />
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
                fieldName: "code",
                header: "Mã hợp đồng"
            },
            {
                fieldName: "contractDate",
                header: "Ngày hợp đồng"
            },
            {
                fieldName: "planCode",
                header: "Mã kế hoạch"
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
