import { contractService } from "@/shared/APIs/contractService";
import { EnumLabelReportHistoryReviewStatus, EnumReportHistoryReviewStatus } from "@/shared/consts/enum/EnumReportHistoryReviewStatus";
import { SRMContractReportHistory } from "@/shared/interfaces/SRMContractReportHistory";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { useForm } from "@mantine/form";
import { IconChecklist } from "@tabler/icons-react";
import { useEffect } from "react";

export default function ProgressCheckUpdateStatus({ values }: { values: SRMContractReportHistory }) {
    const form = useForm<formValuesType<SRMContractReportHistory & { review?: string }>>({
        mode: "uncontrolled"
    })
    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])
    return (
        <CustomButtonCreateUpdate
            useCustomReactMutationProps={{
                mutationType: "update"
            }}
            isUpdate
            actionIconProps={{
                actionType: "update",
                children: <IconChecklist />,
                toolTipProps: {
                    label: "Kiểm tra"
                }
            }}
            form={form}
            onSubmit={(formValues) => contractService.reviewSRMContractPeriodic({
                id: values.id,
                review: formValues.review,
                isSentMail: formValues.isSendMail,
                reviewStatus: formValues.reviewStatus
            })}
            modalProps={{
                size: "60vw"
            }}
        >
            <CustomSelect value={form.getValues().reviewStatus?.toString()} {...form.getInputProps("reviewStatus")} label="Trạng thái kiểm tra" data={converterUtils.mapEnumToSelectData(EnumReportHistoryReviewStatus, EnumLabelReportHistoryReviewStatus)} />
            <CustomTextArea {...form.getInputProps("review")} label="Nhận xét" />
            <CustomCheckbox defaultChecked={form.getValues().isSendMail} {...form.getInputProps("isSendMail")} label="Gửi thông báo" />
        </CustomButtonCreateUpdate>
    )
}
