"use client";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn";
import { ActionIcon, ActionIconProps, Button, Modal, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMail } from "@tabler/icons-react";
import { useState } from "react";


interface IActionIconMail extends ActionIconProps {
    modalSize?: string;
}

export default function F6_4_1SendMailResearchTopicLookup({ modalSize = "70%", ...rest }: IActionIconMail) {
    const disc = useDisclosure(false);
    const fullScreen = useState(false);
    const hSize = useState("50vh");
    return (
        <>
            <Tooltip label="Gửi mail thông báo" >
                <ActionIcon color="cyan" onClick={disc[1].open} {...rest}>
                    <IconMail size={25} color="blue" />
                </ActionIcon>
            </Tooltip>

            <Modal
                fullScreen={fullScreen[0]}
                opened={disc[0]}
                onClose={disc[1].close}
                size={modalSize}
                title={
                    <Text>Thông báo yêu cầu báo cáo tiến độ thực hiện đề tài nghiên cứu khoa học Nhóm nghiên cứu</Text>
                }>
                <MyFlexColumn>
                    <MyTextInput label="Tiêu đề thông báo" />
                    <MyTextInput label="Danh sách người nhận" />
                    <MyTextArea label="Nội dung thông báo" />
                    <MyFileInput label="Đính kèm file minh chứng" />
                    <Button>Gửi thông báo</Button>
                </MyFlexColumn>

            </Modal>


        </>
    );
}
