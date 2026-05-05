import CompilationTypeDeleteList from "@/modules-features/(11)/CompilationType/CompilationTypeDeleteList";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonViewPDF, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { ILectureProposalRegistrationInfoViewModel } from "./interfaces/ILectureProposalRegistrationViewModel";
import LectureProposalRegistrationCreate from "./LectureProposalRegistrationCreate";
import LectureProposalRegistrationDelete from "./LectureProposalRegistrationDelete";
import LectureProposalRegistrationUpdate from "./LectureProposalRegistrationUpdate";


export default function LectureProposalRegistrationTable() {
    const Query = useQuery({
        queryKey: ["lecture-proposal-registration"],
        queryFn: () => {
            return mockData;
        },
    })

    const columns = useMemo<MRT_ColumnDef<ILectureProposalRegistrationInfoViewModel>[]>(() => [
        {
            header: "Tên bài giảng",
            accessorKey: "name",
        },
        {
            header: "Mã bài giảng (Nếu có)",
            accessorKey: "code",
        },
        {
            header: "Lĩnh vực Khoa học",
            accessorFn: (row) => {
                return row.scienceFields.map((field) => field.name).join(", ")
            },
            size: 400,
        },
        {
            header: "Mục tiêu bài giảng",
            accessorKey: "objective",
            size: 400,
        },
        {
            header: "Đối tượng Học viên",
            accessorKey: "targetAudience",
        },
        {
            header: "Người phụ trách chính",
            accessorKey: "responsiblePerson",
            accessorFn: (row) => `${row.responsiblePerson.name} (Mã GV: ${row.responsiblePerson.code})`
        },
        {
            header: "Danh sách thành viên",
            accessorFn: (row) => {
                return row.members?.map((member) => `${member.name} (Mã GV: ${member.code})`).join(", ")
            },
            size: 400,
        },
        {
            header: "Đề cương sơ bộ/Tóm tắt nội dung",
            accessorKey: "summary",
            size: 400,
        },
        {
            header: "Thời gian bắt đầu dự kiến",
            accessorKey: "startDate",
        },
        {
            header: "Thời gian hoàn thành dự kiến",
            accessorKey: "endDate",
        },
        {
            header: "Dự kiến kinh phí",
            accessorKey: "budget",
            accessorFn: (row) => {
                return `${row.budget.toLocaleString()} VNĐ`
            }
        },
        {
            header: "Nhu cầu hổ trợ kỹ thuật/công nghệ",
            accessorKey: "requirements",
        },
        {
            header: "Đính kèm tài liệu",
            accessorFn: (row) => {
                return (
                    <MyCenterFull>
                        <MyButtonViewPDF id={row.id} />
                    </MyCenterFull>
                )
            }
        },
        {
            header: "Trạng thái đăng ký",
            accessorKey: "status",
        },
    ], []);

    return (
        <MyFieldset
            title="Danh sách đăng ký thực hiện bài giảng"
        >
            <MyDataTable
                columns={columns}
                data={Query.data || []}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <LectureProposalRegistrationCreate />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <CompilationTypeDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                renderRowActions={({ row }) => {
                    return (
                        <MyCenterFull>
                            <LectureProposalRegistrationUpdate values={row.original} />
                            <LectureProposalRegistrationDelete id={row.original.id} code={row.original.code} isTied={false} />
                        </MyCenterFull>
                    )
                }}
            />
        </MyFieldset>
    );
}

