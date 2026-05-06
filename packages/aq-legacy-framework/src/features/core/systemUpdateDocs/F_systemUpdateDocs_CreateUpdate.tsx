import { documentService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Document } from "@aq-fe/aq-legacy-framework/shared/interfaces/Document";
import { fileUtils } from "@aq-fe/aq-legacy-framework/shared/utils/fileUtils";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface I extends Document {
  file?: File;
}

export function F_systemUpdateDocs_CreateUpdate({
  RefinementTypeId,
  values,
  isUpdate = false,
}: {
  RefinementTypeId?: number;
  values?: I;
  isUpdate?: boolean;
}) {
  const form = useForm<I>({
    mode: "uncontrolled",
    initialValues:
      isUpdate && values
        ? {
          ...values,
          file: values.path ? new File([], values.path.split("/").pop()!) : undefined,
          startDate: values.startDate ? new Date(values.startDate) : undefined,
          endDate: values.endDate ? new Date(values.endDate) : undefined,
          meetingDate: values.meetingDate ? new Date(values.meetingDate) : undefined,
        } as any
        : undefined,
    validate: {
      meetingDate: (value) => (value ? null : "Không được để trống"),
      departmentName: (value) => (value ? null : "Không được để trống"),
      description: (value) => (value ? null : "Không được để trống"),
      file: (value) => (value ? null : "Không được để trống"),
      startDate: (value) => (value ? null : "Không được để trống"),
      endDate: (value, values) =>
        value && values.startDate && new Date(value) > new Date(values.startDate)
          ? null
          : "Ngày kết thúc phải lớn hơn ngày bắt đầu",
    },
  });

  useEffect(() => {
    if (!values || !isUpdate) return;

    const formattedValues = {
      ...values,
      file: values.path ? new File([], values.path.split("/").pop()!) : undefined,
      startDate: values.startDate ? new Date(values.startDate) : undefined,
      endDate: values.endDate ? new Date(values.endDate) : undefined,
      meetingDate: values.meetingDate ? new Date(values.meetingDate) : undefined,
    };
    
    form.setInitialValues(formattedValues as any);
    form.setValues(formattedValues as any);
  }, [values, isUpdate]);

  return (
    <CustomButtonCreateUpdate
      isUpdate={isUpdate}
      form={form}
      onSubmit={async (values) => {
        const body = {
          ...values,
          ...(isUpdate ? {} : { DocumentType: RefinementTypeId }),
          fileDetail: await fileUtils.fileToAQDocumentType(values.file!),
        };
        return isUpdate ? documentService.update(body) : documentService.create(body);
      }}
    >
      <CustomDateInput withAsterisk label="Ngày họp" {...form.getInputProps("meetingDate")} />
      <CustomTextInput
        withAsterisk
        label="Đơn vị yêu cầu"
        {...form.getInputProps("departmentName")}
      />
      <CustomTextInput
        withAsterisk
        label="Nội dung cải tiến"
        {...form.getInputProps("description")}
      />
      <CustomTextInput label="Kết luận" {...form.getInputProps("conclusion")} />
      <CustomDateInput withAsterisk label="Ngày bắt đầu" {...form.getInputProps("startDate")} />
      <CustomDateInput withAsterisk label="Ngày kết thúc" {...form.getInputProps("endDate")} />
      <CustomFileInput
        placeholder="Tải lên tài liệu"
        withAsterisk
        label="Tài liệu"
        {...form.getInputProps("file")}
      />
      <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
    </CustomButtonCreateUpdate>
  );
}
