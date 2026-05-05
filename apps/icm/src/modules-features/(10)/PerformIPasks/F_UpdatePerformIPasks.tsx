'use client'
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDateInput, MyFileInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IPerformIPtasksInfoViewModel } from "./F_ReadPerformIPtasks";
import { mockDataTrangThai } from "./mockData";



export default function F_UpdatePerformIPasks({ values }: { values: IPerformIPtasksInfoViewModel }) {
  const disc = useDisclosure()
  const form = useForm<IPerformIPtasksInfoViewModel>({
    initialValues: {
      ...values,
    }
  });

  return (
    <MyButtonModal title="Chi tiết thực hiện" modalSize={"50%"} label="Cập nhật" disclosure={disc} variant="transparent" color="blue">
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput label="Mã IP" {...form.getInputProps("maIp")} readOnly />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput label="Tên IP" {...form.getInputProps("tenIp")} readOnly />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyTextInput label="Bước trong quy trình" {...form.getInputProps("buocTrongQuyTrinh")} readOnly />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput label="Tên Tài liệu" {...form.getInputProps("tenTaiLieu")} readOnly />
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={["Văn bằng bảo hộ"]} label="Loại tài liệu" {...form.getInputProps("loaiTaiLieu")} readOnly />
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
        <Grid.Col span={12}>
          <MyButton w={"100%"} crudType="save">Lưu</MyButton>
        </Grid.Col>
      </Grid>

    </MyButtonModal>
  );
}
