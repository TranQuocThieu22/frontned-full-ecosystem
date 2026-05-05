
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { InputWrapper, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { MyActionIconModal, MyCheckbox, MyFlexColumn, MyFlexRow, MyTab, MyTextInput } from "aq-fe-framework/components";
import { MyRichTextEditor } from "aq-fe-framework/core";
import { useState } from "react";
import { IScientificResearchTopicRegistrationAnnouncement } from "./interfaces/ScientificResearchTopicRegistrationAnnouncementViewModel";
import ScientificResearchTopicRegistrationAnnouncementTab2 from "./tab2/ScientificResearchTopicRegistrationAnnouncementTab2";

export default function ScientificResearchTopicRegistrationAnnouncementButtonViewDetails({
    values,
}: {
    values: IScientificResearchTopicRegistrationAnnouncement;
}) {
    const [activeTab, setActiveTab] = useState("Thông tin chung");
    const dis = useDisclosure(false);

    const modalSize = activeTab === "Thông tin chung" ? "60%" : "80%";
    const form = useForm<IScientificResearchTopicRegistrationAnnouncement>({
        initialValues: values,
        validate: {

        },
    });

    // list of tabs
    const tabData = [
        { label: "Thông tin chung" },
        { label: "Danh sách người nhận" },


    ]

    return (
        <MyActionIconModal
            icon={<IconEye />}
            modalSize={modalSize}
            title="Chi tiết thông báo"
            onSubmit={() => { }} disclosure={dis}
        >
            <MyTab tabList={tabData} onChange={(value) => setActiveTab(value || "")}>
                <Tabs.Panel value="Thông tin chung">
                    <MyFlexColumn>
                        <MyTextInput label="Tiêu đề thông báo" {...form.getInputProps('notificationTitle')} />
                        <InputWrapper label="Nội dung chính">
                            <MyRichTextEditor  {...form.getInputProps('mainContent')} />
                        </InputWrapper>
                        <MyFlexRow >
                            <MyTextInput label="Đối tượng áp dụng" flex={1} />
                            <MyDateInput label="Ngày ban hành" flex={1} {...form.getInputProps('issueDate')} />
                        </MyFlexRow>
                        <MyFlexRow >
                            <MyFileInput flex={1} label="Đính kèm file minh chứng" placeholder="Chọn file minh chứng" />
                            <MyDateInput flex={1} label="Ngày bắt đầu nhận đề xuất" {...form.getInputProps('proposalStartDate')} />
                        </MyFlexRow>
                        <MyFlexRow >
                            <MyCheckbox flex={1} label="Gửi thông báo" {...form.getInputProps('hasNotificationSent')} checked={form.values.hasNotificationSent} />
                            <MyDateInput flex={1} label="Ngày kết thúc nhận đề xuất"  {...form.getInputProps('proposalEndDate')} />
                        </MyFlexRow>
                    </MyFlexColumn>

                </Tabs.Panel>
                <Tabs.Panel value="Danh sách người nhận">
                    <ScientificResearchTopicRegistrationAnnouncementTab2 />
                </Tabs.Panel>

            </MyTab>
        </MyActionIconModal >

    );
}

