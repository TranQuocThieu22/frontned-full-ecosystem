import { Button } from "@mantine/core"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { MyDataTable, MySelect } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo, useState } from "react"
import { MemberViewModel, UserViewModel } from "./interfaces/ProposalReviewViewModel"


export default function LectureProposalRegistrationMembers({ data }: { data?: MemberViewModel[] }) {
    const [members, setMembers] = useState<MemberViewModel[]>([...(data || [])])

    const handleChangeMember = (value: string | null, rowIndex: number) => {
        const member = mockMember.find(item => item.id.toString() === value)
        if (member) {
            setMembers(prev => prev.map((item, index) =>
                index === rowIndex
                    ? { ...member, role: item.role } // Giữ lại role hiện tại
                    : item
            ))
        }
    }

    // Thêm thành viên mới
    const handleAddMember = () => {
        if (mockMember.length > 0) {
            const newMember: MemberViewModel = {
                ...mockMember[0]!,
                role: mockRole[1] || "",
            }
            setMembers(prev => [...prev, newMember])
        }
    }

    // Thay đổi chức vụ
    const handleChangeRole = (value: string | null, rowIndex: number) => {
        if (value) {
            setMembers(prev => prev.map((item, index) =>
                index === rowIndex
                    ? { ...item, role: value }
                    : item
            ))
        }
    }

    // Xóa thành viên
    const handleDeleteMember = (rowIndex: number) => {
        setMembers(prev => prev.filter((_, index) => index !== rowIndex))
    }

    const addRowData = {
        id: -1,
        name: "",
        code: "",
        unit: "",
        isAddRow: true
    }

    const tableData = [...members, addRowData]

    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            header: "Mã NS",
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
                        value={row.original.id.toString()}
                        onChange={(value) => handleChangeMember(value, row.index)}
                        data={mockMember.map(item => ({ value: item.id.toString(), label: item.code }))}
                    />
                )
            }
        },
        {
            header: "Họ tên",
            accessorKey: "name",
            Cell: ({ row }) => {
                if (row.original.isAddRow) return ""
                return row.original.name
            }
        },
        {
            header: "Đơn vị",
            accessorKey: "unit",
            Cell: ({ row }) => {
                if (row.original.isAddRow) return ""
                return row.original.unit
            }
        },
        {
            header: "Chức vụ",
            accessorKey: "role",
            Cell: ({ row }) => {
                if (row.original.isAddRow) return ""
                return (
                    <MySelect
                        value={row.original.role}
                        onChange={(value) => handleChangeRole(value, row.index)}
                        data={mockRole.map(item => ({ value: item.toString(), label: item }))}
                    />
                )
            },
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


export const mockMember: UserViewModel[] = [
    {
        id: 1,
        name: "Tô Ngọc Bảo",
        code: "GV0258",
        unit: "KCNTT",
    },
    {
        id: 2,
        name: "Tô Lanh",
        code: "GV0259",
        unit: "KDDT",
    },
    {
        id: 3,
        name: "Trần Thị Bích",
        code: "GV0260",
        unit: "KDDT",
    },
    {
        id: 4,
        name: "Nguyễn Đăng Khoa",
        code: "GV0261",
        unit: "KCNTT",
    },
    {
        id: 5,
        code: "67890",
        name: "Nguyễn Thị B",
        unit: "KCNTT",
    },
    {
        id: 6,
        code: "11223",
        name: "Trần Văn C",
        unit: "KDDT",
    },
    {
        id: 7,
        code: "98765",
        name: "TS. Phạm Quang E",
        unit: "KDDT",
    },
]

export const mockRole: string[] = [
    "Trưởng nhóm",
    "Thành viên",
]