import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { ENUM_GENDER } from "@/constants/enum/global";
import { utils_converter_enumToOptions } from "@/utils/converter";
import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Props {
  firstStep: () => void;
  prevStep: () => void;
  nextStep: () => void;
}

interface I_student {
  id: string;
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

interface I_Fee {


  id?: number;
  courseId?: number;
  feeType?: string;
  name?: string;
  price?: number;

}

const F_students: I_student[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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

const F_fees: I_Fee[] = [
  {
    id: 1,
    courseId: 1,
    feeType: 'Học phí',
    name: 'Lập trình web 2401',
    price: 1250000,
  },
  {
    id: 2,
    courseId: 2,
    feeType: 'Lệ phí thi',
    name: 'Lập trình web 2401',
    price: 300000,
  },
];


export default function F_gxlkvmytwo_Step1_Read({ firstStep, prevStep, nextStep }: Props) {

  const selectedStudent = F_students[0];

  const columns = useMemo<MRT_ColumnDef<I_Fee>[]>(
    () => [
      {
        header: "Loại thu",
        accessorKey: "feeType",
      },
      {
        header: "Tên dịch vụ",
        accessorKey: "name",
      },
      {
        header: "Đơn giá",
        accessorKey: "price",
        Cell: ({ row }) => (
          <MyNumberFormatter value={row.original.price} />
        ),
      },
    ],
    []
  );
  const genderOptions = utils_converter_enumToOptions(ENUM_GENDER);
  return (
    <Box pos="relative">
      <MyFieldset title="Thông tin học viên" p="md">
        <Box pos="relative">
          {selectedStudent ? (
            <Grid>
              <Grid.Col span={9}>
                <Grid gutter="xs">
                  <Grid.Col span={4}>
                    <TextInput
                      label="Mã học viên"
                      value={selectedStudent.id}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Họ tên"
                      value={selectedStudent.fullName}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <DateInput
                      label="Ngày sinh"
                      value={selectedStudent.dateOfBirth}
                      valueFormat="DD/MM/YYYY"
                      readOnly
                      rightSection={<IconSearch size={16} style={{ opacity: 0 }} />}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Nơi sinh"
                      value={selectedStudent.birthPlace}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Select
                      label="Giới tính"
                      value={selectedStudent.gender}
                      data={genderOptions}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Email"
                      value={selectedStudent.email}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Số điện thoại"
                      value={selectedStudent.phone}
                      readOnly
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Địa chỉ"
                      value={selectedStudent.address}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="CCCD"
                      value={selectedStudent.idNumber}
                      readOnly
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <DateInput
                      label="Ngày cấp CCCD"
                      value={selectedStudent.idIssueDate}
                      valueFormat="DD/MM/YYYY"
                      readOnly
                      rightSection={<IconSearch size={16} style={{ opacity: 0 }} />}
                    />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <TextInput
                      label="Nơi cấp CCCD"
                      value={selectedStudent.idIssuePlace}
                      readOnly
                    />
                  </Grid.Col>
                </Grid>
              </Grid.Col>

              <Grid.Col span={3}>
                <Stack align="center">
                  <Paper shadow="xs" style={{ width: 150, height: 150 }}>
                    <Image
                      src={selectedStudent.avatar}
                      alt="Student photo"
                      fallbackSrc="https://placehold.co/150x150"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Paper>
                </Stack>
              </Grid.Col>
            </Grid>
          ) : (
            <Text size="sm" fw={500}>Không tìm thấy học viên</Text>
          )}

        </Box>
      </MyFieldset>
      <MyFieldset mt={10} title="Danh sách dịch vụ đã đăng ký">
        <MyDataTable
          columns={columns}
          data={F_fees}
        />
        <Group justify="end" mt="md">
          <Button onClick={firstStep}>Hoàn thành</Button>
        </Group>
      </MyFieldset>
    </Box>
  )
}