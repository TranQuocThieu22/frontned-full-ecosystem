"use client";
import { documentService } from "@/APIs/documentService";
import { MyButtonCreate } from "@/components/Button/ButtonCRUD/MyButtonCreate";
import { MyDateInput } from "@/components/Inputs/DateInput/MyDateInput";
import { MyTextInput } from "@/components/Inputs/TextInput/MyTextInput";
import { utils_file_fileToAQDocumentType } from "@/utils/utils_file";
import { FileInput } from "@mantine/core";
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

export function F_securityPolicyDocs_Create({ SecurityTypeId }: { SecurityTypeId: number }) {
  const form = useForm<I>({
    mode: "uncontrolled",
    validate: {
      decisionCode: (value) => (value ? null : "Không được để trống"),
      promulgateDate: (value) => (value ? null : "Không được để trống"),
      name: (value) => (value ? null : "Không được để trống"),
      file: (value) => (value ? null : "Không được để trống"),
    },
  });
  return (
    <MyButtonCreate
      objectName="văn bản"
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          DocumentType: SecurityTypeId,
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
      <FileInput
        withAsterisk
        placeholder="Tải lên tài liệu"
        label="Tài liệu"
        {...form.getInputProps("file")}
      />
    </MyButtonCreate>
  );
}
