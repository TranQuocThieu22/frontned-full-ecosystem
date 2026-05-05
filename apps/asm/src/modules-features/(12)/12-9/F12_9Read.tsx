"use client";
import { MyButton } from "@/components/Buttons/Button/MyButton";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import F12_9Create from "./F12_9Create";
import F12_9Delete from "./F12_9Delete";
import F12_9Update from "./F12_9Update";

interface IRead {
  id?: number;
  unitCode?: string;
  unitName?: string;
  use?: boolean;
  note?: string;
}

export default function F12_9Read() {
  const [fileData, setFileData] = useState<any[]>([]);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });


  const query = useQuery<IRead[]>({
    queryKey: [`F12_9Read`],
    queryFn: async () => {
      // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
      return [
        {
          id: 1,
          unitCode: "HT",
          unitName: "Hiệu trưởng",
          use: true,
          note: "Chức vụ cao nhất trong trường",
        },
        {
          id: 2,
          unitCode: "PHT",
          unitName: "Phó hiệu trưởng",
          use: true,
          note: "Phụ trách các vấn đề hành chính",
        },
        {
          id: 3,
          unitCode: "GV",
          unitName: "Giáo viên",
          use: true,
          note: "Người truyền đạt kiến thức cho học sinh",
        },
        {
          id: 4,
          unitCode: "BV",
          unitName: "Bảo vệ",
          use: false,
          note: "Bảo vệ an ninh trường học",
        },
      ];
    },
  });

  const columns = useMemo<MRT_ColumnDef<IRead>[]>(
    () => [
      {
        header: "Mã chức vụ",
        accessorKey: "unitCode",
      },
      {
        header: "Tên chức vụ",
        accessorKey: "unitName",
      },
      {
        header: "Sử dụng",
        accessorKey: "use",
        accessorFn: (row) => {
          return (
            <MyCenterFull>
              <MyCheckbox readOnly checked={row.use} />
            </MyCenterFull>
          );
        },
      },
      {
        header: "Ghi chú",
        accessorKey: "note",
      },
    ],
    []
  );

  if (query.isLoading) return "Đang tải dữ liệu...";
  if (query.isError) return "Không có dữ liệu...";

  return (
    <MyDataTable
      enableRowSelection={true}
      exportAble
      columns={columns}
      data={query.data!}
      renderTopToolbarCustomActions={() => (
        <>
          <F12_9Create />
          <MyButton crudType="delete" />
          <AQButtonCreateByImportFile
            setImportedData={setFileData}
            onSubmit={() => {
              console.log("data: ");
            }}
            form={form_multiple}
          >
            s
          </AQButtonCreateByImportFile>
        </>
      )}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F12_9Update data={row.original} />
            <F12_9Delete id={row.original.id!} />
          </MyCenterFull>
        );
      }}
    />
  );
}
