'use client'
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyDateInput, MyTextInput } from "aq-fe-framework/components";
import { IIntellectualPropertyProfileInfoViewModel } from "./IntellectualPropertyProfileRead";

export default function IntellectualPropertyProfileUpdate({ values }: { values: IIntellectualPropertyProfileInfoViewModel }) {
  const disc = useDisclosure()
  const form = useForm<IIntellectualPropertyProfileInfoViewModel>({
    initialValues: {
      ...values,
    },
  });

  return (
    <MyButtonModal label="Cập nhật" variant="transparent" color="blue" modalSize={"lg"} title="Chi tiết kết quả đăng ký" onSubmit={(updatedValues) => console.log(updatedValues)} disclosure={disc}>
      <Grid>
        <Grid.Col span={12}>
          <MyTextInput
            label="Mã hồ sơ"
            value="IP-SC-2023-001 - Hệ thống quản lý chất thải thông minh"
            readOnly
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <MyTextInput
            label="Loại sở hữu trí tuệ"
            value="Bằng sáng chế"
            readOnly
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <MyTextInput
            label="Tác giả"
            value="TS. Minh Nguyễn, K. An Trần"
            readOnly
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyDateInput
            label="Ngày cấp bằng"
            placeholder="Chọn ngày cấp bằng"
            {...form.getInputProps("ngayCapBang")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyTextInput
            label="Thời gian bảo hộ"
            placeholder="Nhập thời gian bảo hộ"
            {...form.getInputProps("thoiHanBaoHo")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyDateInput
            label="Ngày hết hiệu lực"
            placeholder="Chọn ngày hết hiệu lực"
            {...form.getInputProps("ngayHetHieuLuc")}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <MyTextInput
            label="Quốc gia đăng ký"
            placeholder="Nhập quốc gia đăng ký"
            {...form.getInputProps("quocGiaDangKy")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <MyButton w={"100%"} crudType="save">Lưu</MyButton>
        </Grid.Col>
      </Grid>

    </MyButtonModal >
  );
}
