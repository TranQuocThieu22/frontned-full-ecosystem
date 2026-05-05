
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyCheckbox, MyDateInput, MyFlexColumn, MyFlexRow, MyTab, MyTextInput } from "aq-fe-framework/components";
import { MyRichTextEditor } from "aq-fe-framework/core";
import { useState } from "react";
import { IScientificResearchTopicRegistrationAnnouncement } from "./interfaces/ScientificResearchTopicRegistrationAnnouncementViewModel";
import ScientificResearchTopicRegistrationAnnouncementTab2 from "./tab2/ScientificResearchTopicRegistrationAnnouncementTab2";

export default function ScientificResearchTopicRegistrationAnnouncementButtonCreate() {
    const [activeTab, setActiveTab] = useState("Thông tin chung");


    const modalSize = activeTab === "Thông tin chung" ? "60%" : "80%";
    const form = useForm<IScientificResearchTopicRegistrationAnnouncement>({
        initialValues: {
            id: 0,
            notificationCode: "",
            notificationTitle: "",
            mainContent: "",
            attachmentFile: "",
            issueDate: "",
            proposalStartDate: "",
            proposalEndDate: "",
            hasNotificationSent: false,
        },
        validate: {

            // councilCode: (value: string) =>
            //     value.trim().length > 0 ? null : "Mã hội đồng thẩm định không được để trống",


            // councilName: (value: string) =>
            //     value.trim().length > 0 ? null : "Tên hội đồng thẩm định không được để trống",


            // expectedStartDate: (value: string) =>
            //     value.trim().length > 0 ? null : "Ngày bắt đầu thẩm định không được để trống",


            // expectedEndDate: (value: string, values: IScientificResearchTopicRegistrationAnnouncement) => {
            //     if (value.trim().length === 0) {
            //         return "Ngày kết thúc thẩm định không được để trống";
            //     }

            //     const startDate = new Date(values.expectedStartDate);
            //     const endDate = new Date(value);

            //     if (startDate && endDate < startDate) {
            //         return "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu";
            //     }
            //     return null;
            // },

            // chairman: (value: string) =>
            //     value.trim().length > 0 ? null : "Chủ tịch hội đồng không được để trống",


            // secretary: (value: string) =>
            //     value.trim().length > 0 ? null : "Thư ký hội đồng không được để trống",


            // appraisalMembers: (value: string) =>
            //     value.trim().length > 0 ? null : "Danh sách ủy viên thẩm định không được để trống",


            // textbooksForAppraisal: (value: string) =>
            //     value.trim().length > 0 ? null : "Bài giảng được phân công thẩm định không được để trống",

            // councilStatus: (value: string) =>
            //     value.trim().length > 0 ? null : "Trạng thái hội đồng thẩm định không được để trống",
        },
    });


    // list of tabs
    const tabData = [
        { label: "Thông tin chung" },
        { label: "Danh sách người nhận" },


    ]

    return (
        <MyButtonCreate
            modalSize={modalSize}
            title="Chi tiết thông báo"
            onSubmit={() => { }}
            form={form}      >
            <MyTab tabList={tabData} onChange={(value) => setActiveTab(value || "")}>
                <Tabs.Panel value="Thông tin chung">
                    <MyFlexColumn>
                        <MyTextInput label="Tiêu đề thông báo" {...form.getInputProps('notificationTitle')} />
                        <MyRichTextEditor />
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
        </MyButtonCreate >

    );
}

