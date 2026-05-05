"use client";
import baseAxios from "@/api/baseAxios";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useForm } from "@mantine/form";
import F_eazkyurdoi_Form from "./F_eazkyurdoi_Form";
import { DinhMuc } from "./F_eazkyurdoi_Read";
export default function F_7ud2a06y19_Create() {
  const form = useForm<any>({
    initialValues: {},
    validate: (values) => ({}),
  });
  return (
    <MyButtonCreate
      modalSize={"60%"}
      form={form}
      title="Chi tiết loại định mức"
      onSubmit={async () => {}}
    >
      <F_eazkyurdoi_Form></F_eazkyurdoi_Form>
    </MyButtonCreate>
  );
}
