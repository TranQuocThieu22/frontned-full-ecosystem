"use client";

import { Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonCreateByImportFile,
  AQButtonExportData,
  MyButton,
  MyCheckbox,
  MyDataTable,
  MyFieldset,
  MyFlexColumn,
  MySelect,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { U0DateToDDMMYYYString } from "@/utils/date";

interface Ibjmfi27v97_ReadDanhSachLichTrinhXeBuyt {
  diemDonTra: string;
  gioDonTra: string;
  gioThucTe: string;
  daDonTra: boolean;
  soLuongDonTra: number;
}

interface ISelectBoxProps {
  label: string;
  value: string;
}

const mockDanhSachLichTrinhXeBuyt: Ibjmfi27v97_ReadDanhSachLichTrinhXeBuyt[] = [
  {
    diemDonTra: "Khởi hành",
    gioDonTra: "06:00",
    gioThucTe: "06:02",
    daDonTra: true,
    soLuongDonTra: 0,
  },
  {
    diemDonTra: "Mega Market Thủ Đức",
    gioDonTra: "06:05",
    gioThucTe: "06:09",
    daDonTra: true,
    soLuongDonTra: 5,
  },
  {
    diemDonTra: "Khang Điền",
    gioDonTra: "06:15",
    gioThucTe: "06:20",
    daDonTra: true,
    soLuongDonTra: 2,
  },
  {
    diemDonTra: "Materize Home",
    gioDonTra: "06:25",
    gioThucTe: "06:32",
    daDonTra: true,
    soLuongDonTra: 4,
  },
  {
    diemDonTra: "Nam Long Home",
    gioDonTra: "06:45",
    gioThucTe: "06:50",
    daDonTra: true,
    soLuongDonTra: 3,
  },
  {
    diemDonTra: "Globe City",
    gioDonTra: "07:05",
    gioThucTe: "07:12",
    daDonTra: true,
    soLuongDonTra: 6,
  },
  {
    diemDonTra: "Bưng Ông Thoàn",
    gioDonTra: "07:15",
    gioThucTe: "07:22",
    daDonTra: true,
    soLuongDonTra: 4,
  },
  {
    diemDonTra: "Cầu Phú Long",
    gioDonTra: "07:25",
    gioThucTe: "07:32",
    daDonTra: true,
    soLuongDonTra: 1,
  },
  {
    diemDonTra: "Đã đến",
    gioDonTra: "08:00",
    gioThucTe: "07:52",
    daDonTra: true,
    soLuongDonTra: 0,
  },
];

const chonTuyenXeOptions: ISelectBoxProps[] = [
  { label: "Thủ Đức - Quận 9 - Quận 2", value: "1" },
  { label: "Quận 7 - Quận 1 - Quận Tân Bình", value: "2" },
  { label: "Quận 7 - Quận 5 - quận Tân Bình", value: "3" },
];

const chonLuotOptions: ISelectBoxProps[] = [
  { label: "Đón khách", value: "1" },
  { label: "Trả khách", value: "2" },
];

const routingPoints: [number, number][] = [
  [10.801055, 106.742893], // rand rand
  [10.820515, 106.759492],
  [10.843027, 106.773514],
  [10.852272, 106.754471],
  [10.863247, 106.745791],
  [10.855814, 106.737070],
  [10.845294, 106.728501],
  [10.833549, 106.713864],
  [10.838863, 106.737288],
];

export default function F_bjmfi27v97_Read() {
  //===initiate===
  const [importData, setImportData] = useState(false);

  const form = useForm<any>({
    initialValues: {
      importedData: [],
    },
  });

  const LeafletMap = dynamic(() => import("./F_bjmfi27v97_LeafMap"), {
    ssr: false,
  });

  const getTodayDate = U0DateToDDMMYYYString(new Date());

  //===pseudo code===
  const danhSachLichTrinhXeBuytQuery = useQuery<
    Ibjmfi27v97_ReadDanhSachLichTrinhXeBuyt[]
  >({
    queryKey: ["Fbjmfi27v97_ReadDanhSachLichTrinhXeBuyt"],
    queryFn: async () => mockDanhSachLichTrinhXeBuyt,
  });

  const chonTuyenXeQuery = useQuery<ISelectBoxProps[]>({
    queryKey: ["Fbjmfi27v97_ReadChonTuyenXe"],
    queryFn: async () => chonTuyenXeOptions,
  });

  const chonLuotQuery = useQuery<ISelectBoxProps[]>({
    queryKey: ["Fbjmfi27v97_ReadChonLuot"],
    queryFn: async () => chonLuotOptions,
  });

  //============= API =============

  //===============================

  //===config===
  const exportConfig = {
    fields: [
      { fieldName: "diemDonTra", header: "Điểm đón trả" },
      { fieldName: "gioDonTra", header: "Giờ đón trả" },
      { fieldName: "gioThucTe", header: "Giờ thực tế" },
      { fieldName: "daDonTra", header: "Đã đón trả" },
      { fieldName: "soLuongDonTra", header: "Số lượng đón trả" },
    ],
  };

  //===Cols===
  const danhSachLichTrinhXeBuytColumns = useMemo<
    MRT_ColumnDef<Ibjmfi27v97_ReadDanhSachLichTrinhXeBuyt>[]
  >(
    () => [
      { accessorKey: "diemDonTra", header: "Điểm đón / trả" },
      { accessorKey: "gioDonTra", header: "Giờ đón / trả" },
      { accessorKey: "gioThucTe", header: "Giờ thực tế" },
      {
        accessorFn: (row) => (
          <MyCheckbox onChange={() => { }} checked={row.daDonTra} />
        ),
        header: "Đã đón / trả",
      },
      { accessorKey: "soLuongDonTra", header: "Số lượng đón / trả" },
    ],
    []
  );

  //===query stage condition===
  if (danhSachLichTrinhXeBuytQuery.isLoading) {
    return "Đang tải dữ liệu...";
  }

  if (danhSachLichTrinhXeBuytQuery.isError) {
    return "Lỗi Tải dữ liệu!";
  }

  if (chonLuotQuery.isLoading) {
    return "Đang tải dữ liệu...";
  }

  if (chonLuotQuery.isError) {
    return "Lỗi Tải dữ liệu!";
  }

  if (chonTuyenXeQuery.isLoading) {
    return "Đang tải dữ liệu...";
  }

  if (chonTuyenXeQuery.isError) {
    return "Lỗi Tải dữ liệu!";
  }

  return (
    <>
      <Group>
        <MySelect
          w={"300"}
          pb={20}
          pl={12}
          data={chonTuyenXeQuery.data!}
          label="Chọn tuyến xe"
          defaultValue={"1"}
        />
        <MySelect
          w={"250"}
          pb={20}
          pl={12}
          data={chonLuotQuery.data!}
          label="Chọn lượt"
          defaultValue={"1"}
        />
        <Text pl={12}>Ngày: {getTodayDate}</Text>
      </Group>

      <MyFieldset title="Danh sách lịch trình tuyến xe">
        <SimpleGrid cols={2} spacing="sm">
          <MyDataTable
            enableRowNumbers={true}
            enableRowSelection={true}
            columns={danhSachLichTrinhXeBuytColumns}
            data={danhSachLichTrinhXeBuytQuery.data!}
            renderTopToolbarCustomActions={() => (
              <>
                <AQButtonCreateByImportFile
                  setImportedData={setImportData}
                  form={form}
                  onSubmit={() => {
                    console.log(form.values);
                  }}
                />
                <AQButtonExportData
                  data={danhSachLichTrinhXeBuytQuery.data!}
                  exportConfig={exportConfig}
                  objectName="danhSachLichTrinhXeBuyt"
                />
                <MyButton crudType="delete">Xóa</MyButton>
              </>
            )}
          />
          <LeafletMap points={routingPoints} />
        </SimpleGrid>
      </MyFieldset>

    </>
  );
}
