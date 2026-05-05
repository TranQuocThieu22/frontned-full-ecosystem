'use client'
import { Center, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import Delete_expenseSettlement from "./Delete_expenseSettlement";
import ExpenseSettlementCreate from "./ExpenseSettlementCreate";
import Update_expenseSettlement from "./Update_expenseSettlement";

export interface IExpenseSettlement {
    paymentCode: string; // Mã đề nghị thanh toán
    paymentName: string; // Tên đề nghị thanh toán
    paymentObject: string; // Đối tượng thanh toán
    paymentAmountInitial: string; // Tổng số tiền đề nghị ban đầu
    approvalDecisionCode: string; // Mã quyết định duyệt toán
    approvalDecisionTitle: string; // Tên/Tiêu đề quyết định duyệt toán
    settlementDate: string; // Ngày quyết toán/hoàn tất
    approver: string; // Người kiểm tra & duyệt toán
    paymentAmountSettled: string; // Tổng số tiền đã quyết toán
    settlementProcess: string; // Trình tự kiểm tra/duyệt & xác nhận công nợ
    settlementDocument: string; // Tài liệu kiểm tra/duyệt & xác nhận công nợ
    note: string; // Ghi chú
}

export default function Read_expenseSettlement() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    // Query to fetch mock data
    const query = useQuery<IExpenseSettlement[]>({
        queryKey: ["ExpenseSettlementRead"],
        queryFn: async () => mockData
    });

    const columns = useMemo<MRT_ColumnDef<IExpenseSettlement>[]>(() => [
        { header: "Mã đề nghị thanh toán", accessorKey: "paymentCode" },
        { header: "Tên đề nghị thanh toán", accessorKey: "paymentName" },
        { header: "Đối tượng thanh toán", accessorKey: "paymentObject" },
        { header: "Tổng số tiền đề nghị ban đầu", accessorKey: "paymentAmountInitial" },
        { header: "Mã quyết định duyệt toán", accessorKey: "approvalDecisionCode" },
        { header: "Tên/Tiêu đề quyết định duyệt toán", accessorKey: "approvalDecisionTitle" },
        { header: "Ngày quyết định/ Ngày ký duyệt", accessorKey: "settlementDate" },
        { header: "Người/ Đơn vị ra quyết định", accessorKey: "approver" },
        { header: "Tổng số tiền đã quyết toán", accessorKey: "paymentAmountSettled" },
        { header: "Tóm tắt quyết định cuối cùng", accessorKey: "settlementProcess" },
        { header: "Tài liệu kiểm tra/duyệt & xác nhận công nợ", accessorKey: "settlementDocument", Cell: ({ cell }) => <Center><MyButtonViewPDF /></Center> },
        { header: "Ghi chú", accessorKey: "note" },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "paymentCode", header: "Mã đề nghị thanh toán" },
            { fieldName: "paymentName", header: "Tên đề nghị thanh toán" },
            { fieldName: "paymentObject", header: "Đối tượng thanh toán" },
            { fieldName: "paymentAmountInitial", header: "Tổng số tiền đề nghị ban đầu" },
            { fieldName: "approvalDecisionCode", header: "Mã quyết định duyệt toán" },
            { fieldName: "approvalDecisionTitle", header: "Tên/Tiêu đề quyết định duyệt toán" },
            { fieldName: "settlementDate", header: "Ngày quyết định/ Ngày ký duyệt" },
            { fieldName: "approver", header: "Người/ Đơn vị ra quyết định" },
            { fieldName: "paymentAmountSettled", header: "Tổng số tiền đã quyết toán" },
            { fieldName: "settlementProcess", header: "Tóm tắt quyết định cuối cùng" },
            { fieldName: "settlementDocument", header: "Tài liệu kiểm tra/duyệt & xác nhận công nợ" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };

    if (query.isLoading) return "Loading...";
    if (query.isError) return 'Không có dữ liệu...';

    return (
        <MyFieldset title={"Danh sách đề nghị quyết toán"}>
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Group>
                            <ExpenseSettlementCreate />
                            <AQButtonCreateByImportFile
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                objectName="dsExpenseSettlement"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButton crudType="delete" onSubmit={() => { }} > Xoá </MyButton>
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <Update_expenseSettlement data={row.original} />
                            <Delete_expenseSettlement paymentCode={row.original.paymentCode} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: IExpenseSettlement[] = [
    {
        paymentCode: "DNTT-BKDH-001",
        paymentName: "Đề nghị thanh toán thù lao biên soạn CTĐT Khoa học Dữ liệu",
        paymentObject: "Ban Biên soạn CTĐT Khoa học Dữ liệu",
        paymentAmountInitial: "5.000.000 VND",
        approvalDecisionCode: "QĐKT/2025/001",
        approvalDecisionTitle: "Quyết định quyết toán kinh phí CTĐT KHDL",
        settlementDate: "2025-05-27",
        approver: "Hiệu trưởng",
        paymentAmountSettled: "15.000.000 VND",
        settlementProcess: "Đã quyết toán hoàn tất",
        settlementDocument: "Xem file",
        note: ""
    },
    {
        paymentCode: "DNTT-LG-002",
        paymentName: "Đề nghị thanh toán thù lao thẩm định CTĐT ngành Logistics",
        paymentObject: "Hội đồng Thẩm định CTĐT ngành Logistics",
        paymentAmountInitial: "7.000.000 VND",
        approvalDecisionCode: "BCQT-PĐT/2025/002",
        approvalDecisionTitle: "Báo cáo quyết toán thù lao thẩm định Logistics",
        settlementDate: "2025-06-25",
        approver: "Phòng kế toán",
        paymentAmountSettled: "25.000.000 VND",
        settlementProcess: "Đã quyết toán một phần",
        settlementDocument: "Xem file",
        note: "Số tiền chênh lệch 1.000.000 VND đã được giải trình"
    },
    {
        paymentCode: "DNTT-BKDH-003",
        paymentName: "Đề nghị thanh toán thù lao biên soạn CTĐT Khoa học Dữ liệu",
        paymentObject: "Ban Biên soạn CTĐT Khoa học Dữ liệu",
        paymentAmountInitial: "9.000.000 VND",
        approvalDecisionCode: "QĐKT/2025/002",
        approvalDecisionTitle: "Quyết định quyết toán kinh phí biên soạn ĐCCTHP THDC",
        settlementDate: "2025-07-01",
        approver: "Trưởng phòng đào tạo",
        paymentAmountSettled: "28.000.000 VND",
        settlementProcess: "Đã quyết toán hoàn tất",
        settlementDocument: "Xem file",
        note: ""
    }
];