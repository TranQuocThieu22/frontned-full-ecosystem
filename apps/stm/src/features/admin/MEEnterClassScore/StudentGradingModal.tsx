"use client";

import { MyButton, MyButtonModal, MyCenterFull, MyDataTable, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { mockData_ClassStudent } from "./mockDatas";
import { I_ClassStudent } from "./interfaces";
import { useMemo } from "react";
import StudentGradingDeleteListButton from "./StudentGradingDeleteListButton";
import StudentGradingDeleteButton from "./StudentGradingDeleteButton";
import { StudentStatusBadge } from "./utils/StudentStatusBadge";
import { AttendanceStatusBadge } from "./utils/AtendanceStatusBadge";

export default function StudentGradingModal() {
  const disc = useDisclosure(false);

  // const query = useMyReactQuery({
  //     queryKey: [`StudentGradingTable`],
  //     axiosFn: async () => 
  // })

  const query = useQuery<I_ClassStudent[]>({
    queryKey: ["StudentGradingTable"],
    queryFn: async () => mockData_ClassStudent
  })

  const columns = useMemo<MRT_ColumnDef<I_ClassStudent>[]>(() => [
    {
      accessorKey: "code",
      header: "Mã học sinh",
    },
    {
      accessorKey: "name",
      header: "Họ và tên HS",
    },
    {
      accessorKey: "parentPhone",
      header: "SĐT phụ huynh",
    },
    {
      accessorKey: "studentStatus",
      header: "Trạng thái HS",
      accessorFn(row) {
        return (<StudentStatusBadge status={row.studentStatus ?? -1} />)
      },
    },
    {
      accessorKey: "note",
      header: "Ghi chú chung HS",
      size: 300
    },
    {
      accessorKey: "attendanceStatus",
      header: "Trạng thái Điểm Danh",
      accessorFn(row) {
        return (<AttendanceStatusBadge status={row.attendanceStatus ?? -1} />)
      }
    },
    {
      accessorKey: "originScore",
      header: "Điểm gốc BTVN",
      Cell: ({ row }) => {
        return (<MyNumberInput defaultValue={row.original.originScore ?? undefined} />)
      }
    },
    {
      accessorKey: "editedScore",
      header: "Điểm sửa BTVN",
      accessorFn(row) {
        return (<MyTextInput defaultValue={row.editedScore ?? undefined} />)
      }
    },
    {
      accessorKey: "comment",
      header: "Nhận xét",
      accessorFn(row) {
        return (<MyTextInput defaultValue={row.comment ?? undefined} />)
      },
      size: 290
    },
    {
      accessorKey: "reward",
      header: "Thưởng Ticker",
      accessorFn(row) {
        return (<MyNumberInput defaultValue={row.reward ?? undefined} />)
      }
    },
  ], []);

  return (
    <MyButtonModal
      disclosure={disc}
      variant="subtle"
      size="xs"
      modalSize={"100%"}
      title="Danh sách học sinh"
      label="Chấm điểm"
      styles={{
        label: {
          textUnderlineOffset: 10,
        }
      }}
      onSubmit={() => { }}
    >
      <MyDataTable
        columns={columns}
        data={query.data || []}
        enableRowSelection
        enableColumnPinning
        initialState={{
          density: "md",
          pagination: { pageIndex: 0, pageSize: 30 },
          columnPinning: {
            right: ["mrt-row-actions"]
          }
        }}
        renderTopToolbarCustomActions={({ table }) => {
          const selectedRows =
            table
              .getSelectedRowModel()
              .flatRows.map((item) => item.original) || [];
          return (<MyCenterFull>
            <MyButton crudType="save" color="green" />
            <Button
              leftSection={<IconTableExport />}
              color="teal"
              size="sm"
              radius="sm"
              onClick={() => {
                notifications.show({
                  title: "Thông báo",
                  message:
                    "Chức năng này đang được phát triển, vui lòng quay lại sau.",
                  color: "blue",
                  autoClose: 5000,
                });
              }}
            >
              Export
            </Button>
            <StudentGradingDeleteListButton values={selectedRows} />
          </MyCenterFull>);
        }}
        renderRowActions={({row}) => (
          <MyCenterFull>
            <StudentGradingDeleteButton code={row.original.code || ""} id={row.original.id}/>
          </MyCenterFull>
        )}
      />
    </MyButtonModal>
  );
}
