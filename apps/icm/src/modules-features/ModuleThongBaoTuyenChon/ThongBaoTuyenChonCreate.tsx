"use client";

import { SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyCheckbox, MyDateInput, MyFileInput, MyTextEditor, MyTextInput } from "aq-fe-framework/components";
import { ThongBaoTuyenChonViewModel } from "./interfaces/ThongBaoTuyenChonViewModel";
import ThongBaoTuyenChonSelectionList from "./ThongBaoTuyenChonSelectionList";


export default function ThongBaoTuyenChonCreate() {

  const form = useForm<ThongBaoTuyenChonViewModel>({
    initialValues: {
      id: 0,
      code: "",
      name: "",
      noiDungChinh: "",
      fileDinhKem: "",
      ngayBanHanh: new Date(),
      guiThongBao: false,
      danhSachDangKyDuocChon: []
    },
    validate: {}
  });

  return (
    <MyButtonCreate
      title="Tạo mới thông báo"
      form={form}
      onSubmit={(values) => {
        console.log(values);
      }}
      modalSize="80%"
    >
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">
            Thông tin chung
          </Tabs.Tab>
          <Tabs.Tab value="selection">
            Danh sách đăng ký được chọn
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Stack>
            <SimpleGrid cols={3}>
              <MyTextInput
                label="Tiêu đề thông báo"
                placeholder="Nhập tiêu đề thông báo"
                required
                {...form.getInputProps("name")}
              />
              <MyDateInput
                label="Ngày ban hành"
                placeholder="Chọn ngày ban hành"
                required
                {...form.getInputProps("ngayBanHanh")}
              />
              <MyFileInput
                label="Đính kèm file"
                placeholder="Chọn file đính kèm"
                {...form.getInputProps("fileDinhKem")}
              />
            </SimpleGrid>

            <MyTextEditor
              label="Nội dung chính"
              {...form.getInputProps("noiDungChinh")}
            />

            <MyCheckbox
              label="Gửi thông báo"
              {...form.getInputProps("guiThongBao", { type: 'checkbox' })}
            />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="selection">
          <ThongBaoTuyenChonSelectionList />
        </Tabs.Panel>
      </Tabs>
    </MyButtonCreate>
  );
}
