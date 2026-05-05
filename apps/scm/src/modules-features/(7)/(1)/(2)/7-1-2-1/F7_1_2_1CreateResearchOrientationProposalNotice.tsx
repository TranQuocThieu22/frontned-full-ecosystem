'use client'
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { useForm } from "@mantine/form";

import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { Button, Fieldset } from "@mantine/core";
import { I7_1_2_1ResearchOrientationProposalNotice } from "./F7_1_2_1ReadProposalRegistrationNoticeList";

export default function F7_1_2_1CreateResearchOrientationProposalNotice() {
    const form = useForm<I7_1_2_1ResearchOrientationProposalNotice>({
        initialValues: {
            id: 0,
            sendDate: "",
            notificationTitle: ""
        }
    })
    return (

        <Fieldset legend="Thông báo đăng ký đề xuất định hướng">
            <form>
                <MyFlexColumn>
                    <MyTextInput label="Tiêu đề thông báo" />
                    <MyTextInput label="Danh sách người nhận" />
                    <MyTextArea label="Nội dung thông báo " />
                    <MyFileInput label="Đính kèm File minh chứng" />
                    <Button variant="filled">Gửi thông báo</Button>
                </MyFlexColumn>
            </form>
        </Fieldset>


    )
}

