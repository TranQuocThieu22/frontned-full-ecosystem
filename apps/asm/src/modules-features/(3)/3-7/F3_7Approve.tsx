'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyCheckbox from "@/components/Checkbox/MyCheckbox";
import MyTextArea from "@/components/Inputs/TextArea/MyTextArea";
import { Button, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";

interface I {
    id?: number,
    hopLe?: boolean,
    nhanXet?: string,
    guiMailThongBao?: boolean
}


export default function F3_7Approve() {
    const form = useForm<I>({
        initialValues: {
            id: undefined,
            hopLe: false,
            nhanXet: "",
            guiMailThongBao: false
        }
    })

    return (
        <MyButtonCreate
            modalSize={"lg"}
            successNotification={"Lưu thành công"}
            label="Phê duyệt"
            title="Chi tiết kiểm tra yêu cầu mua sắm"
            submitButton={<Button type="submit">Lưu</Button>}
            leftSection={undefined} form={form}
            onSubmit={() => {

            }}>
            <Switch label="Duyệt" {...form.getInputProps("hopLe")} />
            <MyTextArea label="Nội dung" {...form.getInputProps("nhanXet")} />
            <MyFileInput label="Upload minh chứng" {...form.getInputProps("file")} />
            <MyCheckbox label="Gửi mail thông báo" {...form.getInputProps("guiMailThongBao")} />
        </MyButtonCreate>
    )
}
