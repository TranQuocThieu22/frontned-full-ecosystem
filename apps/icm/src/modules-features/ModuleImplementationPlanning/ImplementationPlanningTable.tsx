"use client"

import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { AQButtonCreateByImportFile, MyButton, MyButtonDeleteList, MyCenterFull, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { utils_date } from "aq-fe-framework/utils-v2";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ImplementationPlanningCreate from "./ImplementationPlanningCreate";
import ImplementationPlanningDelete from "./ImplementationPlanningDelete";
import ImplementationPlanningUpdate from "./ImplementationPlanningUpdate";
import { IEditorialBoard, IImplementationPlanningTask, getPriorityLabel, getStatusLabel } from "./interfaces/ImplementationPlanningViewModel";

export default function ImplementationPlanningTable() {

  const query = useQuery({
    queryKey: ["implementation-planning-table"],
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

  const columns = useMemo<MRT_ColumnDef<IImplementationPlanningTask>[]>(() => [
    {
      header: "Thứ tự",
      accessorKey: "order",
    },
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
        return utils_date.toDDMMYYYY(date);
      },
    },
    {
      header: "Ngày kết thúc dự kiến",
      accessorKey: "endDate",
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue<string>());
        return utils_date.toDDMMYYYY(date);
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
      header: "Trạng thái Công việc",
      accessorKey: "status",
      Cell: ({ cell }) => getStatusLabel(cell.getValue<number>()),
    },
  ], []);

  return (
    <MyFieldset
      title="Lập Kế hoạch Thực hiện"
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
              <>
                <ImplementationPlanningCreate />
                <AQButtonCreateByImportFile onSubmit={() => { }} form={form_multiple} />
                <MyButton crudType="export" />
                <MyButtonDeleteList
                  onSubmit={() => { }}
                  contextData={table.getSelectedRowModel().flatRows.flatMap(item => item.original).map(item => item.code).join(", ")}
                />
              </>
            )
          }}
          renderRowActions={({ row }) => {
            return (
              <MyCenterFull>
                <ImplementationPlanningUpdate data={row.original} />
                <ImplementationPlanningDelete id={row.original.id} code={row.original.code} />
              </MyCenterFull>
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


const mockData: IImplementationPlanningTask[] = [
  {
    id: 1,
    code: "TASK-PYB-001",
    name: "Xây dựng kịch bản Module 1 (Giới thiệu Python)",
    assignee: "Lê Thị B",
    startDate: "2025-09-25",
    endDate: "2025-10-05",
    estimatedDuration: 10,
    priority: 3,
    status: 1,
    order: 1
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
    status: 0,
    order: 2
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
    status: 0,
    order: 3
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
    status: 0,
    order: 4
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
    status: 0,
    order: 5
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
    status: 1,
    order: 1
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
    status: 0,
    order: 2
  }
];