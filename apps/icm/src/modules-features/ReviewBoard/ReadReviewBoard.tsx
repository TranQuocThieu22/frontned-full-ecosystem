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
import ReviewBoardUpdate from './UpdateReviewBoard';
import ReviewBoardDelete from './DeleteReviewBoard';
import ReviewBoardCreate from './CreateReviewBoard';

export interface I_ReviewBoard {
    id?: number;
    code?: string;
    name?: string;
    meetingdate?: string;
    meetingTime?: string;
    meetingLocation?: string;
    ceo?: string;
    secretary?: string;
    listCommissioner?: string;
    codepropose?: string;
    status?: string;
    createDate?: string;
    creator?: string;
    file?: string;
}

export default function ReviewBoardTable() {
    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });
    const query = useQuery<I_ReviewBoard[]>({
        queryKey: ['ReviewBoard'],
        queryFn: async () => mockData,
    });

    const columns = useMemo<MRT_ColumnDef<I_ReviewBoard>[]>(() => [
        { header: 'Mã hội đồng', accessorKey: 'code' },
        { header: 'Tên hội đồng', accessorKey: 'name' },
        { header: 'Ngày họp', accessorKey: 'meetingdate' },
        { header: 'Thời gian họp', accessorKey: 'meetingTime' },
        { header: 'Địa điểm họp', accessorKey: 'meetingLocation' },
        { header: 'Chủ tịch hội đồng', accessorKey: 'ceo' },
        { header: 'Thư kí hội đồng', accessorKey: 'secretary' },
        { header: 'Danh sách ủy viên ban hội đồng', accessorKey: 'listCommissioner' },
        { header: 'Các mã đề xuất được xét duyệt', accessorKey: 'codepropose' },
        { header: 'Trạng thái hội đồng', accessorKey: 'status' },
        { header: 'Ngày tạo hội đồng', accessorKey: 'createDate' },
        { header: 'Người tạo hội đồng', accessorKey: 'creator' },
        {
            header: 'File đính kèm',
            accessorKey: 'attachmentFile',
            Cell: ({ cell }) => (
                <Center>
                    <MyButtonViewPDF />
                </Center>
            ),
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: 'code', header: 'Mã hội đồng' },
            { fieldName: 'name', header: 'Tên hội đồng' },
            { fieldName: 'meetingdate', header: 'Ngày họp' },
            { fieldName: 'meetingTime', header: 'Thời gian họp' },
            { fieldName: 'meetingLocation', header: 'Địa điểm họp' },
            { fieldName: 'ceo', header: 'Chủ tịch hội đồng' },
            { fieldName: 'secretary', header: 'Thư kí hội đồng' },
            { fieldName: 'listCommissioner', header: 'Danh sách ủy viên ban hội đồng' },
            { fieldName: 'codepropose', header: 'Các mã đề xuất được xét duyệt' },
            { fieldName: 'status', header: 'Trạng thái hội đồng' },
            { fieldName: 'createDate', header: 'Ngày tạo hội đồng' },
            { fieldName: 'creator', header: 'Người tạo hội đồng' },
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
                            <ReviewBoardCreate />
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
                            <MyButton crudType="delete" onSubmit={() => { }} />
                        </Group>
                    )}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <ReviewBoardUpdate values={row.original}/>
                            <ReviewBoardDelete id={row.original.id || 0} code={row.original.code || ''} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: I_ReviewBoard[] = [
    {
        id: 1,
        code: 'HDGT2025001',
        name: 'hội đồng xét duyệt DXGT khoa CNTT 2025',
        meetingdate: '2025-07-15',
        meetingTime: '09:00 - 11:00',
        meetingLocation: 'Phòng họp A201',
        ceo: 'GS.Lên Văn X (GV.10001)',
        secretary: 'ThS. Nguyễn Thị Y (NV,QKKH01)',
        listCommissioner: '"ts.Phạm A (GV.20002); TS.Hoàng B (GV.30003)"',
        codepropose: 'GT2025001,GT2025002',
        status: 'Đã thành lập; Đang chờ họp',
        createDate: '2025-07-01',
        creator: 'Nguyễn Thị Y (NV.QLKH01)',
        file: 'Xem file',
    },
    {
        id: 2,
        code: 'HDGT2025002',
        name: 'hội đồng xét duyệt DXGT khoa Kinh tế 2025',
        meetingdate: '2025-07-18',
        meetingTime: '14:00 - 16:00',
        meetingLocation: 'phòng họp B305',
        ceo: 'PGS. Trần Văn Z(GV.40004)',
        secretary: 'ThS. Nguyễn Thị W(NVQLKH01)',
        listCommissioner: '"ts.Phan C (GV.50005); PGS.Trịnh D (GV.60006)"',
        codepropose: 'GT2025003,GT2025004',
        status: 'Đã thành lập; Đang chờ họp',
        createDate: '2025-07-02',
        creator: 'Đỗ thị W (NV.QLKH002)',
        file: 'Xem file',
    },
];
