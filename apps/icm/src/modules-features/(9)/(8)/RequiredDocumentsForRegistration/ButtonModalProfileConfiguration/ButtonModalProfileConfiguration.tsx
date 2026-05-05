'use client'
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonModal,
  MyCenterFull,
  MyDataTable,
  MyFieldset
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { mockDataButtonModal } from "../mockData";
import ProfileConfigurationCreate from "./ProfileConfigurationCreate";
import ProfileConfigurationDelete from "./ProfileConfigurationDelete";
import ProfileConfigurationUpdate from "./ProfileConfigurationUpdate";

export interface IButtonModalInfoViewModel {
  maSoHoso?: string; // Document ID
  tenHoso?: string; // Document Name
  batBuoc?: boolean; // Required?
  moTaChiTiet?: string; // Detailed Description
  dinhDangChoPhep?: string[]; // Allowed Format
  ghiChuHuongDan?: string; // Notes / Instructions
}
export default function ButtonModalProfileConfiguration() {
  const disc = useDisclosure()
  const query = useQuery<IButtonModalInfoViewModel[]>({
    queryKey: ['ButtonModalProfileConfiguration'],
    queryFn: async () => mockDataButtonModal
  });
  const columns = useMemo<MRT_ColumnDef<IButtonModalInfoViewModel>[]>(
    () => [
      {
        header: "Mã hồ sơ",
        accessorKey: "maSoHoso",
      },
      {
        header: "Tên hồ sơ",
        accessorKey: "tenHoso",
      },
      {
        header: "Bắt buộc?",
        accessorKey: "batBuoc",
        Cell: ({ cell }) => (
          <>{cell.getValue<boolean>() ? "Có" : "Không"}</>
        ),
      },
      {
        header: "Mô tả chi tiết",
        accessorKey: "moTaChiTiet",
      },
      {
        header: "Định dạng cho phép",
        accessorKey: "dinhDangChoPhep",
        Cell: ({ cell }) => {
          return <Text>{cell.getValue<string[]>().join(', ')}</Text>;
        },
      },
      {
        header: "Ghi chú / Hướng dẫn",
        accessorKey: "ghiChuHuongDan",
      },
    ],
    []
  );

  return (
    <MyButtonModal variant="transparent" color="blue" modalSize={"90%"} disclosure={disc} label="Cấu hình hồ sơ" >
      <MyFieldset title="Danh sách hồ sơ yêu cầu">
        <MyDataTable
          enableRowSelection
          isError={query.isError}
          isLoading={query.isLoading}
          columns={columns}
          data={query.data || []}
          renderTopToolbarCustomActions={() => (
            <MyCenterFull>
              <ProfileConfigurationCreate />
              <MyButton crudType="import">Import</MyButton>
              <MyButton crudType="export">Export</MyButton>
              <MyButton crudType="delete">Xóa</MyButton>
            </MyCenterFull>
          )}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <ProfileConfigurationUpdate values={row.original} />
              <ProfileConfigurationDelete id={row.original.maSoHoso!} />
            </MyCenterFull>
          )}
        />
      </MyFieldset>
    </MyButtonModal>
  );
}
