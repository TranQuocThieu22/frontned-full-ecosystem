'use client'
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyCheckbox, MyDateInput, MyFileInput, MyFlexColumn, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IInfoViewModel } from "./F9_8_9ReadExchangeReport";
import { mockDataNguoiDuyetBaoCao, mockDataTrangThaiBaoCao } from "./mockData";



export default function F9_8_9CreateExchangeReport() {
  const form = useForm<IInfoViewModel>({
    initialValues: {
      maNguoiDung: "SV001 - Tô Ngọc Linh",
      maLuotTraoDoi: "",
      trangThaiBaoCao: "",
      nguoiDuyetBaoCao: "",
      ngayNopBaoCao: undefined,
      ngayDuyetBaoCao: undefined,
      danhGiaTongQuan: "",
      ghiChu: "",
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
    <MyButtonCreate modalSize={"50%"} objectName="Báo cáo" form={form} onSubmit={(values) => console.log(values)}>
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput label="Lượt trao đổi" {...form.getInputProps("maLuotTraoDoi")}></MyTextInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={mockDataTrangThaiBaoCao} label="Trạng thái báo cáo" {...form.getInputProps("trangThaiBaoCao")}></MySelect>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput label="Người dùng" readOnly value={form.values.maNguoiDung}></MyTextInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={mockDataNguoiDuyetBaoCao} label="Người duyệt" {...form.getInputProps("nguoiDuyetBaoCao")}></MySelect>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyDateInput label="Ngày nộp báo cáo" {...form.getInputProps("ngayNopBaoCao")}></MyDateInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyDateInput label="Ngày duyệt" {...form.getInputProps("ngayDuyetBaoCao")}></MyDateInput>
        </Grid.Col>
        <Grid.Col span={12}>
          <MyFileInput label="File đính kèm"></MyFileInput>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyFlexColumn>
            <MyTextArea label="Đánh giá tổng quan" {...form.getInputProps("danhGiaTongQuan")}></MyTextArea>
            <MyCheckbox label="Ngừng sử dụng" />
          </MyFlexColumn>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")}></MyTextArea>
        </Grid.Col>
      </Grid>
    </MyButtonCreate>
  );
}
