"use client";

import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { DocTypeSelect } from "@aq-fe/aq-legacy-framework/shared/features/DocTypeSelect";
import { fileUtils } from "@aq-fe/aq-legacy-framework/shared/utils/fileUtils";
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
  documentAttributeId,
}: {
  WorkflowTypeId: number;
  documentAttributeId?: number;
}) {
  const form = useForm<I>({
    mode: "uncontrolled",
    initialValues: {
      documentAttributeId: documentAttributeId,
    },
    validate: {
      decisionCode: (value) =>
        value ? null : "Số quy định không được để trống",
      promulgateDate: (value) =>
        value ? null : "Ngày ban hành không được để trống",
      name: (value) => (value ? null : "Tên tài liệu không được để trống"),
      documentAttributeId: documentAttributeId
        ? undefined
        : (value) => (value ? null : "Loại văn bản không được để trống"),
      file: (value) => (value ? null : "Tệp đính kèm không được để trống"),
    },
  });
  return (
    <CustomButtonCreateUpdate
      modalProps={{
        title: "Văn bản quy trình xử lý"
      }}
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          DocumentType: WorkflowTypeId,
          fileDetail: await fileUtils.fileToAQDocumentType(values.file!),
          ...(documentAttributeId && {
            documentAttributeId: documentAttributeId,
          }),
        };
        return documentService.create(body);
      }}
    >
      <CustomTextInput
        withAsterisk
        label="Số quy định"
        {...form.getInputProps("decisionCode")}
      />
      <CustomDateInput
        withAsterisk
        label="Ngày ban hành"
        {...form.getInputProps("promulgateDate")}
      />
      <CustomTextInput
        withAsterisk
        label="Tên tài liệu"
        {...form.getInputProps("name")}
      />
      {!documentAttributeId && (
        <DocTypeSelect
          withAsterisk
          label="Loại văn bản"
          documentTypeId={WorkflowTypeId}
          {...form.getInputProps("documentAttributeId")}
        />
      )}
      <CustomFileInput
        withAsterisk
        label="Văn bản"
        {...form.getInputProps("file")}
      />
      <CustomNumberInput
        label="Thứ tự hiển thị trên danh sách"
        {...form.getInputProps("orderBy")}
      />
    </CustomButtonCreateUpdate>
  );
}
