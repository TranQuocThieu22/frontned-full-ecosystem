"use client";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyTab from "@/components/Layouts/Tab/MyTab";
import { SimpleGrid, Tabs, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import SF5_4Create_Tab_1 from "./SF5_4Form_Tab_1";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import SF5_4Create_Tab_2 from "./SF5_4Form_Tab_2";
import SF5_4Create_Tab_3 from "./SF5_4Form_Tab_3";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";

interface I {
  bienBanKiemKe?: string;
  ngayBienBan?: Date;
  ghiChu?: string;
}

export default function F5_4Form({ values }: { values?: I }) {
  const form = useForm<I>({
    mode: "uncontrolled",
    initialValues: values,
  });
  if (values) return (
    <MyActionIconUpdate modalSize={"80%"} title="Kiểm kê công cụ dụng cụ" form={form} onSubmit={() => { }}>
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
        <MyTextInput label="Biên bản kiểm kê" {...form.getInputProps("bienBanKiemKe")} />
        <MyDateInput label="Ngày biên bản" {...form.getInputProps("ngayBienBan")} />

      </SimpleGrid>
      <MyTextArea label="Ghi chú" />
      <MyTab
        tabList={[
          { label: "Kiểm kê" },
          { label: "Thành phần tham gia" },
          { label: "Kết quả xử lý" },
        ]}
      >
        <SF5_4Create_Tab_1 />
        <SF5_4Create_Tab_2 />
        <SF5_4Create_Tab_3 />
      </MyTab>
    </MyActionIconUpdate>
  )
  return (
    <MyButtonCreate
      title="Kiểm kê công cụ dụng cụ"
      form={form}
      onSubmit={() => { }}
      modalSize={"80%"}
    >
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 2 }}>
        <MyTextInput label="Biên bản kiểm kê" />
        <MyDateInput label="Ngày biên bản" />

      </SimpleGrid>
      <MyTextArea label="Ghi chú" />
      <MyTab
        tabList={[
          { label: "Kiểm kê" },
          { label: "Thành phần tham gia" },
          { label: "Kết quả xử lý" },
        ]}
      >
        <SF5_4Create_Tab_1 />
        <SF5_4Create_Tab_2 />
        <SF5_4Create_Tab_3 />
      </MyTab>
    </MyButtonCreate>
  );
}
