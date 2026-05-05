"use client";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyNumberInput, MySelect, MyTextArea } from "aq-fe-framework/components";
import { useEffect } from "react";
import { I_TickerDistribution } from "./interfaces";

export enum EnumClassName {
  TOAN_7A = "Toán 7A",
  VAN_8B = "Văn 8B",
  TOAN_9C = "Toán 9C"
}

export const ClassNameLabel: Record<EnumClassName, string> = {
  [EnumClassName.TOAN_7A]: "Toán 7A",
  [EnumClassName.VAN_8B]: "Văn 8B",
  [EnumClassName.TOAN_9C]: "Toán 9C"
};

export const classNameOptions = Object.entries(ClassNameLabel).map(([value, label]) => ({
  value,
  label
}));

export enum EnumStudentCode {
  HS00101 = "HS00101",
  HS00102 = "HS00102",
  HS00103 = "HS00103",
  HS00104 = "HS00104",
  HS00105 = "HS00105",
  HS00201 = "HS00201",
  HS00202 = "HS00202",
  HS00203 = "HS00203",
  HS00301 = "HS00301",
  HS00302 = "HS00302"
}

export const StudentCodeLabel: Record<EnumStudentCode, string> = {
  [EnumStudentCode.HS00101]: "HV - Nguyễn An Bình",
  [EnumStudentCode.HS00102]: "HV - Lạ Minh Duy",
  [EnumStudentCode.HS00103]: "HV - Phạm Thị Linh",
  [EnumStudentCode.HS00104]: "HV - Võ Hoàng Anh",
  [EnumStudentCode.HS00105]: "HV - Đặng Thị Nga",
  [EnumStudentCode.HS00201]: "HV - Bùi Minh Tâm",
  [EnumStudentCode.HS00202]: "HV - Đoàn Thị Kim",
  [EnumStudentCode.HS00203]: "HV - Ngô Văn Hiếu",
  [EnumStudentCode.HS00301]: "HV - Trần Phương Chi",
  [EnumStudentCode.HS00302]: "HV - Nguyễn Thanh Tú"
};

export const studentOptions = Object.entries(StudentCodeLabel).map(([value, label]) => ({
  value,
  label
}));


export default function TickerDistributionCreateUpdateModal({
  values,
}: {
  values?: I_TickerDistribution;
}) {
  const disc = useDisclosure(false);
  const form = useForm<I_TickerDistribution>({
    initialValues: values,
    validate: {},
  });

  useEffect(() => {
    if (!values) return;
    form.setValues({
      ...values,
    });
  }, [values]);

  return (
    <Group>
      <CustomButtonCreateUpdate
        form={form}
        isUpdate={!!values}
        onSubmit={() => { }}
        disclosure={disc}
        modalProps={{
          size: "60%",
          title: values
            ? "Chi tiết phát ticker"
            : "Tạo chi tiết phát ticker mới",
        }}
      >

        <MySelect
          label="Lớp"
          data={classNameOptions}
          defaultValue={values?.className ?? classNameOptions[0]?.value}
          {...form.getInputProps("className")}
        />
        <MySelect
          label="Học sinh"
          data={studentOptions}
          defaultValue={values?.studentCode ?? studentOptions[0]?.value}
          {...form.getInputProps("studentCode")}
        />
        <MyNumberInput
          label="Số lượng ticker phát"
          placeholder="Số lượng ticker phát"
          minValue={0}
          {...form.getInputProps("ticketAmount")}
        />
        <MyTextArea
          pt={20}
          minRows={8.4}
          maxRows={8.4}
          label="Mô tả"
          placeholder="Mô tả"
          {...form.getInputProps("reason")}
        />
      </CustomButtonCreateUpdate>
    </Group>
  );
}
