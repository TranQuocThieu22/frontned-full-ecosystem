import { documentService } from "@aq-fe/core-ui/shared/APIs/documentService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Document } from "@aq-fe/core-ui/shared/interfaces/Document";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface I extends Document {
  file?: File;
}

export function F_userGuideDocs_CreateUpdate({
  GuidelineTypeId,
  values,
  isUpdate = false,
}: {
  GuidelineTypeId?: number;
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
        }
        : undefined,
    validate: {
      code: (value) => (value ? null : "Không được để trống"),
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
          ...(isUpdate ? {} : { DocumentType: GuidelineTypeId }),
          fileDetail: await fileUtils.fileToAQDocumentType(values.file!),
        };
        return isUpdate ? documentService.update(body) : documentService.create(body);
      }}
    >
      <CustomTextInput
        withAsterisk
        readOnly={isUpdate}
        label="Mã tài liệu"
        {...form.getInputProps("code")}
      />
      <CustomTextInput withAsterisk label="Tên tài liệu" {...form.getInputProps("name")} />
      <CustomFileInput
        withAsterisk
        label="Tài liệu"
        placeholder="Tải lên tài liệu"
        {...form.getInputProps("file")}
      />
      <CustomTextArea label="Ghi chú" readOnly={isUpdate} {...form.getInputProps("note")} />
    </CustomButtonCreateUpdate>
  );
}
