'use client'
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IPerformIPtasksInfoViewModel } from "./F_ReadPerformIPtasks";
import { mockDataTrangThai } from "./mockData";



export default function F_CreatePerformIPtasks() {
  const form = useForm<IPerformIPtasksInfoViewModel>({
    initialValues: {
    }
  });

  return (
    <MyButtonCreate modalSize={"50%"} objectName="Thực hiện" form={form} onSubmit={(values) => console.log(values)}>
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput label="Mã IP" {...form.getInputProps("maIp")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput label="Tên IP" {...form.getInputProps("tenIp")} />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyTextInput label="Bước trong quy trình" {...form.getInputProps("buocTrongQuyTrinh")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput label="Tên Tài liệu" {...form.getInputProps("tenTaiLieu")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={["Văn bằng bảo hộ"]} label="Loại tài liệu" {...form.getInputProps("loaiTaiLieu")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={mockDataTrangThai} label="Trạng thái" {...form.getInputProps("trangThaiCuaBuoc")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyDateInput label="Ngày bắt đầu" {...form.getInputProps("ngayBatDau")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyFileInput label="File minh chứng" {...form.getInputProps("fileMinhChung")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyDateInput label="Ngày kết thúc" {...form.getInputProps("ngayKetThuc")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextArea label="Trạng thái hồ sơ chi tiết" {...form.getInputProps("trangThaiHoSoChiTiet")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </Grid.Col>
      </Grid>
    </MyButtonCreate>
  );
}
