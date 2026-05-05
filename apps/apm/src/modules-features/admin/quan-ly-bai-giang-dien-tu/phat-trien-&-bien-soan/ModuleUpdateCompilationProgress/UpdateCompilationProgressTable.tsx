"use client";

import { U0DateToDDMMYYYString } from "@/utils/date";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonViewPDF, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IEditorialBoard, IUpdateCompilationProgressTask, getPriorityLabel, getStatusLabel } from "./interfaces/UpdateCompilationProgressViewModel";
import UpdateCompilationProgressActionBtn from "./UpdateCompilationProgressActionBtn";

export default function UpdateCompilationProgressTable() {

  const query = useQuery({
    queryKey: ["update-compilation-progress-table"],
    queryFn: () => { return mockData; },
  });

  const editorialBoardQuery = useQuery({
    queryKey: ["editorial-boards"],
    queryFn: () => { return mockEditorialBoards; },
  });

  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
      editorialBoardId: "EB001"
    },
  });

  const columns = useMemo<MRT_ColumnDef<IUpdateCompilationProgressTask>[]>(() => [
    {
      header: "Mã Công việc",
      accessorKey: "code",
    },
    {
      header: "Tên Công việc",
      accessorKey: "name",
    },
    {
      header: "Người thực hiện",
      accessorKey: "assignee",
    },
    {
      header: "Ngày bắt đầu dự kiến",
      accessorKey: "startDate",
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue<string>());
        return U0DateToDDMMYYYString(date);
      },
    },
    {
      header: "Ngày kết thúc dự kiến",
      accessorKey: "endDate",
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue<string>());
        return U0DateToDDMMYYYString(date);
      },
    },
    {
      header: "Ngày hoàn thành thực tế",
      accessorKey: "actualCompletionDate",
      Cell: ({ cell }) => {
        const dateValue = cell.getValue<string>();
        if (!dateValue) return "";
        const date = new Date(dateValue);
        return U0DateToDDMMYYYString(date);
      },
    },
    {
      header: "Thời lượng ước tính (Ngày)",
      accessorKey: "estimatedDuration",
    },
    {
      header: "Độ ưu tiên",
      accessorKey: "priority",
      Cell: ({ cell }) => getPriorityLabel(cell.getValue<number>()),
    },
    {
      header: "Phần trăm hoàn thành",
      accessorKey: "completionPercentage",
      Cell: ({ cell }) => `${cell.getValue<number>()}%`,
    },
    {
      header: "Trạng thái Công việc",
      accessorKey: "status",
      Cell: ({ cell }) => getStatusLabel(cell.getValue<number>()),
    },
    {
      header: "Tài liệu/ Sản phẩm trung giang đính kèm",
      accessorKey: "attachedDocuments",
      Cell: ({ row }) => {
        const status = row.original.status;
        if (status !== 0) {
          return (
            <MyButtonViewPDF src={"https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/5992cv.signed.pdf"} />
          );
        }
        return "";
      },
    },
    {
      header: "Ghi chú/ Vấn đề phát sinh",
      accessorKey: "notes",
    },
  ], []);

  return (
    <MyFieldset
      title="Cập nhật Tiến độ Biên soạn"
    >
      <Stack>
        <MySelect
          data={editorialBoardQuery.data?.map(board => ({
            value: board.id,
            label: `${board.name} (${board.code})`
          })) || []}
          label="Chọn ban biên soạn"
          placeholder="Chọn ban biên soạn"
          value={form_multiple.values.editorialBoardId}
          onChange={(value) => form_multiple.setFieldValue('editorialBoardId', value)}
        />
        <MyDataTable
          columns={columns}
          enableRowSelection={true}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <MyButton crudType="export" />
            )
          }}
          renderRowActions={({ row }) => {
            return (
              <>
                <UpdateCompilationProgressActionBtn values={row.original} />
              </>
            )
          }}
          data={query.data || []}
        />
      </Stack>
    </MyFieldset>
  );
}

const mockEditorialBoards: IEditorialBoard[] = [
  {
    id: "EB001",
    name: "Ban Biên soạn Python",
    code: "PYB"
  },
  {
    id: "EB002",
    name: "Ban Biên soạn AI trong Y học",
    code: "AIH"
  }
];

const mockData: IUpdateCompilationProgressTask[] = [
  {
    id: 1,
    code: "TASK-PYB-001",
    name: "Xây dựng kịch bản Module 1 (Giới thiệu Python)",
    assignee: "Lê Thị B",
    startDate: "2025-09-25",
    endDate: "2025-10-05",
    actualCompletionDate: "2025-10-04",
    estimatedDuration: 10,
    priority: 3,
    completionPercentage: 100,
    status: 2,
    attachedDocuments: "",
    notes: "Đã hoàn thành trước 1 ngày"
  },
  {
    id: 2,
    code: "TASK-PYB-002",
    name: "Thiết kế đồ hoạ Module 1",
    assignee: "Trần Văn C",
    startDate: "2025-10-01",
    endDate: "2025-10-10",
    estimatedDuration: 8,
    priority: 2,
    completionPercentage: 60,
    status: 1,
    attachedDocuments: "",
    notes: "Đang chờ phản hồi từ Trưởng Ban để hoàng thiện"
  },
  {
    id: 3,
    code: "TASK-PYB-003",
    name: "Quay video bài giảng Module 1",
    assignee: "Nguyễn Văn A",
    startDate: "2025-10-08",
    endDate: "2025-10-15",
    estimatedDuration: 6,
    priority: 3,
    completionPercentage: 30,
    status: 1,
    attachedDocuments: "",
    notes: "Gặp trục trặc kỹ thuật với thiết bị ghi hình; có thể chậm tiến độ"
  },
  {
    id: 4,
    code: "TASK-PYB-004",
    name: "Chỉnh sửa video Module 1",
    assignee: "ThS. Phạm Thị F",
    startDate: "2025-10-12",
    endDate: "2025-10-20",
    estimatedDuration: 7,
    priority: 3,
    completionPercentage: 0,
    status: 0,
    attachedDocuments: "",
    notes: "Chờ hoàn thành quay video"
  },
  {
    id: 5,
    code: "TASK-PYB-005",
    name: "Xây dựng câu hỏi trắc nghiệm Module 1",
    assignee: "Lê Thị B",
    startDate: "2025-10-01",
    endDate: "2025-10-10",
    estimatedDuration: 8,
    priority: 2,
    completionPercentage: 50,
    status: 1,
    attachedDocuments: "",
    notes: "Đã xong 50% câu hỏi, đang chờ nội dung chính thức của video"
  },
  {
    id: 6,
    code: "TASK-AIH-001",
    name: "Nghiên cứu nội dung chuyên sâu AI trong Y học",
    assignee: "TS. Phạm Quang E",
    startDate: "2025-10-05",
    endDate: "2025-10-25",
    estimatedDuration: 15,
    priority: 3,
    completionPercentage: 70,
    status: 1,
    attachedDocuments: "",
    notes: "Đã tổng hợp được hầu hết tài liệu, đang bắt đầu viết bản nháp"
  },
  {
    id: 7,
    code: "TASK-AIH-002",
    name: "Lập kịch bản chi tiết Module 1 (AI Tổng quan)",
    assignee: "ThS. Ngô Minh I",
    startDate: "2025-10-20",
    endDate: "2025-10-30",
    estimatedDuration: 10,
    priority: 3,
    completionPercentage: 70,
    status: 0,
    attachedDocuments: "",
    notes: ""
  }
];