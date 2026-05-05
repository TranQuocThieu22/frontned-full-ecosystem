import { IUpdateProposalPrecheckBody, taskProposalService } from "@/shared/APIs/taskProposalService";
import { EnumProposalStatus, EnumProposalStatusLabels } from "@/shared/consts/enum/EnumProposalStatus";
import { SRMTaskProposal } from "@/shared/interfaces/SRMTaskProposal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { useCustomReactMutation } from "@aq-fe/core-ui/shared/hooks/useCustomReactMutation";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

interface IProp {
    value: SRMTaskProposal;
}

export default function CheckModalButton({ value }: IProp) {
    const disc = useDisclosure();
    const [loading, setLoading] = useState(false)
    const form = useForm<IUpdateProposalPrecheckBody>({
        initialValues: {
            id: value?.id || 0,
            preliminaryStatus: value?.proposalStatus || 0,
            preliminaryReview: value?.preliminaryReview || "",
            preliminaryIsSentMail: value?.preliminaryIsSentMail || false,
        },
    });

    const mutation = useCustomReactMutation({
        axiosFn: () => {
            return taskProposalService.updateProposalPrecheck(
                {
                    id: form.values.id,
                    preliminaryStatus: form.values.preliminaryStatus,
                    preliminaryReview: form.values.preliminaryReview,
                    preliminaryIsSentMail: form.values.preliminaryIsSentMail,
                },
            );

        },
        options: {
            onSuccess: () => {
                setLoading(false)
                disc[1].close()
            },
            onError: () => {
                setLoading(false)
            }
        },
        mutationType: "update",
    });

    return (
        <CustomButtonModal
            disclosure={disc}
            isActionIcon={true}
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
                <CustomButton
                    loading={loading}
                    actionType="save"
                    onClick={() => {
                        setLoading(true);
                        mutation.mutateAsync();
                    }}
                >Lưu</CustomButton>
            </Stack>
        </CustomButtonModal>
    );
}