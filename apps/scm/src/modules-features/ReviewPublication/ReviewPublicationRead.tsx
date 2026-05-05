'use client'
import { AQButtonCreateByImportFile, MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ApprovePublicationModal from "./ApprovePublicationModal";
import ReviewPublicationDeleteList from "./ReviewPublicationDeleteList";
import PublicationDetailModal from "./ReviewPublicationDetail/PublicationDetailModal";
import { useForm } from "@mantine/form";
import PublicationCreateModal from "./ReviewPublicationCreate/PublicationCreateModal";

export interface IReviewPublicationRead {
    id: number;
    code: string; // Mã công bố
    publicationTitle: string; // Tên công trình
    mainAuthor: string; // Tác giả chính
    publicationType: string; // Loại công bố
    sentDate: string; // Ngày gửi
    sender: string; // Người gửi
    status: string; // Trạng thái
}

export default function ReviewPublicationRead() {

    const form = useForm<any>({
        initialValues: {}
    });

    const columns = useMemo<MRT_ColumnDef<IReviewPublicationRead>[]>(() => [
        { header: "Mã công bố", accessorKey: "code" },
        { header: "Tên công trình", accessorKey: "publicationTitle", size: 300 },
        { header: "Tác giả chính", accessorKey: "mainAuthor", size: 200 },
        { header: "Loại công bố", accessorKey: "publicationType", size: 200 },
        { header: "Ngày gửi", accessorKey: "sentDate", size: 120 },
        { header: "Người gửi", accessorKey: "sender", size: 200 },
        { header: "Trạng thái", accessorKey: "status", size: 120 },
    ], []);

    return (
        <MyFieldset
            title="Danh sách công bố"
        >
            <MyDataTable
                enableRowSelection
                columns={columns}
                data={mockData || []}
                initialState={{
                    columnSizing: {
                        'mrt-row-actions': 250,
                    }
                }}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <PublicationCreateModal />
                            <AQButtonCreateByImportFile onSubmit={() => { }} form={form} />
                            <MyButton crudType="export" />
                            <ReviewPublicationDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <PublicationDetailModal />
                            <ApprovePublicationModal />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

const mockData: IReviewPublicationRead[] = [
    {
        id: 1,
        code: "BB2024-006",
        publicationTitle: "A New Approach to Quantum Machine Learning",
        mainAuthor: "TS. Nguyễn Văn A",
        publicationType: "Bài báo tạp chí quốc tế uy tín",
        sentDate: "2025-06-25",
        sender: "TS. Nguyễn Văn A",
        status: "Chờ duyệt"
    },
    {
        id: 2,
        code: "SC2025-001",
        publicationTitle: "Giải pháp hữu ích về thiết bị lọc nước thông minh",
        mainAuthor: "ThS. Lê Thị B",
        publicationType: "Bằng độc quyền giải pháp hữu ích",
        sentDate: "2025-06-25",
        sender: "ThS. Lê Thị B",
        status: "Chờ duyệt"
    },
    {
        id: 3,
        code: "SACH2025-001",
        publicationTitle: "Giáo trình Lập trình Python Nâng cao",
        mainAuthor: "TS. Trần Văn C",
        publicationType: "Giáo trình/Bài giảng điện tử",
        sentDate: "2025-06-26",
        sender: "TS. Trần Văn C",
        status: "Chờ duyệt"
    },
    {
        id: 4,
        code: "BB2024-007",
        publicationTitle: "Phân tích hiệu suất thuật toán mã hóa AES trên nền tảng IoT",
        mainAuthor: "SV. Nguyễn Duy X",
        publicationType: "Bài báo tạp chí trong nước",
        sentDate: "2025-06-26",
        sender: "SV Nguyễn Duy X",
        status: "Chờ duyệt"
    },
    {
        id: 5,
        code: "BC2025-001",
        publicationTitle: "Báo cáo tại Hội nghị Quốc tế về AI và Robotics",
        mainAuthor: "PGS. Đỗ Thị Y",
        publicationType: "Báo cáo tại hội nghị, hội thảo quốc tế",
        sentDate: "2025-06-25",
        sender: "PGS. Đỗ Thị Y",
        status: "Chờ duyệt"
    },
    {
        id: 6,
        code: "BB2024-008",
        publicationTitle: "Nghiên cứu về vật liệu Composite tiên tiến",
        mainAuthor: "TS. Hoàng Thị H",
        publicationType: "Bài báo tạp chí quốc tế khác",
        sentDate: "2025-06-27",
        sender: "TS. Hoàng Thị H",
        status: "Chờ duyệt"
    },
    {
        id: 7,
        code: "GT2025-002",
        publicationTitle: "Hệ thống Thông tin Địa lý (GIS) cơ bản",
        mainAuthor: "ThS. Nguyễn Đình K",
        publicationType: "Giáo trình/Bài giảng điện tử",
        sentDate: "2025-06-26",
        sender: "ThS. Nguyễn Đình K",
        status: "Chờ duyệt"
    },
    {
        id: 8,
        code: "SACH2025-002",
        publicationTitle: "Lịch sử Văn học Việt Nam cận đại",
        mainAuthor: "TS. Mai Thị L",
        publicationType: "Sách tham khảo",
        sentDate: "2025-06-25",
        sender: "TS. Mai Thị L",
        status: "Chờ duyệt"
    },
    {
        id: 9,
        code: "BANG2025-002",
        publicationTitle: "Ứng dụng AI trong chẩn đoán y học",
        mainAuthor: "GS. Vũ Văn M",
        publicationType: "Bằng độc quyền sáng chế",
        sentDate: "2025-06-25",
        sender: "GS. Vũ Văn M",
        status: "Chờ duyệt"
    },
    {
        id: 10,
        code: "BB2024-009",
        publicationTitle: "Đánh giá rủi ro an ninh mạng cho hệ thống SCADA",
        mainAuthor: "TS. Hồ Ngọc N",
        publicationType: "Bài báo tạp chí quốc tế uy tín",
        sentDate: "2025-06-26",
        sender: "TS. Hồ Ngọc N",
        status: "Chờ duyệt"
    },
];
