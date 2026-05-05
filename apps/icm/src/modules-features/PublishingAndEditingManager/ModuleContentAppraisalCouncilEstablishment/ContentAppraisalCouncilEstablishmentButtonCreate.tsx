
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyButtonCreate, MyDateInput, MyFlexRow, MySelect, MyTab, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useMemo, useState } from "react";
import { sampleData } from "./ContentAppraisalCouncilEstablishmentTable";
import { IContentAppraisalCouncilEstablishment } from "./interface/ContentAppraisalCouncilEstablishmentViewModel";
import ContentAppraisalCouncilEstablishmentTab2 from "./tab2/ContentAppraisalCouncilEstablishmentTab2";
import ContentAppraisalCouncilEstablishmentTab3 from "./tab3/ContentAppraisalCouncilEstablishmentTab3";

export default function ContentAppraisalCouncilEstablishmentButtonCreate() {
    const [activeTab, setActiveTab] = useState("Thông tin chung");


    const modalSize = activeTab === "Thông tin chung" ? "50%" : "80%";
    const form = useForm<IContentAppraisalCouncilEstablishment>({
        initialValues: {
            id: 0,
            councilCode: "",
            councilName: "",
            expectedStartDate: "",
            expectedEndDate: "",
            chairman: "",
            secretary: "",
            appraisalMembers: "",
            textbooksForAppraisal: "",
            councilStatus: ""
        },
        validate: {

            councilCode: (value: string) =>
                value.trim().length > 0 ? null : "Mã hội đồng thẩm định không được để trống",


            councilName: (value: string) =>
                value.trim().length > 0 ? null : "Tên hội đồng thẩm định không được để trống",


            expectedStartDate: (value: string) =>
                value.trim().length > 0 ? null : "Ngày bắt đầu thẩm định không được để trống",


            expectedEndDate: (value: string, values: IContentAppraisalCouncilEstablishment) => {
                if (value.trim().length === 0) {
                    return "Ngày kết thúc thẩm định không được để trống";
                }

                const startDate = new Date(values.expectedStartDate);
                const endDate = new Date(value);

                if (startDate && endDate < startDate) {
                    return "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu";
                }
                return null;
            },

            chairman: (value: string) =>
                value.trim().length > 0 ? null : "Chủ tịch hội đồng không được để trống",


            secretary: (value: string) =>
                value.trim().length > 0 ? null : "Thư ký hội đồng không được để trống",


            appraisalMembers: (value: string) =>
                value.trim().length > 0 ? null : "Danh sách ủy viên thẩm định không được để trống",


            textbooksForAppraisal: (value: string) =>
                value.trim().length > 0 ? null : "Bài giảng được phân công thẩm định không được để trống",

            councilStatus: (value: string) =>
                value.trim().length > 0 ? null : "Trạng thái hội đồng thẩm định không được để trống",
        },
    });

    //filter state
    const stateOptions = useMemo(() => {
        const state = Array.from(new Set(sampleData.map(item => item.councilStatus)));
        return state.map(chosenState => ({ value: chosenState as string, label: chosenState as string }));
    }, [sampleData])
    // list of tabs
    const tabData = [
        { label: "Thông tin chung" },
        { label: "Thành viên" },
        { label: "Danh sách bài giảng" },

    ]

    return (
        <MyButtonCreate
            modalSize={modalSize}
            title="Chi tiết hội đồng thẩm định"
            onSubmit={() => { }}
            form={form}      >
            <MyTab tabList={tabData} onChange={(value) => setActiveTab(value || "")}>
                <Tabs.Panel value="Thông tin chung">
                    <MyFlexRow>
                        <MyTextInput flex={1} label="Mã hội đồng thẩm định" {...form.getInputProps("councilCode")} />
                        <MyTextInput flex={1} label="Tên hội đồng thẩm định" {...form.getInputProps("councilName")} />
                    </MyFlexRow>
                    <MyFlexRow>
                        <MyDateInput flex={1} label="Ngày bắt đầu thẩm định" {...form.getInputProps("expectedStartDate")} />
                        <MyDateInput flex={1} label="Ngày kết thúc thẩm định" {...form.getInputProps("expectedEndDate")} />
                    </MyFlexRow>
                    <MyFlexRow>
                        <MyDateInput flex={1} label="Ngày họp" {...form.getInputProps("")} />
                        <MyTextInput flex={1} label="Địa điểm họp" {...form.getInputProps("")} />
                    </MyFlexRow>
                    <MyFlexRow>
                        <MySelect flex={1} data={stateOptions} label="Trạng thái hội đồng thẩm định" {...form.getInputProps("councilStatus")} />
                        <MyFileInput flex={1} label="Đính kèm file" />
                    </MyFlexRow>

                    <MyTextArea flex={1} label="Ghi chú"{...form.getInputProps("conclusionProposal")}></MyTextArea>
                    <MyTextArea flex={1} label="Mục tiêu thẩm định"{...form.getInputProps("detailedExpertComments")}></MyTextArea>
                </Tabs.Panel>
                <Tabs.Panel value="Thành viên">
                    <ContentAppraisalCouncilEstablishmentTab2 />
                </Tabs.Panel>
                <Tabs.Panel value="Danh sách bài giảng">
                    <ContentAppraisalCouncilEstablishmentTab3 />
                </Tabs.Panel>
            </MyTab>
        </MyButtonCreate >

    );
}

