'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { I6_3_1_2MemberScorecard } from "./F6_3_1_2ReadMemberScorecard";

export default function F6_3_1_2UpdateMemberScorecard({ values }: { values: I6_3_1_2MemberScorecard }) {
    const form = useForm<I6_3_1_2MemberScorecard>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }}>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}

            >
                <MySelect label="Đề tài" data={['Chọn đề tài nhóm nghiên cứu đã duyệt đề cương']} />
                <TextInput label="Tên nhóm nghiên cứu" defaultValue="Nhóm A KHTN" />
            </Flex>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}

            >
                <MySelect label="Họ tên người đánh giá" data={['Chọn thành viên trong hội đồng đánh giá']} />
                <MyDateInput label="Ngày đánh giá" />
            </Flex>
            <MyNumberInput label="Tổng điểm" />
            <MyTextArea label="Nhận xét" />
            <MyFileInput label="File đánh giá" />
        </MyActionIconUpdate>
    )
}
