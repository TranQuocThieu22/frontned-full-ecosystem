import { topicService } from "@/shared/APIs/topicService";
import { EnumEvaluationCommitteeType } from "@/shared/consts/enum/EnumEvaluationCommitteeType";
import { IEvaluationTopicMembers, SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomDateInput } from "@aq-fe/core-ui/shared/components/input/CustomDateInput";
import { CustomFileInput } from "@aq-fe/core-ui/shared/components/input/CustomFileInput";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { fileUtils } from "@aq-fe/core-ui/shared/utils/fileUtils";
import { Grid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import CouncilMeetingUpdateMember from "./CouncilMeetingUpdateMember";


interface I extends SRMEvaluationTopic {
    image?: File;
}

export default function CouncilMeetingUpdate({ initValues }: { initValues: I }) {
    const form = useForm<formValuesType<I>>({
        mode: "uncontrolled",
    })
    const [members, setMembers] = useState<IEvaluationTopicMembers[]>([]);
    const disc = useDisclosure()

    const topicDetail = useCustomReactQuery({
        queryKey: ['topicDetail', initValues?.srmTopicId],
        axiosFn: () => {
            return topicService.getTopicDetail({ topicId: initValues?.srmTopicId || 0, type: EnumEvaluationCommitteeType?.EvaluationCommittee })
        },
        options: {
            enabled: !!initValues?.srmTopicId && disc[0]
        }
    })

    useEffect(() => {
        if (!initValues) return;
        form.setInitialValues({
            ...initValues,
            image: new File([], initValues.attachmentPath?.split("/")[2] ?? ""),
        })
        form.setValues({
            ...initValues,
            image: new File([], initValues.attachmentPath?.split("/")[2] ?? ""),
        })
    }, [initValues])

    const handleSubmit = (values: SRMEvaluationTopic) => {
        const criteriaMap = new Map();
        topicDetail.data?.srmEvaluationCommittee?.srmEvaluationCriteriaSet?.srmCriterias?.forEach(criteria => {
            criteriaMap.set(criteria.id, criteria.maxScore);
        });

        const validationErrors: string[] = [];

        members.forEach((member, memberIndex) => {
            member.srmEvaluationTopicMemberCriterias?.forEach((criteria, criteriaIndex) => {
                const maxScore = criteriaMap.get(criteria.srmCriteriaId);
                if (criteria.point && maxScore && criteria.point > maxScore) {
                    validationErrors.push(
                        `Thành viên ${memberIndex + 1}, tiêu chí ${criteriaIndex + 1}: Điểm ${criteria.point} vượt quá điểm tối đa ${maxScore}`
                    );
                }
            });
        });

        if (validationErrors.length > 0) {
            const errorMessage = validationErrors.join('\n');
            notifications.show({
                title: "Lỗi",
                message: errorMessage,
                color: "red",
            })
            throw new Error("ValidationFailed");
        }

        return topicService.createOrUpdateEvaluationTopic({
            ...values,
            srmEvaluationTopicMembers: members,
            srmConclusion: undefined,
            srmEvaluationCommittee: undefined,
        })
    }

    useEffect(() => {
        if (!topicDetail.data) return;
        setMembers(topicDetail.data.srmEvaluationTopicMembers?.map(member => ({
            srmEvaluationMemberId: member.srmEvaluationMemberId,
            srmConclusionId: member.srmConclusionId,
            srmEvaluationTopicMemberCriterias: member.srmEvaluationTopicMemberCriterias?.map(criteria => ({
                srmCriteriaId: criteria.srmCriteriaId,
                srmEvaluationTopicMemberId: criteria.srmEvaluationTopicMemberId,
                isResult: criteria.isResult,
                comment: criteria.comment,
                point: criteria.point,
            })) || []
        })) || [])
    }, [topicDetail.data])

    const conclusionQuery = useCustomReactQuery({
        queryKey: ['conclusionQuery', initValues?.srmTopicId, 1],
        axiosFn: () => {
            return topicService.getConlusion({ type: EnumEvaluationCommitteeType?.EvaluationCommittee, topicId: initValues.srmTopicId || 0 })
        },
        options: {
            enabled: !!initValues?.srmTopicId && disc[0],
        },
    })

    return (
        <CustomButtonCreateUpdate
            form={form}
            modalProps={{
                title: "Chi tiết nhận xét của hội đồng tư vấn",
                size: '90%'
            }}
            disclosure={disc}
            onSubmit={(values) => handleSubmit(values)}
            isUpdate={true}
        >
            <Stack>
                <CustomTabs
                    tabs={[
                        {
                            label: 'Thông tin chung',
                            children: <Grid columns={12}>
                                <Grid.Col span={6}>
                                    <CustomTextInput
                                        label="Mã đăng ký"
                                        name="code"
                                        readOnly={true}
                                        disabled
                                        {...form.getInputProps('srmTopic.code')}
                                        styles={{
                                            input: {
                                                color: 'black',
                                                fontWeight: 600,
                                                WebkitTextFillColor: 'black',
                                                opacity: 1,
                                            },
                                        }}
                                    />
                                    <CustomTextInput
                                        label="Tên đề tài"
                                        name="name"
                                        readOnly={true}
                                        {...form.getInputProps('srmTopic.registerName')}
                                    />
                                    <CustomDateInput label="Ngày họp" name="meetingDate" {...form.getInputProps('meetingDate')} />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <CustomSelect
                                        label={"Kết luận của hội đồng"}
                                        isLoading={conclusionQuery.isLoading}
                                        value={form.values?.srmConclusionId?.toString() || null}
                                        data={conclusionQuery?.data?.map(item => ({ label: item.name || "", value: item.id?.toString() || "" })) || []}
                                        {...form.getInputProps('srmConclusionId')}
                                        onChange={(value) => form.setFieldValue("srmConclusionId", Number(value) || 1)}
                                    />
                                    <CustomTextArea
                                        label="Kiến nghị"
                                        name="recommendation"
                                        {...form.getInputProps('recommendation')}
                                    />
                                    <CustomFileInput
                                        label="File phiếu đề xuất"
                                        placeholder={form.values.image?.name || "Chọn file"}
                                        accept="image/png,image/jpeg,application/pdf"
                                        error={form.errors.attachmentDetail}
                                        value={form.values.image}
                                        onChange={async (files) => {
                                            if (!files) return;
                                            form.setFieldValue("image", files);

                                            const attachmentDetail = await fileUtils.fileToAQDocumentType(files);
                                            form.setFieldValue("attachmentDetail", attachmentDetail);
                                        }}
                                    />
                                </Grid.Col>
                            </Grid>
                        },
                        {
                            label: 'Thành viên',
                            children: <CouncilMeetingUpdateMember
                                criteriaSet={topicDetail?.data?.srmEvaluationCommittee?.srmEvaluationCriteriaSet?.srmCriterias || []}
                                conclusions={conclusionQuery?.data ?? []}
                                topicDetail={topicDetail?.data}
                                members={members}
                                onChangeMembers={setMembers} />
                        },
                    ]}
                />
            </Stack>
        </CustomButtonCreateUpdate>
    );
}

