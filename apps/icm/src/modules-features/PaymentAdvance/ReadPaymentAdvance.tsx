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
import PaymentAdvanceCreate from './CreatePaymentAdvance';
import PaymentAdvanceUpdate from './UpdatePaymentAdvance';
import PaymentAdvanceDelete from './DeletePaymentAdvance';

export interface I_PaymentAdvance {
    id?: number;
    code?: string;
    name?: string;
    object?: string;
    date?: string;
    price?: string;
    status?: string;
    notes?: string;
    file?: string;
}

export default function PaymentAdvanceTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const query = useQuery<I_PaymentAdvance[]>({
        queryKey: ['PaymentAdvance'],
        queryFn: async () => mockData,
    });

    const columns = useMemo<MRT_ColumnDef<I_PaymentAdvance>[]>(() => [
        { header: 'Mã Đề nghị thanh toán', accessorKey: 'code' },
        { header: 'Tên đề nghị', accessorKey: 'name' },
        { header: 'Đối tượng thanh toán', accessorKey: 'object' },
        { header: 'Ngày thành lập đề nghị', accessorKey: 'date' },
        { header: 'Tổng số tiền đề nghị thanh toán (VND)', accessorKey: 'price' },
        { header: 'Trạng thái đề nghị', accessorKey: 'status' },
        { header: 'Ghi chú của người lập đề nghị', accessorKey: 'notes' },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: 'code', header: 'Mã Đề nghị thanh toán' },
            { fieldName: 'name', header: 'Tên đề nghị' },
            { fieldName: 'object', header: 'Đối tượng thanh toán' },
            { fieldName: 'date', header: 'Ngày thành lập đề nghị' },
            { fieldName: 'price', header: 'Tổng số tiền đề nghị thanh toán (VND)' },
            { fieldName: 'status', header: 'Trạng thái đề nghị' },
            { fieldName: 'notes', header: 'Ghi chú của người lập đề nghị' },
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
                            <PaymentAdvanceCreate />
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
                            <MyButton crudType="delete" onSubmit={() => { }} >Xóa</MyButton>
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <PaymentAdvanceUpdate values={row.original} />
                            <PaymentAdvanceDelete id={row.original.id || 0} code={row.original.code || ''} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: I_PaymentAdvance[] = [
    {
        id: 1,
        code: 'DNTT2025001',
        name: 'Thanh toán thù lao biên soạn giáo trình nguyên lý kế toán ',
        object: 'Ban Biên soạn GT nguyên lý kế toán',
        date: '2025-12-05',
        price: '12000000',
        status: 'Đang chờ duyệt',
        notes: 'Đề nghị thanh toán cho toàn bộ quá trình biên soạn',
    },
    {
       id: 2,
        code: 'DNTT2025002',
        name: 'Thanh toán thù lao Thẩm định GT dược lý học',
        object: 'Hội đồng thẩm định GT dược lý học',
        date: '2025-12-10',
        price: '50000000',
        status: 'Đã duyệt',
        notes: 'Đã kiểm tra sỹ hồ sơ kèm theo',
    },
    {
        id: 3,
        code: 'DNTT2025003',
        name: 'Chi phí tổ chức họp hội đồng thẩm định GT phân tích dữ liệu',
        object: 'Hội đồng thẩm định GT phân tích dữ liệu',
        date: '2025-12-12',
        price: '15000000',
        status: 'Đang chờ duyệt',
        notes: 'Đang chờ bổ sung hóa đơn ăn uống',
    },
];
