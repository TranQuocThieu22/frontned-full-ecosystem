'use client'
import { ISubject, subjectService } from "@/shared/APIs/subjectService";
import { Group } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyButton, MyCenterFull, MyDataTable, MyFieldset } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import SubjectCreate from "./SubjectCreate";
import SubjectDelete from "./SubjectDelete";
import SubjectDeleteList from "./SubjectDeleteList";
import SubjectUpdate from "./SubjectUpdate";

export default function SubjectTable() {
  const subjectQuery = useMyReactQuery({
    queryKey: ['SubjectTable'],
    axiosFn: async () => {
      return subjectService.getAll({ params: `?Cols=EVADifficulty` })
    },
    options: {
      refetchOnWindowFocus: false
    }
  })
  const columns = useMemo<MRT_ColumnDef<ISubject>[]>(() => [
    {
      header: "Mã môn học",
      accessorKey: "code",
    },
    {
      header: "Tên môn học",
      accessorKey: "name",
    },
    {
      header: "Thang đo độ khó",
      accessorFn: (row) => {
        return row.evaDifficulty?.name;
      },
    },
    {
      header: "Ghi chú",
      accessorKey: "note",
    },

  ], []);

  return (
    <MyFieldset title="Danh mục môn học">
      <MyDataTable
        isLoading={subjectQuery.isLoading}
        isError={subjectQuery.isError}
        columns={columns}
        data={subjectQuery.data || []}
        enableRowSelection={true}
        renderTopToolbarCustomActions={({ table }) => (
          <Group>
            <SubjectCreate />
            <MyButton color="green" leftSection={<IconUpload />}>Import</MyButton>
            <MyButton color="teal" leftSection={<IconTableExport />}>Export</MyButton>
            <SubjectDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
          </Group>
        )}
        renderRowActions={({ row }) => {


          return (
            <MyCenterFull>
              <SubjectUpdate values={row.original} />
              <SubjectDelete code={row.original.code || ''} id={row.original.id || 0} />
            </MyCenterFull>
          );
        }}
      />
    </MyFieldset>
  );
}

const mockData: ISubject[] = [
  {
    id: 1,
    code: "TOAN",
    name: "Toán",
    evaDifficultyId: 1,
    note: ""
  },
  {
    id: 2,
    code: "LY",
    name: "Vật Lý",
    evaDifficultyId: 2,
    note: ""
  },
  {
    id: 3,
    code: "HOA",
    name: "Hóa Học",
    evaDifficultyId: 3,
    note: ""
  },
  {
    id: 4,
    code: "CSDLCB",
    name: "Cơ sở dữ liệu cơ bản",
    evaDifficultyId: 4,
    note: ""
  }
]