import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IVienChucInfoViewModel } from "./interfaces/IVienChucInfoViewModel";

const donViOptions = [
  { value: "Khoa Công nghệ thông tin", label: "Khoa Công nghệ thông tin" },
  { value: "Phòng Tổ chức Cán bộ", label: "Phòng Tổ chức Cán bộ" },
  { value: "Khoa Kinh tế", label: "Khoa Kinh tế" },
  { value: "Khoa Vật lý", label: "Khoa Vật lý" },
];
const linhVucOptions = [
  { value: "Nhân sự", label: "Nhân sự" },
  { value: "Công nghệ thông tin", label: "Công nghệ thông tin" },
  { value: "Tài chính", label: "Tài chính" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sản xuất", label: "Sản xuất" },
];

export default function DMVienChucUpdate({ values }: { values: IVienChucInfoViewModel }) {
  const form = useForm<IVienChucInfoViewModel>({
    initialValues: values || {},
  });

  return (
    <MyActionIconUpdate form={form} onSubmit={() => {}} title="Chi tiết viên chức" modalSize="xl">
      <SimpleGrid cols={2} spacing="lg">
        <Stack>
          <MyTextInput label="Mã viên chức" {...form.getInputProps("code")} />
          <MyTextInput label="Họ và tên" {...form.getInputProps("hoTen")} />
          <MyTextInput label="Chức vụ" {...form.getInputProps("chucVu")} />
          <MyTextArea label="Ghi chú" minRows={4} {...form.getInputProps("notes")} />
        </Stack>
        <Stack>
          <MySelect
            label="Đơn vị công tác"
            data={donViOptions}
            {...form.getInputProps("donViCongTac")}
            clearable={false}
          />
          <MySelect
            label="Lĩnh vực chuyên môn"
            data={linhVucOptions}
            {...form.getInputProps("linhVucChuyenMon")}
            clearable
          />
          <MyTextInput label="Email" {...form.getInputProps("email")} />
          <MyTextInput label="Số điện thoại" {...form.getInputProps("soDienThoai")} />
        </Stack>
      </SimpleGrid>
    </MyActionIconUpdate>
  );
}
