"use client";

import { MyButtonModal, MyCenterFull, MyDataTable } from "aq-fe-framework/components";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { mockData_MakeUpClassSchedule } from "./mockDatas";
import { I_MakeUpClassSchedule } from "./interfaces";

export default function LeaveCompensationPickSessionModal() {
  const disc = useDisclosure(false);

  // const query = useMyReactQuery({
  //     queryKey: [`LeaveCompensationPickSessionRead`],
  //     axiosFn: async () => 
  // })

  const query = useQuery<I_MakeUpClassSchedule[]>({
    queryKey: ["LeaveCompensationPickSessionRead"],
    queryFn: async () => mockData_MakeUpClassSchedule
  })

  const columns: MRT_ColumnDef<I_MakeUpClassSchedule>[] = [
    {
      header: "Mã lớp",
      accessorKey: "code"
    },
    {
      header: "Tên lớp",
      accessorKey: "name",
      size: 240
    },
    {
      header: "Môn học",
      accessorKey: "subject",
      size: 120,  
    },
    {
      header: "Ngày học",
      accessorFn: row => utils_date_dateToDDMMYYYString(new Date(row.studyDate)),
      accessorKey: "studyDate",
      size: 120
    },
    {
      header: "Giờ học",
      accessorKey: "studyTime",
      size: 120
    },
    {
      header: "Giáo viên",
      accessorKey: "teacherName"
    },
    {
      header: "Nội dung buổi học (gần đúng)",
      accessorKey: "content",
      size: 300
    },
    {
      header: "Sĩ số hiện tại/Tối đa",
      accessorKey: "attendance",
      size: 80
    },
  ];


  return (
    <MyButtonModal
      disclosure={disc}
      variant="subtle"
      size="xs"
      modalSize={"100%"}
      title="Danh sách buổi bù"
      label="..."
      styles={{
        label: {
          fontSize: 30,
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
        renderTopToolbarCustomActions={() => {
          return (<MyCenterFull>
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
          </MyCenterFull>);
        }}
        renderRowActions={() => (
          <MyCenterFull>
            <ActionIcon
              variant="gradient"
              size="l"
              gradient={{ from: '#00ff77', to: '#08B118', deg: 180 }}>
              <IconCheck />
            </ActionIcon>
          </MyCenterFull>
        )}
      />
    </MyButtonModal>
  );
}
