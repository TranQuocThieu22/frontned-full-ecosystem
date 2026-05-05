import { Button } from "@mantine/core"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { MyDataTable, MySelect } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo, useState } from "react"
import { IReviewCommitteeMemberViewModel } from "./interfaces/ReviewCommitteeViewModel"


export default function ReviewCommitteeMembers({ data }: { data?: IReviewCommitteeMemberViewModel[] }) {
    const [members, setMembers] = useState<IReviewCommitteeMemberViewModel[]>([...(data || [])])

    const handleChangeMember = (value: string | null, rowIndex: number) => {
        const member = mockMember.find(item => item.code === value)
        if (member) {
            setMembers(prev => prev.map((item, index) =>
                index === rowIndex
                    ? { ...member, role: item.role }
                    : item
            ))
        }
    }

    // Thêm thành viên mới
    const handleAddMember = () => {
        if (mockMember.length > 0) {
            const newMember: IReviewCommitteeMemberViewModel = {
                ...mockMember[0]!,
                role: mockRole[2],
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
                        value={row.original.code}
                        onChange={(value) => handleChangeMember(value, row.index)}
                        data={mockMember.map(item => ({ value: item.code, label: item.code }))}
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
            header: "Vai trò",
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

export const mockMember: IReviewCommitteeMemberViewModel[] = [
    {
        id: 1,
        code: "GV0258",
        name: "TS. Nguyễn Văn A",
        unit: "KTCN",
    },
    {
        id: 2,
        code: "GV0259",
        name: "PGS.TS. Trần Thị B",
        unit: "QTKT",
    },
    {
        id: 3,
        code: "GV0260",
        name: "TS. Lê Văn C",
        unit: "KHMT",
    },
    {
        id: 4,
        code: "GV0261",
        name: "ThS. Phạm Thị D",
        unit: "KHMT",
    },
    {
        id: 5,
        code: "GV0262",
        name: "GS.TS. Hoàng Kim E",
        unit: "KTCN",
    },{
        id: 6,
        code: "GV0263",
        name: "PGS.TS. Phan Thị G",
        unit: "QTKT",
    },{
        id: 7,
        code: "GV0264",
        name: "PGS.TS. Đỗ Văn H",
        unit: "KHMT",
    },{
        id: 8,  
        code: "GV0265",
        name: "ThS. Ngô Minh I",
        unit: "KHMT",
    },
    {
        id: 9,
        code: "GV0266",
        name: "PGS.TS Bùi Minh K",
        unit: "VH",
    },{
        id: 10,      
        code: "GV0267",
        name: "PGS.TS. Đào Thị L",
        unit: "VH",
    },{
        id: 11,  
        code: "GV0268",
        name: "ThS. Cao Xuân M",
        unit: "KHMT",
    },{
        id: 12,          
        code: "GV0269",
        name: "ThS. Trịnh Văn N",
        unit: "KHMT",
    }
]

export const mockRole: string[] = [
    "Chủ tịch",
    "Thư ký",
    "Ủy viên phản biện",
]