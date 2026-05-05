import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonDeleteList,
  MyCenterFull,
  MyDataTable,
  MyFieldset,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { IUnitViewModel } from "./interfaces/UnitViewModel";
import UnitCreate from "./UnitCreate";
import UnitDelete from "./UnitDelete";
import UnitUpdate from "./UnitUpdate";

export default function UnitTable() {
  const ListOfagentDirectoryQuery = useQuery<IUnitViewModel[]>({
    queryKey: [`ListOfagentDirectoryQuery`],
    queryFn: async () => mockData,
  });

  const columns = useMemo<MRT_ColumnDef<IUnitViewModel>[]>(
    () => [
      {
        header: "Mã đơn vị",
        accessorKey: "code",
      },
      {
        header: "Tên đơn vị",
        accessorKey: "name",
      },
      {
        header: "Loại đơn vị",
        accessorKey: "type",
      },
      {
        header: "Trực thuộc",
        accessorKey: "affiliatedOf",
      },
    ],
    []
  );
  if (ListOfagentDirectoryQuery.isLoading) return "Đang tải dữ liệu...";
  if (ListOfagentDirectoryQuery.isError) return "Không có dữ liệu...";

  return (
    <MyFieldset title="Danh sách đơn vị">
      <MyDataTable
        enableRowSelection={true}
        columns={columns}
        data={ListOfagentDirectoryQuery.data!}
        renderTopToolbarCustomActions={({ table }) => (
          <>
            <UnitCreate />
            <MyButton crudType="import" />
            <MyButton crudType="export" />
            <MyButtonDeleteList
              contextData={table
                .getSelectedRowModel()
                .flatRows.flatMap((item) => item.original.code)
                .join(", ")}
              onSubmit={() => { }}
            />
          </>
        )}
        renderRowActions={({ row }) => (
          <MyCenterFull>
            <UnitUpdate data={row.original} />
            <UnitDelete data={row.original} />
          </MyCenterFull>
        )}
      />
    </MyFieldset>
  );
}

const mockData: IUnitViewModel[] = [
  {
    id: 1,
    code: "K.CNTT",
    name: "Khoa Công nghệ thông tin",
    type: "Khoa",
    affiliatedOf: "",
    nguoiCapNhat: "Quản trị viên",
    ngayCapNhat: new Date("2024-12-23"),
  },
  {
    id: 1,
    code: "K.CNTT.DL",
    name: "Bộ môn cơ sở dữ liệu",
    type: "Bộ môn",
    affiliatedOf: "Khoa Công nghệ thông tin",
    nguoiCapNhat: "Quản trị viên",
    ngayCapNhat: new Date("2024-12-23"),
  },
];
