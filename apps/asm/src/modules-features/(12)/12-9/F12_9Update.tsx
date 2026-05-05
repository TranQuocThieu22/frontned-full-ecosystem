"use client";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";

interface F12_9Update {
  unitCode?: string;
  unitName?: string;
  use?: boolean;
  note?: string;
}

export default function F12_9Update({ data }: { data: F12_9Update }) {
  const form = useForm<F12_9Update>({
    initialValues: data,
  });

  return (
    <MyActionIconUpdate form={form} onSubmit={() => {}}>
      <MyTextInput label="Mã đơn vị" {...form.getInputProps("unitCode")} />
      <MyTextInput label="Tên đơn vị" {...form.getInputProps("unitName")} />
      <MyCheckbox
        label="Sử dụng"
        {...form.getInputProps("use", { type: "checkbox" })}
      />
      <MyTextInput label="Ghi chú" {...form.getInputProps("note")} />
    </MyActionIconUpdate>
  );
}
