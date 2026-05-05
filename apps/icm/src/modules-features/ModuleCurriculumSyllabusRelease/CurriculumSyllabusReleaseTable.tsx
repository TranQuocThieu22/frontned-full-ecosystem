'use client';
import { Center, Group, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AQButtonExportData, MyDataTable, MyFieldset, MyFlexColumn } from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import MyButtonViewPDF from '@/components/Buttons/ButtonViewPDF/MyButtonViewPDF';
import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import CurriculumSyllabusReleaseDelete from './CurriculumSyllabusReleaseDelete';
import CurriculumSyllabusReleaseUpdate from './CurriculumSyllabusReleaseUpdate';
import { utils_date } from "aq-fe-framework/utils-v2"


export enum EnumDocumentStatus {
    InEffect = 1,    // Đang có hiệu lực
    Replaced = 2,    // Đã bị thay thế
    Expired = 3      // Hết hiệu lực
}

export const DocumentStatusLabel: Record<EnumDocumentStatus, string> = {
    [EnumDocumentStatus.InEffect]: "Đang có hiệu lực",
    [EnumDocumentStatus.Replaced]: "Đã bị thay thế",
    [EnumDocumentStatus.Expired]: "Hết hiệu lực"
}

export interface I_DocumentIssuance {
    id?: number;
    code?: string;                 // Mã số Văn bản Ban hành
    name?: string;                 // Tên Văn bản Ban hành
    issuedDate?: string;          // Ngày Ban hành
    effectiveDate?: string;       // Ngày có hiệu lực
    applicableDocumentName?: string;     // Tài liệu CTĐT/ĐCCTHP áp dụng
    applicableDocumentVersion?: string;  // Phiên bản CTĐT/ĐCCTHP áp dụng
    fileLink?: string;            // File Văn bản Ban hành
    status?: number;              // Trạng thái Văn bản
    note?: string;                // Ghi chú
}

export default function CurriculumSyllabusReleaseTable() {

    const query = useQuery<I_DocumentIssuance[]>({
        queryKey: ['CurriculumSyllabusRelease'],
        queryFn: async () => mockData,
    });

    const columns = useMemo<MRT_ColumnDef<I_DocumentIssuance>[]>(() => [
        {
            header: 'Mã số Văn bản Ban hành',
            accessorKey: 'code',
        },
        {
            header: 'Tên Văn bản Ban hành',
            accessorKey: 'name',
        },
        {
            header: 'Ngày Ban hành',
            accessorKey: 'issuedDate',
            accessorFn: (row) => row.issuedDate ? utils_date.toDDMMYYYY(new Date(row.issuedDate)) : ""
        },
        {
            header: 'Ngày có hiệu lực',
            accessorKey: 'effectiveDate',
            accessorFn: (row) => row.effectiveDate ? utils_date.toDDMMYYYY(new Date(row.effectiveDate)) : ""
        },
        {
            header: 'Tài liệu CTĐT/ĐCCTHP áp dụng',
            accessorKey: 'applicableDocumentName',
        },
        {
            header: 'Phiên bản CTĐT/ĐCCTHP áp dụng',
            accessorKey: 'applicableDocumentVersion',
        },
        {
            header: 'File Văn bản Ban hành',
            accessorKey: 'fileLink',
                        size: 400,
            accessorFn: row => row.fileLink && row.fileLink.length > 0 ?
                (
                            <Text>{row.fileLink}</Text>
                ) : <></>
        },
        {
            header: 'Trạng thái Văn bản',
            accessorKey: 'status',
            Cell: ({ cell }) =>
                DocumentStatusLabel[cell.getValue() as EnumDocumentStatus]
            ,
        },
        {
            header: 'Ghi chú',
            accessorKey: 'note',
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: 'code', header: 'Mã số Văn bản Ban hành' },
            { fieldName: 'name', header: 'Tên Văn bản Ban hành' },
            { fieldName: 'issuedDate', header: 'Ngày Ban hành' },
            { fieldName: 'effectiveDate', header: 'Ngày có hiệu lực' },
            { fieldName: 'applicableDocumentName', header: 'Tài liệu CTĐT/ĐCCTHP áp dụng' },
            { fieldName: 'applicableDocumentVersion', header: 'Phiên bản CTĐT/ĐCCTHP áp dụng' },
            { fieldName: 'fileLink', header: 'File Văn bản Ban hành' },
            { fieldName: 'status', header: 'Trạng thái Văn bản' },
            { fieldName: 'note', header: 'Ghi chú' },
        ],
    };

    if (query.isLoading) return <div>Loading...</div>;
    if (query.isError) return <div>Không có dữ liệu...</div>;

    return (
        <MyFieldset title="Danh sách ban hành">
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={false}
                    enableRowNumbers={false}
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            {/* <AQButtonExportData
                                isAllData={true}
                                objectName="CurriculumSyllabusRelease"
                                data={query.data!}
                                exportConfig={exportConfig}
                            /> */}
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <CurriculumSyllabusReleaseUpdate rowData={row.original} queryData={query.data || []} />
                            <CurriculumSyllabusReleaseDelete id={row.original.id || 0} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: I_DocumentIssuance[] = [
    {
        code: 'QD/DHTM/2025/123',
        name: 'Quyết định Ban hành CTĐT ngành Khoa học Dữ liệu',
        issuedDate: '2025-06-25',
        effectiveDate: '2025-09-01',
        applicableDocumentName: 'Chương trình đào tạo ngành Khoa học Dữ liệu',
        applicableDocumentVersion: 'Phiên bản 1.0 (2025)',
        fileLink: 'QD-KH-DL-2025-final.pdf',
        status: 1,
    },
    {
        code: 'CV-PĐT/2025-045',
        name: 'Công văn Về việc Cập nhật ĐCCTHP môn Quản trị Chuỗi cung ứng',
        issuedDate: '2025-06-20',
        effectiveDate: '2025-08-15',
        applicableDocumentName: 'Đề cương chi tiết học phần môn Quản trị Chuỗi cung ứng',
        applicableDocumentVersion: 'Phiên bản 3.2 (2025)',
        fileLink: 'CV-DCHT-QTCCU-001.pdf',
        status: 1,
    },
    {
        code: 'QD/DHTM/2020/001',
        name: 'Quyết định Ban hành CTĐT ngành Kế toán',
        issuedDate: '2020-01-01',
        effectiveDate: '2020-09-01',
        applicableDocumentName: 'Chương trình đào tạo ngành Kế toán',
        applicableDocumentVersion: 'Phiên bản 1.0 (2020)',
        fileLink: 'QD-KT-2020-final.pdf',
        status: 2,
        note: 'Đã được thay thế bởi QD/DHTM/2025/124',
    }
];
