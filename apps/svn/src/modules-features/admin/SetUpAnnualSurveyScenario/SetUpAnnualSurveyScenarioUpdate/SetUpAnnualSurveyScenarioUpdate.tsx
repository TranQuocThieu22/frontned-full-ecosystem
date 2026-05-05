import { Flex, Grid, MultiSelect, Tabs, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  MyActionIconUpdate,
  MyButtonCreate,
  MyDateInput,
  MyFileInput,
  MySelect,
  MyTab,
  MyTextArea,
  MyTextInput,
} from "aq-fe-framework/components";
import { ISetUpAnnualSurveyScenarioInfoViewModel } from "../SetUpAnnualSurveyScenarioRead";
import { selectLoaiChuKyLapLai } from "../mockData";
import AttachedSurveyFormRead from "./AttachedSurveyFormTab/AttachedSurveyFormRead";

export default function SetUpAnnualSurveyScenarioUpdate({
  values,
}: {
  values: ISetUpAnnualSurveyScenarioInfoViewModel;
}) {
  const form = useForm<ISetUpAnnualSurveyScenarioInfoViewModel>({
    initialValues: {
      ...values,
    },
    validate: {
      maKichBanGoc: (value) => (value ? null : "Mã kịch bản gốc không được để trống"),
      tenKichBanGoc: (value) =>
        value ? null : "Tên kịch bản gốc không được để trống",
    },
  });

  const tabData = [
    { label: "Thông tin chung" },
    { label: "Loại phiếu khảo sát được gắn" },
  ];

  return (
    <MyActionIconUpdate
      modalSize={"70%"}
      title="Chi tiết kịch bản"
      form={form}
      onSubmit={() => {}}
    >
      <MyTab tabList={tabData}>
        <Tabs.Panel value="Thông tin chung">
          <Grid gutter="xl">
            <Grid.Col span={6}>
              <MyTextInput
                label="Mã kịch bản"
                {...form.getInputProps("maKichBanGoc")}
                readOnly
              />
              <MyTextInput
                label="Tên kịch bản"
                {...form.getInputProps("tenKichBanGoc")}
              />
              <MyTextArea
                label="Mô tả kịch bản"
                rows={10}
                {...form.getInputProps("")}
              />
              <MyTextArea
                label="Ghi chú"
                rows={10}
                {...form.getInputProps("ghiChu")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MySelect
                data={selectLoaiChuKyLapLai}
                label="chu kỳ"
                {...form.getInputProps("loaiChuKyLapLai")}
                readOnly
              />
              <MyTextInput
                label="Thời điểm triển khai"
                {...form.getInputProps("thoiDiemTrienKhai")}
              />
              <MyDateInput
                label="Ngày bắt đầu dự kiến"
                {...form.getInputProps("ngayBatDauDuKien")}
              />
              <MyDateInput
                label="Ngày kết thúc dự kiến"
                {...form.getInputProps("ngayKetThucDuKien")}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Loại phiếu khảo sát được gắn">
          <AttachedSurveyFormRead />
        </Tabs.Panel>
      </MyTab>
    </MyActionIconUpdate>
  );
}
