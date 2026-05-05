"use client";

import { SRMTopic } from "@/shared/interfaces/SRMTopic";
import { CustomButtonModal } from "@aq-fe/core-ui/shared/components/button/CustomButtonModal/CustomButtonModal";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFileDescription, IconInfoCircle, IconUsers } from "@tabler/icons-react";
import { useEffect } from "react";
import GeneralInfoForm from "./TabGeneralInfo/GeneralInfoForm";
import TopicMemberTable from "./TabMember/TopicMemberTable";

interface Props {
    topic?: SRMTopic,
    loading?: boolean
}

export default function SubmitMissionReportDetailButton({ topic, loading }: Props) {
    const disclosure = useDisclosure();

    useEffect(() => {
        if (topic) {
            topic.attachmentDetail ??= {}
            topic.attachmentDetail.fileName = topic.attachmentPath?.split("/").at(-1) || "";
        }
    }, [topic]);

    return (
        <>
            <CustomButtonModal
                modalProps={{
                    size: "100%",
                    title: "Sửa hội đồng xét duyệt"
                }}
                buttonProps={{
                    children: "Xem chi tiết",
                    variant: "outline",
                    leftSection: <IconFileDescription />,
                    loading: loading
                }}
                disclosure={disclosure}
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
                        <GeneralInfoForm values={topic} readonly={true} />

                    </Tabs.Panel>

                    <Tabs.Panel value="members" mih="65vh">
                        <TopicMemberTable
                            memberList={topic?.srmTopicMembers || []}
                            readonly={true}
                            setTopicMemberList={() => { }}
                        />
                    </Tabs.Panel>
                </Tabs>
            </CustomButtonModal>
        </>
    );
}