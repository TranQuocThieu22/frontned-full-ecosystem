"use client";

import { U0DateToDDMMYYYString } from "@/utils/date";
import {
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  AQButtonExportData,
  MyButton,
  MyButtonModal,
  MyButtonViewPDF,
  MyCenterFull,
  MyCheckbox,
  MyDataTable,
  MyFieldset,
  MyFileInput,
  MyTextArea,
  MyTextInput,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";

interface Iwmstx3k39c_DanhSachThongBaoDaGui {
  loaiThongBao: string;
  maHocSinh: string;
  hoTen: string;
  noiDung: string;
  fileDinhKem: string;
  zalo: boolean;
  email: boolean;
  sms: boolean;
  ngayGui: Date;
}

interface Iwmstx3k39c_StudentInfoProps {
  maHocSinh: string;
  hoTen: string;
}

const mockDanhSachThongBaoDaGui: Iwmstx3k39c_DanhSachThongBaoDaGui[] = [
  {
    loaiThongBao: "Cảnh cáo sức khỏe",
    maHocSinh: "HS0000001",
    hoTen: "Tô Ngọc Lâm",
    noiDung: "Có dấu hiệu dị ứng với nước",
    fileDinhKem: "",
    zalo: true,
    email: true,
    sms: true,
    ngayGui: new Date(2025, 2, 15),
  },
];

export default function F_wmstx3k39c_NotifiDetails({
  data,
  tenLop,
}: {
  data: Iwmstx3k39c_StudentInfoProps;
  tenLop: string;
}) {
  //===initiate===
  const disclosure = useDisclosure();

  //===pseudo code===
  const ketQuaGhiNhanQuery = useQuery<Iwmstx3k39c_DanhSachThongBaoDaGui[]>({
    queryKey: ["Fwmstx3k39c_ReadDanhSachThongBaoDaGui"],
    queryFn: async () => mockDanhSachThongBaoDaGui,
  });

  //===function===
  const exportConfig = {
    fields: [
      { fieldName: "loaiThongBao", header: "Loại thông báo" },
      { fieldName: "maHocSinh", header: "Mã học sinh" },
      { fieldName: "hoTen", header: "Họ tên" },
      { fieldName: "noiDung", header: "Nội dung" },
      { fieldName: "fileDinhKem", header: "File đính kèm" },
      { fieldName: "zalo", header: "Zalo" },
      { fieldName: "email", header: "Email" },
      { fieldName: "sms", header: "SMS" },
      { fieldName: "ngayGui", header: "Ngày gửi" },
    ],
  };

  //===component===
  const ketQuaGhiNhanColumns = useMemo<
    MRT_ColumnDef<Iwmstx3k39c_DanhSachThongBaoDaGui>[]
  >(
    () => [
      { accessorKey: "loaiThongBao", header: "Loại thông báo" },
      { accessorKey: "maHocSinh", header: "Mã học sinh" },
      { accessorKey: "hoTen", header: "Họ tên" },
      { accessorKey: "noiDung", header: "Nội dung" },
      {
        accessorFn: (row) => (
          <MyCenterFull>
            <MyButtonViewPDF />
          </MyCenterFull>
        ),
        header: "File đính kèm",
      },
      {
        accessorFn: (row) => (
          <MyCheckbox checked={row.zalo} onChange={() => { }} />
        ),
        header: "Zalo",
      },
      {
        accessorFn: (row) => (
          <MyCheckbox checked={row.email} onChange={() => { }} />
        ),
        header: "Email",
      },
      {
        accessorFn: (row) => (
          <MyCheckbox checked={row.sms} onChange={() => { }} />
        ),
        header: "SMS",
      },
      {
        accessorFn: (row) => U0DateToDDMMYYYString(new Date(row.ngayGui!)),
        header: "Ngày gửi",
      },
    ],
    []
  );

  return (
    <MyButtonModal disclosure={disclosure} modalSize={"80%"} label="Gửi" title="Chi tiết thông báo">
      <Group>
        <MyTextInput
          label="Loại thông báo"
          value="Cảnh cáo sức khỏe"
          disabled
          withAsterisk
          w={300}
        />
        <MyTextInput
          label="Học sinh"
          value={`${data.hoTen} - ${data.maHocSinh} - ${tenLop}`}
          disabled
          w={300}
        />
        <MyTextArea label="Nội dung thông báo" />
      </Group>
      <SimpleGrid cols={2} spacing={"md"} >
        <Stack>
          <Text>Phương tiện</Text>
          <MyCheckbox label="Zalo" />
          <MyCheckbox label="Email" />
          <MyCheckbox label="SMS" />
        </Stack>
        <Stack gap={10}>
          <Text></Text>
          <MyCheckbox label="Phiếu kết quả khám sức khỏe" />
          <MyFileInput label="File đính kèm" />
          <Flex pt={15}>
            <MyButton crudType="default" color="green">
              Gửi
            </MyButton>
          </Flex>
        </Stack>
      </SimpleGrid>

      <MyFieldset title="Danh sách thông báo đã gửi">
        <MyDataTable
          enableRowSelection={true}
          columns={ketQuaGhiNhanColumns}
          data={ketQuaGhiNhanQuery.data!}
          renderTopToolbarCustomActions={() => (
            <>
              <AQButtonExportData
                data={ketQuaGhiNhanQuery.data!}
                exportConfig={exportConfig}
                objectName="danhSachThongBaoDaGui"
              />
            </>
          )}
        />
      </MyFieldset>
    </MyButtonModal>
  );
}
