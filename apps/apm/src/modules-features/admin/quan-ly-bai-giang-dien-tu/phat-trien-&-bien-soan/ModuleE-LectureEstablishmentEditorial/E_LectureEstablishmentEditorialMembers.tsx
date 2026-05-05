import { Button } from "@mantine/core"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { MyCenterFull, MyDataTable, MySelect } from "aq-fe-framework/components"
import { MRT_ColumnDef } from "mantine-react-table"
import { useMemo, useState } from "react"
import { EditorialBoardMemberViewModel } from "./interfaces/E_LectureEstablishmentEditorialViewModel"


export default function E_LectureEstablishmentEditorialMembers({ data }: { data?: EditorialBoardMemberViewModel[] }) {
  const [members, setMembers] = useState<EditorialBoardMemberViewModel[]>([...(data || [])])

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

  const handleAddMember = () => {
    if (mockMember.length > 0) {
      const newMember: EditorialBoardMemberViewModel = {
        ...mockMember[0],
        role: mockRole[2],
      }
      setMembers(prev => [...prev, newMember])
    }
  }

  const handleChangeRole = (value: string | null, rowIndex: number) => {
    if (value) {
      setMembers(prev => prev.map((item, index) =>
        index === rowIndex
          ? { ...item, role: value }
          : item
      ))
    }
  }

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
            data={mockMember.map(item => ({ value: item.code || "", label: item.code || "" }))}
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
          <MyCenterFull>
            <Button
              color="red"
              variant="subtle"
              size="sm"
              onClick={() => handleDeleteMember(row.index)}
            >
              <IconTrash />
            </Button>
          </MyCenterFull>
        )
      }}
    />
  );
}

export const mockMember: EditorialBoardMemberViewModel[] = [
  {
    id: 1,
    code: "GV001",
    name: "TS. Nguyễn Văn A",
    unit: "Khoa CNTT",
  },
  {
    id: 2,
    code: "GV002",
    name: "Lê Thị B",
    unit: "Khoa CNTT",
  },
  {
    id: 3,
    code: "GV003",
    name: "Trần Văn C",
    unit: "Khoa CNTT",
  },
  {
    id: 4,
    code: "GV004",
    name: "ThS. Phạm Thị F",
    unit: "Khoa CNTT",
  },
  {
    id: 5,
    code: "GV005",
    name: "PGS.TS. Trần Thị D",
    unit: "Khoa Y",
  },
  {
    id: 6,
    code: "GV006",
    name: "TS.Phạm Quang E",
    unit: "Khoa Y",
  },
  {
    id: 7,
    code: "GV007",
    name: "ThS. Ngô Minh I",
    unit: "Khoa Y",
  },
  {
    id: 8,
    code: "GV008",
    name: "PGS.TS. Bùi Minh K",
    unit: "Khoa Văn",
  },
  {
    id: 9,
    code: "GV009",
    name: "TS.Đào Thị L",
    unit: "Khoa Văn",
  },
  {
    id: 10,
    code: "GV010",
    name: "ThS. Cao Xuân M",
    unit: "Khoa Văn",
  },
]

export const mockRole: string[] = [
  "Trưởng ban",
  "Phó ban",
  "Thư ký",
  "Thành viên",
]