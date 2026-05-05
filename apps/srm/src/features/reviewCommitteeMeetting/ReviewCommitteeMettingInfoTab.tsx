import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import CustomFormCreateUpdate from "@aq-fe/core-ui/shared/components/form/CustomFormCreateUpdate";
import CustomAQFileInput from "@aq-fe/core-ui/shared/components/input/CustomAQFileInput";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomComboboxAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomComboboxAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { useEffect } from "react";

export default function ReviewCommitteeMettingInfoTab({ values, disc }: { values?: SRMReviewProposal, disc: UseDisclosureReturnValue }) {
    const conclusionQuery = useCustomReactQuery({
        queryKey: ['Conclusions', values?.srmReviewCommitteeId],
        axiosFn: () => reviewCommitteeService.getConclusionByReivewCommittee({ SRMReviewCommitteeId: values?.srmReviewCommitteeId }),
        options: {
            enabled: values?.srmReviewCommitteeId != undefined
        }
    })
    const form = useForm<SRMReviewProposal>({
        mode: "uncontrolled"
    })
    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])

    return (
        <CustomFormCreateUpdate
            isUpdate
            form={form}
            onSubmit={(formValues) => {
                return reviewCommitteeService.updateSRMReviewProposal(formValues)
            }}
            useCustomReactMutationProps={{
                options: {
                    onSuccess: () => {
                        disc[1].close()
                    }
                }
            }}
        >
            <Stack>
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <CustomTextInput
                        label="Mã đề xuất"
                        key={form.key("code")}
                        readOnly
                        {...form.getInputProps("code")}
                    />
                    <CustomComboboxAPI
                        enableColorView
                        label="Kết luận của hội đồng"
                        key={form.key("srmConclusionId")}
                        query={conclusionQuery}
                        {...form.getInputProps("srmConclusionId")}
                    />
                    <CustomTextInput
                        label="Tên đề tài"
                        key={form.key("name")}
                        {...form.getInputProps("name")}
                    />
                    <CustomAQFileInput
                        label="File phiếu nhận xét"
                        key={form.key("attachmentPath")}
                        attachmentPath={form.getValues().attachmentPath || ""}
                        onChange={(file) => form.setFieldValue("attachmentDetail", file)}
                    />
                    <CustomDateInput
                        label="Ngày họp"
                        key={form.key("meetingDate")}
                        {...form.getInputProps("meetingDate")}
                    />
                </SimpleGrid>
                <CustomTextArea
                    label="Kiến nghị"
                    key={form.key("recommendation")}
                    {...form.getInputProps("recommendation")}
                />
            </Stack>
        </CustomFormCreateUpdate>
    )
}
