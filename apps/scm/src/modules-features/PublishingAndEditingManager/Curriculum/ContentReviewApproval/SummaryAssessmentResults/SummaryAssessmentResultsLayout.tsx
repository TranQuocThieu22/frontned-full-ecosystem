'use client'
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SummaryAssessmentResultsUpdate from "./SummaryAssessmentResultsUpdate";

export interface MemberEvaluation {
    lecturerCode: string;
    name: string;
    role: string;
    score: number;
    comment: string;
}

export interface AppraisedDraft {
    id: number;
    draftCode: string;
    textbookTitle: string;
    councilCode: string;
    councilName: string;
    meetingDate: string;
    chairman: string;
    averageScore?: number;
    conclusion?: string;
    draftStatus: string;
    members: MemberEvaluation[];
}


export default function SummaryAssessmentResultsLayout() {

    const columns = useMemo<MRT_ColumnDef<AppraisedDraft>[]>(() => [
        {
            accessorKey: 'draftCode',
            header: 'Mã Bản thảo',
        },
        {
            accessorKey: 'textbookTitle',
            header: 'Tên Giáo trình Đề xuất',
        },
        {
            accessorKey: 'councilCode',
            header: 'Mã Hội đồng TĐ',
        },
        {
            accessorKey: 'councilName',
            header: 'Tên Hội đồng Thẩm định',
        },
        {
            accessorKey: 'meetingDate',
            header: 'Ngày họp Hội đồng',
        },
        {
            accessorKey: 'chairman',
            header: 'Chủ tịch Hội đồng TĐ',
        },
        {
            accessorKey: 'averageScore',
            header: 'Điểm TB Thẩm định (Tự động)',
        },
        {
            accessorKey: 'conclusion',
            header: 'Kết luận/Khuyến nghị Hội đồng',
        },
        {
            accessorKey: 'draftStatus',
            header: 'Trạng thái Bản thảo',
        },
    ], []);


    return (
        <MyFieldset title="Danh sách nội dung biên soạn" >
            <MyDataTable
                enableRowSelection
                enableRowNumbers={false}
                columns={columns}
                data={appraisedDrafts || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <MyButton crudType="export"></MyButton>
                            <MyButton crudType="create">Tạo nhiệm vụ hoàn thiện</MyButton>
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <SummaryAssessmentResultsUpdate values={row.original} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    )
}

export const appraisedDrafts: AppraisedDraft[] = [
    {
        draftCode: 'BT001',
        textbookTitle: 'Giáo trình Nguyên lý Kế toán',
        councilCode: 'HDTD2025001',
        councilName: 'HĐ Thẩm định GT Nguyên lý Kế toán',
        meetingDate: '2025-10-25',
        chairman: 'GS. Phan H',
        draftStatus: 'Chờ thẩm định',
        id: 0,
        members: [
            {
                lecturerCode: "GVH008",
                name: "GS. Hoàng S",
                role: "Chủ tịch",
                score: 9.2,
                comment:
                    "Nội dung chuyên môn sâu sắc, cập nhật, bám sát đề cương. Bố cục logic, khoa học. Cần bổ sung thêm một số trường hợp lâm sàng minh họa để tăng tính ứng dụng.",
            },
            {
                lecturerCode: "GVI009",
                name: "TS. Đào T",
                role: "Thư ký",
                score: 8.7,
                comment:
                    "Giáo trình có tính hệ thống cao, ngôn ngữ rõ ràng. Hình ảnh minh họa chất lượng. Cần kiểm tra lại một vài lỗi chính tả nhỏ và thống nhất cách trình bày tài liệu tham khảo.",
            },
            {
                lecturerCode: "GVJ010",
                name: "PGS. Lê X",
                role: "Ủy viên phản biện",
                score: 8.9,
                comment:
                    "Đánh giá cao sự đầu tư về nội dung và phương pháp biên soạn. Đề xuất mở rộng thêm phần về tương tác thuốc để hoàn thiện hơn.",
            },
            {
                lecturerCode: "GVK011",
                name: "TS. Trần Y",
                role: "Ủy viên",
                score: 8.8,
                comment:
                    "Giáo trình cung cấp kiến thức toàn diện, dễ hiểu. Nên xem xét thêm các phác đồ điều trị mới nhất cho một số bệnh lý điển hình.",
            },
        ],
    },
    {
        draftCode: 'BT002',
        textbookTitle: 'Giáo trình Phân tích Dữ liệu Lớn',
        councilCode: 'HDTD2025001',
        councilName: 'HĐ Thẩm định GT Nguyên lý Kế toán',
        meetingDate: '2025-10-25',
        chairman: 'GS. Phan H',
        draftStatus: 'Chờ thẩm định',
        id: 0,
        members: [
            {
                lecturerCode: "GVH008",
                name: "GS. Hoàng S",
                role: "Chủ tịch",
                score: 9.2,
                comment:
                    "Nội dung chuyên môn sâu sắc, cập nhật, bám sát đề cương. Bố cục logic, khoa học. Cần bổ sung thêm một số trường hợp lâm sàng minh họa để tăng tính ứng dụng.",
            },
            {
                lecturerCode: "GVI009",
                name: "TS. Đào T",
                role: "Thư ký",
                score: 8.7,
                comment:
                    "Giáo trình có tính hệ thống cao, ngôn ngữ rõ ràng. Hình ảnh minh họa chất lượng. Cần kiểm tra lại một vài lỗi chính tả nhỏ và thống nhất cách trình bày tài liệu tham khảo.",
            },
            {
                lecturerCode: "GVJ010",
                name: "PGS. Lê X",
                role: "Ủy viên phản biện",
                score: 8.9,
                comment:
                    "Đánh giá cao sự đầu tư về nội dung và phương pháp biên soạn. Đề xuất mở rộng thêm phần về tương tác thuốc để hoàn thiện hơn.",
            },
            {
                lecturerCode: "GVK011",
                name: "TS. Trần Y",
                role: "Ủy viên",
                score: 8.8,
                comment:
                    "Giáo trình cung cấp kiến thức toàn diện, dễ hiểu. Nên xem xét thêm các phác đồ điều trị mới nhất cho một số bệnh lý điển hình.",
            },
        ]
    },
    {
        draftCode: 'BT003',
        textbookTitle: 'Giáo trình Kinh tế Vĩ mô',
        councilCode: 'HDTD2025002',
        councilName: 'HĐ Thẩm định GT Kinh tế Vĩ mô',
        meetingDate: '2025-10-28',
        chairman: 'GS. Võ P',
        draftStatus: 'Chờ thẩm định',
        id: 0,
        members: [
            {
                lecturerCode: "GVH008",
                name: "GS. Hoàng S",
                role: "Chủ tịch",
                score: 9.2,
                comment:
                    "Nội dung chuyên môn sâu sắc, cập nhật, bám sát đề cương. Bố cục logic, khoa học. Cần bổ sung thêm một số trường hợp lâm sàng minh họa để tăng tính ứng dụng.",
            },
            {
                lecturerCode: "GVI009",
                name: "TS. Đào T",
                role: "Thư ký",
                score: 8.7,
                comment:
                    "Giáo trình có tính hệ thống cao, ngôn ngữ rõ ràng. Hình ảnh minh họa chất lượng. Cần kiểm tra lại một vài lỗi chính tả nhỏ và thống nhất cách trình bày tài liệu tham khảo.",
            },
            {
                lecturerCode: "GVJ010",
                name: "PGS. Lê X",
                role: "Ủy viên phản biện",
                score: 8.9,
                comment:
                    "Đánh giá cao sự đầu tư về nội dung và phương pháp biên soạn. Đề xuất mở rộng thêm phần về tương tác thuốc để hoàn thiện hơn.",
            },
            {
                lecturerCode: "GVK011",
                name: "TS. Trần Y",
                role: "Ủy viên",
                score: 8.8,
                comment:
                    "Giáo trình cung cấp kiến thức toàn diện, dễ hiểu. Nên xem xét thêm các phác đồ điều trị mới nhất cho một số bệnh lý điển hình.",
            },
        ]
    },
    {
        draftCode: 'BT004',
        textbookTitle: 'Giáo trình Dược lý học',
        councilCode: 'HDTD2025003',
        councilName: 'HĐ Thẩm định GT Dược lý học',
        meetingDate: '2025-11-05',
        chairman: 'GS. Hoàng S',
        averageScore: 89.0,
        conclusion: 'Đạt yêu cầu, đề nghị Ban Biên soạn bổ sung thêm ví dụ lâm sàng trước khi xuất bản.',
        draftStatus: 'Đã thẩm định',
        id: 0,
        members: [
            {
                lecturerCode: "GVH008",
                name: "GS. Hoàng S",
                role: "Chủ tịch",
                score: 9.2,
                comment:
                    "Nội dung chuyên môn sâu sắc, cập nhật, bám sát đề cương. Bố cục logic, khoa học. Cần bổ sung thêm một số trường hợp lâm sàng minh họa để tăng tính ứng dụng.",
            },
            {
                lecturerCode: "GVI009",
                name: "TS. Đào T",
                role: "Thư ký",
                score: 8.7,
                comment:
                    "Giáo trình có tính hệ thống cao, ngôn ngữ rõ ràng. Hình ảnh minh họa chất lượng. Cần kiểm tra lại một vài lỗi chính tả nhỏ và thống nhất cách trình bày tài liệu tham khảo.",
            },
            {
                lecturerCode: "GVJ010",
                name: "PGS. Lê X",
                role: "Ủy viên phản biện",
                score: 8.9,
                comment:
                    "Đánh giá cao sự đầu tư về nội dung và phương pháp biên soạn. Đề xuất mở rộng thêm phần về tương tác thuốc để hoàn thiện hơn.",
            },
            {
                lecturerCode: "GVK011",
                name: "TS. Trần Y",
                role: "Ủy viên",
                score: 8.8,
                comment:
                    "Giáo trình cung cấp kiến thức toàn diện, dễ hiểu. Nên xem xét thêm các phác đồ điều trị mới nhất cho một số bệnh lý điển hình.",
            },
        ]
    },
];