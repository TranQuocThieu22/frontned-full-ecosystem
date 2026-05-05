'use client';

import MySelect from "@/components/Combobox/Select/MySelect";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";

import { MyButtonModal } from "@/components/Buttons/ButtonModal/MyButtonModal";
import MyTextEditor from "@/components/Inputs/TextEditor/MyTextEditor";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

interface I7_3_1SentAnnouncement {
    subject?: string;
    receiver?: string
    content?: string;
    file?: string
}

export default function F7_3_1CreateAnnouncement() {
    const disc = useDisclosure(false)
    const form = useForm<I7_3_1SentAnnouncement>({
        initialValues: {
        },
    });

    return (
        <MyButtonModal
            label="Gửi mail thông báo"
            modalSize={"100%"}
            title="Thông báo yêu cầu báo cáo tiến độ thực hiện đề tài nghiên cứu kho"
            onSubmit={() => {
            }}
            disclosure={disc}  >

            <MyTextInput
                label="Tiêu đề thông báo:"
                {...form.getInputProps('subject')} />
            <MySelect
                multiple
                data={['thieutran@gmail.com', 'tien@gmail.com']}
                label="Danh sách người nhận:"
                placeholder="Danh sách đối tượng cần thông báo"
                {...form.getInputProps('receiver')}
            />
            <MyTextEditor
                label="Nội dung thông báo:"
                {...form.getInputProps('content')}
            />

            <MyFileInput
                label="Đính kèm file minh chứng:"
                {...form.getInputProps('file')}
                placeholder="Chọn file"
            />
            <Button
                onClick={() => {
                    disc[1].close();
                    notifications.show({
                        message: "Gửi thông báo thành công",
                    });
                }}>
                Gửi thông báo
            </Button>
        </MyButtonModal>
    );
}
