'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MySelect from "@/components/Combobox/Select/MySelect";
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyNumberInput from "@/components/Inputs/NumberInput/MyNumberInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { I6_2_3_2EvaluationFormResearch } from "./F6_2_3_2ReadEvaluationFormResearchGroup";


export default function F6_2_3_2CreateEvaluationFormResearch() {
    const form = useForm<I6_2_3_2EvaluationFormResearch>({
        initialValues: {
            code: "",
            topicName: "",
            groupName: "",
            leaderName: "",
            reviewer: "",
            dateReview: "",
            point: 0,
            comment: ""
        }
    });

    return (
        <MyButtonCreate objectName="Phiếu chấm điểm đánh giá đề cương/thuyết minh đề tài nghiên cứu" form={form} onSubmit={() => { }} modalSize={"100%"}>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MySelect
                    label="Đề tài"
                    placeholder="Chọn đề tài đã có thuyết minh"
                    data={['Đề tài 1', 'Đề tài 2']}
                    style={{ width: "50%" }}
                />
                <TextInput
                    label="Tên nhóm nghiên cứu"
                    defaultValue="Nhóm A KHTN"
                    style={{ width: "50%" }}
                />
            </Flex>
            <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
            >
                <MySelect
                    label="Họ tên người đánh giá"
                    placeholder="Chọn thành viên trong hội đồng đánh giá"
                    data={['Nguyễn Văn A', 'Trần Văn B']}
                    style={{ width: "50%" }}
                />
                <MyDateInput label="Ngày đánh giá" style={{ width: "50%" }} />
            </Flex>
            <MyNumberInput label='Tổng điểm' />
            <MyTextArea
                label="Nhận xét"
                placeholder="Nhập nhận xét"
                style={{ width: "100%" }}
            />
            <MyTextArea label='Ý kiến khác' />
            <MyFileInput
                label="File đánh giá"
                style={{ width: "100%" }}
            />
        </MyButtonCreate>
    );
}
