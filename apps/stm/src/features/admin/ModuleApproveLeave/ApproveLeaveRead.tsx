'use client'
import { Checkbox } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import ApproveLeaveButtonModalApprove from "./ApproveLeaveButtonModalApprove";
import { IApproveLeaveViewModel } from "./intefaces";
import { approveLeaves } from "./mockDatas";
import { RenderStatus } from "./RenderStatus";


export default function ApproveLeaveRead() {
  const query = useQuery<IApproveLeaveViewModel[]>({
    queryKey: ['ApproveLeaveRead'],
    queryFn: async () => approveLeaves
  });

  const columns = useMemo<MRT_ColumnDef<IApproveLeaveViewModel>[]>(
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
    <MyFieldset title="">
      <MyDataTable
        isError={query.isError}
        isLoading={query.isLoading}
        columns={columns}
        data={query.data || []}
        renderTopToolbarCustomActions={({ table }) => (
          <MyCenterFull>
            <MyButton
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
            </MyButton>
          </MyCenterFull>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <ApproveLeaveButtonModalApprove values={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}