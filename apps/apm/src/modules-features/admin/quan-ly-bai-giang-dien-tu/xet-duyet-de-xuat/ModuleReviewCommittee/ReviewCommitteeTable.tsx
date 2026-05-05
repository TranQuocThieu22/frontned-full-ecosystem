import { useQuery } from "@tanstack/react-query";
import { MyButton, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IReviewCommitteeInfoViewModel } from "./interfaces/ReviewCommitteeViewModel";
import ReviewCommitteeCreate from "./ReviewCommitteeCreate";
import ReviewCommitteeDelete from "./ReviewCommitteeDelete";
import ReviewCommitteeUpdate from "./ReviewCommitteeUpdate";
import CompilationTypeDeleteList from "@/modules-features/admin/SystemMasterData/CompilationType/CompilationTypeDeleteList";

export const EnumReviewCommitteeStatus = {
    "1": "Chờ họp",
    "2": "Đã hoàn thành",
};


export default function ReviewCommitteeTable() {
    const query = useQuery({
        queryKey: ["review-committee"],
        queryFn: () => {
            return mockData;
        }
    })

    const columns = useMemo<MRT_ColumnDef<IReviewCommitteeInfoViewModel>[]>(() => [
        {
            header: "Mã hội đồng",
            accessorKey: "code",
        },
        {
            header: "Tên hội đồng",
            accessorKey: "name",
            size: 400
        },
        {
            header: "Ngày họp dự kiến",
            accessorKey: "date",
        },
        {
            header: "Địa điểm họp",
            accessorKey: "location",
        },
        {
            header: "Chủ tịch Hội đồng",
            accessorKey: "chairperson",
            accessorFn: (row) => {
                return row.members.find((member) => member.role === "Chủ tịch")?.name;
            }
        },
        {
            header: "Thư ký Hội đồng",
            accessorKey: "secretary",
            accessorFn: (row) => {
                return row.members.find((member) => member.role === "Thư ký")?.name;
            }
        },
        {
            header: "Danh sách Ủy viên",
            accessorKey: "members",
            accessorFn: (row) => {
                return row.members.filter((member) => member.role === "Ủy viên phản biện").map((member) => member.name).join(", ");
            },
            size: 300
        },
        {
            header: "Các Đề xuất được phân công",
            accessorKey: "lectures.code",
            accessorFn: (row) => {
                return row.lectures.map((lecture) => lecture.code).join(", ");
            },
            size: 300
        },
        {
            header: "Trạng thái",
            accessorKey: "status",
            accessorFn: (row) => {
                return EnumReviewCommitteeStatus[row.status as keyof typeof EnumReviewCommitteeStatus];
            }
        },
    ], []);

    return (
        <MyFieldset
            title="Danh sách hội đồng thẩm định"
        >
            <MyDataTable
                columns={columns}
                renderTopToolbarCustomActions={({ table }) => {
                    return (
                        <>
                            <ReviewCommitteeCreate />
                            <MyButton crudType="import" />
                            <MyButton crudType="export" />
                            <CompilationTypeDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
                        </>
                    )
                }}
                data={query.data || []}
                renderRowActions={({ row }) => {
                    return (
                        <>
                            <ReviewCommitteeUpdate data={row.original} />
                            <ReviewCommitteeDelete
                                id={row.original.id}
                                code={row.original.code}
                            // isTied={row.original.lectures.length > 0}
                            />
                        </>
                    )
                }}
            />
        </MyFieldset>
    );
}

const mockData: IReviewCommitteeInfoViewModel[] = [
    {
        id: 1,
        code: "HĐ-BGDT-001",
        name: "Hội đồng Xét duyệt BGDT Quý 3/2025",
        date: "2025-09-15",
        location: "Phòng 101",
        status: "1",
        members: [
            {
                id: 1,
                code: "GV0258",
                name: "TS. Nguyễn Văn A",
                unit: "KTCN",
                role: "Chủ tịch",
            },
            {
                id: 2,
                code: "GV0259",
                name: "PGS.TS. Trần Thị B",
                unit: "QTKT",
                role: "Thư ký",
            },
            {
                id: 3,
                code: "GV0260",
                name: "TS. Lê Văn C",
                unit: "KHMT",
                role: "Ủy viên phản biện",
            },
            {
                id: 4,
                code: "GV0261",
                name: "ThS. Phạm Thị D",
                unit: "KHMT",
                role: "Ủy viên phản biện",
            }
        ],
        lectures: [
            {
                id: 1,
                code: "PYB-2025-001",
                name: "Bài giảng Phân tích Dữ liệu Lớn",
            },
            {
                id: 2,
                code: "AGILE-2025-003",
                name: "Bài giảng Agile",
            },
        ],
        filePath: "quyet_dinh_14_2024.pdf",
        fileDetail: {
            fileName: "quyet_dinh_14_2024.pdf",
            fileExtension: "pdf",
            fileBase64String: "",
        },
    },
    {
        id: 2,
        code: "HĐ-BGDT-002",
        name: "Hội đồng Thẩm định BGDT Chuyên ngành Y học",
        date: "2025-10-20",
        location: "Trực tuyến (Zoom)",
        status: "1",
        members: [
            {
                id: 1,
                code: "GV0262",
                name: "GS.TS. Hoàng Kim E",
                unit: "KTCN",
                role: "Chủ tịch",
            }, {
                id: 2,
                code: "GV0263",
                name: "PGS.TS. Phan Thị G",
                unit: "QTKT",
                role: "Thư ký",
            }, {
                id: 3,
                code: "GV0264",
                name: "PGS.TS. Đỗ Văn H",
                unit: "KHMT",
                role: "Ủy viên phản biện",
            }, {
                id: 4,
                code: "GV0265",
                name: "ThS. Ngô Minh I",
                unit: "KHMT",
                role: "Ủy viên phản biện",
            }
        ],
        lectures: [
            {
                id: 1,
                code: "AIH-2025-001",
                name: "Bài giảng Hệ thống thông tin Y tế",
            },
        ],
        filePath: "quyet_dinh_14_2024.pdf",
        fileDetail: {
            fileName: "quyet_dinh_14_2024.pdf",
            fileExtension: "pdf",
            fileBase64String: "",
        },
    },
    {
        id: 3,
        code: "HĐ-BGDT-003",
        name: "Hội đồng BGDT Khoa Văn học",
        date: "2025-09-25",
        location: "Phòng học Khoa Văn học",
        status: "2",
        members: [
            {
                id: 1,
                code: "GV0266",
                name: "PGS.TS Bùi Minh K",
                unit: "VH",
                role: "Chủ tịch",
            }, {
                id: 2,
                code: "GV0267",
                name: "PGS.TS. Đào Thị L",
                unit: "VH",
                role: "Thư ký",
            }, {
                id: 3,
                code: "GV0268",
                name: "ThS. Cao Xuân M",
                unit: "KHMT",
                role: "Ủy viên phản biện",
            }, {
                id: 4,
                code: "GV0269",
                name: "ThS. Trịnh Văn N",
                unit: "KHMT",
                role: "Ủy viên phản biện",
            }
        ],
        lectures: [
            {
                id: 1,
                code: "VLIT-2025-006",
                name: "Bài giảng Văn học Việt Nam",
            },
        ],
        filePath: "quyet_dinh_14_2024.pdf",
        fileDetail: {
            fileName: "quyet_dinh_14_2024.pdf",
            fileExtension: "pdf",
            fileBase64String: "",
        },
    }
]