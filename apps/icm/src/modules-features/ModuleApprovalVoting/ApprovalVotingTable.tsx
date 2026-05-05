import { Center, Checkbox, Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {  AQButtonExportData, MyButton, MyButtonViewPDF, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ApprovalVotingUpdate from "./ApprovalVotingUpdate";

export default function ApprovalVotingTable() {

    // Mock data for the approval voting table
    const approvalVotingQuery = useQuery<I_ApprovalVotingTable[]>({
        queryKey: ["approvalVotingQuery"],
        queryFn: async () => approvalVotingMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_ApprovalVotingTable>[]>(() => [
        { header: "Mã Hội đồng", accessorKey: "code" },
        { header: "Tên Hội đồng Thẩm định", accessorKey: "name" },
        { header: "Tài liệu/Nội dung thẩm định", accessorKey: "document" },
        {
            header: "Ngày họp",
            accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.date)),
            id: "date",
        },
        { header: "Trạng thái thẩm định", accessorKey: "status" },
        { header: "Quyết định cuối cùng của Hội đồng", accessorKey: "finalDecision" },
        { header: "Yêu cầu chỉnh sửa chi tiết", accessorKey: "editRequestDetail" },
        {
            header: "Tỷ lệ tán thành/không tán thành",
            accessorKey: "voteRate"
        },
        {
            header: "File đính kèm (Biên bản tổng hợp điểm)",
            accessorFn: row => {
                if (row.voteRate === "Chưa biểu quyết") {
                    return <></>;
                }
                return <Center><MyButtonViewPDF /></Center>
            },
        },
        {
            header: "Ghi chú của người tổng hợp",
            accessorKey: "reviewerNote"
        },
        {
            header: "Có nhiệm vụ hoàn thiện",
            accessorFn: row => <Checkbox readOnly checked={!!row.completed} />,
            id: "completed"
        },
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Hội đồng" },
            { fieldName: "name", header: "Tên Hội đồng Thẩm định" },
            { fieldName: "document", header: "Tài liệu/Nội dung thẩm định" },
            { fieldName: "date", header: "Ngày họp" },
            { fieldName: "status", header: "Trạng thái thẩm định" },
            { fieldName: "finalDecision", header: "Quyết định cuối cùng của Hội đồng" },
            { fieldName: "editRequestDetail", header: "Yêu cầu chỉnh sửa chi tiết" },
            { fieldName: "voteRate", header: "Tỷ lệ tán thành/không tán thành" },
            { fieldName: "reviewerNote", header: "Ghi chú của người tổng hợp" },
            { fieldName: "completed", header: "Có nhiệm vụ hoàn thiện" },
        ]
    };

    if (approvalVotingQuery.isLoading) {
        return <Center>Đang tải dữ liệu...</Center>;
    }

    if (approvalVotingQuery.isError) {
        return <Center>Có lỗi xảy ra khi tải dữ liệu</Center>;
    }

    return (
        <MyFieldset title="Danh sách nội dung biên soạn">
            <MyDataTable
                columns={columns}
                data={approvalVotingQuery.data!}
                enableRowSelection={false}
                enableRowNumbers={false}
                exportAble={false}
                renderTopToolbarCustomActions={() => (<>
                    {/* <AQButtonExportData
                        isAllData
                        objectName="DanhSachNoiDungBienSoan"
                        data={approvalVotingQuery.data!}
                        exportConfig={exportConfig}
                    /> */}
                    <MyButton crudType="default" bg={"green"}>Tạo nhiệm vụ hoàn thiện</MyButton>
                </>)}
                renderRowActions={({ row }) => (
                    <Group justify="space-evenly">
                        <ApprovalVotingUpdate data={row.original} />

                    </Group>
                )}
            >
            </MyDataTable>
        </MyFieldset>
    )
}

export interface I_ApprovalVotingTable {
    code: string;              // Mã Hội đồng
    name: string;            // Tên Hội đồng Thẩm định
    document: string;        // Tài liệu/Nội dung thẩm định
    date: Date;            // Ngày họp
    status: string;          // Trạng thái thẩm định
    finalDecision: string;   // Quyết định cuối cùng của Hội đồng
    editRequestDetail: string; // Yêu cầu chỉnh sửa chi tiết
    voteRate: string;        // Tỷ lệ tán thành/không tán thành
    reviewerNote: string;    // Ghi chú của người tổng hợp
    completed: number;       // Có nhiệm vụ hoàn thiện (0/1)
}

const approvalVotingMockData: I_ApprovalVotingTable[] = [
    {
        code: "HDTD-LG-001",
        name: "Hội đồng Thẩm định CTĐT ngành Logistics (Phiên bản V1)",
        document: "Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        date: new Date("2025-12-01"),
        status: "Đang thực hiện",
        finalDecision: "Phê duyệt với yêu cầu chỉnh sửa",
        editRequestDetail: "Bổ sung 2 môn học tự chọn một; Làm rõ mô tả môn X; Cập nhật tài liệu tham khảo",
        voteRate: "Tán thành: 5/7",
        reviewerNote: "",
        completed: 1,
    },
    {
        code: "HDTD-QTKD-002",
        name: "Hội đồng Thẩm định ĐCCTHP môn Quản trị chiến lược",
        document: "Đề cương chi tiết học phần môn Quản trị chiến lược (V2.1)",
        date: new Date("2025-12-02"),
        status: "Đã hoàn tất",
        finalDecision: "Phê duyệt hoàn toàn",
        editRequestDetail: "",
        voteRate: "Tán thành: 3/3",
        reviewerNote: "",
        completed: 0,
    },
    {
        code: "HDTD-NN-004",
        name: "Hội đồng Thẩm định CTĐT ngành Ngôn ngữ Anh",
        document: "CTĐT ngành Ngôn ngữ Anh (Định hướng Biên-Phiên dịch)",
        date: new Date("2025-12-10"),
        status: "Đang thực hiện",
        finalDecision: "Chưa có quyết định cuối cùng",
        editRequestDetail: "",
        voteRate: "Chưa biểu quyết",
        reviewerNote: "Cần chờ ý kiến của 1 thành viên vắng mặt",
        completed: 0,
    },
];

