import { Button } from "@mantine/core"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { MyDataTable, MySelect } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo, useState } from "react"
import { IReviewCommitteeLectureViewModel } from "./interfaces/ReviewCommitteeViewModel"

export default function ReviewCommitteeLectures({ data }: { data?: IReviewCommitteeLectureViewModel[] }) {
    const [lectures, setLectures] = useState<IReviewCommitteeLectureViewModel[]>([...(data || [])])

    const handleChangeMember = (value: string | null, rowIndex: number) => {
        const lecture = mockLectures.find(item => item.code === value)
        if (lecture) {
            setLectures(prev => prev.map((item, index) =>
                index === rowIndex
                    ? { ...lecture } // Giữ lại role hiện tại
                    : item
            ))
        }
    }

    // Thêm thành viên mới
    const handleAddMember = () => {
        if (mockLectures.length > 0) {
            const newMember: IReviewCommitteeLectureViewModel = {
                ...mockLectures[0],
            }
            setLectures(prev => [...prev, newMember])
        }
    }

    // Xóa thành viên
    const handleDeleteMember = (rowIndex: number) => {
        setLectures(prev => prev.filter((_, index) => index !== rowIndex))
    }

    const addRowData = {
        id: -1,
        name: "",
        code: "",
        unit: "",
        isAddRow: true
    }

    const tableData = [...lectures, addRowData]

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            header: "Mã bài giảng",
            accessorKey: "code",
            Cell: ({ row }) => {
                if (row.original.isAddRow) {
                    return (
                        <Button
                            leftSection={<IconPlus size={16} />}
                            variant="outline"
                            size="sm"
                            onClick={handleAddMember}
                            fullWidth
                        >
                            Thêm
                        </Button>
                    )
                }
                return (
                    <MySelect
                        value={row.original.code}
                        onChange={(value) => handleChangeMember(value, row.index)}
                        data={mockLectures.map(item => ({ value: String(item.code), label: String(item.code) }))}
                    />
                )
            }
        },
        {
            header: "Tên bài giảng",
            accessorKey: "name",
            Cell: ({ row }) => {
                if (row.original.isAddRow) return ""
                return row.original.name
            }
        },
    ], [])

    return (
        <MyDataTable
            columns={columns}
            data={tableData}
            enableRowNumbers={false}
            renderRowActions={({ row }) => {
                if (row.original.isAddRow) return ""
                return (
                    <Button
                        color="red"
                        variant="subtle"
                        size="sm"
                        onClick={() => handleDeleteMember(row.index)}
                    >
                        <IconTrash />
                    </Button>
                )
            }}
        />
    );
}

export const mockLectures: IReviewCommitteeLectureViewModel[] = [
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
    {
        id: 3,
        code: "AIH-2025-001",
        name: "Bài giảng Hệ thống thông tin Y tế",
    },
    {
        id: 4,
        code: "VLIT-2025-006",
        name: "Bài giảng Văn học Việt Nam",
    },
]
