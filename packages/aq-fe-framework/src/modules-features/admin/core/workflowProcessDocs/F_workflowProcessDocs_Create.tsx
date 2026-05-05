"use client";
import {
  MyButtonCreate,
  MyDateInput,
  MyFileInput,
  MyNumberInput,
  MyTextInput,
} from "@/components";

import { documentService } from "@/APIs/documentService";
import { DocTypeSelect } from "@/shared/features/DocTypeSelect";
import { utils_file_fileToAQDocumentType } from "@/utils/utils_file";
import { useForm } from "@mantine/form";
interface IDocument {
  path?: string;
  orderBy?: number;
  documentType?: number;
  promulgateDate?: Date;
  decisionCode?: string;
  departmentName?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  conclusion?: string;
  note?: string;
  documentAttributeId?: number;
  documentAttributeName?: string;
  isCycleCheck?: boolean;
  meetingDate?: Date;
  fileDetail?: {
    fileBase64String?: string;
    fileExtension?: string;
    fileName?: string;
  };
  id?: number;
  code?: string;
  name?: string;
  concurrencyStamp?: string;
  isEnabled?: boolean;
  ngayChinhSua?: Date;
  nguoiChinhSua?: string;
}
interface I extends IDocument {
  file?: File;
}
export function F_workflowProcessDocs_Create({
  WorkflowTypeId,
}: {
  WorkflowTypeId: number;
}) {
  const form = useForm<I>({
    mode: "uncontrolled",
    validate: {
      decisionCode: (value) =>
        value ? null : "Số quy định không được để trống",
      promulgateDate: (value) =>
        value ? null : "Ngày ban hành không được để trống",
      name: (value) => (value ? null : "Tên tài liệu không được để trống"),
      documentAttributeId: (value) =>
        value ? null : "Loại văn bản không được để trống",
      file: (value) => (value ? null : "Tệp đính kèm không được để trống"),
    },
  });
  return (
    <MyButtonCreate
      objectName="Văn bản quy định tổ chức"
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          DocumentType: WorkflowTypeId,
          fileDetail: await utils_file_fileToAQDocumentType(values.file!),
        }
        return documentService.create(body)
      }}
    >
      <MyTextInput
        withAsterisk
        label="Số quy định"
        {...form.getInputProps("decisionCode")}
      />
      <MyDateInput
        withAsterisk
        label="Ngày ban hành"
        {...form.getInputProps("promulgateDate")}
      />
      <MyTextInput
        withAsterisk
        label="Tên tài liệu"
        {...form.getInputProps("name")}
      />
      <DocTypeSelect
        withAsterisk
        label="Loại văn bản"
        documentTypeId={WorkflowTypeId}
        {...form.getInputProps("documentAttributeId")}
      />
      <MyFileInput
        withAsterisk
        label="Văn bản"
        {...form.getInputProps("file")}
      />
      <MyNumberInput
        label="Thứ tự hiển thị trên danh sách"
        {...form.getInputProps("orderBy")}
      />
    </MyButtonCreate>
  );
}
