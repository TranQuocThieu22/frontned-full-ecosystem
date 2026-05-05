import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import MyFlexRow from "@/components/Layouts/FlexRow/MyFlexRow";
import { rem, Tabs, Text, TextInput } from "@mantine/core";
import { IconArticle, IconPresentationAnalytics, IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import F_thfkexfuki_EventFlow from "../F_thfkexfuki_Tab_EventFlow";
import F_thfkexfuki_EventFlow_Prototype from "./F_thfkexfuki_EventFlow_Prototype";
import F_thfkexfuki_generalInfor from "./F_thfkexfuki_generalInfor_Prototype";

// thfkexfuki

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState("");
    return (
        <TextInput
            placeholder="Tìm kiếm..."
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            rightSection={<IconSearch size={16} style={{ cursor: "pointer" }} onClick={() => onSearch(query)} />}
        />
    );
}

export default function F_thfkexfuki_Read_Prototype() {
    const query = useQuery<I_userData[]>({
        queryKey: [`F_thfkexfuki_Read_userData`],
        queryFn: async () => userData
    })
    const [activeTab, setActiveTab] = useState<string | null>("generalInfor")
    const iconStyle = { width: rem(14), height: rem(14) }
    if (query.isLoading) { return "Đang tải dữ liệu!" }

    if (query.isError) { return "Lỗi khi tải dữ liệu!" }
    return (
        <MyFlexColumn>
            <MyFlexRow>
                <Text><strong>Chọn học viên : </strong></Text>
                <SearchBar onSearch={(query) => console.log("Tìm kiếm:", query)} />
                <Text size="xl">Đã học <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>
                    {theChosenOne.learningCourses}
                </strong> khoá, hoàn thành <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>
                        {theChosenOne.paidFee}
                    </strong> học phí, lệ phí, đạt được <strong style={{ color: 'var(--mantine-color-teal-text)', fontSize: '25px' }}>
                        {theChosenOne.certificate}
                    </strong> chứng chỉ, chứng nhận.
                </Text>

            </MyFlexRow>

            <Tabs
                radius={0}
                value={activeTab}
                onChange={setActiveTab}
            >
                <Tabs.List grow justify="space-between">
                    <Tabs.Tab
                        bg={"rgba(131, 204, 235, 0.3)"}
                        color="rgba(131, 204, 235, 1)"
                        value="generalInfor"
                        leftSection={<IconPresentationAnalytics style={iconStyle} />}
                        style={{ padding: "10px" }} // Fixed width
                    >
                        Thông tin tổng quan
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={"rgba(247, 216, 54, 0.3)"}
                        color="rgba(247, 216, 54, 1)"
                        value="eventFlow"
                        leftSection={<IconArticle style={iconStyle} />}
                        style={{ padding: "10px" }} // Thu nhỏ chiều rộng, chữ và padding
                    >
                        <div>Dòng sự kiện</div>
                    </Tabs.Tab>

                </Tabs.List>
                <Tabs.Panel value="generalInfor">
                    <F_thfkexfuki_generalInfor data={theChosenOne} />
                </Tabs.Panel>
                <Tabs.Panel value="eventFlow">
                    <F_thfkexfuki_EventFlow />
                    <F_thfkexfuki_EventFlow_Prototype data={theChosenOne} />
                </Tabs.Panel>

            </Tabs>
        </MyFlexColumn>


    )
}



export interface I_userData {
    id?: number,
    studentCode?: string,

    dob?: Date,
    learningCourses?: number,
    paidFee?: number,
    certificate?: number,
    examNumber?: number,
    fullName?: string;

    gender?: string;
    phoneNumber?: string;
    email?: string;
    cccd?: string;
    feedbackNumber?: number;
    unit?: string,
}


const userData: I_userData[] = [
    {
        id: 1,
        studentCode: 'HV001',
        fullName: 'Tô Ngọc Lâm',
        dob: new Date('2020-01-01'),
        learningCourses: 7,
        paidFee: 7865000,
        certificate: 2,
        examNumber: 5,
        gender: "Nam",
        phoneNumber: "08179853517",
        email: "lamlongla@gmail.com",
        cccd: "081798535178657",
        feedbackNumber: 57,
        unit: 'đ'
    }
]

const theChosenOne: I_userData = {
    id: 1,
    studentCode: 'HV001',
    fullName: 'Tô Ngọc Lâm',
    dob: new Date('2020-01-01'),
    learningCourses: 7,
    paidFee: 7865000,
    certificate: 2,
    examNumber: 5,
    gender: "Nam",
    phoneNumber: "08179853517",
    email: "lamlongla@gmail.com",
    cccd: "081798535178657",
    feedbackNumber: 57,
    unit: 'đ'
}
