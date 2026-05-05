"use client";

import { topicService } from "@/shared/APIs/topicService";
import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { SRMTopicMember } from "@/shared/interfaces/SRMTopicMember";
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
import TopicMemberTable from "./TabMember/TopicMemberTable";

interface Props {
    topic?: SRMTopic,
    disclosure: UseDisclosureReturnValue
}

export default function SubmitMissionReportUpdateButton({ topic, disclosure }: Props) {
    const generalTabRef = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient();
    const disclosureConfirrm = useDisclosure();
    const hasChange = useRef<boolean>(false);
    const generalInfoFormRef = useRef<GenralInfoFormHandle>(null);
    const [topicMemberList, setTopicMemberList] = useState<SRMTopicMember[]>([]);
    const topicMemberDisableList = useRef<SRMTopicMember[]>([]);

    const setDataForUpdate = () => {
        if (!topic) return;
        topicMemberDisableList.current.length = 0;
        hasChange.current = false;
        topic.attachmentDetail ??= {}
        topic.attachmentDetail.fileName = topic.attachmentPath?.split("/").at(-1) || "";
        setTopicMemberList(structuredClone(topic.srmTopicMembers ?? []))
    }

    useEffect(() => {
        setDataForUpdate();
    }, [topic]);

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
            data.srmTopicMembers = cloneItemsTranform(topicMemberList, (item) => { item.user = undefined; return item }, topicMemberDisableList.current);
            data.academicYear = undefined;
            data.srmArea = undefined;
            data.srmType = undefined;
            return await topicService.update(data);
        },
        onSuccess: (response) => {
            if (response.data.isSuccess === 0) {
                notifications.show({
                    color: "red",
                    title: "Dữ liệu chưa được lưu",
                    message: "Lỗi bất định",
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ['topic_list'] });
                disclosure[1].close();
                notifications.show({
                    color: "green",
                    message: "Cập nhật hội đồng thành công",
                });
                generalInfoFormRef.current?.resetForm();
                setTopicMemberList([]);
                topicMemberDisableList.current.length = 0;
                hasChange.current = false;
            }
        },
        onError: (error) => {
            if (error.message === "ValidationFailedTabGeneral") {
                generalTabRef.current?.click();
                return;
            }
            notifications.show({
                color: "red",
                message: "Lỗi bất định",
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
                    </Tabs.List>

                    <Tabs.Panel value="general" mih="65vh">
                        <GeneralInfoForm ref={generalInfoFormRef} values={topic} />
                    </Tabs.Panel>

                    <Tabs.Panel value="members" mih="65vh">
                        <TopicMemberTable
                            memberList={topicMemberList}
                            setTopicMemberList={setTopicMemberList}
                            hasChange={hasChange}
                            memberDisableList={topicMemberDisableList}
                            topicCode={topic?.code}
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