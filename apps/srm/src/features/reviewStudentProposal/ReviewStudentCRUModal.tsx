"use client";

import { proposalApprovalService } from "@/shared/APIs/proposalApprovalService";
import { SRMApprovedProposal } from "@/shared/interfaces/SRMApprovedProposal";
import { SRMProposalApproval } from "@/shared/interfaces/SRMProposalApproval";
import { CustomButton } from "@aq-fe/core-ui/shared/components/button/CustomButton/CustomButton";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconInfoCircle, IconList } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import ConfirmModal from "../reviewCommitteeSetup/ComponentShared/ConfirmModal";
import { useArrayRef } from "../reviewCommitteeSetup/hooks/useArrayRef";
import GeneralInfoForm, { GenralInfoFormHandle } from "./TabGeneralInfo/GeneralInfoForm";
import ProposalTable from "./TabProposal/ProposalTable";

interface Props {
    values?: SRMProposalApproval
    disclosure: any
    readOnly?: boolean
}

export default function ReviewStudentCRUModal({ values, disclosure, readOnly }: Props) {
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient();
    const disclosureConfirrm = useDisclosure();
    const hasChange = useRef<boolean>(false);

    // Ref form general info
    const generalInfoFormRef = useRef<GenralInfoFormHandle>(null);

    // Data hội đồng
    const approvedProposalList = useArrayRef<SRMApprovedProposal>();
    const approvedProposalDisableList = useRef<SRMApprovedProposal[]>([]);

    function resetAllData() {
        generalInfoFormRef.current?.resetForm();
        approvedProposalList.clear();
        approvedProposalDisableList.current.length = 0;
        hasChange.current = false;
    }

    const setData = () => {
        if (!values) {
            resetAllData();
            return;
        };
        hasChange.current = false;
        approvedProposalList.setItems(values.srmApprovedProposals ?? [])
    }

    useEffect(() => {
        setData();
    }, [values]);

    const mutation = useMutation({
        mutationFn: () => {
            // validate form tab general
            const validateResult = generalInfoFormRef.current?.validate();
            const dataBody = generalInfoFormRef.current?.getValues();
            if (validateResult?.hasErrors || !dataBody) {
                throw new Error("ValidationFailedTabGeneral");
            }

            dataBody.srmApprovedProposals = approvedProposalList
                .cloneItemsTranform((item) => {
                    item.srmTaskProposal = undefined;
                    return item
                }, approvedProposalDisableList.current);

            if (!values) {
                return proposalApprovalService.create(dataBody);
            }
            return proposalApprovalService.update(dataBody);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                const dataError = (response.data.data as any);
                if (dataError.Code) {
                    generalInfoFormRef.current?.setErrors({ code: dataError.Code });
                    throw new Error("ValidationFailedTabGeneral");
                } else {
                    notifications.show({
                        color: "red",
                        title: "Lỗi",
                        message: response.data.message,
                    });
                }
            } else {
                queryClient.invalidateQueries({ queryKey: ['student_proposal_list'] });
                disclosure[1].close();
                notifications.show({
                    color: "green",
                    message: values ? "Cập nhật hội đồng thành công" : "Thêm hội đồng thành công",
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
                title="Chi tiết quyết định phê duyệt danh mục đề xuất"
                opened={disclosure[0]}
                onClose={() => {
                    hasChange.current || generalInfoFormRef.current?.isDirty() ? disclosureConfirrm[1].open() : disclosure[1].close()
                }}
            >
                <CustomTabs
                    tabs={[
                        {
                            label: 'Thông tin chung',
                            leftSection: <IconInfoCircle size={16} />,
                            ref: generalTabRef,
                            children: <GeneralInfoForm ref={generalInfoFormRef} values={values} readOnly={readOnly} />
                        },
                        {
                            label: 'Danh sách đề xuất',
                            leftSection: <IconList size={16} />,
                            children: <ProposalTable
                                hasChange={hasChange}
                                approvedProposalList={approvedProposalList}
                                approvedProposalDisableList={approvedProposalDisableList}
                                decisionCode={values?.code}
                                readOnly={readOnly}
                            />
                        },
                    ]}
                    defaultValue="Thông tin chung"
                />
                {!readOnly
                    ? <CustomButton
                        mt="md"
                        fullWidth
                        actionType="save"
                        onClick={() => mutation.mutate()}
                        loading={mutation.isPending}
                    />
                    : <></>
                }
            </Modal>
            <ConfirmModal disclosure={disclosureConfirrm} disclosureParentModal={disclosure} handleWhenDontSave={setData} />
        </>
    );
}