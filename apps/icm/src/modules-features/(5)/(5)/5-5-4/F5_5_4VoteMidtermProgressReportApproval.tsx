'use client'

import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Button, Modal, Switch } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function F5_5_4VoteMidtermProgressReportApproval() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication" centered>
                <Switch
                    defaultChecked
                    label="Duyệt/Không duyệt"
                />
                <MyTextArea label="Nhận xét" />
                <Button>Lưu</Button>
            </Modal>

            <Button onClick={open}>Duyệt/Không duyệt</Button>
        </>

    )
}