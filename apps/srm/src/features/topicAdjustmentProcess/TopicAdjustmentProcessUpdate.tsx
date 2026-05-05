import { contractDetailService } from "@/shared/APIs/contractDetailService";
import { EnumContractExecutionStatus, EnumLabelContractExecutionStatus } from "@/shared/consts/enum/EnumContractExecutionStatus";
import { EnumLabelProcessingStatus, EnumProcessingStatus } from "@/shared/consts/enum/EnumProcessingStatus";
import { SRMContractDetail } from "@/shared/interfaces/SRMContractDetail";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomButtonViewFileAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomButtonViewFileAPI";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function TopicAdjustmentProcessUpdate(
    {
        data,
        loading
    }: {
        data?: SRMContractDetail,
        loading?: boolean
    }
) {
    const useClient = useQueryClient();
    const disclosure = useDisclosure();
    const form = useForm<formValuesType<SRMContractDetail>>({
        initialValues: {
            ...data,
            processingStatus: data?.processingStatus || undefined,
            executionStatus: data?.srmContract?.executionStatus || undefined,
            processingSummary: data?.processingSummary || "",
            processingAttachmentDetail: data?.processingAttachmentDetail,
        },
    });

    const handleSubmit = () => {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return false;
        }
        contractDetailService.UpdateContractDetailProcessing(form.getValues()).then((res) => {
            if (res.data.isSuccess === 1) {
                utils_notification_show({ crudType: "update", message: "Cập nhật thành công" });
                useClient.invalidateQueries({ queryKey: ["topicAdjustmentProcessQuery_GetAll"] });
                closeModal();
                return true;
            }
            utils_notification_show({ crudType: "error", message: "Có lỗi xảy ra, vui lòng thử lại" });
            return false;
        })
    }

    const closeModal = () => {
        disclosure[1].close();
        form.reset();
        form.clearErrors();
    }

    const isProcessed = data?.processingStatus === EnumProcessingStatus.processed

    useEffect(() => {
        if (data) {
            form.setValues({
                ...data,
                processingStatus: data?.processingStatus || undefined,
                executionStatus: data?.srmContract?.executionStatus || undefined,
                processingSummary: data?.processingSummary || "",
                processingAttachmentDetail: data?.processingAttachmentDetail,
            });
        }
    }, [data]);

    return (
        <CustomButtonModal
            modalProps={{
                title: "Chi tiết xử lý yêu cầu điều chỉnh",
                size: "55%"
            }}
            isActionIcon
            actionIconProps={{
                actionType: "update",
                disabled: isProcessed
            }}

            disclosure={disclosure}
        >
            <Stack>
                <CustomSelect
                    label="Trạng thái xử lý"
                    disabled={isProcessed}
                    {...form.getInputProps("processingStatus")}
                    data={converterUtils.mapEnumToSelectData(EnumProcessingStatus, EnumLabelProcessingStatus)}
                    value={String(form.values.processingStatus)}
                    onChange={(value) => form.setFieldValue("processingStatus", Number(value))}

                />
                <CustomSelect
                    label="Trạng thái thực hiện"
                    disabled={isProcessed}
                    {...form.getInputProps("executionStatus")}
                    data={
                        converterUtils.mapEnumToSelectData(
                            EnumContractExecutionStatus,
                            EnumLabelContractExecutionStatus).filter((item) =>
                                item.value === String(EnumContractExecutionStatus.InProgress) ||
                                // item.value === String(EnumContractExecutionStatus.UnderRevision) ||
                                item.value === String(EnumContractExecutionStatus.Extended)
                            )
                    }
                    value={String(form.values.executionStatus)}
                    onChange={(value) => form.setFieldValue("executionStatus", Number(value))}
                />
                <CustomTextArea
                    readOnly={isProcessed}
                    {...form.getInputProps("processingSummary")}
                    label="Tóm tắt xử lý"
                    value={form.values.processingSummary}
                    onBlur={() => form.setFieldValue("processingSummary", form.values.processingSummary)}
                />
                {!isProcessed && <CustomFileInput
                    label="File xử lí yêu cầu điều chỉnh"
                    pt={10}
                    description="Chọn file"
                    accept=".pdf"
                    defaultValue={new File([], form.getValues().processingAttachmentDetail?.fileName?.split("/").pop() ?? form.getValues().processingAttachmentPath?.split("/").pop() ?? "")}
                    onChange={async (file) => {
                        if (!file) return;

                        const fileData = await fileUtils.fileToAQDocumentType(file);
                        form.setFieldValue(
                            "processingAttachmentDetail", fileData
                        );
                    }}
                    error={form.errors.processingAttachmentDetail}
                />}
                {isProcessed && <Stack>
                    <Text fw={500} fz={14}>File xử lí yêu cầu điều chỉnh</Text>
                    <CustomButtonViewFileAPI filePath={form.getValues().processingAttachmentPath} />
                </Stack>}

                {!isProcessed && <CustomButton mt={25} actionType='save' onClick={() => handleSubmit()} />}
            </Stack>
        </CustomButtonModal>
    )
}
