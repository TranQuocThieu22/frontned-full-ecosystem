"use client";

import { Button, Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import {
  MyButtonCreate,
  MyDateInput,
  MyFileInput,
  MySelect,
  MyTextArea,
  MyTextInput
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import E_LectureEstablishmentEditorialMembers from "./E_LectureEstablishmentEditorialMembers";
import { E_LectureEstablishmentEditorialViewModel, EditorialBoardMemberViewModel } from "./interfaces/E_LectureEstablishmentEditorialViewModel";

export default function E_LectureEstablishmentEditorialCreate() {
  const [members, setMembers] = useState<EditorialBoardMemberViewModel[]>([]);

  const form = useForm<E_LectureEstablishmentEditorialViewModel>({
    initialValues: {
      code: "",
      name: "",
      boardLeader: "",
      lectureCode: "",
      lectureName: "",
      establishmentDate: "",
      status: "1",
      notes: "",
    },
    validate: {
    }
  });

  const handleChangeMember = (value: string | null, rowIndex: number) => {
    const member = mockStaff.find(item => item.code === value);
    if (member) {
      setMembers(prev => prev.map((item, index) =>
        index === rowIndex
          ? { ...member, role: item.role }
          : item
      ));
    }
  };

  const handleAddMember = () => {
    if (mockStaff.length > 0) {
      const newMember: EditorialBoardMemberViewModel = {
        ...mockStaff[0],
        role: mockRoles[3], // Default to "Thành viên"
      };
      setMembers(prev => [...prev, newMember]);
    }
  };

  const handleChangeRole = (value: string | null, rowIndex: number) => {
    if (value) {
      setMembers(prev => prev.map((item, index) =>
        index === rowIndex
          ? { ...item, role: value }
          : item
      ));
    }
  };

  const handleDeleteMember = (rowIndex: number) => {
    setMembers(prev => prev.filter((_, index) => index !== rowIndex));
  };

  const addRowData = {
    id: -1,
    code: "",
    fullName: "",
    department: "",
    role: "",
    isAddRow: true
  };

  const tableData = [...members, addRowData];

  const memberColumns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      header: "Mã NS",
      accessorKey: "code",
      size: 120,
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
          );
        }
        return (
          <MySelect
            value={row.original.code}
            onChange={(value) => handleChangeMember(value, row.index)}
            data={mockStaff.map(item => ({ value: item.code || "", label: item.code || "" }))}
          />
        );
      }
    },
    {
      header: "Họ tên",
      accessorKey: "fullName",
      size: 200,
      Cell: ({ row }) => {
        if (row.original.isAddRow) return "";
        return row.original.fullName;
      }
    },
    {
      header: "Đơn vị",
      accessorKey: "department",
      size: 200,
      Cell: ({ row }) => {
        if (row.original.isAddRow) return "";
        return row.original.department;
      }
    },
    {
      header: "Vai trò",
      accessorKey: "role",
      size: 150,
      Cell: ({ row }) => {
        if (row.original.isAddRow) return "";
        return (
          <MySelect
            value={row.original.role}
            onChange={(value) => handleChangeRole(value, row.index)}
            data={mockRoles.map(item => ({ value: item, label: item }))}
          />
        );
      },
    },
  ], []);

  return (
    <MyButtonCreate
      objectName="Chi tiết ban Biên soạn"
      form={form}
      onSubmit={(values) => {
        const submitData = {
          ...values,
          members: members
        };
        console.log("Submit values:", submitData);
      }}
      modalSize="xl"
    >
      <Tabs defaultValue="general" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="general">Thông tin chung</Tabs.Tab>
          <Tabs.Tab value="members">Thành viên</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt="md">
          <Grid>
            <Grid.Col span={6}>
              <MyTextInput
                label="Mã ban biên soạn"
                placeholder="Nhập mã ban biên soạn"
                {...form.getInputProps("code")}
              />

              <MyTextInput
                label="Tên ban biên soạn"
                placeholder="Nhập tên ban biên soạn"
                mt="md"
                {...form.getInputProps("name")}
              />

              <MySelect
                label="Đề xuất"
                placeholder="Chọn đề xuất bài giảng"
                data={[
                  { value: "PYB-2025-001", label: "PYB-2025-001 - Lập trình Python cơ bản" },
                  { value: "AIH-2025-002", label: "AIH-2025-002 - Trí tuệ nhân tạo trong Y học" },
                  { value: "VLIT-2025-006", label: "VLIT-2025-006 - Lịch sử Văn học Việt Nam" },
                ]}
                mt="md"
                {...form.getInputProps("lectureCode")}
              />

              <MyTextArea
                label="Mục tiêu/ Yêu cầu công việc"
                rows={4}
                mt="md"
                {...form.getInputProps("tagret")}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <MyDateInput
                label="Ngày thành lập"
                placeholder="dd/mm/yyyy"
                {...form.getInputProps("establishmentDate")}
              />
              <MyFileInput
                label="Đính kèm file"
                mt="md"
                {...form.getInputProps("fileUrl")}
              />
              <MyTextArea
                label="Ghi chú"
                rows={4}
                mt="md"
                {...form.getInputProps("notes")}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="members" pt="md">
          <E_LectureEstablishmentEditorialMembers />
        </Tabs.Panel>
      </Tabs>
    </MyButtonCreate>
  );
}

export const mockStaff: EditorialBoardMemberViewModel[] = [
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
];

export const mockRoles: string[] = [
  "Trưởng ban",
  "Phó ban",
  "Thư ký",
  "Thành viên",
];