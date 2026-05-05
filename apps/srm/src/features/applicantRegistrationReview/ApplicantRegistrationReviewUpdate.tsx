import { topicService } from '@/shared/APIs/topicService'
import { EnumLabelPreliminaryStatus, EnumPreliminaryStatus } from '@/shared/consts/enum/EnumPreliminaryStatus'
import { ITopicReviewPreliminary, SRMTopic } from '@/shared/interfaces/SRMTopic'
import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate'
import { CustomCheckbox } from '@aq-fe/core-ui/shared/components/input/CustomCheckbox'
import { CustomSelect } from '@aq-fe/core-ui/shared/components/input/CustomSelect'
import { CustomTextArea } from '@aq-fe/core-ui/shared/components/input/CustomTextArea'
import { converterUtils } from '@aq-fe/core-ui/shared/utils/converterUtils'
import { Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'

export default function ApplicantRegistrationReviewUpdate(
    {
        data,
        loading
    }: {
        data?: SRMTopic,
        loading?: boolean
    }
) {
    const disclosure = useDisclosure();
    const form = useForm<ITopicReviewPreliminary>({
        initialValues: {
            ...data,
            id: data?.id || 0,
            isSentMail: data?.preliminaryIsSentMail || false,
            review: data?.preliminaryReview || "",
            status: data?.preliminaryStatus || 1,
            type: 1
        },
    });

    const handleSubmit = () => {
        const validationResult = form.validate();
        if (validationResult.hasErrors) {
            return false;
        }
        return topicService.ReviewSRMTopic(form.getValues())
    }

    useEffect(() => {
        if (data) {
            form.setValues({
                ...data,
                id: data?.id || 0,
                isSentMail: data?.preliminaryIsSentMail || false,
                review: data?.preliminaryReview || "",
                status: data?.preliminaryStatus || 1
            });
        }

        if (!disclosure[0]) {
            form.reset();
            form.clearErrors();
        }
    }, [data, disclosure[0]]);

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết kiểm tra hồ sơ",
                size: "55%"
            }}
            isUpdate
            actionIconProps={{
                actionType: "validate",
                loading: loading,
            }}
            disclosure={disclosure}
            onSubmit={handleSubmit}
            form={form}>
            <Stack>
                <CustomSelect
                    withAsterisk
                    {...form.getInputProps("status")}
                    label="Trạng thái kiểm tra"
                    data={converterUtils.mapEnumToSelectData(EnumPreliminaryStatus, EnumLabelPreliminaryStatus)}
                    value={String(form.getValues().status)}

                    onChange={(value) => form.setFieldValue("status", Number(value))}
                />
                <CustomTextArea
                    label="Nhận xét kiểm tra sơ bộ"
                    {...form.getInputProps("review")}
                />
                <CustomCheckbox py={15}
                    label="Gửi thông báo"
                    {...form.getInputProps("isSentMail")}
                    checked={form.values.isSentMail}
                    onChange={(e) => form.setFieldValue("isSentMail", e.currentTarget.checked)}
                />
            </Stack>
        </CustomButtonCreateUpdate>
    )
}
