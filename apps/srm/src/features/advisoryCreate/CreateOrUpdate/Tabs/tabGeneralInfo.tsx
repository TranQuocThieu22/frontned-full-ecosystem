import { evaluationCriteriaSetService } from "@/shared/APIs/evaluationCriteriaSetService";
import { EnumCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { SRMEvaluationCommitteeStatusEnum, SRMEvaluationCommitteeStatusLabel } from "@/shared/consts/enum/SRMEvaluationCommitteeStatus";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { converterUtils } from "@aq-fe/core-ui/shared/utils/converterUtils";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { UseDisclosureReturnValue } from "@mantine/hooks";
import { useEffect } from "react";

interface TabGeneralInfoProps {
    form: UseFormReturnType<SRMEvaluationCommittee>;
    disc: UseDisclosureReturnValue;
}

export default function TabGeneralInfo({ form, disc }: TabGeneralInfoProps) {
    const evaluationCriteriaQuery = useCustomReactQuery({
        queryKey: ['advisory_evaluationCriteriaQuery'],
        axiosFn: () => evaluationCriteriaSetService.getAllByCouncilType({ CouncilType: EnumCouncilType.SelectionCouncil }),
        options: {
            staleTime: 60 * 60 * 1000,
            gcTime: 24 * 60 * 60 * 1000,
            refetchOnWindowFocus: false,
            enabled: disc[0]
        }
    })
    useEffect(() => {
        // If no criteria menuData, nothing to do
        if (!evaluationCriteriaQuery.data?.length) return;

        // If form already has a value, don't overwrite
        const currentValue = form.getValues().srmEvaluationCriteriaSetId;
        if (currentValue) return;

        // Set the default to the first criteria id
        const firstCriteriaId = evaluationCriteriaQuery.data[0]?.id;
        if (!firstCriteriaId) return;

        form.setFieldValue('srmEvaluationCriteriaSetId', firstCriteriaId);
    }, [evaluationCriteriaQuery.data, form]);

    return (
        < >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24} mt={5}>
                <Stack>
                    <TextInput
                        label='Mã hội đồng'
                        placeholder="Nhập mã hội đồng..."
                        withAsterisk
                        {...form.getInputProps("code")}
                    ></TextInput>
                    <TextInput
                        label='Tên hội đồng'
                        placeholder="Nhập tên hội đồng..."
                        withAsterisk
                        {...form.getInputProps("name")}
                    ></TextInput>
                    <Select
                        label='Trạng thái hội đồng'
                        placeholder="Chọn trạng thái"
                        data={converterUtils.mapEnumToSelectData(SRMEvaluationCommitteeStatusEnum, SRMEvaluationCommitteeStatusLabel)}
                        clearable={false}
                        value={String(form.values.status)}
                        onChange={(value) => form.setFieldValue('status', Number(value))}
                    // {...form.getInputProps("status")}
                    ></Select>
                    <Textarea
                        label='Ghi chú'
                        placeholder="Nhập ghi chú..."
                        {...form.getInputProps("note")}
                    ></Textarea>
                </Stack>
                < Stack>
                    <DateInput
                        label="Ngày họp dự kiến"
                        clearable={false}
                        placeholder="Nhập ngày họp dự kiến"
                        // value={form.values.meetingDate}
                        // onChange={(value) => form.setFieldValue('meetingDate', (value || ''))}
                        {...form.getInputProps("meetingDate")}
                    />
                    <TextInput
                        label="Thời gian họp"
                        placeholder="Nhập thời gian họp"
                        {...form.getInputProps('meetingTime')}
                    />
                    <TextInput
                        label="Địa điểm họp"
                        placeholder="Nhập địa điểm họp"
                        {...form.getInputProps('meetingLocation')}
                    />
                    <CustomFileInput
                        label="File đính kèm"
                        placeholder="Đường dẫn file..."
                        value={new File([], form.getValues().attachmentDetail?.fileName || "")}
                        onChange={async (e) => form.setFieldValue("attachmentDetail", await fileUtils.fileToAQDocumentType(e!))}
                    />
                    <Select
                        clearable={false}
                        label='Bộ tiêu chí đánh giá'
                        withAsterisk
                        placeholder="Chọn bộ tiêu chí đánh giá..."
                        data={evaluationCriteriaQuery.data?.map((item) => ({
                            value: String(item.id),
                            label: `${item.code} - ${item.name}` || '',
                        }))}
                        {...form.getInputProps('srmEvaluationCriteriaSetId')}
                        value={form.getValues().srmEvaluationCriteriaSetId?.toString() || ''}
                        onChange={(value) => form.setFieldValue('srmEvaluationCriteriaSetId', Number(value))}
                    />
                </Stack>
            </SimpleGrid>

            {/* <Checkbox
                label="Gửi email"
                {...form.getInputProps('sent_email', { type: 'checkbox' })}
            /> */}
        </ >
    );
}
