'use client'
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { mockDataNguoiLienLac } from "../mockData";
import { IButtonThaoTacInfoViewModel } from "./F9_8_8ButtonThaoTacMonitorExchange";



export default function F9_8_8UpdateMonitorExchange({ values }: { values: IButtonThaoTacInfoViewModel }) {
  const form = useForm<IButtonThaoTacInfoViewModel>({
    initialValues: {
      ...values,
      nguoiDung: "SV001",
    }
  });

  return (
    <MyActionIconUpdate title="Sửa nhật ký" form={form} onSubmit={(values) => console.log(values)}>
      <Grid>
        <Grid.Col span={6}>
          <MyTextInput label="Lượt trao đổi" {...form.getInputProps("maLuotTraoDoi")} readOnly />
        </Grid.Col>
        <Grid.Col span={6}>
          <MySelect data={mockDataNguoiLienLac} label="Người liên lạc" {...form.getInputProps("nguoiLienLac")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextInput label="Người dùng" {...form.getInputProps("nguoiDung")} readOnly />
        </Grid.Col>
        <Grid.Col span={6}>
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextArea label="Nội dung liên lạc" {...form.getInputProps("noiDungLienLac")} />
        </Grid.Col>
        <Grid.Col span={6}>
          <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </Grid.Col>
      </Grid>
    </MyActionIconUpdate>
  );
}
