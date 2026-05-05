'use client'
import { Checkbox, Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ISummaryOfExchangeResultsInfoViewModel } from "./SummaryOfExchangeResultsRead";
import { mockDataTrangThai } from "./mockData";

export default function SummaryOfExchangeResultsUpdate({ values }: { values: ISummaryOfExchangeResultsInfoViewModel }) {
  const disc = useDisclosure()
  const form = useForm<ISummaryOfExchangeResultsInfoViewModel>({
    initialValues: {
      ...values,
    },
  });

  return (
    <MyButtonModal variant="transparent" label="Cập nhật" color="blue" modalSize={"lg"} disclosure={disc} title="Chi tiết trạng thái" >
      <Grid>
        <Grid.Col span={6}>
          <MySelect
            label="Lượt trao đổi"
            placeholder="Chọn lượt trao đổi"
            data={[]}
            {...form.getInputProps("luotTraoDoi")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MySelect
            label="Trạng thái lượt TĐ"
            placeholder="Chọn trạng thái"
            data={mockDataTrangThai}
            {...form.getInputProps("trangThaiLuotTraoDoi")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyTextInput
            label="Người dùng"
            value="SV001 - Tô Ngọc Linh"
            readOnly
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyDateInput
            label="Từ ngày"
            placeholder="Chọn ngày bắt đầu"
            {...form.getInputProps("thoiGianBatDau")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Group align="center" h="100%">
            <Checkbox
              label="Có vấn đề"
              {...form.getInputProps("coVanDe", { type: "checkbox" })}
            />
          </Group>
        </Grid.Col>

        <Grid.Col span={6}>
          <MyDateInput
            label="Đến ngày"
            placeholder="Chọn ngày kết thúc"
            {...form.getInputProps("thoiGianKetThuc")}
          />
        </Grid.Col>

        {/* Ghi chú trạng thái cuối */}
        <Grid.Col span={12}>
          <MyTextArea
            label="Ghi chú trạng thái cuối"
            placeholder="Nhập ghi chú"
            {...form.getInputProps("ghiChuTrangThaiCuoi")}
          />
        </Grid.Col>
      </Grid>
      <MyButton crudType="save" fullWidth>Lưu</MyButton>
    </MyButtonModal>

  );
}
