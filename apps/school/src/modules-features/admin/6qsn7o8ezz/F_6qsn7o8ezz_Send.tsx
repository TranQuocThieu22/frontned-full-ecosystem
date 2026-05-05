"use client";
import { MyDataTable } from "@/components/DataDisplay/DataTable/MyDataTable";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  MyButton,
  MyButtonModal,
  MyButtonViewPDF,
  MyCheckbox,
  MyFieldset,
  MyFileInput,
  MySelect,
  MyTextArea,
} from "aq-fe-framework/components";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo } from "react";
import { utils_date_dateToDDMMYYYString } from "@/utils/date";
import { Box, Flex, Grid, Group, Paper, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface Props {
  data?: I_6qsn7o8ezz;
}

interface I_6qsn7o8ezz {
  id?: number;
  studentCode?: string;
  surname?: string;
  name?: string;
}

interface I_6qsn7o8ezz_gui {
  id?: number;
  loaiThongBao?: string;
  maHocSinh?: string;
  hoTen?: string;
  noiDung?: string;
  fileDinhKem?: string;
  zalo?: boolean;
  email?: boolean;
  sms?: boolean;
  ngayGui?: Date;
  nguoiCapNhat?: string;
  ngayCapNhat?: Date | undefined;
}

export default function F_6qsn7o8ezz_ThongBao({ data }: Props) {
  const dis = useDisclosure();

  const listOfThongBaoQuery = useQuery<I_6qsn7o8ezz_gui[]>({
    queryKey: [`listOfThongBaoQuery`],
    queryFn: async () => [
      {
        id: 1,
        loaiThongBao: "Thông báo chăm sóc sức khỏe",
        maHocSinh: "HS0001",
        hoTen: "Tô Ngọc Lâm",
        noiDung: "Bé bị tiêu chảy nhờ phụ huynh đón về",
        fileDinhKem:
          "https://cartographicperspectives.org/index.php/journal/article/view/cp13-full/pdf",
        zalo: true,
        email: true,
        sms: true,
        ngayGui: new Date(),
        nguoiCapNhat: "Quản trị viên",
        ngayCapNhat: new Date("2024-12-23"),
      },
    ],
  });

  const HOC_SINH_DATA = [
    { maHocSinh: "HS0001", hoTen: "Tô Ngọc Lâm" },
    { maHocSinh: "HS002", hoTen: "Trần Thị B" },
    { maHocSinh: "HS003", hoTen: "Lê Văn C" },
  ];

  const form = useForm<I_6qsn7o8ezz_gui>({
    initialValues: {
      id: data?.id ?? undefined,
      loaiThongBao: "Thông báo chăm sóc sức khỏe",
      maHocSinh: data?.studentCode ?? "",
      hoTen: `${data?.surname ?? ""} ${data?.name ?? ""}`.trim(),
      noiDung: "",
      fileDinhKem: "",
      zalo: true,
      email: true,
      sms: true,
      nguoiCapNhat: "Quản trị viên",
      ngayCapNhat: new Date(),
    },
    validate: {
      maHocSinh: (value) => (value ? null : "Vui lòng chọn học sinh"),
      noiDung: (value) => (value ? null : "Vui lòng nhập nội dung thông báo"),
    },
  });

  useEffect(() => {
    if (data) {
      const hoTen = `${data.surname ?? ""} ${data.name ?? ""}`.trim();
      const maHocSinh = HOC_SINH_DATA.some(
        (hs) => hs.maHocSinh === data.studentCode
      )
        ? data.studentCode
        : "";

      form.setValues({
        ...form.values,
        maHocSinh,
        hoTen: maHocSinh
          ? HOC_SINH_DATA.find((hs) => hs.maHocSinh === maHocSinh)?.hoTen ??
            hoTen
          : hoTen,
      });

      console.log("useEffect - data:", data);
      console.log("useEffect - form.values:", form.values);
      console.log("useEffect - HOC_SINH_DATA:", HOC_SINH_DATA);
    }
  }, [data]);

  const columns = useMemo<MRT_ColumnDef<I_6qsn7o8ezz_gui>[]>(
    () => [
      {
        header: "Loại thông báo",
        accessorKey: "loaiThongBao",
      },
      {
        header: "Mã học sinh",
        accessorKey: "maHocSinh",
      },
      {
        header: "Họ tên",
        accessorKey: "hoTen",
      },
      {
        header: "Nội dung",
        accessorKey: "noiDung",
      },
      {
        header: "File đính kèm",
        accessorKey: "fileDinhKem",
        Cell: ({ row }) => {
          const fileId = row.original.id;
          return <MyButtonViewPDF id={fileId} />;
        },
      },
      {
        header: "Zalo",
        accessorKey: "zalo",
        Cell: ({ cell }) => (
          <MyCheckbox checked={cell.getValue() as boolean} readOnly />
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        Cell: ({ cell }) => (
          <MyCheckbox checked={cell.getValue() as boolean} readOnly />
        ),
      },
      {
        header: "SMS",
        accessorKey: "sms",
        Cell: ({ cell }) => (
          <MyCheckbox checked={cell.getValue() as boolean} readOnly />
        ),
      },
      {
        header: "Ngày gửi",
        accessorKey: "ngayGui",
        accessorFn: (row) =>
          row.ngayGui
            ? utils_date_dateToDDMMYYYString(new Date(row.ngayGui))
            : "",
      },
      {
        header: "Người cập nhật",
        accessorKey: "nguoiCapNhat",
      },
      {
        header: "Ngày cập nhật",
        accessorKey: "ngayCapNhat",
        accessorFn: (row) =>
          row.ngayCapNhat
            ? utils_date_dateToDDMMYYYString(new Date(row.ngayCapNhat))
            : "",
      },
    ],
    []
  );

  if (listOfThongBaoQuery.isLoading) return "Đang tải dữ liệu...";
  if (listOfThongBaoQuery.isError) return "Không có dữ liệu...";

  return (
    <MyButtonModal
      label="Gửi"
      modalSize={1000}
      crudType="default"
      title="Chi tiết thông báo"
      onSubmit={() => {}}
      disclosure={dis}
    >
      <form
        onSubmit={form.onSubmit((values) => {
          console.log("Form submitted:", values);
          form.reset();
          dis[1].close();
        })}
      >
        <MySelect
          withAsterisk
          data={[
            "Thông báo chăm sóc sức khỏe",
            "Thông báo chăm sóc sức khỏe 2",
          ]}
          defaultValue="Thông báo chăm sóc sức khỏe"
          label="Loại thông báo"
          {...form.getInputProps("loaiThongBao")}
        />

        <MySelect
          label="Học sinh"
          withAsterisk
          disabled={!!data?.studentCode}
          data={HOC_SINH_DATA.map((hs) => ({
            value: hs.maHocSinh,
            label: `${hs.hoTen} - ${hs.maHocSinh}`,
          }))}
          {...form.getInputProps("maHocSinh", {
            onChange: (value: string | null) => {
              const selectedStudent = HOC_SINH_DATA.find(
                (hs) => hs.maHocSinh === value
              );
              form.setValues({
                ...form.values,
                maHocSinh: value ?? "",
                hoTen: selectedStudent ? selectedStudent.hoTen : "",
              });
            },
          })}
          clearable
        />

        <MyTextArea
          label="Nội dung thông báo"
          withAsterisk
          {...form.getInputProps("noiDung")}
        />

        <Grid mt={10}>
          <Grid.Col span={6}>
            <MyCheckbox
              label="Phiếu kết quả chăm sóc sức khỏe"
              {...form.getInputProps("phieuChamSoc", { type: "checkbox" })}
            />
            <MyFileInput
              label="File đính kèm"
              {...form.getInputProps("fileDinhKem")}
              mt="sm"
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={500} mb="xs">
              Phương tiện
            </Text>
            <MyCheckbox
              mb={10}
              label="Email"
              {...form.getInputProps("email", { type: "checkbox" })}
            />
            <MyCheckbox
              mb={10}
              label="Zalo"
              {...form.getInputProps("zalo", { type: "checkbox" })}
            />
            <MyCheckbox
              label="SMS"
              {...form.getInputProps("sms", { type: "checkbox" })}
            />
            <MyButton crudType="save" color="green" type="submit" mt="md">
              Gửi
            </MyButton>
          </Grid.Col>
        </Grid>
      </form>
      <Box>
        <MyFieldset mt="20" title="Danh sách thông báo đã gửi">
          <MyDataTable
            exportAble
            enableRowSelection
            enableRowNumbers
            columns={columns}
            data={listOfThongBaoQuery.data!}
          />
        </MyFieldset>
      </Box>
    </MyButtonModal>
  );
}
