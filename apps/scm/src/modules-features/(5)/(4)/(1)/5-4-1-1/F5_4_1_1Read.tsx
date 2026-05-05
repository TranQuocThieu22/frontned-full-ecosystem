'use client'
import MyButtonViewPDF from "@/components/Buttons/ButtonViewPDF/MyButtonViewPDF";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { U0DateToDDMMYYYString } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F5_4_1_1Create from "./F5_4_1_1Create";
import F5_4_1_1Delete from "./F5_4_1_1Delete";
import F5_4_1_1Update from "./F5_4_1_1Update";

interface I {
  id?: number;
  soQuyetDinh?: string;
  ngayQuyetDinh?: Date;
  tenQuyetDinh?: string;
  tenDeTai?: string;
  fileQuyetDinhSrc?: string;
}

export default function F5_4_1_1Read() {
  const query = useQuery<I[]>({
    queryKey: [`ReadTemplate`],
    queryFn: async () => [
      {
        id: 1,
        soQuyetDinh: "QD-001",
        ngayQuyetDinh: new Date("2023-12-01T00:00:00Z"),
        tenQuyetDinh: "Quyết định phê duyệt đề tài",
        tenDeTai: "Ứng dụng AI trong giáo dục",
        fileQuyetDinhSrc: "/files/quyet-dinh-1.pdf",
      },
      {
        id: 2,
        soQuyetDinh: "QD-002",
        ngayQuyetDinh: new Date("2023-12-02T00:00:00Z"),
        tenQuyetDinh: "Quyết định triển khai nghiên cứu",
        tenDeTai: "Phát triển công nghệ Blockchain",
        fileQuyetDinhSrc: "/files/quyet-dinh-2.pdf",
      },
    ],
  });

  const columns = useMemo<MRT_ColumnDef<I>[]>(() => [
    {
      header: "Số quyết định",
      accessorKey: "soQuyetDinh",
    },
    {
      header: "Ngày quyết định",
      accessorKey: "ngayQuyetDinh",
      Cell: ({ cell }) => {
        return U0DateToDDMMYYYString(new Date(cell.getValue<Date>()));
      },
    },
    {
      header: "Tên quyết định",
      accessorKey: "tenQuyetDinh",
    },
    {
      header: "Tên đề tài",
      accessorKey: "tenDeTai",
    },
    {
      header: "File quyết định",
      accessorKey: "fileQuyetDinhSrc",
      Cell: ({ cell }) => {
        return <MyButtonViewPDF />;
      },
    },
  ], []);

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <MyDataTable
      columns={columns}
      data={query.data!}
      renderTopToolbarCustomActions={() => <F5_4_1_1Create />}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F5_4_1_1Update values={row.original} />
            <F5_4_1_1Delete id={row.original.id!} />
          </MyCenterFull>
        );
      }}
    />
  );
}
