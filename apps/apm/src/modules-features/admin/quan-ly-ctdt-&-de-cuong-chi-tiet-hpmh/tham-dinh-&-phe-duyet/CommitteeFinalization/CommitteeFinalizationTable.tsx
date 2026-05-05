'use client';

import MyButtonViewPDF from '@/components/Buttons/ButtonViewPDF/MyButtonViewPDF';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Center, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import {
    AQButtonExportData,
    MyCenterFull,
    MyDataTable,
    MyFieldset,
    MyFlexColumn,
} from 'aq-fe-framework/components';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import CommitteeFinalizationUpdate from './CommitteeFinalizationUpdate';

export enum TaskStatus {
    InProgress = 1,     // Đang thực hiện
    Submitted = 2       // Đã gửi bản hoàn thiện
}

export const TaskStatusLabel: Record<TaskStatus, string> = {
    [TaskStatus.InProgress]: "Đang thực hiện",
    [TaskStatus.Submitted]: "Đã gửi bản hoàn thiện",
};

export interface I_FinalizationTracking {
    code?: string;              // Mã nhiệm vụ cần hoàn thiện
    name?: string;              // Tên tài liệu cần hoàn thiện
    responsibleGroup?: string;  // Ban biên soạn phụ trách
    version?: string;           // Phiên bản hiện tại
    feedback?: string;          // Yêu cầu chỉnh sửa từ hội đồng
    requestDate?: string;       // Ngày nhận yêu cầu
    assignee?: string;          // Người phụ trách hoàn thiện
    completionDate?: string;    // Ngày hoàn thiện gần nhất
    progressPercent?: number;   // Tiến độ hoàn thiện (%)
    note?: string;              // Ghi chú / Giải trình
    fileLink?: string;          // Tài liệu đính kèm (link)
    status?: number;            // Trạng thái hoàn thiện
    modifiedBy?: number;        // Người cập nhật
    modifiedAt?: string;        // Ngày cập nhật
}

