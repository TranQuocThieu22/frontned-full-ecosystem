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
import { ISetUpPeriodicSurveyScenarioInfoViewModel } from "../SetUpPeriodicSurveyScenarioRead";
import { selectLoaiChuKyLapLai } from "../mockData";
import AttachedSurveyFormRead from "./AttachedSurveyFormTab/AttachedSurveyFormRead";

export default function SetUpPeriodicSurveyScenarioUpdate({ values }: { values: ISetUpPeriodicSurveyScenarioInfoViewModel }) {
  const form = useForm<ISetUpPeriodicSurveyScenarioInfoViewModel>({
    initialValues: {
      ...values,
    },
    validate: {
      maKichBan: (value) => (value ? null : "Mã kịch bản không được để trống"),
      tenKichBan: (value) =>
        value ? null : "Tên kịch bản không được để trống",
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
                {...form.getInputProps("maKichBan")}
              />
              <MyTextInput
                label="Tên kịch bản"
                {...form.getInputProps("tenKichBan")}
              />
              <MyTextArea
                label="Mô tả kịch bản"
                rows={10}
                {...form.getInputProps("moTaKichBan")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MySelect
                data={selectLoaiChuKyLapLai}
                label="chu kỳ"
                {...form.getInputProps("loaiChuKyLapLai")}
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
