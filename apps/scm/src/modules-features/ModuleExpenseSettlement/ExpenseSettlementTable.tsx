'use client';

import { Center, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import {
    AQButtonCreateByImportFile,
    AQButtonExportData,
    MyButton,
    MyDataTable,
    MyFieldset,
    MyFlexColumn,
} from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import MyButtonViewPDF from '@/components/Buttons/ButtonViewPDF/MyButtonViewPDF';
import ExpenseSettlementDelete from './ExpenseSettlementDelete';
import ExpenseSettlementCreate from './ExpenseSettlementCreate';
import ExpenseSettlementUpdate from './ExpenseSettlementUpdate';
import { U0DateToDDMMYYYString } from '@/utils/date';

export interface I_PaymentSettlement {
    id?: number;
    code?: string;                  // Mã đề nghị thanh toán
    name?: string;                  // Tên đề nghị thanh toán
    target?: string;                // Đối tượng thanh toán
    totalInitialAmount?: number;   // Tổng số tiền đề nghị ban đầu
    decisionCode?: string;         // Mã quyết định quyết toán
    decisionName?: string;         // Tên/tiêu đề quyết định
    decisionDate?: string;         // Ngày quyết định/Ngày ký duyệt
    decisionBy?: string;           // Người/Đơn vị ra quyết định
    totalFinalAmount?: number;     // Tổng số tiền đã quyết toán
    decisionSummary?: string;      // Tóm tắt quyết định cuối cùng
    attachmentFile?: string;       // Tài liệu đính kèm
    note?: string;                 // Ghi chú
    modifiedBy?: number;
    modifiedAt?: string;
}

export default function PaymentSettlementTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const query = useQuery<I_PaymentSettlement[]>({
        queryKey: ['PaymentSettlement'],
        queryFn: async () => mockData,
    });

    const columns = useMemo<MRT_ColumnDef<I_PaymentSettlement>[]>(() => [
        { header: 'Mã đề nghị thanh toán', accessorKey: 'code' },
        { header: 'Tên đề nghị thanh toán', accessorKey: 'name' },
        { header: 'Đối tượng thanh toán', accessorKey: 'target' },
        {
            header: 'Tổng tiền đề nghị ban đầu', accessorKey: 'totalInitialAmount',
            Cell: ({ cell }) => <span>{new Intl.NumberFormat('vi-VN').format(cell.getValue<number>())}</span>
        },
        { header: 'Mã quyết định quyết toán', accessorKey: 'decisionCode' },
        { header: 'Tên/Tiêu đề quyết định quyết toán', accessorKey: 'decisionName' },
        { header: 'Ngày quyết định/Ngày ký duyệt', accessorKey: 'decisionDate', accessorFn: (row) => row.decisionDate ? U0DateToDDMMYYYString(new Date(row.decisionDate)) : "" },
        { header: 'Người/Đơn vị ra quyết định', accessorKey: 'decisionBy' },
        {
            header: 'Tổng số tiền đã quyết toán', accessorKey: 'totalFinalAmount',
            Cell: ({ cell }) => <span>{new Intl.NumberFormat('vi-VN').format(cell.getValue<number>())}</span>
        },
        { header: 'Tóm tắt quyết định cuối cùng', accessorKey: 'decisionSummary' },
        {
            header: 'Tài liệu đính kèm(Quyết định : Chứng từ)', accessorKey: 'attachmentFile',
            Cell: () => <Center><MyButtonViewPDF /></Center>
        },
        { header: 'Ghi chú', accessorKey: 'note' },
        {
            header: "Người cập nhật",
            accessorKey: "modifiedBy",
        },
        {
            header: "Ngày cập nhật",
            accessorKey: "modifiedAt",
            accessorFn: (row) =>
                row.modifiedAt ? U0DateToDDMMYYYString(new Date(row.modifiedAt)) : "",
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã đề nghị thanh toán" },
            { fieldName: "name", header: "Tên đề nghị thanh toán" },
            { fieldName: "target", header: "Đối tượng thanh toán" },
            { fieldName: "totalInitialAmount", header: "Tổng số tiền đề nghị ban đầu" },
            { fieldName: "decisionCode", header: "Mã quyết định quyết toán" },
            { fieldName: "decisionName", header: "Tên/tiêu đề quyết định" },
            { fieldName: "decisionDate", header: "Ngày quyết định/Ngày ký duyệt" },
            { fieldName: "decisionBy", header: "Người/Đơn vị ra quyết định" },
            { fieldName: "totalFinalAmount", header: "Tổng số tiền được quyết toán" },
            { fieldName: "decisionSummary", header: "Tóm tắt quyết định cuối cùng" },
            { fieldName: "attachmentFile", header: "Tài liệu đính kèm" },
            { fieldName: "note", header: "Ghi chú" },
        ],
    };

    if (query.isLoading) return <div>Loading...</div>;
    if (query.isError) return <div>Failed to load data...</div>;

    return (
        <MyFieldset title="Danh sách đề nghị thanh toán">
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={() => (
                        <MyCenterFull>
                            <ExpenseSettlementCreate />
                            <AQButtonCreateByImportFile
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            <AQButtonExportData
                                objectName="paymentSettlement"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                            <MyButton crudType="delete" onSubmit={() => { }} >Xóa</MyButton>
                        </MyCenterFull>
                    )}
                    columns={columns}
                    data={query.data || []}
                    initialState={{
                        columnPinning: { right: ['mrt-row-actions'] },
                        columnVisibility: {
                            modifiedBy: false,
                            modifiedAt: false,
                        }
                    }}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <ExpenseSettlementUpdate data={row.original} />
                            <ExpenseSettlementDelete id={row.original.id ?? 0} code={row.original.code ?? ""} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: I_PaymentSettlement[] = [
    {
        code: 'DNTT-BBKH-001',
        name: 'Đề nghị thanh toán thù lao biên soạn CTĐT Khoa học Dữ liệu',
        target: 'Ban Biên soạn CTĐT ngành Khoa học Dữ liệu',
        totalInitialAmount: 25500000,
        decisionCode: 'QDKT/2025/001',
        decisionName: 'Quyết định Quyết toán Kinh phí Biên soạn CTĐT KTDL',
        decisionDate: '2025-07-15',
        decisionBy: 'Hiệu trưởng',
        totalFinalAmount: 25500000,
        decisionSummary: '',
        attachmentFile: 'file-ktdl.pdf',
        note: '',
    },
    {
        code: 'DNTT-HDLĐ-002',
        name: 'Đề nghị thanh toán thù lao thẩm định CTĐT ngành Logistics',
        target: 'Hội đồng Thẩm định CTĐT ngành Logistics',
        totalInitialAmount: 15000000,
        decisionCode: 'QCDT-TPT/2025/005',
        decisionName: 'Báo cáo Quyết toán Thù lao Thẩm định Logistics',
        decisionDate: '2025-07-10',
        decisionBy: 'Phòng Kế toán',
        totalFinalAmount: 14000000,
        decisionSummary: 'Số tiền chênh lệch 1.000.000 VND đã được giải trình',
        attachmentFile: 'file-logistics.pdf',
        note: '',
    },
    {
        code: 'DNTT-BBTP-003',
        name: 'Đề nghị thanh toán thù lao biên soạn DCCTHP Tin học đại cương',
        target: 'Ban Biên soạn DCCTHP Tin học đại cương',
        totalInitialAmount: 2500000,
        decisionCode: 'QDKT/2025/002',
        decisionName: 'Quyết định Quyết toán Kinh phí Biên soạn DCCTHP THDC',
        decisionDate: '2025-06-20',
        decisionBy: 'Trưởng phòng Đào tạo',
        totalFinalAmount: 2500000,
        decisionSummary: '',
        attachmentFile: 'file-thdc.pdf',
        note: '',
    },
];
