'use client'
import baseAxios from "@/api/baseAxios";
import { Checkbox, Select, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyNumberInput, MyTextInput } from "aq-fe-framework/components";
import { PostType } from "./PostTypeRead";

export default function PostTypeCreate() {
  const form = useForm<PostType>({

  })
  return (
    <MyButtonCreate title="Tạo loại bài đăng" form={form} onSubmit={() => {
      return baseAxios.post("/SystemCatalogProjectTypeCategory/CreateOrUpdate", form.values)
    }}>
      <MyTextInput label="Mã loại bài đăng" {...form.getInputProps("code")} />
      <MyTextInput label="Tên loại bài đăng" {...form.getInputProps("name")} />
      <Select
        label="Phân loại bài đăng"
        data={[
          { value: '1', label: 'TC - tạp chí' },
          { value: '2', label: 'KY - Kỷ yếu' },
          { value: '3', label: 'TL - Tham luận' },
        ]}
        defaultValue={'1'}
      ></Select>
      <MyNumberInput
        label="Số giờ"
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
