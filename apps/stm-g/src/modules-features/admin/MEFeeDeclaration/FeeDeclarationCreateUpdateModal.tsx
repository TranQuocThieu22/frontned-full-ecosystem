"use client";
import { Grid, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { MyNumberInput, MySelect, MyTextArea } from "aq-fe-framework/components";
import { MyButtonCreateUpdate } from "aq-fe-framework/core";
import { useEffect } from "react";
import { I_TuitionFee } from "./interfaces";

// ===== CHƯƠNG TRÌNH =====
export enum EnumProgram {
  LTW = "LTW",
  TOAN_K7 = "TOAN_K7",
  TA_TQ = "TA_TQ",
}
export const ProgramLabel: Record<EnumProgram, string> = {
  [EnumProgram.LTW]: "Lập trình website",
  [EnumProgram.TOAN_K7]: "Chương trình Bồi dưỡng Toán Khối 7",
  [EnumProgram.TA_TQ]: "Tiếng Anh Tổng Quát",
};
export const programOptions = Object.entries(ProgramLabel).map(([value, label]) => ({
  value,
  label,
}));

// ===== CAMPUS =====
export enum EnumCampus {
  TD = "TD",
  CS1 = "CS1",
  CS2 = "CS2",
}
export const CampusLabel: Record<EnumCampus, string> = {
  [EnumCampus.TD]: "Khu Công nghệ cao Thủ Đức",
  [EnumCampus.CS1]: "Cơ sở 1",
  [EnumCampus.CS2]: "Cơ sở 2",
};
export const campusOptions = Object.entries(CampusLabel).map(([value, label]) => ({
  value,
  label,
}));

// ===== COURSE_SECTION =====
export enum EnumCourseSection {
  LTW23 = "LTW23",
}
export const CourseSectionLabel: Record<EnumCourseSection, string> = {
  [EnumCourseSection.LTW23]: "Lập trình website khóa 2023",
};
export const courseSectionOptions = Object.entries(CourseSectionLabel).map(([value, label]) => ({
  value,
  label,
}));

// ===== Level =====
export enum EnumLevel {
  TOAN_K7_A = "TOAN_K7_A",
  TOAN_K7_B = "TOAN_K7_B",
  TA_TQ_A1 = "TA_TQ_A1",
}
export const LevelLabel: Record<EnumLevel, string> = {
  [EnumLevel.TOAN_K7_A]: "Toán Khối 7 - Cấp độ A",
  [EnumLevel.TOAN_K7_B]: "Toán Khối 7 - Cấp độ B",
  [EnumLevel.TA_TQ_A1]: "Tiếng Anh Tổng Quát - Cấp độ A1",
};
export const levelOptions = Object.entries(LevelLabel).map(([value, label]) => ({
  value,
  label,
}));

export default function FeeDeclarationCreateUpdateModal({
  values,
}: {
  values?: I_TuitionFee;
}) {
  const disc = useDisclosure(false);
  const form = useForm<I_TuitionFee>({
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
      <MyButtonCreateUpdate
        form={form}
        isUpdate={!!values}
        onSubmit={() => { }}
        disclosure={disc}
        modalProps={{
          size: "60%",
          title: values
            ? "Chi tiết đơn giá"
            : "Tạo đơn giá mới",
        }}
      >
        <Grid>
          <Grid.Col span={6}>
            <MySelect
              label="Chương trình"
              data={programOptions}
              defaultValue={values?.programCode ?? programOptions[0]?.value}
              {...form.getInputProps("programCode")}
            />
            <MySelect
              pt={20}
              label="Cơ sở"
              data={campusOptions}
              defaultValue={values?.campusCode ?? campusOptions[0]?.value}
              {...form.getInputProps("campusCode")}
            />
            <MySelect
              pt={20}
              label="Cấp độ"
              data={levelOptions}
              defaultValue={values?.levelCode ?? levelOptions[0]?.value}
              {...form.getInputProps("levelCode")}
            />
            <MySelect
              pt={20}
              label="Khóa học"
              data={courseSectionOptions}
              defaultValue={values?.courseSectionCode ?? courseSectionOptions[0]?.value}
              {...form.getInputProps("courseSectionCode")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <MyNumberInput
              label="Đơn giá"
              placeholder="Nhập đơn giá"
              minValue={0}
              {...form.getInputProps("price")}
            />
            <MyTextArea
              pt={20}
              minRows={8.4}
              maxRows={8.4}
              label="Ghi chú"
              placeholder="Ghi chú"
              {...form.getInputProps("note")}
            />
          </Grid.Col>
        </Grid>
      </MyButtonCreateUpdate>
    </Group>
  );
}
