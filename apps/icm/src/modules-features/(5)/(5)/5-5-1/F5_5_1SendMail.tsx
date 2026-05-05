import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Button, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { I } from './F5_5_1ReadListOfResearchTopics';
export default function SendMail() {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm<I>({
        initialValues: {
            id: 0,
            maDeTai: "",
            tenDeTai: "",
            chuNhiem: "",
            soDienThoaiChuNhiem: "",
            thoiGianBatDau: new Date("2023-01-01"),
            thoiGianKetThuc: new Date("2024-01-01"),
            kinhPhi: 0,
            trangThai: "",
            denNgayBaoCao: "",
            trangThaiThucHien: "",
        }
    })
    return (
        <>
            <Modal opened={opened} onClose={close} title="Thông báo yêu cầu báo cáo tiến độ thực hiện đề tài nghiên cứu khoa học" centered>
                <MyTextInput label="Tiêu đề thông báo" />
                <MyTextInput label="Danh sách người nhận" placeholder="Danh sách đối tượng cần thông báo" />
                <MyTextArea label="Nội dung thông báo" />
                <MyFileInput label="Nội dung thông báo" />
            </Modal>

            <Button variant="default" color="indigo" onClick={open}>
                Gửi mail thông báo
            </Button>
        </>
    )
}