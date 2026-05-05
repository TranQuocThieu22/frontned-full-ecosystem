'use client'
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  MyActionIconUpdate,
  MyCheckbox,
  MyDateInput,
  MyFileInput,
  MyFlexColumn,
  MySelect,
  MyTextArea,
  MyTextInput
} from "aq-fe-framework/components";
import { IInfoViewModel } from "./F9_8_9ReadExchangeReport";
import { mockDataNguoiDuyetBaoCao, mockDataTrangThaiBaoCao } from "./mockData";

export default function F9_8_9UpdateExchangeReport({ values }: { values: IInfoViewModel }) {
  const form = useForm<IInfoViewModel>({
    initialValues: {
      ...values,
      maNguoiDung: "SV001 - Tô Ngọc Linh",
    },
    validate: {
      maLuotTraoDoi: (value) => (value ? null : "Lượt trao đổi không được để trống"),
      trangThaiBaoCao: (value) => (value ? null : "Trạng thái báo cáo không được để trống"),
      nguoiDuyetBaoCao: (value) => (value ? null : "Người duyệt báo cáo không được để trống"),
      ngayNopBaoCao: (value) => (value ? null : "Ngày nộp báo cáo không được để trống"),
      ngayDuyetBaoCao: (value) => (value ? null : "Ngày duyệt không được để trống"),
    },
  });

  return (
    <MyActionIconUpdate title="Chi tiết báo cáo" modalSize={"50%"} form={form} onSubmit={(values) => console.log(values)}>
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput label="Lượt trao đổi" {...form.getInputProps("maLuotTraoDoi")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={mockDataTrangThaiBaoCao} label="Trạng thái báo cáo" {...form.getInputProps("trangThaiBaoCao")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput label="Người dùng" readOnly value={form.values.maNguoiDung} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={mockDataNguoiDuyetBaoCao} label="Người duyệt" {...form.getInputProps("nguoiDuyetBaoCao")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyDateInput label="Ngày nộp báo cáo" {...form.getInputProps("ngayNopBaoCao")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyDateInput label="Ngày duyệt" {...form.getInputProps("ngayDuyetBaoCao")} />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyFileInput label="File đính kèm" />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyFlexColumn>
            <MyTextArea label="Đánh giá tổng quan" {...form.getInputProps("danhGiaTongQuan")} />
            <MyCheckbox label="Ngừng sử dụng" />
          </MyFlexColumn>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </Grid.Col>
      </Grid>
    </MyActionIconUpdate>
  );
}
