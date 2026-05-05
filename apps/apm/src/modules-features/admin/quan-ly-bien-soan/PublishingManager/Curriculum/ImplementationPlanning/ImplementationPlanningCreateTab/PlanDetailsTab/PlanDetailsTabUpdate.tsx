import {
  Grid,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  MyActionIconModal,
  MyButton,
  MyDateInput,
  MyNumberInput,
  MySelect,
  MyTextInput,
} from "aq-fe-framework/components";
import { selectNguoiChiuTrachNhiemChinh } from "../../mockData";
import { IPlanDetailsInfoViewModel } from "./PlanDetailsTabRead";

export default function Update({
  values,
}: {
  values: IPlanDetailsInfoViewModel;
}) {
  const disc = useDisclosure();

  const form = useForm<IPlanDetailsInfoViewModel>({
    initialValues: {
      ...values,
    },
  });

  return (
    <MyActionIconModal
      disclosure={disc}
      crudType="update"
      onSubmit={(values) => console.log(values)}
      modalSize={"70%"}
      title="Chi tiết giai đoạn"
    >
      <Grid gutter="xl">
        {/* Cột trái */}
        <Grid.Col span={6}>
          <MyTextInput
            label="Mã Giai đoạn"
            {...form.getInputProps("maGiaiDoan")}
            readOnly
          />
          <MyTextInput
            label="Tên Giai đoạn"
            {...form.getInputProps("tenGiaiDoan")}
          />
          <MySelect
            label="Người chịu trách nhiệm chính"
            data={selectNguoiChiuTrachNhiemChinh}
            {...form.getInputProps("nguoiChiuTrachNhiemChinh")}
          />
          <MyNumberInput
            label="Thứ tự thực hiện"
            {...form.getInputProps("thuTu")}
          />
          <Textarea
            label="Mô tả Giai đoạn"
            minRows={5}
            {...form.getInputProps("moTaGiaiDoan")}
          />
        </Grid.Col>

        {/* Cột phải */}
        <Grid.Col span={6}>
          <MyDateInput
            label="Ngày Bắt đầu dự kiến"
            {...form.getInputProps("ngayBatDauDuKien")}
          />
          <MyDateInput
            label="Ngày Kết thúc dự kiến"
            {...form.getInputProps("ngayKetThucDuKien")}
          />
          <MyTextInput
            label="Kết quả đầu ra dự kiến"
            {...form.getInputProps("ketQuaDauRaDuKien")}
          />
        </Grid.Col>
      </Grid>

      <MyButton crudType="save" type="submit" fullWidth mt="md" />
    </MyActionIconModal>
  );
}
