"use client";
import AQButtonCreateByImportFile from "@/components/Buttons/ButtonCRUD/AQButtonCreateByImportFile";
import MyCenterFull from "@/components/CenterFull/MyCenterFull";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { Badge, Checkbox, DefaultMantineColor, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCheck,
  IconHourglassHigh,
  IconOctagonMinus,
  IconPlayerPause,
  IconX,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { MRT_ColumnDef } from "mantine-react-table";
import { ReactNode, useMemo, useState } from "react";
import F12_12Create from "./F12_12Create";
import F12_12Delete from "./F12_12Delete";
import F12_12Update from "./F12_12Update";
import { MyButton } from "@/components/Buttons/Button/MyButton";

interface I_F12_12_Form {
  id?: number;
  code?: string;
  name?: string;
  isUsed?: boolean;
  note?: string;
}

const mockData: I_F12_12_Form[] = [
  {
    id: 1,
    code: "QĐ001",
    name: "Đầu tư cơ sở hạ tầng năm 2024",
    isUsed: true,
    note: "",
  },
  {
    id: 2,
    code: "QĐ002",
    name: "Mua sắm thiết bị phòng thí nghiệm",
    isUsed: true,
    note: "Ưu tiên cao",
  },
  {
    id: 3,
    code: "QĐ003",
    name: "Nâng cấp phòng học thông minh",
    isUsed: true,
    note: "Đang triển khai",
  },
  {
    id: 4,
    code: "QĐ004",
    name: "Sửa chữa cơ sở vật chất khu A",
    isUsed: false,
    note: "Hoãn đến quý 3/2024",
  },
  {
    id: 5,
    code: "QĐ005",
    name: "Trang bị máy tính cho phòng máy",
    isUsed: true,
    note: "",
  },
  {
    id: 6,
    code: "QĐ006",
    name: "Xây dựng khu thể thao đa năng",
    isUsed: true,
    note: "Giai đoạn 1",
  },
  {
    id: 7,
    code: "QĐ007",
    name: "Mua sắm thiết bị y tế phòng y tế",
    isUsed: false,
    note: "Chờ phê duyệt",
  },
  {
    id: 8,
    code: "QĐ008",
    name: "Nâng cấp hệ thống PCCC toàn trường",
    isUsed: true,
    note: "Ưu tiên cao",
  },
  {
    id: 9,
    code: "QĐ009",
    name: "Trang bị thiết bị âm thanh hội trường",
    isUsed: true,
    note: "",
  },
  {
    id: 10,
    code: "QĐ010",
    name: "Cải tạo cảnh quan khuôn viên",
    isUsed: true,
    note: "Đang thực hiện",
  },
];

export default function F12_12Read() {
  const AllLecturer = useQuery<I_F12_12_Form[]>({
    queryKey: [`initialData`],
    queryFn: async () => {
      // const response = await baseAxios.post("/SystemCatalogProjectTypeCategory/getall");
      return mockData;
    },
  });

  const [fileData, setFileData] = useState<any[]>([]);
  const form_multiple = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  const columns = useMemo<MRT_ColumnDef<I_F12_12_Form>[]>(
    () => [
      {
        header: "Mã quyết định",
        accessorKey: "code",
      },
      {
        header: "Tên quyết định",
        accessorKey: "name",
      },
      {
        header: "Sử dụng",
        accessorKey: "isUsed",
        accessorFn(row) {
          return (
            <MyCenterFull>
              <Checkbox checked={!!row.isUsed} readOnly />
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

  if (AllLecturer.isLoading) return "Đang tải dữ liệu...";
  if (AllLecturer.isError) return "Không có dữ liệu...";

  return (
    <MyDataTable
      enableRowSelection={true}
      exportAble
      columns={columns}
      data={AllLecturer.data!}
      renderTopToolbarCustomActions={() => (
        <Group>
          <F12_12Create />
          <AQButtonCreateByImportFile
            setImportedData={setFileData}
            onSubmit={() => {
              console.log("data: ", fileData);
            }}
            form={form_multiple}
          />
          <MyButton crudType="delete" />
        </Group>
      )}
      renderRowActions={({ row }) => {
        return (
          <MyCenterFull>
            <F12_12Update equipmentDecisionValues={row.original} />
            <F12_12Delete equipmentDecisionId={row.original.id!} />
          </MyCenterFull>
        );
      }}
    />
  );
}

export function DisplayAssignedStatus({ assignStatus }: { assignStatus: string }) {
  interface I {
    color?: DefaultMantineColor;
    label?: string;
    leftSection?: ReactNode;
  }

  const data: I[] = [
    { label: "Đang giảng dạy", color: "#32cd32", leftSection: <IconCheck></IconCheck> },
    { label: "Chờ phân công", color: "#FFD700", leftSection: <IconHourglassHigh /> },
    { label: "Tạm ngưng", color: "#FFA07A", leftSection: <IconPlayerPause /> },
    { label: "Bị đình chỉ", color: "#FF0000", leftSection: <IconX /> },
    { label: "Nghỉ việc", color: "#696969", leftSection: <IconOctagonMinus /> },
  ];

  const selected = data.find((item) => item.label === assignStatus);
  return (
    <Badge
      w="100%"
      leftSection={selected?.leftSection || <IconCheck />}
      variant="light"
      color={selected?.color || "#32cd32"}
      radius="xs"
    >
      {selected?.label || "Mặc định"}
    </Badge>
  );
}
