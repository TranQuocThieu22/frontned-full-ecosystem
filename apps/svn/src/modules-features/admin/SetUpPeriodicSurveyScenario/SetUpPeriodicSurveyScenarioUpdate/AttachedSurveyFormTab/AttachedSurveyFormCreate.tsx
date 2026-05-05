"use client";
import { useForm } from "@mantine/form";
import {
  MyButton,
  MyButtonCreate,
  MyButtonModal,
  MyNumberInput,
  MyTextInput,
} from "aq-fe-framework/components";
import { IAttachedSurveyFormInfoViewModel } from "./AttachedSurveyFormRead";
import { MySelect } from "aq-fe-framework/core";
import { selectTenPhieu } from "../../mockData";
import { useDisclosure } from "@mantine/hooks";

export default function AttachedSurveyFormCreate() {
  const disc = useDisclosure();
  const form = useForm<IAttachedSurveyFormInfoViewModel>({
    initialValues: {
      tenMauPhieu: "",
      thoiGianTrienKhaiTuongDoi: "",
    },
  });

  return (
    <MyButtonModal disclosure={disc} crudType="create">
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
    </MyButtonModal>
  );
}
