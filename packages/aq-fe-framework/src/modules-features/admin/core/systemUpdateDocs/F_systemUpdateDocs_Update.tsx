import { documentService } from "@/APIs/documentService";
import { MyTextInput } from "@/components";
import { MyActionIconUpdate } from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { MyDateInput } from "@/components/Inputs/DateInput/MyDateInput";
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
export function F_systemUpdateDocs_Update({ values }: { values: I }) {
  const form = useForm<I>({
    mode: "uncontrolled",
    initialValues: {
      ...values,
      file: new File(
        [],
        values.path?.split("/")[values.path.split("/").length - 1]!
      ),
      startDate: new Date(values.startDate!),
      endDate: new Date(values.endDate!),
      meetingDate: new Date(values.meetingDate!),
    },
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
    <MyActionIconUpdate
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          fileDetail: await utils_file_fileToAQDocumentType(values.file!),
        }
        return documentService.update(body)
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
    </MyActionIconUpdate>
  );
}
