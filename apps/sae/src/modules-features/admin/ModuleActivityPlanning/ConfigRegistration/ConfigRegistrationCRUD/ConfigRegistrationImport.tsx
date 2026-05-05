"use client";

import { ClassActivityPlan } from "@/interfaces/classActivityPlan";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { ModalImportId, MyModalImport } from "@aq-fe/core-ui/shared/components/overlays/MyModalStackImport/MyModalImport";
import { excelUtils, IExcelColumnConfig } from "@aq-fe/core-ui/shared/utils/excelUtils";
import { useModalsStack } from "@mantine/core";
import ExcelJS from 'exceljs';

const config: IExcelColumnConfig<ClassActivityPlan>[] = [
  {
    fieldKey: "classCode",
    fieldName: "Mã lớp",
    isRequired: true
  },
  {
    fieldKey: "className",
    fieldName: "Tên lớp",
    isRequired: true
  },
  {
    fieldKey: "majorsCode",
    fieldName: "Mã ngành",
    isRequired: true
  },
  {
    fieldKey: "academicYear",
    fieldName: "Năm học học kỳ",
    isRequired: true
  },
  {
    fieldKey: "startRegistration",
    fieldName: "Ngày bắt đầu đăng ký",
    isRequired: true
  },
  {
    fieldKey: "endRegistration",
    fieldName: "Ngày kết thúc đăng ký",
    isRequired: true
  }
]

export default function ConfigRegistrationImport({ data }: { data: ClassActivityPlan[] }) {
  const stack = useModalsStack<ModalImportId>([])
  const handleExportStructure = async () => {
    const workbook = new ExcelJS.Workbook();
    await excelUtils.addSheet<ClassActivityPlan>({
      workbook: workbook,
      sheetName: "Cấu hình thời gian sinh viên đăng ký theo lớp",
      data: data,
      config: config
    })
    excelUtils.download({ name: "Cấu hình thời gian sinh viên đăng ký theo lớp", workbook })
  }
  return (
    <>
      <MyModalImport
        fieldDefinition={
          [
            { key: "classCode", label: "Mã lớp" },
            { key: "className", label: "Tên lớp" },
            { key: "majorsCode", label: "Mã ngành" },
            { key: "academicYear", label: "Năm học học kỳ" },
            { key: "startRegistration", label: "Ngày bắt đầu đăng ký" },
            { key: "endRegistration", label: "Ngày kết thúc đăng ký" },
          ]
        }
        stack={stack}
        onExportStructure={() => {
          handleExportStructure()
        }}
        onExecute={(values) => {
          //NOTE: Dữ liệu sau khi map data
          console.log(values)
        }}
      />
      <CustomButton actionType="import" onClick={() => stack.open("FileImportConfig")} />
    </>
  );
}