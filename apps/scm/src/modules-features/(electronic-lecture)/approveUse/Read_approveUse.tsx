'use client'
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyCenterFull, MyDataTable, MyFieldset, MyFlexColumn } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import DeleteList_approveUse from "./DeleteList_approveUse";
import Update_approveUse from "./Update_approveUse";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";

export default function Read_approveUse() {

    // Query to fetch mock data
    const query = useQuery<I_ApproveUse[]>({
        queryKey: ["ApproveUseQuery"],
        queryFn: async () => lectureApprovalDecisionMockData ?? []
    });

    const columns = useMemo<MRT_ColumnDef<I_ApproveUse>[]>(() => [
        { header: "Mã Quyết định Ban hành", accessorKey: "code" },
        { header: "Tên Quyết định", accessorKey: "name" },
        {
            header: "Ngày Ban hành Quyết định",
            accessorFn: row => row.decisionDate ? utils_date_dateToDDMMYYYString(new Date(row.decisionDate)) : "",
            id: "decisionDate"
        },
        { header: "Người ký duyệt/Ban hành quyết định", accessorKey: "signer" },
        { header: "Lý do/Nhận xét phê duyệt", accessorKey: "reason" },
        { header: "Mã Bài giảng được phê duyệt", accessorKey: "lectureCode" },
        { header: "Tên Bài giảng được phê duyệt", accessorKey: "lectureName" }
    ], []);

    const exportConfig = {
        fields: [
            { fieldName: "code", header: "Mã Quyết định Ban hành" },
            { fieldName: "name", header: "Tên Quyết định" },
            { fieldName: "decisionDate", header: "Ngày Ban hành Quyết định" },
            { fieldName: "signer", header: "Người ký duyệt/Ban hành quyết định" },
            { fieldName: "reason", header: "Lý do/Nhận xét phê duyệt" },
            { fieldName: "lectureCode", header: "Mã Bài giảng được phê duyệt" },
            { fieldName: "lectureName", header: "Tên Bài giảng được phê duyệt" }
        ]
    };



    return (
        <MyFieldset title={"Danh sách bài giảng"}>
            <MyFlexColumn>
                <MyDataTable
                    isLoading={query.isLoading}
                    isError={query.isError}
                    enableRowSelection={true}
                    enableRowNumbers={true}
                    exportAble={true}
                    columns={columns}
                    data={query.data || []}
                    renderRowActions={({ row }) => (
                        <MyCenterFull>
                            <Update_approveUse data={row.original} />
                            <DeleteList_approveUse id={row.original.id} code={row.original.lectureCode ?? ""} />
                        </MyCenterFull>
                    )}
                />
            </MyFlexColumn>
        </MyFieldset>
    );
}

export interface I_ApproveUse {
    id: number;                  // ID của Quyết định Ban hành
    code: string;                  // Mã Quyết định Ban hành
    name: string;                  // Tên Quyết định
    decisionDate?: string;           // Ngày Ban hành Quyết định
    signer: string;                // Người ký duyệt/Ban hành quyết định
    reason: string;                // Lý do/Nhận xét phê duyệt
    lectureCode: string;           // Mã Bài giảng được phê duyệt
    lectureName: string;           // Tên Bài giảng được phê duyệt
}


const lectureApprovalDecisionMockData: I_ApproveUse[] = [
    {
        id: 1,
        code: "QD-BGDT-2025-001",
        name: "Quyết định Phê duyệt Bài giảng Python Cơ bản",
        decisionDate: "2025-12-15",
        signer: "PGS.TS. Hiệu trưởng Trường XYZ",
        reason: "Bài giảng có chất lượng nội dung và kỹ thuật xuất sắc; phù hợp với mục tiêu đào tạo.",
        lectureCode: "PYB-2025-001",
        lectureName: "Lập trình Python cơ bản"
    },
    {
        id: 2,
        code: "QD-BGDT-2025-002",
        name: "Quyết định Phê duyệt Bài giảng Trí tuệ Nhân tạo trong Y học",
        decisionDate: "2025-12-20",
        signer: "PGS.TS. Hiệu trưởng Trường XYZ",
        reason: "Bài giảng đã được chỉnh sửa theo góp ý; nội dung cập nhật và đáp ứng yêu cầu chuyên môn cao.",
        lectureCode: "AIH-2025-002",
        lectureName: "Trí tuệ Nhân tạo trong Y học"
    }
];
