'use client'
import { Group, Paper, Radio, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconSearch, IconTableExport } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyDataTable,
  MyDateInput,
  MyFieldset,
  MySelect
} from "aq-fe-framework/components";
import { utils_date_dateToDDMMYYYString } from "aq-fe-framework/utils";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { IPointChangeHistoryViewModel } from "./interfaces";
import { pointChangeHistories } from "./mockDatas";


export default function PointChangeHistoryRead() {
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  const query = useQuery<IPointChangeHistoryViewModel[]>({
    queryKey: ['PointChangeHistoryRead'],
    queryFn: async () => pointChangeHistories
  });

  const columns = useMemo<MRT_ColumnDef<IPointChangeHistoryViewModel>[]>(
    () => [
      {
        header: "ID vết sửa đổi",
        accessorKey: "code",
      },
      {
        header: "Ngày cập nhật",
        accessorKey: "updatedDate",
        Cell: ({ cell }) => utils_date_dateToDDMMYYYString(new Date(cell.getValue<string>()))
      },
      {
        header: "Thời gian cập nhật",
        accessorKey: "updatedTime",
      },
      {
        header: "Người thực hiện",
        accessorKey: "executor",
      },
      {
        header: "Mã học sinh",
        accessorKey: "studentCode",
      },
      {
        header: "Tên học sinh",
        accessorKey: "studentName",
      },
      {
        header: "Môn học",
        accessorKey: "subject",
      },
      {
        header: "Loại điểm",
        accessorKey: "scoreType",
      },
      {
        header: "Giá trị",
        accessorKey: "value",
      },
      {
        header: "Lý do sửa đổi",
        accessorKey: "reason",
        size: 300
      },
    ],
    []
  );

  return (
    <Paper p="md">
      <Stack>
        <Radio.Group value={selectedOption} onChange={setSelectedOption}>
          <Radio.Card value="option1" style={{ border: "none" }} component="div">
            <Group wrap="nowrap" align="center">
              <Radio.Indicator />
              <MySelect
                data={["Nguyễn Thị Hằng", "Trần Minh Đức", "Lê Thanh Nga"]}
                defaultValue={"Nguyễn Thị Hằng"}
                label="Tìm theo học sinh"
                disabled={selectedOption !== "option1"}
              />
            </Group>
          </Radio.Card>
          <Radio.Card value="option2" style={{ border: "none" }} component="div">
            <Group wrap="nowrap" align="center">
              <Radio.Indicator />
              <MySelect
                data={["GV.Nguyễn Văn A", "QLDT.Phạm Thị B"]}
                label="Tìm theo nhân sự"
                defaultValue={"GV.Nguyễn Văn A"}
                disabled={selectedOption !== "option2"}
              />
            </Group>
          </Radio.Card>
        </Radio.Group>
        <Group>
          <MyDateInput label="Từ ngày"
            inputContainer={(children) => (
              <Group align="flex-start">
                {children}
                {"-"}
              </Group>
            )}
          />

          <MyDateInput label="Đến ngày"
            inputContainer={(children) => (
              <Group align="flex-start">
                {children}
                <MyButton color="green" leftSection={<IconSearch />} >Tìm</MyButton>
              </Group>
            )} />
        </Group>
        <MyFieldset title="Danh sách thao tác">
          <MyDataTable
            isError={query.isError}
            isLoading={query.isLoading}
            columns={columns}
            data={query.data ?? []}
            renderTopToolbarCustomActions={() => (
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
            )}
          />
        </MyFieldset>
      </Stack >
    </Paper >
  );
}