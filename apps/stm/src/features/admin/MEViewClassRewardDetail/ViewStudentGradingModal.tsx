"use client";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MyButton, MyButtonModal, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { I_StudentRewardDetail } from "./interfaces";
import { mockData_StudentRewardDetail } from "./mockDatas";
import { StudentStatusBadge } from "./utils/StudentStatusBadge";
import ViewStudentGradingDeleteButton from "./ViewStudentGradingDeleteButton";
import ViewStudentGradingDeleteListButton from "./ViewStudentGradingDeleteListButton";

export default function ViewStudentGradingModal() {
  const disc = useDisclosure(false);

  // const query = useMyReactQuery({
  //     queryKey: [`ViewStudentGradingTable`],
  //     axiosFn: async () => 
  // })

  const query = useQuery<I_StudentRewardDetail[]>({
    queryKey: ["ViewStudentGradingTable"],
    queryFn: async () => mockData_StudentRewardDetail
  })

  const columns = useMemo<MRT_ColumnDef<I_StudentRewardDetail>[]>(() => [
    {
      accessorKey: "code",
      header: "Mã học sinh", size: 100
    },
    {
      accessorKey: "name",
      header: "Họ và tên",
    },
    {
      accessorKey: "parentPhone",
      header: "SĐT phụ huynh", size: 100
    },
    {
      accessorKey: "studentStatus",
      header: "Trạng thái HS",
      accessorFn(row) {
        return (<StudentStatusBadge status={row.status ?? -1} />)
      },
    },
    { header: "T07/2025", accessorKey: "T07_2025", size: 100 },
    { header: "T08/2025", accessorKey: "T08_2025", size: 100 },
    { header: "T09/2025", accessorKey: "T09_2025", size: 100 },
    { header: "T10/2025", accessorKey: "T10_2025", size: 100 },
    { header: "T11/2025", accessorKey: "T11_2025", size: 100 },
    { header: "T12/2025", accessorKey: "T12_2025", size: 100 },
    { header: "T01/2026", accessorKey: "T01_2026", size: 100 },
    { header: "T02/2026", accessorKey: "T02_2026", size: 100 },
    { header: "T03/2026", accessorKey: "T03_2026", size: 100 },
    { header: "T04/2026", accessorKey: "T04_2026", size: 100 },
    { header: "T05/2026", accessorKey: "T05_2026", size: 100 },
    { header: "Tổng ticker", accessorKey: "totalTicker", size: 100 },
    { header: "Khen thưởng Quý (Tổng 3 tháng)", accessorKey: "quarterlyReward", size: 150 },
    { header: "Số ticker đã đổi", accessorKey: "redeemedTicker", size: 100 },
    { header: "Số ticker còn lại", accessorKey: "remainingTicker", size: 100 },
  ], []);

  return (
    <MyButtonModal
      disclosure={disc}
      variant="subtle"
      size="xs"
      modalSize={"100%"}
      title="Danh sách học sinh"
      label="Xem chi tiết"
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
          density: "xs",
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
            <ViewStudentGradingDeleteListButton values={selectedRows} />
          </MyCenterFull>);
        }}
      />
    </MyButtonModal>
  );
}
