'use client'
import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconBook, IconBook2, IconCertificate, IconInfoCircle, IconUsers, IconUsersGroup } from "@tabler/icons-react";
import { MyActionIconModal } from "aq-fe-framework/components";
import { IRegisterPublicationRead } from "../RegisterPublicationRead";
import BookInfoForm from "./BookInfoForm";
import ExternalMembersTable from "./ExternalMembersTable";
import GeneralInfoForm from "./GeneralInfoForm";
import InternalMembersTable from "./InternalMembersTable";
import JournalForm from "./JournalForm";
import PatentForm from "./PatentForm";

export default function PublicationUpdateModal({ values }: { values: IRegisterPublicationRead }) {
    const disclosure = useDisclosure();
    const form = useForm<IRegisterPublicationRead>({
        initialValues: values
    });

    return (
        <MyActionIconModal title="Chi tiết công bố" modalSize="90%" crudType="update" disclosure={disclosure}  >

            <Tabs defaultValue="general">
                <Tabs.List>
                    <Tabs.Tab
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
                        value="internal"
                        flex={1}
                        leftSection={<IconUsers />}
                    >
                        Thành viên nội bộ
                    </Tabs.Tab>

                    <Tabs.Tab
                        bg="rgba(112, 219, 186, 0.3)"
                        color="rgba(112, 219, 186, 1)"
                        value="external"
                        flex={1}
                        leftSection={<IconUsersGroup />}
                    >
                        Thành viên bên ngoài
                    </Tabs.Tab>

                    <Tabs.Tab
                        bg="rgba(248, 177, 149, 0.3)"
                        color="rgba(248, 177, 149, 1)"
                        value="journal"
                        flex={1}
                        leftSection={<IconBook />}
                    >
                        Tạp chí/ Nhà xuất bản
                    </Tabs.Tab>

                    <Tabs.Tab
                        bg="rgba(255, 163, 200, 0.3)"
                        color="rgba(255, 163, 200, 1)"
                        value="patent"
                        flex={1}
                        leftSection={<IconCertificate />}
                    >
                        Bằng sáng chế
                    </Tabs.Tab>

                    <Tabs.Tab
                        bg="rgba(166, 151, 239, 0.3)"
                        color="rgba(166, 151, 239, 1)"
                        value="book"
                        flex={1}
                        leftSection={<IconBook2 />}
                    >
                        Thông tin sách/giáo trình
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="general" pt="md">
                    <GeneralInfoForm form={form} values={values} />
                </Tabs.Panel>
                <Tabs.Panel value="internal" pt="md" >
                    <InternalMembersTable />
                </Tabs.Panel>
                <Tabs.Panel value="external" pt="md">
                    <ExternalMembersTable />
                </Tabs.Panel>
                <Tabs.Panel value="journal" pt="md">
                    <JournalForm />
                </Tabs.Panel>
                <Tabs.Panel value="patent" pt="md">
                    <PatentForm />
                </Tabs.Panel>
                <Tabs.Panel value="book" pt="md">
                    <BookInfoForm />
                </Tabs.Panel>
            </Tabs>
        </MyActionIconModal >
    );
}
