'use client'
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { IInfoViewModel } from "./F9_8_5ReadExchangeRegister";
import { mockDataChuongTrinh, mockDataNguoiDangKy } from "./mockData";



export default function F9_8_5UpdateExchangeRegister({ values }: { values: IInfoViewModel }) {
  const form = useForm<IInfoViewModel>({
    initialValues: {
      ...values,
    }
  });

  return (
    <MyActionIconUpdate title="Chi tiết đăng ký" form={form} onSubmit={(values) => console.log(values)}>
      <MySelect data={mockDataNguoiDangKy} label="Người đăng ký" {...form.getInputProps("tenNguoiDangKy")} />
      <MySelect data={mockDataChuongTrinh} label="Chương trình" {...form.getInputProps("chuongTrinh")} />
      <MyTextInput label="Đối tác" value={form.values.chuongTrinh ? form.values.doiTac : ""} readOnly />
      <MySelect data={["Đi", "Đến"]} label="Chiều đăng ký" {...form.getInputProps("chieuDangKy")} />
      <MyDateInput label="Ngày đăng ký" {...form.getInputProps("ngayDangKy")} />
    </MyActionIconUpdate>
  );
}
