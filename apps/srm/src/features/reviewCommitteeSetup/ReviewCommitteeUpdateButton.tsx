"use client";

import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import { SRMReviewCommittee } from "@/shared/interfaces/SRMReviewCommittee";
import { SRMReviewMember } from "@/shared/interfaces/SRMReviewMember";
import { SRMReviewProposal } from "@/shared/interfaces/SRMReviewProposal";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { Modal, Tabs } from "@mantine/core";
import { useDisclosure, UseDisclosureReturnValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconList, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import ConfirmModal from "./ComponentShared/ConfirmModal";
import { useArrayRef } from "./hooks/useArrayRef";
import GeneralInfoForm, { GenralInfoFormHandle } from "./TabGeneralInfo/GeneralInfoForm";
import ReviewMemberTable from "./TabMember/ReviewMemberTable";
import ReviewProposalTable from "./TabProposal/ReviewProposalTable";

interface Props {
    reviewCommittee?: SRMReviewCommittee,
    disclosure: UseDisclosureReturnValue
}

export default function ReviewCommitteeUpdateButton({ reviewCommittee, disclosure }: Props) {
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient();
    const disclosureConfirrm = useDisclosure();
    const hasChange = useRef<boolean>(false);

    // Ref form general info
    const generalInfoFormRef = useRef<GenralInfoFormHandle>(null);

    // Data hội đồng
    const reviewMemberList = useArrayRef<SRMReviewMember>();
    const reviewProposalList = useArrayRef<SRMReviewProposal>();
    const reviewMemberDisableList = useRef<SRMReviewMember[]>([]);
    const proposalReviewDisableList = useRef<SRMReviewProposal[]>([]);

    function resetAllData() {
        generalInfoFormRef.current?.resetForm();
        reviewMemberList.clear();
        reviewProposalList.clear();
        reviewMemberDisableList.current.length = 0;
        proposalReviewDisableList.current.length = 0;
        hasChange.current = false;
    }

    const setDataMemberAndProposal = () => {
        if (!reviewCommittee) return;
        hasChange.current = false;
        reviewCommittee.attachmentDetail ??= {}
        reviewCommittee.attachmentDetail.fileName = reviewCommittee.attachmentPath?.split("/").at(-1) || "";
        reviewMemberList.setItems(reviewCommittee.srmReviewMembers ?? [])
        reviewProposalList.setItems(reviewCommittee.srmReviewProposals ?? [])
    }

    useEffect(() => {
        setDataMemberAndProposal();
    }, [reviewCommittee]);

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
            data.srmReviewMembers = reviewMemberList
                .cloneItemsTranform((item) => { item.user = undefined; return item }, reviewMemberDisableList.current);
            data.srmReviewProposals = reviewProposalList
                .cloneItemsTranform((item) => { item.srmTaskProposal = undefined; return item }, proposalReviewDisableList.current);
            return await reviewCommitteeService.update(data);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                notifications.show({
                    color: "red",
                    title: "Lỗi",
                    message: response.data.message,
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['review_committee_list'] });
                disclosure[1].close();
                notifications.show({
                    color: "green",
                    message: "Cập nhật hội đồng thành công",
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
                title="Sửa hội đồng xét duyệt"
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

                        <Tabs.Tab
                            value="proposals"
                            leftSection={<IconList size={16} />}
                            style={{ backgroundColor: '#e0f2f1', color: '#00695c' }}
                        >
                            Danh sách đề xuất
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general" mih="65vh">
                        <GeneralInfoForm ref={generalInfoFormRef} values={reviewCommittee} />
                    </Tabs.Panel>

                    <Tabs.Panel value="members" mih="65vh">
                        <ReviewMemberTable
                            memberList={reviewMemberList}
                            hasChange={hasChange}
                            memberDisableList={reviewMemberDisableList}
                            reviewCommitteeCode={reviewCommittee?.code}
                        />
                    </Tabs.Panel>

                    <Tabs.Panel value="proposals" mih="65vh">
                        <ReviewProposalTable
                            hasChange={hasChange}
                            proposalReviewList={reviewProposalList}
                            proposalReviewDisableList={proposalReviewDisableList}
                            reviewCommitteeCode={reviewCommittee?.code}
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
            <ConfirmModal disclosure={disclosureConfirrm} disclosureParentModal={disclosure} handleWhenDontSave={setDataMemberAndProposal} />
        </>
    );
}