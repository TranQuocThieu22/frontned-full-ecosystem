'use client'
import { Checkbox, Grid, Group, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IButtonModalInfoViewModel } from "./ButtonModalProfileConfiguration";

export default function ProfileConfigurationCreate() {
  const form = useForm<IButtonModalInfoViewModel>({
    initialValues: {
      maSoHoso: "",
      tenHoso: "",
      batBuoc: false,
      moTaChiTiet: "",
      ghiChuHuongDan: "",
    },
  });

  return (
    <MyButtonCreate modalSize={"lg"} objectName="Hồ sơ" form={form} onSubmit={(values) => console.log(values)}>
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput
            label="Mã hồ sơ"
            placeholder="Nhập mã hồ sơ"
            {...form.getInputProps("maSoHoso")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <MultiSelect
            label="Định dạng cho phép"
            placeholder="Chọn định dạng"
            data={["PDF", "JPG",]}
            {...form.getInputProps("dinhDangChoPhep")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput
            label="Tên hồ sơ"
            placeholder="Nhập tên hồ sơ"
            {...form.getInputProps("tenHoso")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Group align="center" h="100%">
            <Checkbox
              label="Bắt buộc"
              {...form.getInputProps("batBuoc", { type: "checkbox" })}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextArea
            label="Mô tả chi tiết"
            placeholder="Nhập mô tả chi tiết"
            {...form.getInputProps("moTaChiTiet")}
          />
        </Grid.Col>





        <Grid.Col span={6}>
          <MyTextArea
            label="Ghi chú"
            placeholder="Nhập ghi chú"
            {...form.getInputProps("ghiChuHuongDan")}
          />
        </Grid.Col>
      </Grid>
    </MyButtonCreate>
  );
}
