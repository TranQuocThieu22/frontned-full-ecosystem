'use client'
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  MyButton,
  MyButtonModal,
  MyCheckbox,
  MySelect,
  MyTextArea,
} from "aq-fe-framework/components";
import { IApproveLeaveViewModel } from "./intefaces";
import { selectStatusOptions } from "./mockDatas";



export default function ApproveLeaveButtonModalApprove({ values }: { values: IApproveLeaveViewModel }) {
  const disc = useDisclosure();
  const form = useForm<IApproveLeaveViewModel>({
    initialValues: { ...values },
  })

  return (
    <MyButtonModal label="Duyệt" title="Chi tiết duyệt đơn nghỉ phép" variant="transparent" color="blue" modalSize={"md"} disclosure={disc}>
      <Stack>
        <MySelect data={selectStatusOptions} label="Trạng thái duyệt" {...form.getInputProps('status')}></MySelect>
        <MyTextArea label="Lý do từ chối" {...form.getInputProps('rejectionReason')} />
        <MyCheckbox label="Đề xuất bù lớp" {...form.getInputProps('suggestMakeupClass', { type: "checkbox" })} />
        <MyCheckbox label="Gửi thông báo" {...form.getInputProps('notifyTo', { type: "checkbox" })} />
        <MyButton crudType="save" fullWidth />
      </Stack>
    </MyButtonModal >
  );
}
