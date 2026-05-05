import { Flex, Grid, GridCol, MultiSelect, Tabs, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  MyActionIconUpdate,
  MyTab,
  MyTextArea,
  MyTextInput,
} from "aq-fe-framework/components";

import { IListSurveySubjectsInfoViewModel } from "./ListSurveySubjectsRead";
import {
  selectKhoaDonViChuQuan,
  selectLoaiDoiTuong,
  selectLop,
} from "./mockData";
import { MySelect } from "aq-fe-framework/core";
export default function ListSurveySubjectsUpdate({
  values,
}: {
  values: IListSurveySubjectsInfoViewModel;
}) {
  const form = useForm<IListSurveySubjectsInfoViewModel>({
    initialValues: {
      ...values,
    },
    validate: {},
  });

  const tabData = [
    { label: "Thông tin chung" },
    { label: "Thông tin cá nhân" },
    { label: "Thông tin thực thể" },
  ];

  return (
    <MyActionIconUpdate
      modalSize={"70%"}
      title="Chi tiết đăng ký đề xuất"
      form={form}
      onSubmit={() => {}}
    >
      <MyTab tabList={tabData}>
        <Tabs.Panel value="Thông tin chung">
          <MyTextInput
            label="Mã đối tượng"
            {...form.getInputProps("maDoiTuong")}
          />
          <MyTextInput
            label="Tên đối tượng"
            {...form.getInputProps("tenDoiTuong")}
          />
          <MySelect
            data={selectLoaiDoiTuong}
            label="Loại đối tượng"
            {...form.getInputProps("loaiDoiTuong")}
          />
        </Tabs.Panel>
        <Tabs.Panel value="Thông tin cá nhân">
          <Grid gutter="xl">
            <Grid.Col span={6}>
              <MyTextInput label="Email" {...form.getInputProps("email")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput label="Bộ môn" {...form.getInputProps("boMon")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                label="Số điện thoại"
                {...form.getInputProps("soDienThoai")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                label="Chức danh"
                {...form.getInputProps("chucDanh")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput label="Năm học" {...form.getInputProps("namHoc")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput label="Học kỳ" {...form.getInputProps("hocKy")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <MyTextInput
                label="Khóa"
                {...form.getInputProps("khoaPhienBan")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextArea
                label="Mô tả/Chi tiết"
                {...form.getInputProps("moTaChiTiet")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MySelect
                data={selectKhoaDonViChuQuan}
                label="Đơn vị chủ quản"
                {...form.getInputProps("donViChuQuan")}
              />
              <MySelect
                data={selectLop}
                label="Lớp"
                {...form.getInputProps("lop")}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Thông tin thực thể">
          <Grid gutter="xl">
            <Grid.Col span={6}>
              <MyTextInput
                label="Phiên bản"
                {...form.getInputProps("khoaPhienBan")}
              />{" "}
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                label="Thời gian"
                {...form.getInputProps("namHoc")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                label="Địa điểm/Vị trí"
                {...form.getInputProps("diaDiemViTri")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput label="Đối tác" {...form.getInputProps("")} />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextArea
                label="Mô tả/Chi tiết"
                {...form.getInputProps("moTaChiTiet")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MySelect
                data={selectKhoaDonViChuQuan}
                label="Khoa/Đơn vị Chủ quản"
                {...form.getInputProps("donViChuQuan")}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </MyTab>
    </MyActionIconUpdate>
  );
}
