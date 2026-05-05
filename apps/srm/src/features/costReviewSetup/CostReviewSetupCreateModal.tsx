import { evaluationCommitteeService } from "@/shared/APIs/evaluationCommitteeService";
import { EnumEvaluationCommitteeType } from "@/shared/consts/enum/EnumEvaluationCommitteeType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMEvaluationMember } from "@/shared/interfaces/SRMEvaluationMember";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Modal, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconRegistered, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useMapRef } from "./hooks/useMapRef";
import AlertDialog from "./shared/AlertDialog";
import { cleanEvaluationCommittee } from "./shared/CostReviewFunctions";
import TopicTable from "./TabEvaluationTopic/TopicTable";
import GeneralInfoForm, { TabGeneralInfoFormHandle } from "./TabGeneralInfo/GeneralInfoForm";
import MemberTable from "./TabMember/MemberTable";

export default function CostReviewSetupCreateModal() {
    const createDisc = useDisclosure(false);
    const alertDialogDisc = useDisclosure(false);
    const queryClient = useQueryClient();
    const academicYearStore = useAcademicYearStore();

    // Declare useRef
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const tabGeneralInfoFormRef = useRef<TabGeneralInfoFormHandle>(null);

    // Declare menuData
    const evaluationMembersData = useMapRef<string, SRMEvaluationMember>(); // key is the user ID, save the evaluation member
    const evaluationTopicsData = useMapRef<string, SRMTopic>(); // key is the topic ID, save the proposal register

    // biến show validate
    const hasChange = useRef<boolean>(false);

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

            // Get menuData evaluation member
            const membersArray = evaluationMembersData.values();

            // Get menuData evaluation topics
            const evaluationTopicArray = evaluationTopicsData.values();

            data.srmEvaluationMembers = membersArray;
            data.srmEvaluationTopics = evaluationTopicArray;
            data.type = EnumEvaluationCommitteeType.CostAppraisal;
            data.academicYearId = academicYearStore.state.academicYear?.id;

            const payload = cleanEvaluationCommittee(data);

            return await evaluationCommitteeService.create(payload);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                const dataMessage = (response.data.data as any);
                // message duplicate code
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
                createDisc[1].close();
                notifications.show({
                    color: "green",
                    message: "Thêm tổ thẩm định thành công",
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
            <CustomButton
                onClick={() => {
                    hasChange.current = false;
                    createDisc[1].open();
                }}
                actionType="create"
            />
            <Modal
                size={"80%"}
                title={"Tạo tổ thẩm định kinh phí"}
                opened={createDisc[0]}
                onClose={() => {
                    hasChange.current || tabGeneralInfoFormRef.current?.isDirty()
                        ? alertDialogDisc[1].open()
                        : createDisc[1].close();
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
                            hasChange={hasChange}
                            disc={createDisc}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="evaluationMembers">
                        <MemberTable
                            srmEvaluationCommitteeId={0}
                            evaluationMembersData={evaluationMembersData}
                            hasChange={hasChange}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="evaluationTopics">
                        <TopicTable
                            srmEvaluationCommitteeId={0}
                            evaluationTopicsData={evaluationTopicsData}
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
            <AlertDialog disc={alertDialogDisc} discParentModal={createDisc} handleSetValueModalUpdate={resetAllData} />
        </>
    )
}