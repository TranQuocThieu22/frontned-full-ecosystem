import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMEvaluationCommittee } from "@/shared/interfaces/SRMEvaluationCommittee";
import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMEvaluationTopic } from "@/shared/interfaces/SRMEvaluationTopic";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Modal, Tabs } from "@mantine/core";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconRegistered, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useMapRef } from "./hooks/useMapRef";
import AlertDialog from "./shared/AlertDialog";
import { cleanEvaluationCommittee, keyValueOf } from "./shared/CostReviewFunctions";
import TopicTable from "./TabEvaluationTopic/TopicTable";
import GeneralInfoForm, { TabGeneralInfoFormHandle } from "./TabGeneralInfo/GeneralInfoForm";
import MemberTable from "./TabMember/MemberTable";

interface Props {
    values?: SRMEvaluationCommittee,
    updateDisc: UseDisclosureReturnValue
}

export default function CostReviewSetupUpdate({ values, updateDisc }: Props) {
    const alertDialogDisc = useDisclosure(false);
    const queryClient = useQueryClient();
    const academicYearStore = useAcademicYearStore();

    // Declare useRef
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const tabGeneralInfoFormRef = useRef<TabGeneralInfoFormHandle>(null);

    // Temporarily save deleted evaluation members and topics saved in database
    const evaluationMembersDisable = useRef<SRMEvaluationMember[]>([]);
    const evaluationTopicsDisable = useRef<SRMEvaluationTopic[]>([]);

    // Declare menuData
    const evaluationMembersData = useMapRef<string, SRMEvaluationMember>(); // key is the user ID, save the evaluation member
    const evaluationTopicsData = useMapRef<string, SRMEvaluationTopic>(); // key is the topic ID, save the evaluation topic

    const hasChange = useRef<boolean>(false);

    const handleSetValue = useCallback(() => {
        if (!values) return;
        hasChange.current = false;

        // Clear menuData
        evaluationMembersData.clear();
        evaluationTopicsData.clear();

        evaluationMembersDisable.current.length = 0;
        evaluationTopicsDisable.current.length = 0;

        // Gán tên file
        values.attachmentDetail ??= {}
        values.attachmentDetail.fileName = values.attachmentPath?.split("/").pop() || "";

        // Map menuData thành viên hội đồng
        for (const evaluationMember of values.srmEvaluationMembers ?? []) {
            evaluationMembersData.get(keyValueOf(evaluationMember.userId))
                ? (
                    // tránh trùng key, khi có cùng lúc 2 record thành viên hội đồng chung 1 user tồn tại cùng 1 type
                    evaluationMembersData.set(`dupKey${keyValueOf(evaluationMember.userId)}${evaluationMember.id}`, evaluationMember)
                )
                : evaluationMembersData.set(keyValueOf(evaluationMember.userId), evaluationMember)
        }

        // Map menuData danh sách đăng ký tuyển chọn
        for (const evaluationTopic of values.srmEvaluationTopics ?? []) {
            evaluationTopicsData.get(keyValueOf(evaluationTopic.id))
                ? (
                    // tránh trùng key, khi có cùng lúc 2 record chung 1 đăng ký tuyển chọn tồn tại cùng 1 type
                    evaluationTopicsData.set(`dupKey${keyValueOf(evaluationTopic.srmTopicId)}${evaluationTopic.id}`, evaluationTopic)
                )
                : evaluationTopicsData.set(keyValueOf(evaluationTopic.srmTopicId), evaluationTopic)
        }
    }, [values]);

    // Assign menuData for evaluation member
    useEffect(() => {
        handleSetValue();
    }, [handleSetValue])

    // hàm reset menuData
    function resetAllData() {
        tabGeneralInfoFormRef.current?.resetForm();
        evaluationMembersData.clear();
        evaluationTopicsData.clear();
    }

    // handle request to server
    const mutation = useMutation({
        mutationFn: async () => {
            // Validate form tab general
            const validateResult = tabGeneralInfoFormRef.current?.validate();

            // Lấy menuData từ tab general
            const data = tabGeneralInfoFormRef.current?.getValues();

            // Validate form tab genaral
            if (validateResult?.hasErrors || !data) {
                throw new Error("ValidationFailedTabGenaral");
            }

            // Lấy menuData evaluation member
            const membersArray = evaluationMembersData.values().concat(evaluationMembersDisable.current);;

            // Lấy menuData evaluation topics
            const evaluationTopicsArray = evaluationTopicsData.values().concat(evaluationTopicsDisable.current);

            data.srmEvaluationMembers = membersArray;
            data.srmEvaluationTopics = evaluationTopicsArray;

            const payload = cleanEvaluationCommittee(data);

            return await evaluationCommitteeService.update(payload);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                const dataMessage = (response.data.data as any);
                // message trùng code
                if (dataMessage.Code) {
                    tabGeneralInfoFormRef.current?.setErrors({
                        code: "Tổ thẩm định đã tồn tại",
                    }),
                        generalTabRef.current?.click()
                } else {
                    notifications.show({
                        color: "red",
                        title: "Có lỗi đã xảy ra",
                        message: "Vui lòng thử lại sau",
                    })
                }
            } else {
                queryClient.invalidateQueries({ queryKey: ['CostReviewSetupTable', academicYearStore.state.academicYear?.id] });
                updateDisc[1].close();
                notifications.show({
                    color: "green",
                    message: "Cập nhật tổ thẩm định thành công",
                });
                resetAllData();
            }
        },
        onError: (error) => {
            if (error.message === "ValidationFailedTabGenaral") {
                generalTabRef.current?.click();
                notifications.show({
                    color: "red",
                    title: "Thiếu thông tin",
                    message: "Tab Thông tin chung, thiếu một số thông tin bắt buộc",
                });
            } else {
                generalTabRef.current?.click();
                notifications.show({
                    color: "red",
                    title: "Có lỗi đã xảy ra",
                    message: "Vui lòng thử lại sau",
                })
            }
        },
    });

    return (
        <>
            <Modal
                size={"80%"}
                title="Chi tiết tổ thẩm định kinh phí"
                opened={updateDisc[0]}
                onClose={() => {
                    hasChange.current || tabGeneralInfoFormRef.current?.isDirty()
                        ? alertDialogDisc[1].open()
                        : updateDisc[1].close()
                }}
            >
                <Tabs defaultValue="general">
                    <Tabs.List>
                        <Tabs.Tab
                            ref={generalTabRef}
                            bg="rgba(131, 204, 235, 0.3)"
                            color="rgba(131, 204, 235, 1)"
                            value="general"
                            flex={1}
                            leftSection={<IconInfoCircle />}
                        >
                            Thông tin chung
                        </Tabs.Tab>

                        <Tabs.Tab
                            bg="rgba(247, 216, 54, 0.3)"
                            color="rgba(247, 216, 54, 1)"
                            value="evaluationMembers"
                            flex={1}
                            leftSection={<IconUsers />}
                        >
                            Thành viên
                        </Tabs.Tab>

                        <Tabs.Tab
                            bg="rgba(112, 219, 186, 0.3)"
                            color="rgba(112, 219, 186, 1)"
                            value="evaluationTopics"
                            flex={1}
                            leftSection={<IconRegistered />}
                        >
                            Danh sách đăng ký tuyển chọn
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general">
                        <GeneralInfoForm
                            ref={tabGeneralInfoFormRef}
                            values={values}
                            hasChange={hasChange}
                            disc={updateDisc}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="evaluationMembers">
                        <MemberTable
                            srmEvaluationCommitteeId={values?.id}
                            evaluationMembersData={evaluationMembersData}
                            evaluationMembersDisable={evaluationMembersDisable}
                            hasChange={hasChange}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="evaluationTopics">
                        <TopicTable
                            evaluationTopicsData={evaluationTopicsData}
                            evaluationTopicsDisable={evaluationTopicsDisable}
                            srmEvaluationCommitteeId={values?.id}
                            hasChange={hasChange}
                        />
                    </Tabs.Panel>
                </Tabs>

                <CustomButton
                    mt="lg"
                    fullWidth
                    actionType="save"
                    onClick={() => mutation.mutate()}
                    loading={mutation.isPending}
                />
            </Modal>
            <AlertDialog disc={alertDialogDisc} discParentModal={updateDisc} handleSetValueModalUpdate={handleSetValue} />
        </>
    )
}


