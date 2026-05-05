"use client";

import {
  MyButtonCreate,
  MySelect,
  MyTextInput,
  MyNumberInput,
  MyTextArea,
  MyDateInput,
} from "aq-fe-framework/components";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { IconCalendar } from "@tabler/icons-react";
import { Grid } from "@mantine/core";

interface I_v9g6ko7dbi_Create {
  maSuKien: string;
  tenSuKien: string;
  ngayToChuc: Date | null;
  gioBatDau: string;
  thoiGian: number;
  ngayBatDauDangKy: Date | null;
  ngayKetThucDangKy: Date | null;
  diaDiem: string;
  trangThai: string;
  soLuongDuKien: number;
  lePhi: number;
  hocSinh: string;
  ghiChu: string;
}

const trangThaiSelectData = [
  {
    label: "Sắp diễn ra",
    value: "Sắp diễn ra",
  },
  {
    label: "Đang diễn ra",
    value: "Đang diễn ra",
  },
  {
    label: "Đã kết thúc",
    value: "Đã kết thúc",
  },
];

export default function F_v9g6ko7dbi_Create() {
  const disclosure = useDisclosure();
  const calendarIcon = <IconCalendar size="1rem" style={{ opacity: 0.5 }} />;

  // Mock query for locations
  const diaDiemQuery = useQuery({
    queryKey: ["Fv9g6ko7dbi_diaDiem_CreateQuery"],
    queryFn: async () => [
      { label: "Hội trường A", value: "Hội trường A" },
      { label: "Hội trường B", value: "Hội trường B" },
      { label: "Phòng C", value: "Phòng C" },
    ],
  });

  // Mock query for students
  const hocSinhQuery = useQuery({
    queryKey: ["Fv9g6ko7dbi_hocSinh_CreateQuery"],
    queryFn: async () => [
      { label: "Tô Ngọc Linh - SV0002 - Lớp 11A6", value: "SV0002" },
      { label: "Nguyễn Văn A - SV0003 - Lớp 11A7", value: "SV0003" },
      { label: "Trần Thị B - SV0004 - Lớp 11A8", value: "SV0004" },
    ],
  });

  const form = useForm<I_v9g6ko7dbi_Create>({
    initialValues: {
      maSuKien: "",
      tenSuKien: "",
      ngayToChuc: null,
      gioBatDau: "",
      thoiGian: 0,
      ngayBatDauDangKy: null,
      ngayKetThucDangKy: null,
      diaDiem: "",
      trangThai: "Sắp diễn ra",
      soLuongDuKien: 0,
      lePhi: 0,
      hocSinh: "",
      ghiChu: "",
    },
    validate: {
      tenSuKien: (value) => (value ? null : "Không được để trống"),
      hocSinh: (value) => (value ? null : "Không được để trống"),
      ngayToChuc: (value) => (value ? null : "Không được để trống"),
      ngayKetThucDangKy: (value, values) =>
        value && values.ngayBatDauDangKy && value > values.ngayBatDauDangKy
          ? null
          : "Ngày kết thúc đăng ký phải sau ngày bắt đầu đăng ký",
      maSuKien: (value) => (value ? null : "Không được để trống"),
      gioBatDau: (value) => (value ? null : "Không được để trống"),
      thoiGian: (value) => (value > 0 ? null : "Thời gian phải lớn hơn 0"),
      ngayBatDauDangKy: (value) => (value ? null : "Không được để trống"),
      diaDiem: (value) => (value ? null : "Không được để trống"),
      soLuongDuKien: (value) => (value > 0 ? null : "Số lượng dự kiến phải lớn hơn 0"),
    },
  });

  if (diaDiemQuery.isLoading || hocSinhQuery.isLoading) return "Đang tải...";
  if (diaDiemQuery.isError || hocSinhQuery.isError) return "Có lỗi xảy ra!";

  return (
    <>
      <MyButtonCreate
        form={form}
        modalSize="lg"
        disclosure={disclosure}
        crudType="create"
        title={"Chi tiết đăng ký"}
        onSubmit={() => {}}
      >
        <Grid gutter="md">
          {/* Left Column */}
          <Grid.Col span={6}>
            <MyTextInput label="Tên sự kiện" {...form.getInputProps("tenSuKien")} />
            <MyDateInput
              label="Ngày tổ chức"
              valueFormat="DD/MM/YYYY"
              rightSection={calendarIcon}
              {...form.getInputProps("ngayToChuc")}
            />
            <MyTextInput
              label="Giờ bắt đầu"
              placeholder="HH:MM"
              {...form.getInputProps("gioBatDau")}
            />
            <MyNumberInput label="Thời gian (phút)" {...form.getInputProps("thoiGian")} />
            <MyDateInput
              label="Ngày bắt đầu đăng ký"
              valueFormat="DD/MM/YYYY"
              rightSection={calendarIcon}
              {...form.getInputProps("ngayBatDauDangKy")}
            />
            <MyDateInput
              label="Ngày kết thúc đăng ký"
              valueFormat="DD/MM/YYYY"
              rightSection={calendarIcon}
              {...form.getInputProps("ngayKetThucDangKy")}
            />
          </Grid.Col>

          {/* Right Column */}
          <Grid.Col span={6}>
            <MySelect
              data={diaDiemQuery.data!}
              label="Địa điểm"
              {...form.getInputProps("diaDiem")}
            />
            <MySelect
              data={trangThaiSelectData}
              label="Trạng thái"
              {...form.getInputProps("trangThai")}
              disabled
            />
            <MyNumberInput label="Số lượng dự kiến" {...form.getInputProps("soLuongDuKien")} />
            <MyNumberInput
              label="Lệ phí"
              thousandSeparator=" "
              suffix="VNĐ"
              {...form.getInputProps("lePhi")}
            />
            <MySelect
              data={hocSinhQuery.data!}
              label="Họ Tên"
              {...form.getInputProps("hocSinh")}
              searchable
              clearable
            />
          </Grid.Col>

          {/* Full width for text area */}
          <Grid.Col span={12}>
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
          </Grid.Col>
        </Grid>
      </MyButtonCreate>
    </>
  );
}
