'use client'
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyButton, MyButtonModal, MyCheckbox, MySelect, MyTextArea } from "aq-fe-framework/components";
import { IReviewImplementationPlanInfoViewModel } from "./ReviewImplementationPlanRead";
import { selectTrangThaiKeHoach } from "./mockData";



export default function ReviewImplementationPlanButtonDuyet({ values }: { values: IReviewImplementationPlanInfoViewModel }) {
  const disc = useDisclosure()
  const form = useForm<IReviewImplementationPlanInfoViewModel>({
    initialValues: {
      ...values,
    }
  });

  return (
    <MyButtonModal title="Chi tiết duyệt kế hoạch" variant="outline" color="blue" label="Duyệt" onSubmit={(values) => console.log(values)} disclosure={disc}>
      <MySelect data={selectTrangThaiKeHoach} label="Trạng thái kế hoạch" {...form.getInputProps('trangThaiDuyetKeHoach')} />
      <MyTextArea label="Nhận xét của Người Duyệt" />
      <MyCheckbox label="Không sử dụng" />
      <MyButton crudType="save" fullWidth type="submit">Lưu</MyButton> 
    </MyButtonModal>
  );
}
