import { IUpdateProposalPrecheckBody, taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumProposalStatus, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IProp {
    value: SRMTaskProposal;
}

export default function CheckModalButton({ value }: IProp) {
    const form = useForm<IUpdateProposalPrecheckBody>({
        initialValues: {
            id: value?.id || 0,
            preliminaryStatus: value?.proposalStatus || 0,
            preliminaryReview: value?.preliminaryReview || "",
            preliminaryIsSentMail: value?.preliminaryIsSentMail || false,
        },
    });
    return (
        <CustomButtonCreateUpdate
            form={form}
            onSubmit={() => {
                return taskProposalService.updateProposalPrecheck(
                    {
                        id: form.values.id,
                        preliminaryStatus: form.values.preliminaryStatus,
                        preliminaryReview: form.values.preliminaryReview,
                        preliminaryIsSentMail: form.values.preliminaryIsSentMail,
                    })
            }}
            isUpdate
            actionIconProps={{
                actionType: "validate",
                toolTipProps: { label: "Kiểm tra" },
            }}
            modalProps={{
                size: "lg",
                title: "Chi tiết kiểm tra sơ bộ",
            }}
        >
            <Stack>
                <CustomSelect
                    withAsterisk
                    label="Trạng thái đề xuất hiện tại"
                    data={converterUtils.mapEnumToSelectData(EnumProposalStatus, EnumProposalStatusLabels)}
                    value={form.values.preliminaryStatus.toString()}
                    onChange={(value) => {
                        form.setFieldValue("preliminaryStatus", parseInt(value || "0"));
                    }}
                />
                <CustomTextArea
                    label="Nhận xét Kiểm tra hồ sơ"
                    {...form.getInputProps("preliminaryReview")}
                />
                <CustomCheckbox
                    label="Gửi thông báo"
                    checked={form.values.preliminaryIsSentMail}
                    onChange={(event) => {
                        form.setFieldValue("preliminaryIsSentMail", event.currentTarget.checked);
                    }}
                />
            </Stack>
        </CustomButtonCreateUpdate >
    );
}