'use client'

import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { useAuthenticateStore } from "@aq-fe/core-ui/features/authenticate/useAuthenticateStore";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_fkvafnygpz_View from "./F_fkvafnygpz_View";


export interface IPayment {
    userId: number;
    paymentCode: string;
    paymentDate: Date; // ISO 8601 format, use Date if parsed
    discountCode: string;
    discountType: number;
    discountAmount: number;
    totalAmount: number;
    paymentAmount: number;
    description: string;
    paymentType: number;
    status: number;
    user: any | null; // Can be replaced with a specific User interface if available
    courseRegistrations: any[]; // Can be typed with CourseRegistration[] if defined
    examRegistrations: any[]; // Can be typed with ExamRegistration[] if defined
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    modifiedWhen: string; // ISO date st
}


export default function F_fkvafnygpz_Read(
) {
    const currentUser = useAuthenticateStore();
    const paymentQuery = useQuery<IPayment[]>({
        queryKey: ['F_fkvafnygpz_Read'],
        queryFn: async () => {
            // const TMP_USER_ID = 1078
            // const PARAM = `studentId=${TMP_USER_ID}`
            const PARAM = `studentId=${currentUser.state.userId}`
            const result = await baseAxios.get(`/Payment/GetPaymentHistoryByStudentId?${PARAM}`)
            return result.data.data || []
        },
    })
    const columns = useMemo<MRT_ColumnDef<IPayment>[]>(
        () => [
            { header: "Mã giao dịch", accessorKey: "paymentCode" },
            {
                header: "Ngày thanh toán",
                accessorKey: "paymentDate",
                accessorFn: (row) => row.paymentDate ? utils_date_dateToDDMMYYYString(new Date(row.paymentDate)) : ""
            },
            { header: "Nội dung thanh toán", accessorKey: "description" },
            {
                header: "Trạng thái",
                accessorKey: "status",
                accessorFn: (row) => row.status === 1 ? "Thành công" : "Thất bại"
            },
            { header: "Hóa đơn", accessorKey: "hoaDon", accessorFn: () => <F_fkvafnygpz_View /> },
        ],
        []
    );

    if (paymentQuery.isLoading) return "Đang tải dữ liệu..."
    if (paymentQuery.isError) return "Có lỗi xảy ra!"
    return (
        <MyFieldset title="Lịch sử thanh toán">
            <MyDataTable
                exportAble
                enableRowSelection={true}
                columns={columns}
                enableRowNumbers={true}
                data={paymentQuery.data || []}
            />
        </MyFieldset>
    )
}

