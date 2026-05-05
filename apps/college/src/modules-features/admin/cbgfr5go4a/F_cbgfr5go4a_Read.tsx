'use client'

import { MyButton } from "@/components/Buttons/Button/MyButton";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import MyFieldset from "@/components/Inputs/Fieldset/MyFieldset";
import { Button, Checkbox, Flex, Group, Paper, Select, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";

interface Icbgfr5go4aViewModal {
  STT: number;
  NgayThi: string;
  KhongThi: boolean;
  Tiet1: boolean;
  Tiet2: boolean;
  Tiet3: boolean;
  Tiet4: boolean;
  Tiet5: boolean;
  Tiet6: boolean;
  Tiet7: boolean;
  Tiet8: boolean;
  Tiet9: boolean;
  Tiet10: boolean;
  Tiet11: boolean;
  Tiet12: boolean;
  Tiet13: boolean;
}
const mockData: Icbgfr5go4aViewModal[] = [
  {
    "STT": 1,
    "NgayThi": "12/03/2025",
    "KhongThi": true,
    "Tiet1": false,
    "Tiet2": false,
    "Tiet3": false,
    "Tiet4": false,
    "Tiet5": false,
    "Tiet6": false,
    "Tiet7": false,
    "Tiet8": false,
    "Tiet9": false,
    "Tiet10": false,
    "Tiet11": false,
    "Tiet12": false,
    "Tiet13": true
  },
  {
    "STT": 2,
    "NgayThi": "13/03/2025",
    "KhongThi": false,
    "Tiet1": false,
    "Tiet2": false,
    "Tiet3": false,
    "Tiet4": false,
    "Tiet5": false,
    "Tiet6": false,
    "Tiet7": false,
    "Tiet8": false,
    "Tiet9": false,
    "Tiet10": false,
    "Tiet11": false,
    "Tiet12": false,
    "Tiet13": false
  },
  {
    "STT": 3,
    "NgayThi": "13/03/2025",
    "KhongThi": false,
    "Tiet1": false,
    "Tiet2": false,
    "Tiet3": false,
    "Tiet4": false,
    "Tiet5": false,
    "Tiet6": false,
    "Tiet7": false,
    "Tiet8": false,
    "Tiet9": false,
    "Tiet10": false,
    "Tiet11": false,
    "Tiet12": false,
    "Tiet13": false
  },
  {
    "STT": 4,
    "NgayThi": "13/03/2025",
    "KhongThi": false,
    "Tiet1": false,
    "Tiet2": false,
    "Tiet3": false,
    "Tiet4": false,
    "Tiet5": false,
    "Tiet6": false,
    "Tiet7": false,
    "Tiet8": false,
    "Tiet9": false,
    "Tiet10": false,
    "Tiet11": false,
    "Tiet12": false,
    "Tiet13": false
  },
  {
    "STT": 5,
    "NgayThi": "13/03/2025",
    "KhongThi": false,
    "Tiet1": false,
    "Tiet2": false,
    "Tiet3": false,
    "Tiet4": false,
    "Tiet5": false,
    "Tiet6": false,
    "Tiet7": false,
    "Tiet8": false,
    "Tiet9": false,
    "Tiet10": false,
    "Tiet11": false,
    "Tiet12": false,
    "Tiet13": false
  },


]

export default function F_cbgfr5go4a_Read() {


  const listNoExam = useQuery<Icbgfr5go4aViewModal[]>({
    queryKey: ["IF_cbgfr5go4a_Read"],
    queryFn: async () => mockData, refetchOnWindowFocus: false,
  });
  const [selectedRow, setSelectedRow] = useState<number[]>([]);

  useEffect(() => {
    if (listNoExam.data) {
      setSelectedRow([listNoExam.data[0]?.STT!]);

    }
  }, [listNoExam.data])
  const columns = useMemo<MRT_ColumnDef<Icbgfr5go4aViewModal>[]>(() =>
    [

      {
        accessorKey: "NgayThi",
        header: "Ngày Thi",

      },
      {
        accessorKey: "KhongThi",
        header: "Không Thi",
        Cell: ({ row }) => <Checkbox checked={row.original.KhongThi} readOnly />,
      },
      {
        accessorKey: "Tiet1",
        header: "Tiết 1",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet1} />,
      },
      {
        accessorKey: "Tiet2",
        header: "Tiết 2",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet2} />,
      },
      {
        accessorKey: "Tiet3",
        header: "Tiết 3",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet3} />,
      },
      {
        accessorKey: "Tiet4",
        header: "Tiết 4",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet4} />,
      },
      {
        accessorKey: "Tiet5",
        header: "Tiết 5",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet5} />,
      },
      {
        accessorKey: "Tiet6",
        header: "Tiết 6",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet6} />,
      },
      {
        accessorKey: "Tiet7",
        header: "Tiết 7",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet7} />,
      },
      {
        accessorKey: "Tiet8",
        header: "Tiết 8",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet8} />,
      },
      {
        accessorKey: "Tiet9",
        header: "Tiết 9",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet9} />,
      },
      {
        accessorKey: "Tiet10",
        header: "Tiết 10",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet10} />,
      },
      {
        accessorKey: "Tiet11",
        header: "Tiết 11",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet11} />,
      },
      {
        accessorKey: "Tiet12",
        header: "Tiết 12",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet12} />,
      },
      {
        accessorKey: "Tiet13",
        header: "Tiết 13",
        Cell: ({ row }) => <Checkbox defaultChecked={row.original.Tiet13} />,
      },
    ], []);
  if (listNoExam.isLoading) return <Text>Đang tải dữ liệu...</Text>;

  if (listNoExam.isError) return <Text>Không có dữ liệu...</Text>;

  return (

    <Paper p={"md"}> <Flex align="center" gap="xs" mb="md">
      <Text size="sm">Chọn đợt thi

      </Text>
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
      <MyFieldset title="Danh sách thời gian không thi">
        <MyDataTable columns={columns}
          exportAble
          data={listNoExam.data || []}
          renderTopToolbarCustomActions={() => (<Group>
            <Button color="green">Lưu</Button>
            <MyButton crudType="delete" />

          </Group>)

          } />
      </MyFieldset>
      `</Paper>

  )
}