const mockData: ILectureProposalRegistrationInfoViewModel[] = [
    {
        id: 1,
        name: "Lập trình Python cơ bản",
        code: "PYB-2025-001",
        scienceFieldCodes: ["CNTT"],
        scienceFields: [
            {
                id: 1,
                name: "Công nghệ thông tin",
                code: "CNTT",
            }
        ],
        objective: "Giúp sinh viên nắm vững cú pháp và lập trình hướng đối tượng; Áp dụng Python giải quyết bài toán cơ bản",
        targetAudience: "Sinh viên năm nhất ngành CNTT",
        responsiblePerson: {
            id: 1,
            code: "12345",
            name: "Nguyễn Văn A",
        },
        members: [
            {
                id: 5,
                code: "67890",
                name: "Nguyễn Thị B",
                unit: "KCNTT",
                role: "Thành viên",
            },
            {
                id: 6,
                code: "11223",
                name: "Trần Văn C",
                unit: "KDDT",
                role: "Thành viên",
            },
        ],
        startDate: "2025-09-01",
        endDate: "2025-02-28",
        budget: 50000000,
        requirements: "Cần nền tảng LMS; Hỗ trợ thiết bị ghi âm",
        status: "Chờ sơ duyệt",
        summary: "Gồm 6 module; Giới thiệu Python; Cấu trúc dữ liệu; Lập trình hướng đối tượng; Xử lý file; Các thư viện cơ bản; Bài tập thực hành",
        filePath: "quyet_dinh_14_2024.pdf",
        fileDetail: {
            fileName: "quyet_dinh_14_2024.pdf",
            fileExtension: "pdf",
            fileBase64String: "",
        },
    },
    {
        id: 2,
        name: "Trí tuệ nhân tạo trong Y học",
        code: "AIH-2025-002",
        scienceFieldCodes: ["YHC", "AI"],
        scienceFields: [
            {
                id: 2,
                name: "Y học",
                code: "YHC",
            },
            {
                id: 3,
                name: "Trí tuệ nhân tạo",
                code: "AI",
            },
        ],
        objective: "Cung cấp kiến thức cơ bản về AI cho lĩnh vực y tế; Phân tích các ứng dụng AI trong chẩn đoán và điều trị",
        targetAudience: "Bác sĩ; Nghiên cứu sinh ngành y học",
        responsiblePerson: {
            id: 2,
            code: "54321",
            name: "PGS.TS. Trần Thị D",
        },
        members: [
            {
                id: 2,
                code: "98765",
                name: "TS. Phạm Quang E",
                unit: "KDDT",
                role: "Thành viên",
            },
        ],
        startDate: "2025-10-01",
        endDate: "2025-03-31",
        budget: 75000000,
        requirements: "Cần studio quay video; Phần mềm chỉnh sửa video chuyên dụng",
        status: "Chờ sơ duyệt",
        summary: "Tổng quan về AI; Học máy; Học sâu; Ứng dụng AI trongn chuẩn đoán hình ảnh; Ứng dụng AI trong quản lý bệnh án",
        filePath: "quyet_dinh_14_2024.pdf",
        fileDetail: {
            fileName: "quyet_dinh_14_2024.pdf",
            fileExtension: "pdf",
            fileBase64String: "",
        },
    },
    {
        id: 3,
        name: "Quản lý dự án Agile cho NCKH",
        code: "AGILE-2025-003",
        scienceFieldCodes: ["KQT", "CNTT"],
        scienceFields: [
            {
                id: 1,
                name: "Công nghệ thông tin",
                code: "CNTT",
            },
            {
                id: 4,
                name: "Khoa học quản trị",
                code: "KQT",
            }
        ],
        objective: "Giúp sinh viên nắm vững các phương pháp quản lý dự án Agile; Áp dụng Agile vào quản lý dự án NCKH",
        targetAudience: "Giảng viên, Nghiên cứu viên",
        responsiblePerson: {
            id: 3,
            code: "23456",
            name: "TS. Hoàng Minh F",
        },
        members: [
        ],
        startDate: "2025-11-01",
        endDate: "2025-01-31",
        budget: 30000000,
        requirements: "Cần tài khoản công cụ quản lý dự án",
        status: "Chờ sơ duyệt",
        summary: "Giới thiệu về Agile; Scrum framwork; Kanban; Quản lý rủi ro trong Agile; Case study dự án NCKH",
        filePath: "quyet_dinh_14_2024.pdf",
    }
]