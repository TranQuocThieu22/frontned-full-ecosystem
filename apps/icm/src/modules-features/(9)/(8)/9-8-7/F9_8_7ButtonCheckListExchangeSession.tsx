'use client'
import { Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonModal,
  MyCenterFull,
  MyDataTable,
  MyDateInput,
  MyFieldset,
  MySelect
} from "aq-fe-framework/components";
import { MRT_Cell, MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { mockDataButtonThaoTac, mockDataTrangThai } from "./mockData";

export interface IButtonCheckListInfoViewModel {
  maLuotTraoDoi?: string;
  mucChuanBi?: string;
  trangThai?: string;
  ngayHoanThanh?: string;
  ghiChu?: string;
}

export default function F9_8_7ButtonCheckListExchangeSession() {
  const disc = useDisclosure();
  const query = useQuery<IButtonCheckListInfoViewModel[]>({
    queryKey: ['F9_8_8MonitorExchange'],
    queryFn: async () => mockDataButtonThaoTac,
  });

  const [tableData, setTableData] = useState<IButtonCheckListInfoViewModel[]>([]);

  useEffect(() => {
    if (query.data) {
      setTableData(query.data);
    }
  }, [query.data]);

  const handleSaveCell = (cell: MRT_Cell<IButtonCheckListInfoViewModel>, value: any) => {
    // Cập nhật giá trị của ô trong state
    const updatedData = [...tableData];
    if (!updatedData[cell.row.index]) {
      return
    }

    updatedData[cell.row.index]![cell.column.id as keyof IButtonCheckListInfoViewModel] = value;
    setTableData(updatedData);
  };

  const columns = useMemo<MRT_ColumnDef<IButtonCheckListInfoViewModel>[]>(() => [
    {
      header: "Mã lượt trao đổi",
      accessorKey: "maLuotTraoDoi",
    },
    {
      header: "Mục chuẩn bị",
      accessorKey: "mucChuanBi",
    },
    {
      header: "Trạng thái",
      accessorKey: "trangThai",
      Cell: ({ cell }) => {
        return (
          <MySelect
            data={mockDataTrangThai}
            value={cell.getValue<string>()}
            onChange={(value) => {
              handleSaveCell(cell, value);
            }}
          />
        );
      },
    },
    {
      header: "Ngày hoàn thành",
      accessorKey: "ngayHoanThanh",
      Cell: ({ cell }) => {
        return (
          <MyDateInput
            value={cell.getValue<string>()}
            onChange={(value) => {
              handleSaveCell(cell, value);
            }}
          />
        );
      },
    },
    {
      header: "Ghi chú",
      accessorKey: "ghiChu",
      Cell: ({ cell }) => {
        return (
          <Textarea
            label=""
            value={cell.getValue<string>()}
            onChange={(event) => {
              handleSaveCell(cell, event.target.value);
            }}
          />
        );
      },
    },
  ], [tableData]);

  return (
    <MyButtonModal variant="transparent" color="blue" modalSize={"90%"} disclosure={disc} label="CheckList">
      <MyFieldset title="Danh sách theo dõi đăng ký bảo hộ">
        <MyDataTable
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          data={tableData} // Sử dụng state làm nguồn dữ liệu
          renderTopToolbarCustomActions={() => (
            <MyCenterFull>
              <MyButton crudType="save">Lưu</MyButton>
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </MyButtonModal>
  );
}
