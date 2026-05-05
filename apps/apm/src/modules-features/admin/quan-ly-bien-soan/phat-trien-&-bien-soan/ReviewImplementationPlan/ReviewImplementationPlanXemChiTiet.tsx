import { Grid, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  MyActionIconUpload,
  MyButtonModal,
  MyButtonViewPDF,
  MyDateInput,
  MyFlexRow,
  MySelect,
  MyTab,
  MyTextInput
} from "aq-fe-framework/components";
import { selectTrangThaiDuyetKeHoach } from "../../PublishingManager/Curriculum/ImplementationPlanning/mockData";
import PlanDetailsTabRead from "./PlanDetailsTabRead";
import { IReviewImplementationPlanInfoViewModel } from "./ReviewImplementationPlanRead";
import { selectNguoiLapKeHoach } from "./mockData";

export default function ImplementationPlanningButtonXemChiTiet({
  values,
}: {
  values: IReviewImplementationPlanInfoViewModel;
}) {
  const disc = useDisclosure();
  const form = useForm<IReviewImplementationPlanInfoViewModel>({
    initialValues: {
      ...values,
    },
    validate: {
    },
  });

  const tabData = [
    { label: "Thông tin chung" },
    { label: "Chi tiết kế hoạch" },
  ];

  return (
    <MyButtonModal
      variant="outline"
      color="blue"
      label="Xem chi tiết"
      disclosure={disc}
      modalSize={"70%"}
      title="Chi tiết kế hoạch"
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
                readOnly
                mb={10}
              />
              <MySelect
                label="Người lập kế hoạch"
                data={selectNguoiLapKeHoach}
                {...form.getInputProps("nguoiLapKeHoach")}
                readOnly
                mb={10}
              />
              <MySelect
                label="Trạng thái duyệt kế hoạch"
                data={selectTrangThaiDuyetKeHoach}
                {...form.getInputProps("trangThaiDuyetKeHoach")}
                readOnly
                mb={10}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <MyDateInput
                label="Ngày lập kế hoạch"
                {...form.getInputProps("ngayLapKeHoach")}
                readOnly
                mb={10}
              />
              <MyDateInput
                label="Ngày bắt đầu dự kiến"
                {...form.getInputProps("ngayBatDauDuKien")}
                readOnly
                mb={10}
              />
              <MyDateInput
                label="Ngày kết thúc dự kiến"
                {...form.getInputProps("ngayKetThucDuKien")}
                readOnly
                mb={10}
              />
              <MyFlexRow >
                <MyActionIconUpload />
                <MyButtonViewPDF />
              </MyFlexRow>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
        <Tabs.Panel value="Chi tiết kế hoạch">
          <PlanDetailsTabRead />
        </Tabs.Panel>
      </MyTab>
    </MyButtonModal>
  );
}
