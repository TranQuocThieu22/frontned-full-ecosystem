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
import PaymentRequestDelete from './PaymentRequestDelete';
import PaymentRequestUpdate from './PaymentRequestUpdate';
import PaymentRequestCreate from './PaymentRequestCreate';

export interface I_PaymentProposal {
    id?: number;
    code?: string;                     // Mã đề nghị thanh toán
    name?: string;                     // Tên đề nghị
    target?: string;                   // Đối tượng thanh toán
    createdDate?: string;             // Ngày lập đề nghị
    paymentDetail?: string;           // Danh sách cá nhân và chi tiết thù lao
    totalAmount?: number;             // Tổng số tiền đề nghị thanh toán
    attachmentFile?: string;          // Tài liệu/Minh chứng đính kèm
    status?: string;                  // Trạng thái đề nghị
    note?: string;                    // Ghi chú của người lập đề nghị
}

export default function PaymentRequestProposalTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const query = useQuery<I_PaymentProposal[]>({
        queryKey: ['PaymentProposal'],
        queryFn: async () => mockData,
    });

    const columns = useMemo<MRT_ColumnDef<I_PaymentProposal>[]>(() => [
        { header: 'Mã đề nghị thanh toán', accessorKey: 'code' },
        { header: 'Tên đề nghị thanh toán', accessorKey: 'name' },
        { header: 'Đối tượng thanh toán', accessorKey: 'target' },
        { header: 'Ngày lập đề nghị', accessorKey: 'createdDate' },
        { header: 'Danh sách cá nhân và chi tiết thù lao', accessorKey: 'paymentDetail' },
        {
            header: 'Tổng số tiền đề nghị thanh toán', accessorKey: 'totalAmount',
            Cell: ({ cell }) => {
                const value = cell.getValue<number>();
                const formatted = new Intl.NumberFormat('vi-VN').format(value);
                return <span>{formatted}</span>;
            },
        },
        {
            header: 'Tài liệu/Minh chứng đính kèm',
            accessorKey: 'attachmentFile',
            Cell: ({ cell }) => (
                <Center>
                    <MyButtonViewPDF />
                </Center>
            ),
        },
        { header: 'Trạng thái đề nghị', accessorKey: 'status' },
        { header: 'Ghi chú của người lập đề nghị', accessorKey: 'note' },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: 'code', header: 'Mã đề nghị thanh toán' },
            { fieldName: 'name', header: 'Tên đề nghị' },
            { fieldName: 'target', header: 'Đối tượng thanh toán' },
            { fieldName: 'createdDate', header: 'Ngày lập đề nghị' },
            { fieldName: 'paymentDetail', header: 'Danh sách cá nhân và chi tiết thù lao' },
            { fieldName: 'totalAmount', header: 'Tổng số tiền đề nghị thanh toán' },
            { fieldName: 'attachmentFile', header: 'Tài liệu/Minh chứng đính kèm' },
            { fieldName: 'status', header: 'Trạng thái đề nghị' },
            { fieldName: 'note', header: 'Ghi chú của người lập đề nghị' },
        ],
    };

    if (query.isLoading) return <div>Loading...</div>;
    if (query.isError) return <div>Không có dữ liệu...</div>;

    return (
        <MyFieldset title="Danh sách đề nghị thanh toán">
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            <PaymentRequestCreate />
                            <AQButtonCreateByImportFile
                                form={form_multiple}
                                onSubmit={() => console.log(form_multiple.values)}
                            >
                                Import
                            </AQButtonCreateByImportFile>
                            {/* <AQButtonExportData
                                isAllData={true}
                                objectName="paymentProposal"
                                data={query.data!}
                                exportConfig={exportConfig}
                            /> */}
                            <MyButton crudType="delete" onSubmit={() => { }}>Xóa</MyButton>
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <PaymentRequestUpdate data={row.original} />
                            <PaymentRequestDelete id={row.original.id || 0} code={row.original.code || ''} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: I_PaymentProposal[] = [
    {
        code: 'DNTT-BBKH-001',
        name: 'Đề nghị thanh toán thù lao biên soạn CTĐT Khoa học Dữ liệu',
        target: 'Ban Biên soạn CTĐT ngành Khoa học Dữ liệu',
        createdDate: '2025-06-27',
        paymentDetail: 'TS. Nguyễn Văn A: Trưởng ban: 2.500.000 VND; ThS. Lê Thị B: 1.800.000 VND',
        totalAmount: 25500000,
        attachmentFile: 'file-kh01.pdf',
        status: 'Nháp',
        note: '',
    },
    {
        code: 'DNTT-HDLĐ-002',
        name: 'Đề nghị thanh toán thù lao thẩm định CTĐT ngành Logistics',
        target: 'Hội đồng Thẩm định CTĐT ngành Logistics',
        createdDate: '2025-06-25',
        paymentDetail: 'PGS.TS. Trần Văn C: 3.000.000 VND; TS. Hoàng Thị D: 2.000.000 VND',
        totalAmount: 15000000,
        attachmentFile: 'file-logistics.pdf',
        status: 'Chờ Trưởng phòng duyệt',
        note: 'Đã kiểm tra định mức thù lao theo vai trò.',
    },
    {
        code: 'DNTT-BBTP-003',
        name: 'Đề nghị thanh toán thù lao biên soạn DCCTHP Tin học đại cương',
        target: 'Ban Biên soạn DCCTHP Tin học đại cương',
        createdDate: '2025-06-10',
        paymentDetail: 'ThS. E: 1.500.000 VND; ThS. F: 1.000.000 VND',
        totalAmount: 2500000,
        attachmentFile: 'file-tinhoc.pdf',
        status: 'Đã phê duyệt',
        note: 'Đã chuyển Phòng Kế toán xử lý.',
    },
];
