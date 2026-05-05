'use client'
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { CompilationType } from "./CompilationTypeRead";

export default function CompilationTypeCreate() {
  const form = useForm<CompilationType>({

  })
  return (
    <MyButtonCreate title="Tạo loại biên soạn sách, giáo trình" form={form} onSubmit={() => {
      // return baseAxios.post("/SystemCatalogProjectTypeCategory/CreateOrUpdate", form.values)
    }}>
      <MyTextInput label="Mã loại biên soạn" {...form.getInputProps("code")} />
      <MyTextInput label="Tên loại biên soạn" {...form.getInputProps("name")} />
      <MyNumberInput
        label="Số giờ/trang"
        {...form.getInputProps("hours")}
      />
      <MyNumberInput
        label="Số điểm"
        {...form.getInputProps("score")}
      />
      <Textarea label="Ghi chú" {...form.getInputProps("notes")} />
      <Checkbox label="Ngưng sử dụng"></Checkbox>
    </MyButtonCreate>
  )
}
