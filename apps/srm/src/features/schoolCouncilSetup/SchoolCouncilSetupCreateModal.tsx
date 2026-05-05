import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { EnumAcceptanceCouncilType } from "@/shared/consts/enum/EnumAcceptanceCouncilType";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { SRMAcceptanceMember } from "@/shared/interfaces/SRMAcceptanceMember";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Modal, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconFile, IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import ContractTable from "./TabAcceptanceContract/ContractTable";
import GeneralInfoForm, { TabGeneralInfoFormHandle } from "./TabGeneralInfo/GeneralInfoForm";
import MemberTable from "./TabMember/MemberTable";
import { useMapRef } from "./hooks/useMapRef";
import AlertDialog from "./shared/AlertDialog";
import { sanitizeAcceptanceCouncilPayload } from "./shared/SchoolCoucilFunctions";

export default function SchoolCouncilSetupCreateModal() {
    const createDisc = useDisclosure(false);
    const alertDialogDisc = useDisclosure(false);
    const queryClient = useQueryClient();
    const academicYearStore = useAcademicYearStore();

    // Declare useRef
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const tabGeneralInfoFormRef = useRef<TabGeneralInfoFormHandle>(null);

    // Declare menuData hội đồng
    const acceptanceMembersData = useMapRef<string, SRMAcceptanceMember>(); // key là ID của user, lưu thành viên hội đồng
    const acceptanceContractsData = useMapRef<string, SRMAcceptanceContract>(); // key là ID của user, lưu danh sách đề tài nghiệm thu

    // biến show validate
    const hasChange = useRef<boolean>(false);

    function resetAllData() {
        tabGeneralInfoFormRef.current?.resetForm();
        acceptanceMembersData.clear();
        acceptanceContractsData.clear();
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

            // Get menuData acceptance member
            const acceptanceMembersArray = acceptanceMembersData.values();

            // Get menuData acceptance contract
            const acceptanceContractsArray = acceptanceContractsData.values();

            data.srmAcceptanceMembers = acceptanceMembersArray;
            data.srmAcceptanceContracts = acceptanceContractsArray;
            data.type = EnumAcceptanceCouncilType.University;
            data.academicYearId = academicYearStore.state.academicYear?.id;

            return await acceptanceCouncilService.create(
                sanitizeAcceptanceCouncilPayload(data)
            );
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                const dataMessage = (response.data.data as any);
                // message trùng code
                if (dataMessage.Code) {
                    tabGeneralInfoFormRef.current?.setErrors({
                        code: "Hội đồng nghiệm thu cấp Trường đã tồn tại",
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
                queryClient.invalidateQueries({ queryKey: ['SchoolCouncilSetupTable', academicYearStore.state.academicYear?.id] });
                createDisc[1].close();
                notifications.show({
                    color: "green",
                    message: "Thêm hội đồng nghiệm thu thành công",
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
                title={"Tạo hội đồng nghiệm thu cấp Trường"}
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
                            value="acceptanceMembers"
                            flex={1}
                            leftSection={<IconUsers />}
                        >
                            Thành viên
                        </Tabs.Tab>

                        <Tabs.Tab
                            bg="rgba(112, 219, 186, 0.3)"
                            color="rgba(112, 219, 186, 1)"
                            value="acceptanceContracts"
                            flex={1}
                            leftSection={<IconFile />}
                        >
                            Danh sách đề tài nghiệm thu
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general">
                        <GeneralInfoForm
                            ref={tabGeneralInfoFormRef}
                            hasChange={hasChange}
                            disc={createDisc}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="acceptanceMembers">
                        <MemberTable
                            acceptanceMembersData={acceptanceMembersData}
                            hasChange={hasChange}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="acceptanceContracts">
                        <ContractTable
                            acceptanceContractsData={acceptanceContractsData}
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