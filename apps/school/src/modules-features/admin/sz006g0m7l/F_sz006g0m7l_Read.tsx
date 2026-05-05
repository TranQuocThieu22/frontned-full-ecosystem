"use client";
import {
  AQButtonExportData,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
  AQButtonCreateByImportFile,
  MyButton,
} from "aq-fe-framework/components";
import { Group } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F_sz006g0m7l_Update from "./F_sz006g0m7l_Update";
import F_sz006g0m7l_Delete from "./F_sz006g0m7l_Delete";
import F_sz006g0m7l_Create from "./F_sz006g0m7l_Create";
import { useForm } from "@mantine/form";

interface I_sz006g0m7l_Read {
  id?: number;
  phanHe?: string;
  hostMailServer?: string;
  outgoingPort?: number;
  incomingPort?: number;
  SSL?: boolean;
  userName?: string;
  password?: string;
}
export default function F_sz006g0m7l_Read() {

  const [importData, setImportData] = useState(false);
  const form = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  // Query
  const danhMucCauHinhMailQuery = useQuery<I_sz006g0m7l_Read[]>({
    queryKey: ["Fsz006g0m7l_ReadDanhMucCauHinhMail"],
    queryFn: async () => {
      return mockData;
    },
  });

  // export confirm
  const exportConfig = {
    fields: [
      {
        header: "Phân hệ",
        fieldName: "phanHe",
      },
      {
        header: "Host mail server",
        fieldName: "hostMailServer",
      },
      {
        header: "Outgoing port",
        fieldName: "outgoingPort",
      },
      {
        header: "Incoming port",
        fieldName: "incomingPort",
      },
      {
        header: "SSL",
        fieldName: "SSL",
      },
      {
        header: "Username",
        fieldName: "userName",
      },
      {
        header: "Password",
        fieldName: "password",
      },
    ],
  };

  // column table
  const columns = useMemo<MRT_ColumnDef<I_sz006g0m7l_Read>[]>(
    () => [
      {
        header: "Phân hệ",
        accessorKey: "phanHe",
      },
      {
        header: "Host mail server",
        accessorKey: "hostMailServer",
      },
      {
        header: "Outgoing port",
        accessorKey: "outgoingPort",
      },
      {
        header: "Incoming port",
        accessorKey: "incomingPort",
      },
      {
        header: "SSL",
        accessorKey: "SSL",
        Cell: ({ cell }) => ((cell.getValue() as boolean) ? "true" : "false"),
      },
      {
        header: "Username",
        accessorKey: "userName",
      },
      {
        header: "Password",
        accessorKey: "password",
        Cell: ({ cell }) => (
          <>*********</>
        ),
      },
    ],
    []
  );

  //===handling===
  if (danhMucCauHinhMailQuery.isLoading) return "Đang tải dữ liệu...";
  if (danhMucCauHinhMailQuery.isError) return "Lỗi tải dữ liệu";

  return (
    <MyFieldset title="Danh mục cấu hình mail">
      <MyDataTable
        enableRowSelection
        data={danhMucCauHinhMailQuery.data!}
        columns={columns}
        renderTopToolbarCustomActions={({ table }) => (
          <Group>
            <F_sz006g0m7l_Create />
            <AQButtonCreateByImportFile
              setImportedData={setImportData}
              form={form}
              onSubmit={() => {
                console.log(form.values);
              }}
            />
            <AQButtonExportData
              data={danhMucCauHinhMailQuery.data!}
              exportConfig={exportConfig}
              objectName="danhSachCauHinhMail"
            />
             <MyButton crudType='delete'>Xóa</MyButton>
          </Group>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <F_sz006g0m7l_Update values={row.original} />
            <F_sz006g0m7l_Delete id={row.original.id!} code={row.original.phanHe!} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}
const mockData: I_sz006g0m7l_Read[] = [
  {
    id: 1,
    phanHe: "Toàn hệ thống",
    hostMailServer: "smtp.gmail.com",
    outgoingPort: 589,
    incomingPort: 465,
    SSL: true,
    userName: "thanh@aqtech.vn",
    password: "password123",
  },
];
