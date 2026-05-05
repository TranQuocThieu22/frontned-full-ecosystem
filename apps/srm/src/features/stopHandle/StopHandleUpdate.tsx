"use client";

import { contractSuspendService } from "@/shared/APIs/contractSuspendService";
import { EnumContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumLabelProcessingStatus, EnumProcessingStatus } from "@/shared/consts/enum/EnumProcessingStatus";
import { SRMContractSuspend } from "@/shared/interfaces/SRMContractSuspend";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { useForm } from "@mantine/form";

interface IContractSuspendUpdate extends SRMContractSuspend {
  executionStatus?: number;
}

type IStopHandleUpdateForm = {
  processingStatus: string;
  executionStatus: string;
  processingSummary: string;
  processingAttachmentPath?: string;
  processingAttachmentDetail?: any;
};

export default function StopHandleUpdate({ values }: { values: SRMContractSuspend }) {

  const form = useForm<IStopHandleUpdateForm>({
    initialValues: {
      processingStatus: String(values.processingStatus || EnumProcessingStatus.pending),
      executionStatus: String(values?.srmContract?.executionStatus || EnumProcessingStatus.pending),
      processingSummary: values.processingSummary || "",
      processingAttachmentPath: values.processingAttachmentPath || "",
    },
    validate: {
      processingSummary: (value) => {
        if (!value?.trim()) return "Vui lòng nhập tóm tắt xử lý";
        return null;
      },
    }
  });

  return (
    <CustomButtonCreateUpdate
      isUpdate
      modalProps={{
        title: "Cập nhật đề tài"
      }}
      actionIconProps={{
        disabled: values.processingStatus === EnumProcessingStatus.processed
      }}
      form={form}
      onSubmit={async (formValues) => {
        const updateData: IContractSuspendUpdate = {
          ...values,
          processingStatus: Number(formValues.processingStatus),
          executionStatus: Number(formValues.executionStatus),
          processingSummary: formValues.processingSummary || "",
          processingAttachmentPath: formValues.processingAttachmentPath || "",
        };

        return await contractSuspendService.UpdateContractSuspendProcessing(updateData);
      }}
    >
      <CustomSelect
        label="Trạng thái xử lý"
        withAsterisk
        data={Object.entries(EnumLabelProcessingStatus).map(([value, label]) => ({
          value: value,
          label
        }))}
        {...form.getInputProps("processingStatus")}
      />
      <CustomSelect
        label="Trạng thái thực hiện"
        withAsterisk
        // NOTE: Từ backlog thì chỉ có 3 status là Đang thực hiện, Tạm dừng và Đình chỉ hợp đồng đc sử dụng
        data={[
          {
            value: String(EnumContractExecutionStatus.InProgress),
            label: EnumLabelContractExecutionStatus[EnumContractExecutionStatus.InProgress]
          },
          {
            value: String(EnumContractExecutionStatus.Paused),
            label: EnumLabelContractExecutionStatus[EnumContractExecutionStatus.Paused]
          },
          {
            value: String(EnumContractExecutionStatus.Terminated),
            label: EnumLabelContractExecutionStatus[EnumContractExecutionStatus.Terminated]
          }
        ]}
        {...form.getInputProps("executionStatus")}
      />
      <CustomTextArea
        label="Tóm tắt xử lý"
        withAsterisk
        minRows={3}
        maxRows={5}
        {...form.getInputProps("processingSummary")}
      />
      <CustomFileInput
        label="File yêu cầu điều chỉnh"
        accept=".pdf"
        defaultValue={new File([], values?.processingAttachmentPath?.split("/").at(-1) || "")}
        onChange={async (file) => {
          if (!file) return;
          form.setFieldValue(
            "processingAttachmentDetail",
            await fileUtils.fileToAQDocumentType(file)
          );
        }}
        error={form.errors.processingAttachmentPath}
      />
    </CustomButtonCreateUpdate>
  );
}