import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyNumberFormatter from "@/components/DataDisplay/NumberFormatter/MyNumberFormatter";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Box, Button, Checkbox, Grid, Group, Tabs, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconBook, IconClipboardText, IconUserHexagon } from '@tabler/icons-react';
import { MRT_ColumnDef, MRT_RowSelectionState } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_gxlkvmytwo_Step2_Delete from "./F_gxlkvmytwo_Step2_Delete";

interface Props {
  firstStep: () => void;
  prevStep: () => void;
  nextStep: () => void;
}

interface I {
  code: number;
  name: string;
  schedule: string;
  openDate: string;
  hasExam: boolean;
  courseFee: number;
  examFee: number;
  ngayCapNhat?: Date | undefined,
  nguoiCapNhat?: string
}

interface I_Fee {
  code: number;
  courseId: number;
  feeType: 'Học phí' | 'Lệ phí thi';
  name: string;
  price: number;
}

const mockData: I[] = [
  {
    code: 1,
    name: "Lập trình web 2401",
    schedule: "Tối 2 4 6",
    openDate: "15/03/2025",
    hasExam: true,
    courseFee: 1250000,
    examFee: 300000,
    ngayCapNhat: new Date(),
    nguoiCapNhat: "Nguyễn Văn A"
  },
  {
    code: 2,
    name: "Lập trình mobile",
    schedule: "Tối 3 5 7",
    openDate: "15/03/2025",
    hasExam: true,
    courseFee: 1500000,
    examFee: 240000,
    ngayCapNhat: new Date(),
    nguoiCapNhat: "Nguyễn Văn A"
  }
];

export default function F_gxlkvmytwo_Step2_Read({ firstStep, prevStep, nextStep }: Props) {
  const [selectedRows, setSelectedRows] = useState<I_Fee[]>([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const columns = useMemo<MRT_ColumnDef<I>[]>(
    () => [
      {
        header: "Tên khóa học",
        accessorKey: "name",
      },
      {
        header: "Lịch học",
        accessorKey: "schedule",
      },
      {
        header: "Ngày khai giảng",
        accessorKey: "openDate",
      },
      {
        header: "Có thi",
        accessorKey: "hasExam",
        accessorFn(row) {
          return (
            <MyCenterFull>
              <Checkbox checked={!!row.hasExam} readOnly />
            </MyCenterFull>
          );
        },
      },
      {
        header: "Học phí",
        accessorKey: "courseFee",
        Cell: ({ row }) => (
          <MyNumberFormatter value={row.original.courseFee} />
        ),
      },
      {
        header: "Lệ phí thi",
        accessorKey: "examFee",
        Cell: ({ row }) => (
          <MyNumberFormatter value={row.original.examFee} />
        ),
      }
    ],
    []
  );

  const selectedColumns = useMemo<MRT_ColumnDef<I_Fee>[]>(
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

  //FIXME: func tạo mockdata bảng 2
  const generateFeeItems = (course: I): I_Fee[] => {
    return [
      {
        code: course.code * 10 + 1,
        courseId: course.code,
        feeType: 'Học phí',
        name: course.name,
        price: course.courseFee
      },
      {
        code: course.code * 10 + 2,
        courseId: course.code,
        feeType: 'Lệ phí thi',
        name: course.name,
        price: course.examFee
      }
    ];
  };

  const handleRowSelectionChange = (updater: MRT_RowSelectionState | ((old: MRT_RowSelectionState) => MRT_RowSelectionState)) => {
    let newRowSelection: MRT_RowSelectionState;

    if (typeof updater === 'function') {
      newRowSelection = updater(rowSelection);
    } else {
      newRowSelection = updater;
    }

    setRowSelection(newRowSelection);

    const selectedCourseIds = Object.keys(newRowSelection)
      .filter(code => newRowSelection[code])
      .map(code => parseInt(code));

    const existingCourseIds = new Set(
      selectedRows.map(item => item.courseId)
    );

    const newSelectedCourses = mockData
      .filter(course =>
        selectedCourseIds.includes(course.code) &&
        !existingCourseIds.has(course.code)
      );

    if (newSelectedCourses.length > 0) {
      const newFeeItems = newSelectedCourses.flatMap(generateFeeItems);
      setSelectedRows(prev => [...prev, ...newFeeItems]);
    }
  };

  return (
    <>
      <Grid gutter="md" mt="md">
        <Grid.Col span={7}>
          <MyFieldset title="Danh sách dịch vụ có thể đăng ký" p="md">
            <Tabs defaultValue="1">
              <Tabs.List>
                <Tabs.Tab value="1" leftSection={<IconBook size={12} />}>
                  Học và thi
                </Tabs.Tab>
                <Tabs.Tab value="2" leftSection={<IconClipboardText size={12} />}>
                  Chỉ học
                </Tabs.Tab>
                <Tabs.Tab value="3" leftSection={<IconUserHexagon size={12} />}>
                  Chỉ thi
                </Tabs.Tab>
              </Tabs.List>
              {/* TODO: Tạo 3 feat riêng để lấy data table tương ứng yêu cầu của từng tab */}
              <Tabs.Panel value="1">
                <Box>
                  <MyDataTable
                    enableRowSelection={true}
                    columns={columns}
                    data={mockData}
                    state={{ rowSelection }}
                    onRowSelectionChange={handleRowSelectionChange}
                    getRowId={(row) => row.code.toString()}
                  />
                </Box>
              </Tabs.Panel>

              <Tabs.Panel value="2">
                <MyDataTable
                  enableRowSelection={true}
                  columns={columns}
                  data={mockData}
                  state={{ rowSelection }}
                />
              </Tabs.Panel>

              <Tabs.Panel value="3">
                <MyDataTable
                  enableRowSelection={true}
                  columns={columns}
                  data={mockData}
                  state={{ rowSelection }}
                />
              </Tabs.Panel>
            </Tabs>
          </MyFieldset>
        </Grid.Col>

        <Grid.Col span={5} >
          <MyFieldset title="Danh sách dịch vụ đã đăng ký" h="100%">
            <MyDataTable
              columns={selectedColumns}
              data={selectedRows}
              enableColumnFilters={false}
              enableGlobalFilter={false}
              enableTopToolbar={false}
              getRowId={(row) => row.code.toString()}
              renderRowActions={({ row }) => {
                return (
                  <MyCenterFull>
                    {/* TODO: Sửa lại logic xóa data bảng 2 */}
                    <F_gxlkvmytwo_Step2_Delete code={row.original.code!} />
                  </MyCenterFull>
                );
              }}
            />
            <Box mt="md" style={{ textAlign: 'right' }}>
              <Text fw={500} c="blue">
                Tổng cộng: <MyNumberFormatter value={selectedRows.reduce((sum, item) => sum + item.price, 0)} />
              </Text>
            </Box>
          </MyFieldset>
        </Grid.Col>
      </Grid>
      <Group justify="end" mt="md">
        <Button variant="default" onClick={prevStep} leftSection={<IconArrowLeft />}>Quay lại</Button>
        <Button onClick={nextStep} rightSection={<IconArrowRight />}>Tiếp tục</Button>
      </Group>
    </>
  )
}
