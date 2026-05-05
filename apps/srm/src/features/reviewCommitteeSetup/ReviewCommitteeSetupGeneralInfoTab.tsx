import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { EnumCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { ReviewCommitteeStatusEnum, ReviewCommitteeStatusLabel } from "@/shared/consts/enum/EnumReviewCommitteeStatus";
import { SRMReviewCommittee } from "@/shared/interfaces/SRMReviewCommittee";
import CustomAQImageDropzone from "@aq-fe/core-ui/shared/components/input/CustomAQImageDropzone";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomSelectAPI } from "@aq-fe/core-ui/shared/components/withAPI/CustomSelectAPI";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { SimpleGrid, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

export default function ReviewCommitteeSetupGeneralInfoTab({
    form,
    isUpdate
}: {
    form: UseFormReturnType<SRMReviewCommittee>,
    isUpdate?: boolean
}) {
    const evaluationCriteriaSetQuery = useCustomReactQuery({
        queryKey: ['evaluation_criteria_set'],
        axiosFn: () => evaluationCriteriaSetService.getAllByCouncilType({ CouncilType: EnumCouncilType.AdvisoryCouncil })
    });
    return (
        <Stack>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <CustomTextInput withAsterisk label="Mã hội đồng" readOnly={isUpdate}{...form.getInputProps("code")} />
                <CustomTextInput label="Thời gian họp" {...form.getInputProps("meetingTime")} />
                <CustomTextInput withAsterisk label="Tên hội đồng" {...form.getInputProps("name")} />
                <CustomTextInput label="Địa điểm họp" {...form.getInputProps("meetingLocation")} />
                <CustomSelect
                    label="Trạng thái hội đồng"
                    data={converterUtils.mapEnumToSelectData(ReviewCommitteeStatusEnum, ReviewCommitteeStatusLabel)}
                    defaultValue={form.getValues().status?.toString()}
                    onChange={(value) => {
                        form.setFieldValue("status", Number(value))
                    }}
                />

                <CustomDateInput
                    label="Ngày họp dự kiến"
                    {...form.getInputProps("meetingDate")}
                />

            </SimpleGrid>
            <CustomSelectAPI
                label="Bộ tiêu chí đánh giá"
                query={evaluationCriteriaSetQuery}
                {...form.getInputProps("srmEvaluationCriteriaSetId")}
            />
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <CustomAQImageDropzone
                    key={form.key("attachmentDetail")}
                    label="File quyết định thành lập hội đồng tư vấn"
                    filePath={form.getValues().attachmentPath}
                    {...form.getInputProps("attachmentDetail")}
                />
                <CustomTextArea label="Ghi chú"  {...form.getInputProps("note")} />
            </SimpleGrid>
        </Stack>
    )
}
