"use client";
import { useForm } from "@mantine/form";
import {
  MyActionIconModal,
  MyButton,
  MyNumberInput,
  MyTextInput,
} from "aq-fe-framework/components";
import { IAttachedSurveyFormInfoViewModel } from "./AttachedSurveyFormRead";
import { useDisclosure } from "@mantine/hooks";
import { selectTenPhieu } from "../../mockData";
import { MySelect } from "aq-fe-framework/core";

export default function AttachedSurveyFormUpdate({
  values,
}: {
  values: IAttachedSurveyFormInfoViewModel;
}) {
  const disc = useDisclosure();
  const form = useForm<IAttachedSurveyFormInfoViewModel>({
    initialValues: {
      ...values,
    },
  });

  return (
    <MyActionIconModal
      disclosure={disc}
      crudType="update"
      onSubmit={(values) => console.log(values)}
    >
      <MySelect
        data={selectTenPhieu}
        label="Tên mẫu phiếu"
        {...form.getInputProps("tenMauPhieu")}
      />
      <MyNumberInput
        label="Ngưỡng tỷ lệ phản hồi gợi ý"
        {...form.getInputProps("nguongTyLePhanHoiGoiY")}
      />
      <MyTextInput
        label="Thời gian triển khai tương đối"
        {...form.getInputProps("thoiGianTrienKhaiTuongDoi")}
      />
      <MyButton crudType="save" type="submit" fullWidth />
    </MyActionIconModal>
  );
}
