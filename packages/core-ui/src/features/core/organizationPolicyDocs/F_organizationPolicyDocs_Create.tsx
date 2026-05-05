"use client";
import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { MyButtonCreate } from "@aq-fe/core-ui/shared/components/button/MyButtonCreate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomNumberInput } from "@aq-fe/core-ui/shared/components/input/CustomNumberInput";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { DocTypeSelect } from "@aq-fe/core-ui/shared/features/DocTypeSelect";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
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
export function F_organizationPolicyDocs_Create({
  RegulationsTypeId,
  documentAttributeId,
}: {
  RegulationsTypeId: number;
  documentAttributeId?: number;
}) {
  const form = useForm<I>({
    mode: "uncontrolled",
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
        title: "Văn bản quy định tổ chức"
      }}
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          DocumentType: RegulationsTypeId,
          fileDetail: await fileUtils.fileToAQDocumentType(values.file!),
          ...(documentAttributeId && { documentAttributeId: documentAttributeId }),
        };
        return documentService.create(body);
        // return await baseAxios.post("/Document/create", {
        //   ...values,
        //   DocumentType: const_object_documentTypes.Form,
        //   fileDetail: await utils_file.fileToAQDocumentType(values.file!),
        // });
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
          documentTypeId={RegulationsTypeId}
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
