import { Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  MyButtonCreate,
  MyDateInput,
  MyFileInput,
  MySelect,
  MyTab,
  MyTextInput
} from "aq-fe-framework/components";
import { IImplementationPlanningInfoViewModel } from "../ImplementationPlanningRead";
import { selectNguoiLapKeHoach, selectTrangThaiDuyetKeHoach } from "../mockData";
import PlanDetailsTabRead from "./PlanDetailsTab/PlanDetailsTabRead";

export default function ImplementationPlanningCreateTab() {
  const form = useForm<IImplementationPlanningInfoViewModel>({
    initialValues: {
    },
    validate: {
    },
  });

  const tabData = [
    { label: "Thông tin chung" },
    { label: "Chi tiết kế hoạch" },
  ];

  return (
    <MyButtonCreate
      modalSize={"70%"}
      objectName="kế hoạch"
      form={form}
      onSubmit={() => { }}
    >
      <MyTab tabList={tabData}>
        <Tabs.Panel value="Thông tin chung">
          <Grid gutter="xl">
            <Grid.Col span={6}>
              <MyTextInput
                label="Mã kế hoạch"
                {...form.getInputProps("maKeHoach")}
                readOnly
                mb={10}
              />
              <MyTextInput
                label="Tên kế hoạch"
                {...form.getInputProps("tenGiaoTrinhDeXuat")}
                mb={10}
              />
              <MySelect
                label="Người lập kế hoạch"
                data={selectNguoiLapKeHoach}
                {...form.getInputProps("nguoiLapKeHoach")}
                mb={10}
              />
              <MySelect
                label="Trạng thái duyệt kế hoạch"
                data={selectTrangThaiDuyetKeHoach}
                {...form.getInputProps("trangThaiDuyetKeHoach")}
                mb={10}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <MyDateInput
                label="Ngày lập kế hoạch"
                {...form.getInputProps("ngayLapKeHoach")}
                mb={10}
              />
              <MyDateInput
                label="Ngày bắt đầu dự kiến"
                {...form.getInputProps("ngayBatDauDuKien")}
                mb={10}
              />
              <MyDateInput
                label="Ngày kết thúc dự kiến"
                {...form.getInputProps("ngayKetThucDuKien")}
                mb={10}
              />
              <MyFileInput
                label="Đính kèm file"
                {...form.getInputProps("fileDinhKemKeHoach")}
                mb={10}
              />
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Chi tiết kế hoạch">
          <PlanDetailsTabRead />
        </Tabs.Panel>
      </MyTab>
    </MyButtonCreate>
  );
}
