import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useQuery } from "@tanstack/react-query";
import { AQButtonExportData, MyFieldset } from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import CurriculumApprovalDetail from "./CurriculumApprovalDetail";
import CurriculumApprovalValidation from "./CurriculumApprovalValidation";
import { Center, Flex, Group } from "@mantine/core";


export default function CurriculumApprovalTable() {

    // fetch mockdata
    const curriculumApprovalQuery = useQuery<I_CurriculumApprovalTable[]>({
        queryKey: ["curriculumApprovalTable"],
        queryFn: async () => curriculumApprovalMockData ?? []
    })

    //fetch table
    const columns = useMemo<MRT_ColumnDef<I_CurriculumApprovalTable>[]>(() => [
        {
            header: "Mã đề xuất",
            accessorKey: "id",
        },
        {
            header: "Tên đề xuất",
            accessorKey: "name",
        },
        {
            header: "Loại đề xuất",
            accessorKey: "type",
        },
        {
            header: "Phòng/Ban/Đơn vị đề xuất",
            accessorKey: "department",
        },
        {
            header: "Người phụ trách đề xuất",
            accessorKey: "approvalManager",
        },
        {
            header: "Trạng thái hiện tại của đề xuất",
            accessorKey: "currentStatus",
        },
        {
            header: "Trạng thái xét duyệt (của người xem)",
            accessorKey: "viewerStatus",
        },
        {
            header: "Ý kiến/Góp ý của người xét duyệt",
            accessorKey: "reviewerFeedback",
        },
        {
            header: "Yêu cầu chỉnh sửa của thư ký",
            accessorKey: "editRequest",
        },
        {
            header: "Quyết định cuối cùng",
            accessorKey: "finalDecision",
        },
        {
            header: "File đính kèm (nếu có)",
            accessorKey: "fileAttachment",
        },
        {
            header: "Ngày xét duyệt",
            accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.approvalDate)),
            id: "approvalDate",
        },
    ], []);


    //export config
    const exportConfig = {
        fields: [
            { fieldName: "id", header: "Mã đề xuất" },
            { fieldName: "name", header: "Tên đề xuất" },
            { fieldName: "type", header: "Loại đề xuất" },
            { fieldName: "department", header: "Phòng/Ban/Đơn vị đề xuất" },
            { fieldName: "approvalManager", header: "Người phụ trách đề xuất" },
            { fieldName: "currentStatus", header: "Trạng thái hiện tại của đề xuất" },
            { fieldName: "viewerStatus", header: "Trạng thái xét duyệt (của người xem)" },
            { fieldName: "reviewerFeedback", header: "Ý kiến/Góp ý của người xét duyệt" },
            { fieldName: "editRequest", header: "Yêu cầu chỉnh sửa của thư ký" },
            { fieldName: "finalDecision", header: "Quyết định cuối cùng" },
            { fieldName: "fileAttachment", header: "File đính kèm (nếu có)" },
            { fieldName: "approvalDate", header: "Ngày xét duyệt" },
        ]
    };

    if (curriculumApprovalQuery.isLoading) return "Đang tải . . .";
    if (curriculumApprovalQuery.isError) return "Có Lỗi xảy ra!";

    return (
        <MyFieldset title="Danh sách đề xuất">
            <MyDataTable
                columns={columns}
                data={curriculumApprovalQuery.data!}
                enableRowSelection={false}
                enableRowNumbers={false}
                exportAble={false}
                renderTopToolbarCustomActions={() => (<>
                    <AQButtonExportData
                        objectName="DanhSachDeXuat"
                        data={curriculumApprovalQuery.data!}
                        exportConfig={exportConfig}
                    />
                </>)}
                renderRowActions={({ row }) => (
                    <Group  gap={10} justify={"flex-end"} py={25}>
                        <CurriculumApprovalDetail/>
                        <CurriculumApprovalValidation data={row.original} />
                    </Group>
                )}
            >

            </MyDataTable>

        </MyFieldset>
    );
}

export interface I_CurriculumApprovalTable {
    id: string,
    name: string,
    type: string,
    department: string,
    approvalManager: string,
    currentStatus: string,
    viewerStatus: string,
    reviewerFeedback: string,
    editRequest: string,
    finalDecision: string,
    fileAttachment: string,
    approvalDate: Date,
}


const curriculumApprovalMockData: I_CurriculumApprovalTable[] = [
    {
        id: "DXCTDT-KHDT-001",
        name: "Đề xuất xây dựng Chương trình đào tạo ngành Logistics và Quản lý chuỗi cung ứng",
        type: "Chương trình đào tạo",
        department: "Khoa Kinh tế",
        approvalManager: "TS. Nguyễn Văn B",
        currentStatus: "Chờ xét duyệt",
        viewerStatus: "Chờ xử lý",
        reviewerFeedback: "",
        editRequest: "",
        finalDecision: "",
        fileAttachment: "",
        approvalDate: new Date("2025-10-10"),
    },
    {
        id: "DXDCHP-QTKD-002",
        name: "Đề xuất cập nhật Đề cương chi tiết học phần môn Quản trị chiến lược",
        type: "Đề cương chi tiết học phần",
        department: "Bộ môn Quản trị",
        approvalManager: "ThS. Phạm Thị E",
        currentStatus: "Nháp",
        viewerStatus: "Chờ xử lý",
        reviewerFeedback: "",
        editRequest: "",
        finalDecision: "",
        fileAttachment: "",
        approvalDate: new Date("2025-10-12"),
    },
    {
        id: "DXCTDT-CNTT-003",
        name: "Đề xuất rà soát CTĐT ngành Kỹ thuật phần mềm (năm 2024)",
        type: "Chương trình đào tạo",
        department: "Khoa Công nghệ thông tin",
        approvalManager: "GS. Lê Quang G",
        currentStatus: "Đã phê duyệt",
        viewerStatus: "Đã đánh giá",
        reviewerFeedback: "Đề xuất đã rất chi tiết: cấu trúc logic và cập nhật tài liệu đầy đủ.",
        editRequest: "Không có; phê duyệt",
        finalDecision: "Đồng ý",
        fileAttachment: "phieu-danh-gia-DXCTDT-003-B.pdf",
        approvalDate: new Date("2025-10-08"),
    },
    {
        id: "DXCTDT-NN-004",
        name: "Đề xuất CTĐT ngành Ngôn ngữ Anh (Định hướng Biên-Phiên dịch)",
        type: "Chương trình đào tạo",
        department: "Khoa Ngôn ngữ",
        approvalManager: "PGS. Đinh Thị L",
        currentStatus: "Chờ xét duyệt",
        viewerStatus: "Chờ xử lý",
        reviewerFeedback: "",
        editRequest: "",
        finalDecision: "",
        fileAttachment: "",
        approvalDate: new Date("2025-10-11"),
    },
];
