'use client'
import { Checkbox } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MyButton } from "aq-fe-framework/core";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IReceiveLeaveViewModel } from "./intefaces";
import { ReceiveLeaves } from "./mockDatas";
import ReceiveLeaveCreateUpdate from "./ReceiveLeaveCreateUpdate";
import ReceiveLeaveDelete from "./ReceiveLeaveDelete";
import ReceiveLeaveDeleteList from "./ReceiveLeaveDeleteList";
import { RenderStatus } from "./RenderStatus";


export default function ReceiveLeaveRead() {
  const query = useQuery<IReceiveLeaveViewModel[]>({
    queryKey: ['ReceiveLeaveRead'],
    queryFn: async () => ReceiveLeaves
  });

  const columns = useMemo<MRT_ColumnDef<IReceiveLeaveViewModel>[]>(
    () => [
      {
        header: "Mã đơn nghỉ phép",
        accessorKey: "code",
      },
      {
        header: "Ngày gửi đơn",
        accessorKey: "requestDate",
      },
      {
        header: "Mã học sinh",
        accessorKey: "studentCode",
      },
      {
        header: "Họ và tên HS",
        accessorKey: "studentName",
      },
      {
        header: "Lớp/Khóa học liên quan",
        accessorKey: "relatedClassOrCourse",
      },
      {
        header: "Ngày bắt đầu nghỉ",
        accessorKey: "startDate",
        Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
      },
      {
        header: "Ngày kết thúc nghỉ",
        accessorKey: "endDate",
        Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
      },
      {
        header: "Buổi học bị ảnh hưởng",
        accessorKey: "affectedSessions",
        size: 300,
      },
      {
        header: "Lý do nghỉ",
        accessorKey: "reason",
      },
      {
        header: "Người gửi",
        accessorKey: "sender",
      },
      {
        header: "Trạng thái",
        accessorKey: "status",
        size: 200,
        Cell: ({ cell }) => (
          <RenderStatus
            value={cell.getValue<string>()}
            successes={["Đã duyệt"]}
            failures={["Từ chối"]}
            inProgress={["Đang chờ duyệt"]}
          />
        ),
      },
      {
        header: "Người xử lý",
        accessorKey: "handler",
      },
      {
        header: "Ngày xử lý",
        accessorKey: "handleDate",
      },
      {
        header: "Lý do từ chối (nếu có)",
        accessorKey: "rejectionReason",
      },
      {
        header: "Đề xuất bù lớp",
        accessorKey: "suggestMakeupClass",
        Cell: ({ cell }) => <MyCenterFull><Checkbox checked={cell.getValue<boolean>()} readOnly /></MyCenterFull>,
      },
      {
        header: "Gửi thông báo cho GV/HS/PH",
        accessorKey: "notifyTo",
        Cell: ({ cell }) => <MyCenterFull><Checkbox checked={cell.getValue<boolean>()} readOnly /></MyCenterFull>,
      },
    ],
    []
  );

  return (
    <MyFieldset title="Danh sách đơn xin nghỉ phép">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        enableRowSelection
        renderTopToolbarCustomActions={({ table }) => (
          <MyCenterFull>
            <ReceiveLeaveCreateUpdate />
            <MyButton actionType="import" />
            <MyButton actionType="export" />
            <ReceiveLeaveDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
          </MyCenterFull>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ReceiveLeaveCreateUpdate values={row.original} />
            <ReceiveLeaveDelete id={0} code={row.original.code ?? ""} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}