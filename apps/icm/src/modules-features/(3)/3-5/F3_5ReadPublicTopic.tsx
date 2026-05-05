import MyCenterFull from '@/components/CenterFull/MyCenterFull';
import { MyDataTable } from '@/components/DataDisplay/DataTable/MyDataTable';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { U0DateToDDMMYYYString } from '@/utils/date';
import { Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import F3_5CreatePublicTopic from './F3_5CreatePublicTopic';
import F3_5DeletePublicTopic from './F3_5DeletePublicTopic';
import F3_5UpdatePuclicTopic from './F3_5UpdatePuclicTopic';

export interface I3_5PublicTopic {
    id?: number; // Id đề tài
    code?: string, // Mã đề tài
    title?: string; // Tên đề tài
    level?: string; // Cấp đề tài (VD?:Quốc gia, Bộ, Trường)
    leadingUnit?: string; // Đơn vị chủ trì
    managingUnit?: string; // Đơn vị quản lý
    leader?: string; // Chủ nhiệm
    members?: string[]; // Danh sách thành viên
    startDate?: Date; // Ngày bắt đầu
    endDate?: Date; // Ngày kết thúc
    budget?: number; // Kinh phí
    evidenceFiles?: string[]; // Danh sách file minh chứng
}

export default function F3_5ReadPublicTopic() {
    const query = useQuery({
        queryKey: ["F3_5ReadPublicTopic"],
        queryFn: () => data
    })
    const columns = useMemo<MRT_ColumnDef<I3_5PublicTopic>[]>(
        () => [
            {
                header: "Mã đề tài",
                accessorKey: "code"
            },
            {
                header: "Tên đề tài",
                accessorKey: "title"
            },
            {
                header: "Cấp đề tài",
                accessorKey: "level"
            },
            {
                header: "Đơn vị chủ trì",
                accessorKey: "leadingUnit"
            },
            {
                header: "Đơn vị quản lý",
                accessorKey: "managingUnit"
            },
            {
                header: "Chủ nhiệm",
                accessorKey: "leader"
            },
            {
                header: "Thành viên",
                accessorFn: (row) => {
                    return <MyFlexColumn>
                        {row.members?.map((item, idx) => <Text key={idx}>{item}</Text>)}
                    </MyFlexColumn>
                }
            },
            {
                header: "Ngày bắt đầu",
                accessorFn: (row) => U0DateToDDMMYYYString(row.startDate!)
            },
            {
                header: "ngày kết thúc",
                accessorFn: (row) => U0DateToDDMMYYYString(row.endDate!)
            },
            {
                header: "Kinh phí",
                accessorKey: "budget"
            },
            {
                header: "Danh sách file minh chứng",
                accessorFn: (row) => {
                    return <MyFlexColumn>
                        {row.evidenceFiles?.map((item, idx) => <Text key={idx}>{item}</Text>)}
                    </MyFlexColumn>
                }
            }
        ],
        []
    );
    if (query.isLoading) return "Loading..."
    return (
        <MyDataTable
            // formats={{
            //     evidenceFiles: () => "",
            //     members: () => ""
            // }}
            renderTopToolbarCustomActions={() => (
                <F3_5CreatePublicTopic />
            )}
            renderRowActions={({ row }) => (
                <MyCenterFull>
                    <F3_5UpdatePuclicTopic values={row.original} />
                    <F3_5DeletePublicTopic id={row.original.id!} />
                </MyCenterFull>
            )}
            data={query.data!}
            columns={columns}
        />
    )
}

const data: I3_5PublicTopic[] = [
    {
        id: 1,
        code: "T123456", // Mã đề tài
        title: "Nghiên cứu ứng dụng AI trong phân tích dữ liệu lớn", // Tên đề tài
        level: "Quốc gia", // Cấp đề tài
        leadingUnit: "Viện Nghiên cứu AI", // Đơn vị chủ trì
        managingUnit: "Bộ Khoa học và Công nghệ", // Đơn vị quản lý
        leader: "TS. Nguyễn Văn A", // Chủ nhiệm
        members: ["TS. Trần Thị B", "ThS. Lê Hoàng C", "Cử nhân Phạm D"], // Danh sách thành viên
        startDate: new Date("2024-01-01"), // Ngày bắt đầu
        endDate: new Date("2026-01-01"), // Ngày kết thúc
        budget: 500000000, // Kinh phí (VND)
        evidenceFiles: ["file1.pdf", "file2.docx", "file3.xlsx"] // Danh sách file minh chứng
    },
    {
        id: 2,
        code: "T654321", // Mã đề tài
        title: "Phát triển phần mềm quản lý giáo dục đại học", // Tên đề tài
        level: "Bộ", // Cấp đề tài
        leadingUnit: "Trường Đại học ABC", // Đơn vị chủ trì
        managingUnit: "Bộ Giáo dục và Đào tạo", // Đơn vị quản lý
        leader: "PGS. Lê Minh T", // Chủ nhiệm
        members: ["TS. Mai Quang V", "ThS. Phạm Thị Q", "Kỹ sư Nguyễn T"], // Danh sách thành viên
        startDate: new Date("2023-06-15"), // Ngày bắt đầu
        endDate: new Date("2025-06-15"), // Ngày kết thúc
        budget: 200000000, // Kinh phí (VND)
        evidenceFiles: ["file4.pdf", "file5.pptx", "file6.xlsx"] // Danh sách file minh chứng
    },
    {
        id: 3,
        code: "T789012", // Mã đề tài
        title: "Nghiên cứu công nghệ Blockchain trong giao dịch tài chính", // Tên đề tài
        level: "Trường", // Cấp đề tài
        leadingUnit: "Trường Đại học XYZ", // Đơn vị chủ trì
        managingUnit: "Trường Đại học XYZ", // Đơn vị quản lý
        leader: "TS. Phan Hồng T", // Chủ nhiệm
        members: ["TS. Vũ Thị H", "Cử nhân Đặng M", "Kỹ sư Trần K"], // Danh sách thành viên
        startDate: new Date("2024-04-01"), // Ngày bắt đầu
        endDate: new Date("2026-04-01"), // Ngày kết thúc
        budget: 100000000, // Kinh phí (VND)
        evidenceFiles: ["file7.pdf", "file8.docx", "file9.pptx"] // Danh sách file minh chứng
    }
];