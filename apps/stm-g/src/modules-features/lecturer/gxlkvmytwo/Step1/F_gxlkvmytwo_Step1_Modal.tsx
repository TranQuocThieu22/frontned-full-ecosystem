import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import {
  Box,
  Loader,
  Modal,
  Text,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface I_student {
  code: string;
  avatar: string;
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  birthPlace: string;
  email: string;
  phone: string;
  address: string;
  idNumber: string;
  idIssueDate: Date;
  idIssuePlace: string;
  ngayCapNhat?: Date | undefined;
  nguoiCapNhat?: string;
}

const F_students: I_student[] = [
  {
    code: "1",
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/refs/heads/master/.demo/avatars/avatar-5.png",
    fullName: "Tô Ngọc Nhi",
    dateOfBirth: new Date("2000/11/20"),
    gender: "Nam",
    birthPlace: "Lâm Đồng",
    email: "ngocnhi@gmail.com",
    phone: "0909090909",
    address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    idNumber: "025432224568",
    idIssueDate: new Date("2015/05/15"),
    idIssuePlace: "CCS&QLDC"
  },
  {
    code: "2",
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/refs/heads/master/.demo/avatars/avatar-2.png",
    fullName: "Nguyễn Văn An",
    dateOfBirth: new Date("1999/05/15"),
    gender: "Nam",
    birthPlace: "Hà Nội",
    email: "vanan@gmail.com",
    phone: "0901234567",
    address: "456 Lê Lợi, Quận 1, TP.HCM",
    idNumber: "025987654321",
    idIssueDate: new Date("2017/03/20"),
    idIssuePlace: "CCS&QLDC"
  },
  {
    code: "3",
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/refs/heads/master/.demo/avatars/avatar-5.png",
    fullName: "Trần Thị Hoa",
    dateOfBirth: new Date("2001/08/10"),
    gender: "Nữ",
    birthPlace: "Đà Nẵng",
    email: "hoatran@gmail.com",
    phone: "0912345678",
    address: "789 Trần Hưng Đạo, Quận 3, TP.HCM",
    idNumber: "026123456789",
    idIssueDate: new Date("2019/07/12"),
    idIssuePlace: "CCS&QLDC"
  },
  {
    code: "4",
    avatar: "https://raw.githubusercontent.com/mantinedev/mantine/refs/heads/master/.demo/avatars/avatar-2.png",
    fullName: "Lê Minh Tuấn",
    dateOfBirth: new Date("1998/12/25"),
    gender: "Nam",
    birthPlace: "Cần Thơ",
    email: "tuanle@gmail.com",
    phone: "0978123456",
    address: "321 Võ Văn Tần, Quận 10, TP.HCM",
    idNumber: "025765432198",
    idIssueDate: new Date("2016/09/30"),
    idIssuePlace: "CCS&QLDC"
  }
];

interface SearchModalProps {
  opened: boolean;
  onClose: () => void;
  searchQuery: string;
  onStudentSelect: (student: I_student) => void;
}

export default function F_gxlkvmytwo_Step1_Modal({
  opened,
  onClose,
  searchQuery,
  onStudentSelect,
}: SearchModalProps) {
  const searchStudentsQuery = useQuery({
    queryKey: ["searchStudents", searchQuery],
    queryFn: async () => {
      // FIXME: Call API
      // const response = await baseAxios.post("");
      return F_students.filter(
        (student) =>
          student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    enabled: searchQuery.trim().length > 0,
  });

  const columns = useMemo<MRT_ColumnDef<I_student>[]>(
    () => [
      {
        header: "Mã SV",
        accessorKey: "code",
      },
      {
        header: "Họ tên",
        accessorKey: "fullName",
      },
      {
        header: "Ngày sinh",
        accessorKey: "dateOfBirth",
        Cell: ({ row }) => (
          <Text>{utils_date_dateToDDMMYYYString(row.original.dateOfBirth)}</Text>
        ),
      },
      {
        header: "Giới tính",
        accessorKey: "gender",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Số điện thoại",
        accessorKey: "phone",
      },
    ],
    []
  );

  const handleRowClick = (student: I_student) => {
    onStudentSelect(student);
    onClose();
  };

  const students = searchStudentsQuery.data || [];
  const loading = searchStudentsQuery.isLoading || searchStudentsQuery.isFetching;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Kết quả tìm kiếm"
      size="xl"
      centered
    >
      <Box>
        {loading ? (
          <Text ta="center">
            <Loader size="sm" /> Đang tìm kiếm...
          </Text>
        ) : (
          <MyDataTable
            columns={columns}
            data={students}
            enableRowSelection={true}
            onRowSelectionChange={() => {
              if(!students[0]) return
              handleRowClick(students[0]);
            }}
          // onRowSelectionChange={(selectedRows) => {
          //   const selectedRowIds = Object.keys(selectedRows);
          //   if (selectedRowIds.length > 0) {
          //     const selectedStudent = students.find(student => student.code === selectedRowIds[0]);
          //     }
          //   }
          // }}
          />
        )}
      </Box>
    </Modal>
  );
}