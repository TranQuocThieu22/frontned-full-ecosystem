"use client";
import { documentService } from "@/APIs/documentService";
import { MyButtonCreate } from "@/components/Button/ButtonCRUD/MyButtonCreate";
import { MyDateInput } from "@/components/Inputs/DateInput/MyDateInput";
import { MyTextInput } from "@/components/Inputs/TextInput/MyTextInput";
import { utils_file_fileToAQDocumentType } from "@/utils/utils_file";
import { FileInput, Textarea } from "@mantine/core";
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

export function F_systemUpdateDocs_Create({
  RefinementTypeId,
}: {
  RefinementTypeId: number;
}) {
  const form = useForm<I>({
    mode: "uncontrolled",
    validate: {
      meetingDate: (value) => (value ? null : "Không được để trống"),
      departmentName: (value) => (value ? null : "Không được để trống"),
      description: (value) => (value ? null : "Không được để trống"),
      file: (value) => (value ? null : "Không được để trống"),
      startDate: (value) => (value ? null : "Không được để trống"),
      endDate: (value, values) =>
        value &&
          values.startDate &&
          new Date(value) > new Date(values.startDate)
          ? null
          : "Ngày kết thúc phải lớn hơn ngày bắt đầu",
    },
  });
  return (
    <MyButtonCreate
      objectName="văn bản"
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          DocumentType: RefinementTypeId,
          fileDetail: await utils_file_fileToAQDocumentType(values.file!),
        }
        return documentService.create(body)

      }}
    >
      <MyDateInput
        withAsterisk
        label="Ngày họp"
        {...form.getInputProps("meetingDate")}
      />
      <MyTextInput
        withAsterisk
        label="Đơn vị yêu cầu"
        {...form.getInputProps("departmentName")}
      />
      <MyTextInput
        withAsterisk
        label="Nội dung cải tiến"
        {...form.getInputProps("description")}
      />
      <MyTextInput label="Kết luận" {...form.getInputProps("conclusion")} />
      <MyDateInput
        withAsterisk
        label="Ngày bắt đầu"
        {...form.getInputProps("startDate")}
      />
      <MyDateInput
        withAsterisk
        label="Ngày kết thúc"
        {...form.getInputProps("endDate")}
      />
      <FileInput
        placeholder="Tải lên tài liệu"
        withAsterisk
        label="Tài liệu"
        {...form.getInputProps("file")}
      />
      <Textarea label="Ghi chú" {...form.getInputProps("note")}></Textarea>
    </MyButtonCreate>
  );
}
