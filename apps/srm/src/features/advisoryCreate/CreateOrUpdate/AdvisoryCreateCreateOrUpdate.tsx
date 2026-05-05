import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumCouncilType } from "@/shared/consts/enum/EnumCouncilType";
import { SRMEvaluationCommitteeStatusEnum } from "@/shared/consts/enum/SRMEvaluationCommitteeStatus";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconList, IconUsers } from "@tabler/icons-react";
import { useEffect } from "react";
import useAcademicYearStore from "../../../shared/features/AcademicYear/useAcademicYearStore";
import TabGeneralInfo from "./Tabs/tabGeneralInfo";
import TabMemberList from "./Tabs/tabMember";
import TabsEvaluationTopic from "./Tabs/tabsEvaluationTopic";

export default function AdvisoryCreateCreateOrUpdate(
    { isUpdate = false, initialData }:
        { isUpdate?: boolean; initialData?: SRMEvaluationCommittee }) {
    const disc = useDisclosure();
    const academicYearStore = useAcademicYearStore()
    const form = useForm<SRMEvaluationCommittee>({
        mode: 'uncontrolled',
        validate: {
            code: (value) => (!value?.trim() ? "Mã không được để trống" : null),
            name: (value) => (!value?.trim() ? "Tiêu đề không được để trống" : null),
            srmEvaluationCriteriaSetId: (value) => (!value ? "Bộ tiêu chí đánh giá không được để trống" : null),
        },
    });
    useEffect(() => {
        if (!initialData) {
            // NOTE: no initial menuData, ensure defaults
            if (!form.values.meetingDate) {
                form.setFieldValue("meetingDate", new Date().toISOString());
            }
            if (!form.values.status) {
                form.setFieldValue(
                    "status",
                    Number(SRMEvaluationCommitteeStatusEnum.WaitingForMeeting)
                );
            }

            return;
        }

        // NOTE: initial menuData present, hydrate form
        const valueSetter = {
            ...initialData,
            attachmentDetail: {
                fileName: initialData.attachmentPath,
            },
        };
        form.setValues(valueSetter);
        form.setInitialValues(valueSetter);
    }, [initialData]);


    // Helper function to determine member action type
    const getMemberActionType = (member: SRMEvaluationMember) => {
        const hasValidId = member.id && member.id > 0;
        const isCurrentlyEnabled = member.isEnabled !== false; // Default to true if undefined
        if (!hasValidId && isCurrentlyEnabled) {
            // Case 1: New member being added
            return 'ADD';
        } else if (hasValidId && !isCurrentlyEnabled) {
            // Case 2: Existing member being soft deleted
            return 'SOFT_DELETE';
        } else if (hasValidId && isCurrentlyEnabled) {
            // Case 3: Existing member being re-enabled OR Case: Existing member (no change)
            return 'RE_ENABLE_OR_EXISTING';
        } else {
            // CASE 4: Existing member, no change needed in payload
            return 'EXISTING';
        }
    };

    // Helper function to determine topic action type
    const getTopicActionType = (topic: SRMEvaluationTopic) => {
        const hasValidId = topic.id && topic.id > 0;
        const isCurrentlyEnabled = topic.isEnabled !== false; // Default to true if undefined

        if (!hasValidId && isCurrentlyEnabled) {
            // CASE 1: New topic being added
            return 'ADD';
        } else if (hasValidId && !isCurrentlyEnabled) {
            // CASE 2: Existing topic being soft deleted
            return 'SOFT_DELETE';
        } else if (hasValidId && isCurrentlyEnabled) {
            // CASE 3: Existing topic being re-enabled OR Case: Existing topic (no change)
            return 'RE_ENABLE_OR_EXISTING';
        } else {
            // CASE 4: Existing topic, no change needed in payload
            return 'EXISTING';
        }
    };

    const handleSubmit = (values: typeof form.values) => {
        // Process members with optimistic UI logic
        const processedMembers = values.srmEvaluationMembers?.map(evaluationMember => {
            const actionType = getMemberActionType(evaluationMember);

            return {
                id: evaluationMember?.id || 0,
                code: `${values.code}-${evaluationMember.user?.code || ''}`,
                name: `${values.name}-${evaluationMember.user?.fullName || ''}`,
                srmEvaluationCommitteeId: values.id || 0,
                userId: evaluationMember.userId || evaluationMember.user?.id || 0,
                srmTitleId: evaluationMember.srmTitleId || null,
                isEnabled: actionType !== 'SOFT_DELETE', // Set isEnabled based on action
                // Include other required fields
                concurrencyStamp: evaluationMember.concurrencyStamp || "",
                // modifiedWhen: new Date(),
                modifiedBy: 0,
                order: evaluationMember.order || 0,
            } as SRMEvaluationMember;
        }) || [];

        // Process topics with optimistic UI logic
        const processedTopics = values.srmEvaluationTopics?.map(evaluationTopic => {
            const actionType = getTopicActionType(evaluationTopic);

            return {
                id: evaluationTopic.id || 0,
                code: evaluationTopic.code || "",
                name: evaluationTopic.name || "",
                order: evaluationTopic.order || 0,
                srmEvaluationCommitteeId: values.id || 0,
                srmTopicId: evaluationTopic.srmTopicId || evaluationTopic.srmTopic?.id || 0,
                isEnabled: actionType !== 'SOFT_DELETE', // Set isEnabled based on action
                // Include other required fields
                concurrencyStamp: evaluationTopic.concurrencyStamp || "",
                // modifiedWhen: new Date(),
                modifiedBy: 0,
            };
        }) || [];

        const apiPayload: SRMEvaluationCommittee = {
            id: values.id || 0,
            code: values.code || "",
            name: values.name || "",
            concurrencyStamp: values.concurrencyStamp || "",
            isEnabled: values.isEnabled ?? true,
            // modifiedWhen: values.modifiedWhen || new Date(),
            meetingDate: values.meetingDate ? new Date(values.meetingDate).toISOString() : new Date().toISOString(),
            meetingLocation: values.meetingLocation || "",
            meetingTime: values.meetingTime || "",
            status: values.status,
            attachmentPath: values.attachmentPath || "",
            type: EnumCouncilType.AdvisoryCouncil,
            srmEvaluationCriteriaSetId: Number(values.srmEvaluationCriteriaSetId) || 0,
            academicYearId: academicYearStore.state.academicYear?.id || 0,
            srmEvaluationMembers: processedMembers,
            srmEvaluationTopics: processedTopics,
            note: values.note || ''
        };
        if (isUpdate) {
            return evaluationCommitteeService.update(apiPayload);
        }
        return evaluationCommitteeService.create(apiPayload);
    };
    return (
        <CustomButtonCreateUpdate
            form={form}
            onSubmit={(values) => {
                return handleSubmit(values);
            }}
            isUpdate={isUpdate}
            disclosure={disc}
            modalProps={{ size: "90%", title: isUpdate ? "Cập nhật thông báo" : "Thêm thông báo" }}
        >
            <CustomTabs
                defaultValue={"Thông tin chung"}
                tabs={[
                    {
                        label: "Thông tin chung",
                        children: <TabGeneralInfo
                            form={form}
                            disc={disc} />,
                        leftSection: <IconInfoCircle size={16} />,
                    },
                    {
                        label: `Danh sách thành viên`,
                        children: <TabMemberList
                            srmEvaluationMembers={form.getValues().srmEvaluationMembers || []}
                            onChange={(recs) => form.setFieldValue("srmEvaluationMembers", recs)}
                            disc={disc}
                        />,
                        leftSection: <IconUsers size={16} />,
                    },
                    {
                        label: `Danh sách đăng ký tuyển chọn`,
                        children: <TabsEvaluationTopic
                            Topics={form.getValues().srmEvaluationTopics || []}
                            onChange={(recs) => form.setFieldValue("srmEvaluationTopics", recs)}
                        />,
                        leftSection: <IconList size={16} />,
                    },

                ]}
            />
        </CustomButtonCreateUpdate >
    );
}
