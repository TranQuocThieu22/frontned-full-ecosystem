'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Flex, Group, Paper, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import F_5lr6tlkskp_Create from "./F_5lr6tlkskp_Create";

interface I5lr6tlkskpViewModal {
  stt: number;
  maPhong: string;
  tenPhong: string;
  tinhChat: string;
  day: string;
  sucChuaHoc: number;
  sucChuaThi: number;
}

const mockData: I5lr6tlkskpViewModal[] = [
  { stt: 1, maPhong: "P001", tenPhong: "Phòng 001", tinhChat: "Lý thuyết", day: "A", sucChuaHoc: 50, sucChuaThi: 20 },
  { stt: 2, maPhong: "P002", tenPhong: "Phòng 002", tinhChat: "Lý thuyết", day: "A", sucChuaHoc: 50, sucChuaThi: 20 },
  { stt: 3, maPhong: "P003", tenPhong: "Phòng 003", tinhChat: "Lý thuyết", day: "A", sucChuaHoc: 50, sucChuaThi: 20 },
];

export default function F_5lr6tlkskp_Read() {
  const roomUseQuery = useQuery<I5lr6tlkskpViewModal[]>({
    queryKey: ["IF_5lr6tlkskp_Read"],
    queryFn: async () => mockData,
    refetchOnWindowFocus: false,
  });

  // const [selectedRow, setSelectedRow] = useState<number[]>([]);

  // useEffect(() => {
  //   if (roomUseQuery.data && roomUseQuery.data.length > 0) {
  //     setSelectedRow([roomUseQuery.data[0]?.stt]);
  //   }
  // }, [roomUseQuery.data]);

  const columns = useMemo<MRT_ColumnDef<I5lr6tlkskpViewModal>[]>(() => [
    { accessorKey: "maPhong", header: "Mã phòng" },
    { accessorKey: "tenPhong", header: "Tên phòng" },
    { accessorKey: "tinhChat", header: "Tính chất phòng" },
    { accessorKey: "day", header: "Dãy" },
    { accessorKey: "sucChuaHoc", header: "Sức chứa học" },
    { accessorKey: "sucChuaThi", header: "Sức chứa thi" },
  ], []);

  if (roomUseQuery.isLoading) return <Text>Đang tải dữ liệu...</Text>;
  if (roomUseQuery.isError) return <Text color="red">Không có dữ liệu...</Text>;

  return (
    <Paper p={"md"}>

      <Flex align="center" gap="xs" mb="md">
        <Text size="sm">Chọn đợt thi  </Text>
        <Select
          size="xs"
          radius="xl"
          placeholder="Chọn đợt thi"
          data={[
            { value: "dc_tap_trung", label: "DC-Tập trung thi đại cương" }
          ]}
          defaultValue={"dc_tap_trung"}
        />
        <Text size="sm">Số lượng nhóm: 18 </Text>
        <Text size="sm">Số lượng thí sinh: 263</Text>
        <Text size="sm">Số lượng phòng: 18 </Text>
        <Text size="sm">Tổng sức chứa thi:300</Text>

      </Flex>

      <MyFieldset title="Danh sách phòng thi">
        <MyDataTable
          exportAble
          columns={columns}
          data={roomUseQuery.data || []}
          renderTopToolbarCustomActions={() => (
            <Group>
              <F_5lr6tlkskp_Create />
              <MyButton crudType="delete" />
            </Group>
          )}
        />
      </MyFieldset>
    </Paper>
  );
}
