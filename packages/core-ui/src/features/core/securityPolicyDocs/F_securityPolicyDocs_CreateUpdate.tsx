import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

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

export function F_securityPolicyDocs_CreateUpdate({
  SecurityTypeId,
  values,
  isUpdate = false,
}: {
  SecurityTypeId?: number;
  values?: I;
  isUpdate?: boolean;
}) {
  const form = useForm<I>({
    mode: "uncontrolled",
    initialValues:
      isUpdate && values
        ? {
          ...values,
          file: new File([], values.path?.split("/")[values.path.split("/").length - 1]!),
          promulgateDate: new Date(values.promulgateDate!),
        }
        : undefined,
    validate: {
      decisionCode: (value) => (value ? null : "Không được để trống"),
      promulgateDate: (value) => (value ? null : "Không được để trống"),
      name: (value) => (value ? null : "Không được để trống"),
      file: (value) => (value ? null : "Không được để trống"),
    },
  });
  useEffect(() => {
    if (!values) return
    form.setValues(values)
    form.setInitialValues(values)
  }, [values])
  return (
    <CustomButtonCreateUpdate
      isUpdate={isUpdate}
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          ...(isUpdate ? {} : { DocumentType: SecurityTypeId }),
          fileDetail: await fileUtils.fileToAQDocumentType(values.file!),
        };
        return isUpdate ? documentService.update(body) : documentService.create(body);
      }}
    >
      <CustomTextInput
        withAsterisk
        readOnly={isUpdate}
        label="Số quy định"
        {...form.getInputProps("decisionCode")}
      />
      <CustomDateInput
        withAsterisk
        label="Ngày ban hành"
        {...form.getInputProps("promulgateDate")}
      />
      <CustomTextInput withAsterisk label="Tên tài liệu" {...form.getInputProps("name")} />
      <CustomFileInput
        withAsterisk
        placeholder="Tải lên tài liệu"
        label="Tài liệu"
        {...form.getInputProps("file")}
      />
      <CustomTextArea
        label="Ghi chú"
        placeholder="Nhập ghi chú"
        minRows={3}
        {...form.getInputProps("note")}
      />
    </CustomButtonCreateUpdate>
  );
}
