'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  MyButton,
  MyButtonModal,
  MyCheckbox,
  MySelect,
  MyTextArea
} from "aq-fe-framework/components";
import { ICheckTheFinalVersionInfoViewModel } from "./CheckTheFinalVersionRead";
import { mockDataTrangThaiKiemTraLai } from "./mockData";



export default function CheckTheFinalVersionButtonKiemTra({ values }: { values: ICheckTheFinalVersionInfoViewModel }) {
  const disc = useDisclosure();

  const form = useForm<ICheckTheFinalVersionInfoViewModel>({
    initialValues: {
      ...values,
    },
  });

  return (
    <MyButtonModal title="Chi tiết kiểm tra" variant="transparent" color="blue" modalSize={"lg"} disclosure={disc} label="Kiểm tra">
      <MySelect data={mockDataTrangThaiKiemTraLai} label="Trạng thái kiểm tra lại" {...form.getInputProps("trangThaiKiemTraLai")} />
      <MyTextArea label="Nhận xét/Góp ý bổ sung"  {...form.getInputProps("nhanXetGopYBoSung")} />
      <MyCheckbox label="Gửi thông báo" />
      <MyButton crudType="save" w="100%" />
    </MyButtonModal>
  );
}
