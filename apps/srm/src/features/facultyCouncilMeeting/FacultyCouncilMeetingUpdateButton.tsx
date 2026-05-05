"use client";

import { acceptanceCouncilService } from "@/shared/APIs/acceptanceCouncilService";
import { SRMAcceptanceContract } from "@/shared/interfaces/SRMAcceptanceContract";
import { SRMAcceptanceContractMember } from "@/shared/interfaces/SRMAcceptanceContractMember";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Modal, Tabs } from "@mantine/core";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { cloneItemsTranform } from "../reviewCommitteeMeetting/ArrayHelper/arrayHelper";
import ConfirmModal from "../reviewCommitteeSetup/ComponentShared/ConfirmModal";
import GeneralInfoForm, { GenralInfoFormHandle } from "./TabGeneralInfo/GeneralInfoForm";
import CouncilMemberTable from "./TabMember/CouncilMemberTable";

interface Props {
    acceptanceContract?: SRMAcceptanceContract,
    disclosure: UseDisclosureReturnValue
}

export default function FacultyCouncilMeetingUpdateButton({ acceptanceContract, disclosure }: Props) {
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient();
    const disclosureConfirrm = useDisclosure();
    const hasChange = useRef<boolean>(false);
    const generalInfoFormRef = useRef<GenralInfoFormHandle>(null);
    const [acceptanceContractMembers, setAcceptanceContractMembers] = useState<SRMAcceptanceContractMember[]>([]);

    function resetAllData() {
        generalInfoFormRef.current?.resetForm();
        setAcceptanceContractMembers([]);
        hasChange.current = false;
    }

    const setDataForUpdate = () => {
        if (!acceptanceContract) return;
        resetAllData();
        setAcceptanceContractMembers(structuredClone(acceptanceContract.srmAcceptanceContractMembers ?? []))
    }

    useEffect(() => {
        setDataForUpdate();
    }, [acceptanceContract]);

    const mutation = useMutation({
        mutationFn: async () => {
            // validate form tab general
            const validateResult = generalInfoFormRef.current?.validate();
            // lấy menuData từ tab general
            const data = generalInfoFormRef.current?.getValues();
            // validate form tab genaral
            if (validateResult?.hasErrors || !data) {
                throw new Error("ValidationFailedTabGeneral");
            }
            data.srmAcceptanceContractMembers = cloneItemsTranform(
                acceptanceContractMembers,
                item => ({
                    ...item,
                    srmConclusion: undefined,
                    srmAcceptanceMember: undefined
                }),
                undefined,
                item => item.isEnabled === true
            );
            return await acceptanceCouncilService.updateSRMAcceptanceContract(data);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                notifications.show({
                    color: "red",
                    title: "Lỗi",
                    message: response.data.message,
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['contract_list_faculty_council'] });
                disclosure[1].close();
                notifications.show({
                    color: "green",
                    message: "Lưu thành công",
                });
                resetAllData();
            }
        },
        onError: (error) => {
            if (error.message === "ValidationFailedTabGeneral") {
                generalTabRef.current?.click();
                return;
            }
            notifications.show({
                color: "red",
                title: "Lỗi",
                message: error.message,
            });
        },
    });

    return (
        <>
            <Modal
                size="100%"
                title="Chi tiết nhận xét của hội đồng nghiệm thu"
                opened={disclosure[0]}
                onClose={() => {
                    hasChange.current || generalInfoFormRef.current?.isDirty() ? disclosureConfirrm[1].open() : disclosure[1].close()
                }}
            >
                <Tabs
                    defaultValue="general"
                    styles={{
                        tab: {
                            fontWeight: 500,
                            padding: '8px 12px',
                        },
                        tabLabel: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                        },
                    }}>
                    <Tabs.List mb={10} grow justify="space-between">
                        <Tabs.Tab
                            ref={generalTabRef}
                            value="general"
                            leftSection={<IconInfoCircle size={16} />}
                            style={{ backgroundColor: '#e3f2fd', color: '#1565c0' }}
                        >
                            Thông tin chung
                        </Tabs.Tab>

                        <Tabs.Tab
                            value="members"
                            leftSection={<IconUsers size={16} />}
                            style={{ backgroundColor: '#fff9c4', color: '#795548' }}
                        >
                            Thành viên
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general" mih="65vh">
                        <GeneralInfoForm ref={generalInfoFormRef} values={acceptanceContract} />
                    </Tabs.Panel>

                    <Tabs.Panel value="members" mih="65vh">
                        <CouncilMemberTable
                            memberList={acceptanceContractMembers}
                            hasChange={hasChange}
                            contractCode={acceptanceContract?.srmContract?.code}
                            acceptanceCouncilId={acceptanceContract?.srmAcceptanceCouncilId}
                        />
                    </Tabs.Panel>
                </Tabs>
                <CustomButton
                    mt="md"
                    fullWidth
                    actionType="save"
                    onClick={() => mutation.mutate()}
                    loading={mutation.isPending}
                />
            </Modal>
            <ConfirmModal disclosure={disclosureConfirrm} disclosureParentModal={disclosure} handleWhenDontSave={setDataForUpdate} />
        </>
    );
}