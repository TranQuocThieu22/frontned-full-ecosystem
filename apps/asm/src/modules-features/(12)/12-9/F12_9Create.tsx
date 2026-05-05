"use client";

import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface I_F12_9Create {
  unitCode?: string;
  unitName?: string;
  use?: boolean;
  note?: string;
}

export default function F12_9Create() {
  const form = useForm<I_F12_9Create>({
    initialValues: {
      unitCode: "",
      unitName: "",
      use: true,
      note: "",
    },
  });

  return (
    <MyButtonCreate
      objectName="Chức vụ"
      form={form}
      onSubmit={() => {
        console.log(form.values);
      }}
    >
      <MyTextInput label="Mã chức vụ" {...form.getInputProps("unitCode")} />
      <MyTextInput label="Tên chức vụ" {...form.getInputProps("unitName")} />
      <MyCheckbox label="Sử dụng" {...form.getInputProps("use")} />
      <MyTextInput label="Ghi chú" {...form.getInputProps("note")} />
    </MyButtonCreate>
  );
}
