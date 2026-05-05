
import { reviewCommitteeService } from "@/shared/APIs/reviewCommitteeService";
import { SRMProposalMember } from "@/shared/interfaces/SRMProposalMember";
import { CustomActionIcon } from "@aq-fe/core-ui/shared/components/button/CustomActionIcon/CustomActionIcon";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Box, LoadingOverlay, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconExclamationCircle, IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "../../reviewCommitteeSetup/ComponentShared/ConfirmModal";
import { cloneItemsTranform } from "../ArrayHelper/arrayHelper";
import GeneralInfoFormOld, { GenralInfoFormHandle } from "./GeneralInfoFormOld";
import ReviewMemberTableOld from "./ReviewMemberTableOld";

interface Props {
    reviewProposalId?: number,
    loading?: boolean
}

export default function ReviewCommitteeMeettingUpdateButtonOld({ reviewProposalId, loading }: Props) {
    const disclosure = useDisclosure();
    const queryClient = useQueryClient();
    const generalInfoFormRef = useRef<GenralInfoFormHandle>(null);
    const [memberList, setMemberList] = useState<SRMProposalMember[]>([]);
    const disclosureConfirrm = useDisclosure();
    const hasChange = useRef<boolean>(false);

    const infoReviewProposalQuery = useCustomReactQuery({
        queryKey: ['info_review_proposal', reviewProposalId],
        axiosFn: async () => reviewCommitteeService.getSRMProposalMemberByReviewProposal({ SRMReviewProposalId: reviewProposalId }),
        options: {
            enabled: false,
            refetchOnWindowFocus: false,
        }
    })

    const criteriaQuery = useCustomReactQuery({
        queryKey: ['criteria_list', reviewProposalId],
        axiosFn: () => reviewCommitteeService.getSRMCriteriaByReviewProposal({ SRMReviewProposalId: reviewProposalId }),
        options: {
            refetchOnWindowFocus: false,
            enabled: disclosure[0] && infoReviewProposalQuery.isFetched
        }
    })

    const setDataTabMember = () => {
        if (!infoReviewProposalQuery.data) return;
        setMemberList(infoReviewProposalQuery.data.srmProposalMembers || []);
    }

    useEffect(() => {
        setDataTabMember();
    }, [infoReviewProposalQuery.data])

    const mutationUpdateGeneralInfo = useMutation({
        mutationFn: () => {
            const data = generalInfoFormRef.current?.getValues();
            return reviewCommitteeService.updateSRMReviewProposal(data);
        },
        onSuccess: () => { } // đè onSuccess được set mặc định
    });

    const mutationUpdateMembers = useMutation({
        mutationFn: () => {
            const membersReviewed = cloneItemsTranform(memberList, item => ({
                ...item,
                user: undefined,
                srmTitle: undefined,
                id: item.id === 0 ? undefined : item.id,
                srmConclusion: undefined,
                srmReviewProposal: undefined,
                srmMemberCriterias: item.srmMemberCriterias?.map(item => {
                    item.srmCriteria = undefined;
                    return item;
                })
            }),
                undefined,
                item => item.isEnabled === true
            );
            return reviewCommitteeService.updateSRMProposalMember(membersReviewed);
        },
        onSuccess: () => { } // đè onSuccess được set mặc định
    });

    const handleSave = async () => {
        try {
            const [resGeneral, resMembers] = await Promise.all([
                mutationUpdateGeneralInfo.mutateAsync(),
                mutationUpdateMembers.mutateAsync(),
            ]);

            const successGeneral = resGeneral.data?.isSuccess === 1;
            const successMembers = resMembers.data?.isSuccess === 1;

            // Cả 2 thành công -> thông báo chung
            if (successGeneral && successMembers) {
                queryClient.invalidateQueries({ queryKey: ['review_proposal_list'] });
                disclosure[1].close();
                hasChange.current = false;
                notifications.show({ message: "Cập nhật thành công", color: "green" });
                return;
            }

            // Có lỗi từng cái -> thông báo riêng
            if (!successGeneral) {
                notifications.show({
                    message: resGeneral.data?.message ?? "Cập nhật thông tin chung thất bại",
                    color: "red",
                });
            } else {
                notifications.show({
                    message: "Cập nhật thông tin chung thành công",
                    color: "green",
                });
                queryClient.invalidateQueries({ queryKey: ['review_proposal_list'] });
            }

            if (!successMembers) {
                notifications.show({
                    message: resMembers.data?.message ?? "Cập nhật thông tin nhận xét của thành viên thất bại",
                    color: "red",
                });
            } else {
                notifications.show({
                    message: "Cập nhật thông tin nhận xét của thành viên thành công",
                    color: "green",
                });
            }
        } catch (err: any) {
            notifications.show({
                color: "red",
                autoClose: 3000,
                title: "Đã xảy ra lỗi",
                message: err?.message ?? "Lỗi không xác định",
            });
        }
    };

    return (
        <>
            <CustomActionIcon
                actionType="update"
                loading={loading}
                onClick={() => {
                    disclosure[1].open();
                    infoReviewProposalQuery.refetch();
                }}
            />
            <Modal
                size="100%"
                title="Chi tiết nhận xét của hội đồng tư vấn"
                opened={disclosure[0]}
                onClose={() => {
                    hasChange.current || generalInfoFormRef.current?.isDirty() ? disclosureConfirrm[1].open() : disclosure[1].close();
                }}
            >
                <Box pos="relative">
                    <LoadingOverlay
                        visible={(infoReviewProposalQuery.isFetching || criteriaQuery.isFetching) && !(infoReviewProposalQuery.isError || criteriaQuery.isError)}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 2 }}
                    />
                    <LoadingOverlay
                        visible={infoReviewProposalQuery.isError || criteriaQuery.isError}
                        zIndex={1000}
                        loaderProps={{
                            children: <Text c='red' fw={500} fz='h3'>
                                <IconExclamationCircle style={{ width: "30px", height: "30px" }} /> Lỗi tải dữ liệu
                            </Text>
                        }}
                    />
                    <CustomTabs
                        tabs={[
                            {
                                label: "Thông tin chung",
                                leftSection: <IconInfoCircle size={16} />,
                                children: (
                                    <GeneralInfoFormOld ref={generalInfoFormRef} values={infoReviewProposalQuery.data} />
                                )
                            },
                            {
                                label: "Thành viên",
                                leftSection: <IconUsers size={16} />,
                                children: (
                                    <ReviewMemberTableOld
                                        memberList={memberList}
                                        criteriaList={criteriaQuery.data || []}
                                        srmReviewCommitteeId={infoReviewProposalQuery.data?.srmReviewCommitteeId}
                                        proposalCode={infoReviewProposalQuery.data?.code}
                                        hasChange={hasChange}
                                    />
                                )
                            }
                        ]}
                    />
                    <CustomButton
                        mt="md"
                        fullWidth
                        actionType="save"
                        onClick={() => {
                            handleSave();
                        }}
                        loading={mutationUpdateGeneralInfo.isPending || mutationUpdateMembers.isPending}
                    />
                </Box>
            </Modal >
            <ConfirmModal
                disclosure={disclosureConfirrm}
                disclosureParentModal={disclosure}
                handleWhenDontSave={() => {
                    hasChange.current = false;
                }}
            />
        </>
    );
}
