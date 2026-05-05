"use client";

import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyCheckbox, MyFlexColumn, MyTextArea } from "aq-fe-framework/components";
import { KiemTraHoSoDangKyTuyenChonViewModel } from "./interfaces/KiemTraHoSoDangKyTuyenChonViewModel";

export default function KiemTraHoSoDangKyTuyenChonUpdate({ values }: { values: KiemTraHoSoDangKyTuyenChonViewModel }) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<KiemTraHoSoDangKyTuyenChonViewModel>({
    initialValues: {
      ...values,
    },
    validate: {
      nhanXet: (value) => {
        if (!form.values.hopLe && (!value || value.trim() === "")) {
          return "Nhận xét là bắt buộc khi hồ sơ chưa hợp lệ";
        }
        return null;
      },
    }
  });

  const handleSubmit = async (values: KiemTraHoSoDangKyTuyenChonViewModel) => {
    console.log(values);
    close();
  };

  return (
    <MyButtonModal
      crudType="update"
      variant="transparent"
      label="Kiểm tra"
      title="Chi tiết kiểm tra hồ sơ"
      disclosure={[opened, { open, close, toggle: () => open() }]}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <MyCheckbox
            label="Hợp lệ"
            {...form.getInputProps("hopLe", { type: "checkbox" })}
          />

          <MyTextArea
            label="Nhận xét Kiểm tra Sơ bộ:"
            placeholder="Nhập nhận xét chi tiết về hồ sơ..."
            rows={6}
            {...form.getInputProps("nhanXet")}
          />

          <MyCheckbox
            label="Gửi thông báo"
            {...form.getInputProps("guiThongBao", { type: "checkbox" })}
          />

          <MyFlexColumn>
            <MyButton type="submit" crudType="update" />
          </MyFlexColumn>
        </Stack>
      </form>
    </MyButtonModal>
  );
}