export default function CommitteeFinalizationTable() {

    const query = useQuery<I_FinalizationTracking[]>({
        queryKey: ['CommitteeFinalizationRead'],
        queryFn: async () => mockData,
    });

    const columns = useMemo<MRT_ColumnDef<I_FinalizationTracking>[]>(() => [
        { header: 'Mã nhiệm vụ cần hoàn thiện', accessorKey: 'code' },
        { header: 'Tên tài liệu cần hoàn thiện', accessorKey: 'name' },
        { header: 'Ban biên soạn phụ trách', accessorKey: 'responsibleGroup' },
        { header: 'Phiên bản hiện tại', accessorKey: 'version' },
        { header: 'Yêu cầu chỉnh sửa chi tiết từ Hội đồng', accessorKey: 'feedback' },
        {
            header: 'Ngày nhận yêu cầu', accessorKey: 'requestDate',
            accessorFn: row => row.requestDate ? U0DateToDDMMYYYString(new Date(row.requestDate)) : ''
        },
        { header: 'Người phụ trách hoàn thiện', accessorKey: 'assignee' },
        {
            header: 'Ngày hoàn thiện gần nhất',
            accessorKey: 'completionDate',
            accessorFn: row => row.completionDate ? U0DateToDDMMYYYString(new Date(row.completionDate)) : ''
        },
        { header: 'Tiến độ hoàn thiện (%)', accessorKey: 'progressPercent' },
        { header: 'Ghi chú / Giải trình', accessorKey: 'note' },
        {
            header: 'Tài liệu đính kèm',
            accessorKey: 'fileLink',
            accessorFn: row => row.fileLink && row.fileLink.length > 0 ?
                (<Center>
                    <MyButtonViewPDF />
                </Center>
                ) : <></>
        },
        {
            header: 'Trạng thái hoàn thiện',
            accessorKey: 'status',
            accessorFn: row => row.status ? TaskStatusLabel[row.status as TaskStatus] : ''
        },
        { header: 'Người cập nhật', accessorKey: 'modifiedBy' },
        { header: 'Ngày cập nhật', accessorKey: 'modifiedAt' },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: 'code', header: 'Mã nhiệm vụ cần hoàn thiện' },
            { fieldName: 'name', header: 'Tên tài liệu cần hoàn thiện' },
            { fieldName: 'responsibleGroup', header: 'Ban biên soạn phụ trách' },
            { fieldName: 'version', header: 'Phiên bản hiện tại' },
            { fieldName: 'feedback', header: 'Yêu cầu chỉnh sửa chi tiết từ Hội đồng' },
            { fieldName: 'requestDate', header: 'Ngày nhận yêu cầu' },
            { fieldName: 'assignee', header: 'Người phụ trách hoàn thiện' },
            { fieldName: 'completionDate', header: 'Ngày hoàn thiện gần nhất' },
            { fieldName: 'progressPercent', header: 'Tiến độ hoàn thiện (%)' },
            { fieldName: 'note', header: 'Ghi chú / Giải trình' },
            { fieldName: 'fileLink', header: 'Tài liệu đính kèm' },
            { fieldName: 'status', header: 'Trạng thái hoàn thiện' },
            { fieldName: 'modifiedBy', header: 'Người cập nhật' },
            { fieldName: 'modifiedAt', header: 'Ngày cập nhật' },
        ]
    };

    if (query.isLoading) return <div>Loading...</div>;
    if (query.isError) return <div>Không có dữ liệu...</div>;

    return (
        <MyFieldset title="Danh sách nội dung biên soạn">
            <MyFlexColumn>
                <MyDataTable
                    enableRowSelection={true}
                    enableRowNumbers={false}
                    columns={columns}
                    data={query.data || []}
                    initialState={{
                        columnVisibility: {
                            modifiedBy: false,
                            modifiedAt: false,
                        }
                    }}
                    renderTopToolbarCustomActions={() => (
                        <Group>
                            <AQButtonExportData
                                objectName="committeeFinalization"
                                data={query.data!}
                                exportConfig={exportConfig}
                            />
                        </Group>
                    )}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <CommitteeFinalizationUpdate data={row.original} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

const mockData: I_FinalizationTracking[] = [
    {
        code: "HTCTDT-LG-001",
        name: "Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        responsibleGroup: "BBCTDT-LG-001",
        version: "V1.2",
        feedback: "Bổ sung 2 môn học tự chọn mới...",
        requestDate: "2025-12-02",
        assignee: "TS. Nguyễn Văn C",
        completionDate: "2026-01-15",
        progressPercent: 90,
        note: "Đã bổ sung đầy đủ...",
        fileLink: "link-1.pdf",
        status: TaskStatus.InProgress,
        modifiedBy: 1,
        modifiedAt: "2025-12-25"
    },
    {
        code: "HTDCHP-QTKD-002",
        name: "Đề cương chi tiết học phần Quản trị chiến lược",
        responsibleGroup: "BBDCHP-QTKD-002",
        version: "V2.1",
        feedback: "Không có yêu cầu chỉnh sửa: Đã phê duyệt hoàn toàn.",
        requestDate: "2025-12-06",
        assignee: "ThS. Phạm Thị E",
        completionDate: "2025-12-06",
        progressPercent: 100,
        note: "Không có chỉnh sửa cần thiết",
        fileLink: "link-2.pdf",
        status: TaskStatus.Submitted,
        modifiedBy: 2,
        modifiedAt: "2025-12-26"
    },
    {
        code: "HTCTDT-NN-003",
        name: "Chương trình đào tạo ngành Ngôn ngữ Anh",
        responsibleGroup: "BBCTDT-NN-004",
        version: "V1.0",
        feedback: "Yêu cầu thêm 1 môn học mới...",
        requestDate: "2025-12-11",
        assignee: "PGS. Đinh Thị L",
        completionDate: "2026-01-10",
        progressPercent: 70,
        note: "Đã thêm môn học mới",
        fileLink: "link-3.pdf",
        status: TaskStatus.InProgress,
        modifiedBy: 3,
        modifiedAt: "2025-12-28"
    }
];
