'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { I6_3_1_2MemberScorecard } from "./F6_3_1_2ReadMemberScorecard";

export default function F6_3_1_2CreateMemberScorecard() {
    const form = useForm<I6_3_1_2MemberScorecard>({
        initialValues: {
            code: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            reviewer: "",
            evaluationDate: "",
            totalPoint: 0,
            comment: ""
        }
    })
    return (
        <MyButtonCreate objectName="Phiếu chấm điểm đề tài nghiên cứu khoa học cấp trường" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}

            >
                <MySelect label="Đề tài" placeholder='Chọn đề tài nhóm nghiên cứu đã duyệt đề cương' data={['Chọn đề tài nhóm nghiên cứu đã duyệt đề cương']} style={{ width: "50%" }} />
                <TextInput label="Tên nhóm nghiên cứu" defaultValue="Nhóm A KHTN" style={{ width: "50%" }} />
            </Flex>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}

            >
                <MySelect label="Họ tên người đánh giá" placeholder='Chọn thành viên trong hội đồng đánh giá' data={['Chọn thành viên trong hội đồng đánh giá']} style={{ width: "50%" }} />
                <MyDateInput label="Ngày đánh giá" style={{ width: "50%" }} />
            </Flex>
            <MyNumberInput label="Tổng điểm" placeholder='' />
            <MyTextArea label="Nhận xét" placeholder='' />
            <MyFileInput label="File đánh giá" />
        </MyButtonCreate>
    )
}
