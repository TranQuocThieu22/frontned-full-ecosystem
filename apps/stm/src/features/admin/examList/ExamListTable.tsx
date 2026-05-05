'use client'
import { dateUtils } from "@aq-fe/core-ui/shared/utils/dateUtils";
import { CustomColumnDef } from "@aq-fe/core-ui/shared/components/dataDisplay/CustomDataTable";
import { CustomDataTableAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomDataTableAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Badge, Button, Group, Text } from "@mantine/core";
import { IconBook2, IconCheck, IconClock, IconFlag, IconLock, IconPlayerPause, IconSquareCheckFilled, IconX } from "@tabler/icons-react";
import { useMemo } from "react";
import { examService } from "@/shared/APIs/examService";
import ExamCreateModal from "../ModuleExam/CRUDExam/ExamCreateModal";
import ExamDeleteButton from "../ModuleExam/CRUDExam/ExamDeleteButton";
import ExamDeleteListButton from "../ModuleExam/CRUDExam/ExamDeleteListButton";
import ExamUpdateModal from "../ModuleExam/CRUDExam/ExamUpdateModal";
import { IExam } from "../ModuleExam/CRUDExam/Interfaces/ExamViewModel";

export default function ExamListTable() {
  const query = useCustomReactQuery<IExam[], unknown, IExam[]>({
    queryKey: ["examList"],
    axiosFn: () => examService.getExamList(),
  });

  const columns = useMemo<CustomColumnDef<IExam>[]>(
    () => [
      {
        header: "Mã khóa thi",
        accessorKey: "code",
      },
      {
        header: "Tên khóa thi",
        accessorKey: "name",
      },
      {
        header: "Tên chương trình",
        accessorKey: "program.name",
      },
      {
        header: "Ngày thi",
        accessorKey: "examDate",
        accessorFn: (row) => (row.examDate ? dateUtils.toDDMMYYYY(row.examDate) : ""),
      },
      {
        header: "Trang thái",
        accessorKey: "status",
        accessorFn: (row) => <DisplayExamStatus ExamStatus={row.status!} />,
        size: 250,
      },
      {
        header: "Số lượng tối đa",
        accessorKey: "maxStudent",
      },
      {
        header: "Số lượng học viên",
        accessorKey: "courseSectionNumberTotal",
        accessorFn: (row) => <Text>{row.courseSectionNumberTotal}</Text>,
      },
      {
        header: "Tính chất phòng",
        accessorKey: "roomType.code",
        accessorFn: (row) => row.roomType?.name,
      },
    ],
    [],
  );

  return (
    <CustomDataTableAPI
      enableRowSelection
      enableRowNumbers
      columns={columns}
      query={query}
      exportProps={{ fileName: "danh-sach-khoa-thi" }}
      renderTopToolbarCustomActions={({ table }) => (
        <Group>
          <ExamCreateModal />
          <ExamDeleteListButton values={table.getSelectedRowModel().flatRows.map((item) => item.original)} />
          <Button color="teal">Import</Button>
        </Group>
      )}
      renderRowActions={({ row }) => (
        <Group gap="xs" justify="center">
          <ExamUpdateModal examValues={row.original} />
          <ExamDeleteButton examId={row.original.id!} />
        </Group>
      )}
    />
  );
}

export function DisplayExamStatus({ ExamStatus }: { ExamStatus: number }) {
  switch (ExamStatus) {
    case 1:
      return (
        <Badge w="100%" leftSection={<IconClock />} variant="light" color="#d3d3d3" radius="xs">
          Chưa mở đăng ký
        </Badge>
      );
    case 2:
      return (
        <Badge w="100%" leftSection={<IconSquareCheckFilled />} variant="light" color="#32cd32" radius="xs">
          Đang mở đăng ký
        </Badge>
      );
    case 3:
      return (
        <Badge w="100%" leftSection={<IconLock />} variant="light" color="#ffa500" radius="xs">
          Đóng đăng ký
        </Badge>
      );
    case 4:
      return (
        <Badge w="100%" leftSection={<IconBook2 />} variant="light" color="#1e90ff" radius="xs">
          Đã bắt đầu
        </Badge>
      );
    case 5:
      return (
        <Badge w="100%" leftSection={<IconPlayerPause />} variant="light" color="#ffd700" radius="xs">
          Đang tạm dừng
        </Badge>
      );
    case 6:
      return (
        <Badge w="100%" leftSection={<IconFlag />} variant="light" color="#006400" radius="xs">
          Hoàn thành
        </Badge>
      );
    case 7:
      return (
        <Badge w="100%" leftSection={<IconCheck />} variant="light" color="#004080" radius="xs">
          Đã đóng
        </Badge>
      );
    case 8:
      return (
        <Badge w="100%" leftSection={<IconX />} variant="light" color="#ff0000" radius="xs">
          Bị Hủy
        </Badge>
      );
    default:
      return (
        <Badge w="100%" leftSection={<IconCheck />} variant="light" color="#32cd32" radius="xs">
          Chưa có trạng thái
        </Badge>
      );
  }
}

