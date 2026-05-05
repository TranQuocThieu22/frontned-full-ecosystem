'use client'
import { useForm } from "@mantine/form";
import { MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SummaryOfProposedUpdate from "./UpdateSummaryOfProposed";
import { Group } from "@mantine/core";

export interface SummaryOfProposed {
    id: number,
    code: string;
    name: string;
    status: string;
    proposalId: string
    proposalName: string;
    proposalSatus: string;
    proposalscore: string;
    conclude: string;
    meetDate: string;
    meetTime: string;
    meetLocation: string;
    link: string;
}

export default function SummaryOfProposedLayout() {

    const form_multiple = useForm<any>({
        initialValues: {
            importedData: []
        },
    });

    const columns = useMemo<MRT_ColumnDef<SummaryOfProposed>[]>(() => [
        {
            header: "Mã hội đồng",
            accessorKey: "code",
        },
        {
            header: "Tên hội đồng",
            accessorKey: "name",
        },
        {
            header: "Trạng thái hội đồng",
            accessorKey: "status",
        },
        {
            header: "Mã đề xuất",
            accessorKey: "proposalId",
        },
        {
            header: "Tên giáo trình đề xuất",
            accessorKey: "proposalName",
        },
        {
            header: "Trạng thái đề xuất",
            accessorKey: "proposalSatus",
        },
        {
            header: "Điểm TB Tổng hợp đề xuất(tự động)",
            accessorKey: "proposalscore",
        },
        {
            header: "Kết luận/Khuyến nghị hội đồng(chung)",
            accessorKey: "conclude",
        },
        {
            header: "Ngày họp",
            accessorKey: "meetDate",
        },
        {
            header: "Thời gian họp",
            accessorKey: "meetTime",
        },
        {
            header: "Địa điểm",
            accessorKey: "meetLocation",
        },
        {
            header: "Đính kèm file",
            accessorKey: "link",
            accessorFn: (row) => (
                <Group> {row.link || row.link && row.link.length > 0 ? (<MyButtonViewPDF />) : null}
                </Group>
            ),
        },
    ], []);

    return (
        <MyFieldset title="Danh sách đề xuất hợp tác" >
            <MyDataTable
                columns={columns}
                data={mockData || []}
                renderTopToolbarCustomActions={() => {
                    return (
                        <>
                            <MyButton crudType="export" />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <SummaryOfProposedUpdate data={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}


export const mockData: SummaryOfProposed[] = [
    {
        id: 1,
        code: 'HDGT202001',
        name: 'Hội đồng xét duyệt ĐXGT khoa CNTT 2025',
        status: 'Chờ họp',
        proposalId: 'GT2025001',
        proposalName: 'Giáo trình nguyên lí kế toán',
        proposalSatus: 'Đã sơ duyệt',
        proposalscore: '',
        conclude: '',
        meetDate: '2025-07-15',
        meetTime: '09:00 - 11:00',
        meetLocation: 'Phòng họp A201',
        link: '',
    },
    {
        id: 2,
        code: 'HDGT202001',
        name: 'Hội đồng xét duyệt ĐXGT khoa CNTT 2025',
        status: 'Chờ họp',
        proposalId: 'GT2025002',
        proposalName: 'Giáo trình phân tích dữ liệu lớn',
        proposalSatus: 'Đã sơ duyệt',
        proposalscore: '',
        conclude: '',
        meetDate: '2025-07-15',
        meetTime: '09:00 - 11:00',
        meetLocation: 'Phòng họp A201',
        link: '',
    },
    {
        id: 3,
        code: 'HDGT202002',
        name: 'Hội đồng xét duyệt ĐXGT khoa Kinh tế 2025',
        status: 'Chờ họp',
        proposalId: 'GT2025003',
        proposalName: 'Giáo trình lịch sử văn học Việt Nam',
        proposalSatus: 'Đã sơ duyệt',
        proposalscore: '',
        conclude: '',
        meetDate: '2025-07-18',
        meetTime: '14:00 - 16:00',
        meetLocation: 'Phòng họp B305',
        link: '',
    },
    {
        id: 4,
        code: 'HDGT202002',
        name: 'Hội đồng xét duyệt ĐXGT khoa Kinh tế 2025',
        status: 'Chờ họp',
        proposalId: 'GT2025004',
        proposalName: 'Giáo trình kinh tế vĩ mô',
        proposalSatus: 'Đã sơ duyệt',
        proposalscore: '',
        conclude: '',
        meetDate: '2025-07-18',
        meetTime: '14:00 - 16:00',
        meetLocation: 'Phòng họp B305',
        link: '',
    },
    {
        id: 2,
        code: 'HDGT202003',
        name: 'Hội đồng xét duyệt ĐXGT khoa y dược 2025',
        status: 'Hoàn thành',
        proposalId: 'GT2025005',
        proposalName: 'giáo trình dược lý học',
        proposalSatus: 'Đã duyệt',
        proposalscore: '89.5',
        conclude: 'Đề xuất đạt yêu cầu cao, khuyến nghị truển khai ngay. giáo trình có giá trị khoa học và ứng dụng thực tiễn',
        meetDate: '2025-07-20',
        meetTime: '10:00 - 12:00',
        meetLocation: 'Phòng họp C101',
        link: 'Xem file',
    },
];
