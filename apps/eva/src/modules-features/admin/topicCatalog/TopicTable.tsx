'use client'
import { subjectService } from "@/shared/APIs/subjectService";
import { ITopic, topicService } from "@/shared/APIs/topicService";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Group, Skeleton } from "@mantine/core";
import { IconTableExport, IconUpload } from "@tabler/icons-react";
import { MyCenterFull, MyDataTable, MyFieldset, MySelect } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import TopicCreate from "./TopicCreate";
import TopicDelete from "./TopicDelete";
import TopicDeleteList from "./TopicDeleteList";
import TopicUpdate from "./TopicUpdate";
import useS_Topic from "./useS_Topic";

export default function TopicTable() {
  const subjectQuery = useMyReactQuery({
    queryKey: ['subjectQuery'],
    axiosFn: async () => subjectService.getAll(),

  })
  const store = useS_Topic()

  const topicBySubjectIdQuery = useMyReactQuery({
    queryKey: ['topicBySubjectIdQuery', store.state.subjectId],
    axiosFn: async () => topicService.GetTopicBySubjectId({ subjectId: store.state.subjectId })
  })
  // const { data } = useQuery({
  //   queryKey: ['TopicTable'],
  //   queryFn: () => {
  //     return mockData
  //   }
  // })
  const columns = useMemo<MRT_ColumnDef<ITopic>[]>(() => [
    {
      header: "Mã chương/ chủ đề",
      accessorKey: "code",
    },
    {
      header: "Tên chương/ chủ đề",
      accessorKey: "name",
    },
    {
      header: "Ghi chú",
      accessorKey: "note",
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
            // topicBySubjectIdQuery.refetch()

          }}
          clearable={false}
          mb="md"
          w={{ base: "100%", md: "50%" }}
        />
      </Skeleton>
      <MyFieldset title="Danh mục chương/ chủ đề">
        <MyDataTable
          isLoading={topicBySubjectIdQuery.isLoading}
          isError={topicBySubjectIdQuery.isError}
          columns={columns}
          enableRowSelection
          data={topicBySubjectIdQuery.data || []}
          renderTopToolbarCustomActions={({ table }) => (
            <Group>
              <TopicCreate />
              <CustomButton color="green" leftSection={<IconUpload />}>Import</CustomButton>
              <CustomButton color="teal" leftSection={<IconTableExport />}>Export</CustomButton>
              <TopicDeleteList values={table.getSelectedRowModel().flatRows.flatMap(item => item.original)} />
            </Group>
          )}
          renderRowActions={({ row }) => (
            <MyCenterFull>
              <TopicUpdate values={row.original} />
              <TopicDelete code={row.original.code || ''} id={row.original.id || 0} />
            </MyCenterFull>

          )}
        />
      </MyFieldset>
    </>
  );
}

const mockData: ITopic[] = [
  {
    id: 1,
    code: "C1",
    name: "Giới thiệu về cấu trúc và giải thuật",
    note: ""
  },
  {
    id: 2,
    code: "C2",
    name: "Kiểu dữ liệu trừu tượng (ADT)",
    note: ""
  },
  {
    id: 1002,
    code: "C3",
    name: "Mảng (Array)",
    note: ""
  },
  {
    id: 4,
    code: "C4",
    name: "Hàng đợi (Queue)",
    note: ""
  },
  {
    id: 5,
    code: "C5",
    name: "Cây (Tree)",
    note: ""
  },
  {
    id: 6,
    code: "C6",
    name: "Cấp phát dữ liệu động và phân tích hiệu suất",
    note: ""
  }
]

// Mock data cho danh sách môn học
const subjectOptions = [
  { value: 'CSDLCB', label: 'CSDLCB - Cơ sở dữ liệu cơ bản' },
  { value: 'LTHDT', label: 'LTHDT - Lập trình hướng đối tượng' },
  { value: 'CTDL', label: 'CTDL - Cấu trúc dữ liệu' },
  { value: 'TKWEB', label: 'TKWEB - Thiết kế web' },
  { value: 'LTMANG', label: 'LTMANG - Lập trình mạng' }
];