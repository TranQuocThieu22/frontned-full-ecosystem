import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import useAcademicYearStore from "@/shared/features/AcademicYear/useAcademicYearStore";
import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { SRMAcceptanceCouncil } from "@/shared/interfaces/SRMAcceptanceCouncil";
import { SRMAcceptanceMember } from "@/shared/interfaces/SRMAcceptanceMember";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Modal, Tabs } from "@mantine/core";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconRegistered, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useMapRef } from "./hooks/useMapRef";
import AlertDialog from "./shared/AlertDialog";
import { keyValueOf, sanitizeAcceptanceCouncilPayload } from "./shared/SchoolCoucilFunctions";
import ContractTable from "./TabAcceptanceContract/ContractTable";
import GeneralInfoForm, { TabGeneralInfoFormHandle } from "./TabGeneralInfo/GeneralInfoForm";
import MemberTable from "./TabMember/MemberTable";

interface Props {
    values?: SRMAcceptanceCouncil,
    updateDisc: UseDisclosureReturnValue
}

export default function FacultyCouncilSetupUpdateModal({ values, updateDisc }: Props) {
    const alertDialogDisc = useDisclosure(false);
    const queryClient = useQueryClient();
    const academicYearStore = useAcademicYearStore();

    // Declare useRef
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const tabGeneralInfoFormRef = useRef<TabGeneralInfoFormHandle>(null);

    // Temporarily save deleted council members and contracts saved in database
    const acceptanceMembersDisable = useRef<SRMAcceptanceMember[]>([]);
    const acceptanceContractsDisable = useRef<SRMAcceptanceContract[]>([]);

    // Declare menuData hội đồng
    const acceptanceMembersData = useMapRef<string, SRMAcceptanceMember>(); // key is the user ID, save the acceptance member
    const acceptanceContractsData = useMapRef<string, SRMAcceptanceContract>(); // key is the user ID, save the acceptance contract

    const hasChange = useRef<boolean>(false);

    const handleSetValue = useCallback(() => {
        if (!values) return;
        hasChange.current = false;

        // Clear menuData
        acceptanceMembersData.clear();
        acceptanceContractsData.clear();

        acceptanceMembersDisable.current.length = 0;
        acceptanceContractsDisable.current.length = 0;

        // Gán tên file
        values.attachmentDetail ??= {}
        values.attachmentDetail.fileName = values.attachmentPath?.split("/").pop() || "";

        // Map menuData thành viên hội đồng
        for (const acceptanceMember of values.srmAcceptanceMembers ?? []) {
            acceptanceMembersData.get(keyValueOf(acceptanceMember.userId))
                ? (
                    // tránh trùng key, khi có cùng lúc 2 record thành viên hội đồng chung 1 user tồn tại cùng 1 type
                    acceptanceMembersData.set(`dupKey${keyValueOf(acceptanceMember.userId)}${acceptanceMember.id}`, acceptanceMember)
                )
                : acceptanceMembersData.set(keyValueOf(acceptanceMember.userId), acceptanceMember)
        }

        // Map menuData danh sách đề tài nghiệm thu
        for (const acceptanceContract of values.srmAcceptanceContracts ?? []) {
            acceptanceContractsData.get(keyValueOf(acceptanceContract.id))
                ? (
                    // tránh trùng key, khi có cùng lúc 2 record chung 1 đề tài nghiệm thu tồn tại cùng 1 type
                    acceptanceContractsData.set(`dupKey${keyValueOf(acceptanceContract.srmContractId)}${acceptanceContract.id}`, acceptanceContract)
                )
                : acceptanceContractsData.set(keyValueOf(acceptanceContract.srmContractId), acceptanceContract)
        }
    }, [values]);

    // Assign menuData for acceptance member
    useEffect(() => {
        handleSetValue();
    }, [handleSetValue])

    // hàm reset menuData
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

            // Lấy menuData acceptance member
            const membersArray = acceptanceMembersData.values().concat(acceptanceMembersDisable.current);

            // Lấy menuData acceptance contract
            const acceptanceContractsArray = acceptanceContractsData.values().concat(acceptanceContractsDisable.current);

            data.srmAcceptanceMembers = membersArray;
            data.srmAcceptanceContracts = acceptanceContractsArray;

            return await acceptanceCouncilService.update(
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
                updateDisc[1].close();
                notifications.show({
                    color: "green",
                    message: "Cập nhật hội đồng nghiệm thu thành công",
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
                title="Chi tiết hội đồng nghiệm thu cấp Trường"
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
                            leftSection={<IconRegistered />}
                        >
                            Danh sách đề tài nghiệm thu
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
                    <Tabs.Panel value="acceptanceMembers">
                        <MemberTable
                            srmAcceptanceCouncilId={values?.id}
                            acceptanceMembersData={acceptanceMembersData}
                            acceptanceMembersDisable={acceptanceMembersDisable}
                            hasChange={hasChange}
                        />
                    </Tabs.Panel>
                    <Tabs.Panel value="acceptanceContracts">
                        <ContractTable
                            srmAcceptanceCouncilId={values?.id}
                            acceptanceContractsData={acceptanceContractsData}
                            acceptanceContractsDisable={acceptanceContractsDisable}
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


