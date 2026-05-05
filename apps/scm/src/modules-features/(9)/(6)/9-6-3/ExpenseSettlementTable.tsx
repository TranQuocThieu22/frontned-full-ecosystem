import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, AQButtonExportData, MyButton, MyCenterFull, MyDataTable, MyFieldset, MyNumberFormatter } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ExpenseSettlementCreateButton from "./ExpenseSettlementCreateButton";
import ExpenseSettlementDeleteButton from "./ExpenseSettlementDeleteButton";
import ExpenseSettlementUpdateButton from "./ExpenseSettlementUpdateButton";

export interface I_ExpenseSettlement {
    code?: string //Mã quyết định quyết toán
    name?: string //Tên quyết định quyết toán
    date?: string //Ngày quyết định quyết toán
    settledBy?: string //Người quyết định quyết toán
    settlementAmount?: number //Số tiền quyết toán
    description?: string //Mô tả quyết định quyết toán
    fileAttachment?: string //File đính kèm quyết định quyết toán
    note?: string //Ghi chú quyết định quyết toán
}

export default function ExpenseSettlementTable() {
    const form_multiple = useForm({
        initialValues: {}
    });

    const query = useQuery<I_ExpenseSettlement[]>({
        queryKey: ['F9_6_3ReadExpenseSettlement'],
        queryFn: () => {
            return mockData ?? [];
        }
    });

    const columns = useMemo<MRT_ColumnDef<I_ExpenseSettlement>[]>(
        () => [
            {
                header: "Mã quyết định quyết toán",
                accessorKey: "code",
            },
            {
                header: "Tên/Tiêu đề quyết định quyết toán",
                accessorKey: "name",
            },
            {
                header: "Ngày quyết định/ Ngày ký duyệt",
                accessorKey: "date",
                accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.date || "")),
            },
            {
                header: "Người/Đơn vị ra quyết định",
                accessorKey: "settledBy",
            },
            {
                header: "Tổng số tiền đã quyết toán (VND)",
                accessorKey: "settlementAmount",
                accessorFn: row => <MyNumberFormatter value={row.settlementAmount} />,
            },
            {
                header: "Tóm tắt quyết định cuối cùng",
                accessorKey: "description",
            },
            {
                header: "Tài liệu đính kèm (Quyết định, Chứng từ)",
                accessorKey: "fileAttachment",
                size: 230,
                Cell: ({ cell }) => (
                    <Text>{cell.getValue()?.toString()}</Text>
                )
            },
            {
                header: "Ghi chú",
                accessorKey: "note",
            },
        ],
        []
    );

        const exportConfig = {
        fields: [
            { fieldName: 'code', header: 'Mã đề nghị thanh toán' },
            { fieldName: 'name', header: 'Tên đề nghị thanh toán' },
            { fieldName: 'date', header: 'Ngày quyết định/ Ngày ký duyệt'},
            { fieldName: 'settledBy', header: 'Người/Đơn vị ra quyết định' },
            { fieldName: 'settlementAmount', header: 'Tổng số tiền quyết toán (VND)' },
            { fieldName: 'description', header: 'Mô tả quyết định quyết toán' },
            { fieldName: 'fileAttachment', header: 'File đính kèm quyết định quyết toán' },
            { fieldName: 'note', header: 'Ghi chú ' },
        ],
    };

    if (query.isLoading) return "Đang tải dữ liệu...";
    if (query.isError) return "Lỗi đã xảy ra";

    return (
        <MyFieldset title="Danh sách đề nghị thanh toán">
            <MyDataTable
                data={query.data || []}
                columns={columns}
                enableRowSelection={true}
                enableRowNumbers={false}
                renderTopToolbarCustomActions={() => (
                    <MyCenterFull>
                        <ExpenseSettlementCreateButton />
                        <AQButtonCreateByImportFile
                            form={form_multiple}
                            onSubmit={() => console.log(form_multiple.values)}
                        >
                            Import
                        </AQButtonCreateByImportFile>
                        <AQButtonExportData
                            
                            objectName="paymentProposal"
                            data={query.data!}
                            exportConfig={exportConfig}
                        />
                        <MyButton crudType="delete">Delete</MyButton>
                    </MyCenterFull>
                )}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <ExpenseSettlementUpdateButton data={row.original} />
                        <ExpenseSettlementDeleteButton settlementCode={row.original.code || ""} />
                    </MyCenterFull>
                )}
            >
            </MyDataTable>
        </MyFieldset>
    )
}

const mockData: I_ExpenseSettlement[] = [
    {
        code: "QTTT2025001",
        name: "Quyết định Quyết toán kinh phí biên soạn GT Nguyên lý Kế toán",
        date: "2025-12-25T08:00:00.000Z",
        settledBy: "Trưởng phòng Kế hoạch- Tài chính",
        settlementAmount: 120000000,
        description: "Đã quyết toàn bộ kinh phí theo các đề nghị thanh toán đã duyệt",
        note: "Không có",
        fileAttachment: "QuyetDinhQuyetToan_GT001.pdf",
    },
    {
        code: "QTTT2025002",
        name: "Quyết định Quyết toán kinh phí thẩm định GT Dược lý học",
        date: "2026-01-05T08:00:00.000Z",
        settledBy: "Kế Toán trưởng",
        settlementAmount: 50000000,
        description: "Hoàn tất quyết toán chi phí thẩm định GT Dược lý học",
        note: "Đã bao gồm phí đi lại",
        fileAttachment: "QuyetDinhQuyetToan_GT004.pdf",
    },
    {
        code: "QTTT2025003",
        name: "Quyết định Quyết toán kinh phí tổ chức Hội đồng thẩm định",
        date: "2026-01-10T08:00:00.000Z",
        settledBy: "Trưởng phòng QLKH",
        settlementAmount: 15000000,
        description: "Quyết toán chi phí tổ chức Hội đồng ",
        note: "Chờ xác nhận cuối cùng từ Bộ phận mua sắm",
        fileAttachment: "QuyetDinhQuyetToan_HDTD002.pdf",
    },
]