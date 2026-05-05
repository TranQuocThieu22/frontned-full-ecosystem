'use client'
import { useQuery } from "@tanstack/react-query";
import {
    MyButtonViewPDF,
    MyCenterFull,
    MyDataTable,
    MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CompletedAccordingToFeedbackButtonUpdate from "./CompletedAccordingToFeedbackButtonUpdate";


export interface UpdatedDraftProposal {
    draftCode: string;
    textbookTitle: string;
    chiefEditor: string;
    currentStatus: string;
    completionStatus: string;
    latestCompletionDate?: string;
    fileUrl?: string;
}


export default function CompletedAccordingToFeedbackRead() {

    const query = useQuery<UpdatedDraftProposal[]>({
        queryKey: ['UpdatedDraftProposals'],
        queryFn: async () => updatedDraftProposals
    });


    const columns = useMemo<MRT_ColumnDef<UpdatedDraftProposal>[]>(() => [
        {
            accessorKey: 'draftCode',
            header: 'Mã Bản thảo',
        },
        {
            accessorKey: 'textbookTitle',
            header: 'Tên Giáo trình Đề xuất',
        },
        {
            accessorKey: 'chiefEditor',
            header: 'Chủ biên Ban Biên soạn',
        },
        {
            accessorKey: 'currentStatus',
            header: 'Trạng thái Bản thảo hiện tại',
        },
        {
            accessorKey: 'completionStatus',
            header: 'Tình trạng Hoàn thiện',
        },
        {
            accessorKey: 'latestCompletionDate',
            header: 'Ngày Hoàn thiện gần nhất',
        },
        {
            accessorKey: 'fileUrl',
            header: 'File Bản thảo đã cập nhật',
            accessorFn: () => <MyButtonViewPDF />
        },
    ], []);


    return (
        <MyFieldset title="Danh sách nhiệm vụ hoàn thiện">
            <MyDataTable
                isError={query.isError}
                isLoading={query.isLoading}
                columns={columns}
                data={query.data || []}
                exportAble
                enableRowSelection
                enableRowNumbers={false}
                renderRowActions={({ row }) => (
                    <MyCenterFull>
                        <CompletedAccordingToFeedbackButtonUpdate values={row.original} />
                    </MyCenterFull>
                )}
            />
        </MyFieldset>
    );
}



export const updatedDraftProposals: UpdatedDraftProposal[] = [
    {
        draftCode: 'BT001',
        textbookTitle: 'Giáo trình Nguyên lý Kế toán',
        chiefEditor: 'ThS. Nguyễn Văn A (GV12345)',
        currentStatus: 'Yêu cầu chỉnh sửa (sau sơ bộ)',
        completionStatus: 'Đang xử lý',
        fileUrl: '/files/bt001.pdf',
    },
    {
        draftCode: 'BT002',
        textbookTitle: 'Giáo trình Phân tích Dữ liệu Lớn',
        chiefEditor: 'TS. Hoàng D (GV99887)',
        currentStatus: 'Yêu cầu chỉnh sửa (sau thẩm định)',
        completionStatus: 'Đã hoàn thành',
        latestCompletionDate: '2025-11-15',
        fileUrl: '/files/bt002.pdf',
    },
    {
        draftCode: 'BT003',
        textbookTitle: 'Giáo trình Kinh tế Vĩ mô',
        chiefEditor: 'PGS. Kim G (GV44556)',
        currentStatus: 'Yêu cầu chỉnh sửa (sau sơ bộ)',
        completionStatus: 'Chưa bắt đầu',
        fileUrl: '/files/bt003.pdf',
    },
];

