'use client'
import { CLOService, ICLO } from "@/shared/APIs/CLOService";
import { subjectService } from "@/shared/APIs/subjectService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Group, Skeleton } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyCenterFull, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import CLOCreate from "./CLOCreate";
import CLODelete from "./CLODelete";
import CLODeleteList from "./CLODeleteList";
import CLOUpdate from "./CLOUpdate";
import useS_CLO from "./useS_CLO";

export default function CLOTable() {
  const subjectQuery = useMyReactQuery({
    queryKey: ['subjectQuery'],
    axiosFn: async () => subjectService.getAll(),

  })
  const store = useS_CLO()

  const cloQuery = useMyReactQuery({
    queryKey: ['cloTable', store.state.subjectId],
    axiosFn: async () => CLOService.GetCLOsBySubjectId(store.state.subjectId),

  })
  // const cloQuery = useQuery({
  //   queryKey: ['CLOTable', store.state.subjectId],
  //   queryFn: () => {
  //     return mockData;
  //   }
  // })

  const columns = useMemo<MRT_ColumnDef<ICLO>[]>(() => [
    {
      header: "Mã CLO",
      accessorKey: "code",
    },
    {
      header: "Tên CLO",
      accessorKey: "name",
    },
    {
      header: "Mô tả chi tiết",
      accessorKey: "description",
    },

  ], []);
  useEffect(() => {
    if (!subjectQuery.data) return
    store.setProperty("subjectId", subjectQuery.data[0]?.id ? Number(subjectQuery.data[0].id) : 0)

  }, [subjectQuery.data])
  return (
    <>
      <Skeleton visible={subjectQuery.isLoading} mb={10}>
        <MySelect
          label="Chọn môn học"
          placeholder="Chọn môn học"
          data={subjectQuery.data?.map((item: any) => ({
            value: item.id.toString()!,
            label: item.name! == null ? "" : `${item.code}-${item.name}`!
          })) || []}
          value={store.state.subjectId.toString() || "0"}
          onChange={(data) => {
            store.setProperty("subjectId", data ? Number(data) : 0)
          }}
          clearable={false}
          mb="md"
          w={{ base: "100%", md: "50%" }}
        />
      </Skeleton>
      <MyFieldset title="Danh mục chuẩn đầu ra môn học (CLO)">
        <MyDataTable
          isLoading={cloQuery.isLoading}
          isError={cloQuery.isError}
          columns={columns}
          data={cloQuery.data || []}
          enableRowSelection={true}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <CLOCreate />
              <CustomButton color="green" leftSection={<IconUpload />}>Import</CustomButton>
              <CustomButton color="teal" leftSection={<IconTableExport />}>Export</CustomButton>
              <CLODeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
            </Group>
          )}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <CLOUpdate values={row.original} />
              <CLODelete code={row.original.code || ''} id={row.original.id || 0} />
            </MyCenterFull>

          )}
        />
      </MyFieldset>
    </>
  );
}

// Mock data cho danh sách môn học
const subjectOptions = [
  { value: 'CSDLCB', label: 'CSDLCB - Cơ sở dữ liệu cơ bản' },
  { value: 'LTHDT', label: 'LTHDT - Lập trình hướng đối tượng' },
  { value: 'CTDL', label: 'CTDL - Cấu trúc dữ liệu' },
  { value: 'TKWEB', label: 'TKWEB - Thiết kế web' },
  { value: 'LTMANG', label: 'LTMANG - Lập trình mạng' }
];

const mockData: ICLO[] = [
  {
    id: 1,
    code: "CLO1",
    name: "Hiểu và áp dụng các khái niệm cơ bản",
    description: "Sinh viên có khả năng giải thích và vận dụng các khái niệm nền tảng của môn học"
  },
  {
    id: 2,
    code: "CLO2",
    name: "Phân tích và đánh giá vấn đề",
    description: "Sinh viên có thể phân tích các tình huống thực tế và đưa ra đánh giá phù hợp"
  },
  {
    id: 3,
    code: "CLO3",
    name: "Thiết kế và triển khai giải pháp",
    description: "Sinh viên có khả năng xây dựng và thực hiện các giải pháp cho các vấn đề thực tiễn"
  },
  {
    id: 4,
    code: "CLO4",
    name: "Làm việc nhóm và giao tiếp hiệu quả",
    description: "Sinh viên phát triển kỹ năng làm việc nhóm và giao tiếp chuyên nghiệp"
  },
  {
    id: 5,
    code: "CLO5",
    name: "Học tập suốt đời",
    description: "Sinh viên có khả năng tự học và cập nhật kiến thức liên tục"
  }
];

