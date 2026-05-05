"use client";

import { Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { useForm } from "@mantine/form";
import {
  MyActionIconUpdate,
  MyFileInput,
  MyNumberInput,
  MySelect,
  MyTextInput
} from "aq-fe-framework/components";
import { utils_converter_enumToSelectOptions } from "aq-fe-framework/utils";
import {
  EnumLoaiDeTai,
  EnumTinhTrangDeTai,
  NopThuyetMinhNhiemVuViewModel
} from "./interfaces/NopThuyetMinhNhiemVuViewModel";
import NopThuyetMinhNhiemVuMembers from "./NopThuyetMinhNhiemVuMembers";

export default function NopThuyetMinhNhiemVuUpdate({ values }: { values: NopThuyetMinhNhiemVuViewModel }) {

  const form = useForm<NopThuyetMinhNhiemVuViewModel>({
    initialValues: { ...values },
    validate: {
      code: (value) => value ? null : "Mã đăng ký không được để trống",
    }
  });

  const tinhTrangOptions = utils_converter_enumToSelectOptions(EnumTinhTrangDeTai);
  const loaiDeTaiOptions = utils_converter_enumToSelectOptions(EnumLoaiDeTai);

  return (
    <MyActionIconUpdate
      title="Chi tiết đề tài"
      form={form}
      onSubmit={(values) => {
        console.log(values);
      }}
      modalSize="90%"
    >
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">
            Thông tin chung
          </Tabs.Tab>
          <Tabs.Tab value="members">
            Thành viên
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Stack>
            <SimpleGrid cols={3}>
              <MyTextInput
                label="Mã đăng ký"
                placeholder="Nhập mã đăng ký"
                required
                {...form.getInputProps("code")}
              />
              <MyTextInput
                label="Tên đề tài"
                placeholder="Nhập tên đề tài"
                required
                {...form.getInputProps("name")}
              />
              <MySelect
                label="Loại đề tài"
                placeholder="Chọn loại đề tài"
                data={loaiDeTaiOptions}
                {...form.getInputProps("loaiDeTai")}
              />
            </SimpleGrid>

            <SimpleGrid cols={3}>
              <MyTextInput
                label="Đơn vị chủ trì"
                placeholder="Nhập đơn vị chủ trì"
                {...form.getInputProps("donViChuTri")}
              />
              <MyTextInput
                label="Đơn vị quản lý"
                placeholder="Nhập đơn vị quản lý"
                {...form.getInputProps("donViQuanLy")}
              />
              <MyTextInput
                label="Lĩnh vực"
                placeholder="Nhập lĩnh vực"
                {...form.getInputProps("linhVuc")}
              />
            </SimpleGrid>

            <SimpleGrid cols={3}>
              <MyNumberInput
                label="Tổng kinh phí"
                placeholder="Nhập tổng kinh phí"
                min={0}
                {...form.getInputProps("tongKinhPhi")}
              />
              <MyTextInput
                label="Thời gian thực hiện"
                placeholder="VD: 12 tháng, 18 tháng"
                {...form.getInputProps("thoiGianThucHien")}
              />
              <MySelect
                label="Tình trạng của đề tài"
                placeholder="Chọn tình trạng"
                data={tinhTrangOptions}
                required
                {...form.getInputProps("tinhTrangDeTai")}
              />
            </SimpleGrid>

            <Group align="flex-end">
              <MyFileInput
                label="File thuyết minh"
                placeholder="Chọn file thuyết minh"
                accept=".pdf,.doc,.docx"
                style={{ flex: 1 }}
                {...form.getInputProps("fileThuyetMinh")}
              />
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="members">
          <NopThuyetMinhNhiemVuMembers data={values.thanhVienNghienCuu} />
        </Tabs.Panel>
      </Tabs>
    </MyActionIconUpdate>
  );
}
