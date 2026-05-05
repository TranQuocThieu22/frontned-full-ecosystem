
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MyFlexColumn, MyFlexRow, MySelect, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useState } from "react";
import { IAdvisoryCouncilEstablishment } from "./interfaces/AdvisoryCouncilEstablishmentViewModel";
import AdvisoryCouncilEstablishmentTab2 from "./tab2/AdvisoryCouncilEstablishmentTab2";
import AdvisoryCouncilEstablishmentTab3 from "./tab3/AdvisoryCouncilEstablishmentTab3";

export default function AdvisoryCouncilEstablishmentButtonCreate() {
    const [activeTab, setActiveTab] = useState("Thông tin chung");


    const modalSize = activeTab === "Thông tin chung" ? "60%" : "80%";
    const form = useForm<IAdvisoryCouncilEstablishment>({
        initialValues: {
            id: 0,
            councilCode: "",
            councilName: "",
            meetingDate: "",
            meetingTime: "",
            chairman: "",
            location: "",
            secretary: "",
            memberList: "",
            registeredProposalCodes: "",
            councilStatus: "Mới tạo",
            approvalFile: "",
        },
        validate: {

        },
    });


    // list of tabs
    const tabData = [
        { label: "Thông tin chung" },
        { label: "Thành viên" },
        { label: "Danh sách đề xuất" },


    ]

    return (
        <MyButtonCreate
            modalSize={modalSize}
            title="Chi tiết hội đồng xét duyệt"
            onSubmit={() => { }}
            form={form}      >
            <MyTab tabList={tabData} onChange={(value) => setActiveTab(value || "")}>
                <Tabs.Panel value="Thông tin chung">
                    <MyFlexColumn>
                        <MyFlexRow>
                            <MyTextInput label="Mã hội đồng" flex={1} {...form.getInputProps('councilCode')} />
                            <MyDateInput label="Ngày họp dự kiến" flex={1} {...form.getInputProps('meetingDate')} />
                        </MyFlexRow>

                        <MyFlexRow>
                            <MyTextInput label="Tên hội đồng" flex={1} {...form.getInputProps('councilName')} />
                            <MyTextInput label="Thời gian họp" flex={1} {...form.getInputProps('meetingTime')} />
                        </MyFlexRow>

                        <MyFlexRow>
                            <MySelect
                                label="Trạng thái hội đồng"
                                flex={1}
                                data={[{ value: 'Đang chờ họp', label: 'Đang chờ họp' }, { value: 'Hoàn thành', label: 'Hoàn thành' }]}
                                placeholder="Chọn trạng thái"
                                {...form.getInputProps('councilStatus')}
                            />
                            <MyTextInput label="Địa điểm họp" flex={1} {...form.getInputProps('location')} />
                        </MyFlexRow>

                        <MyFlexRow>
                            <MyTextArea label="Ghi chú" flex={1} {...form.getInputProps('notes')} />
                            <MyFileInput flex={1} label="File quyết định thành lập hội đồng tư" placeholder="Chọn file" {...form.getInputProps('approvalFile')} />
                        </MyFlexRow>

                    </MyFlexColumn>


                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <AdvisoryCouncilEstablishmentTab2 />
                </Tabs.Panel>
                <Tabs.Panel value="Danh sách đề xuất">
                    <AdvisoryCouncilEstablishmentTab3 />
                </Tabs.Panel>

            </MyTab>
        </MyButtonCreate >

    );
}

