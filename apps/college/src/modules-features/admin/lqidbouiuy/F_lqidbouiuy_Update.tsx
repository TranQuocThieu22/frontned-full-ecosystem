'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Select } from '@mantine/core';
import { useForm } from '@mantine/form';
export interface I {
    id?: number; // STT
    roomCode?: string; // Mã phòng
    name?: string //Tên phòng
    nameEg?: string //Tên phòng
    branch?: string//chi nhánh
    building?: string//dãy nhà

    sucChuaHoc?: number //sức chứa học sinh
    sucChuaThi?: number//sức chứa người thi
    tinhChatPhong?: string// tính chất phòng
    dienTich?: number// diện tích
    ghiChu?: string
}

export default function F_lqidbouiuy_Update({ doituong }: { doituong: I }) {
    const form = useForm<I>({
        initialValues: doituong
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled label='Mã lý do' {...form.getInputProps("roomCode")} readOnly />
            <MyTextInput label='Tên phòng' {...form.getInputProps("name")} />
            <MyTextInput label='Tên phòng Eg' {...form.getInputProps("nameEg")} />
            <Select
                label="Chi nhánh"
                data={[
                    { value: "1", label: "Thủ Đức" },
                    { value: "2", label: "Bình Dương" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("branch", value?.toString())} />
            <Select
                label="Dãy"
                data={[
                    { value: "1", label: "Dãy 01 Thủ Đức" },
                    { value: "2", label: "Dãy 02 Bình Dương" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("building", value?.toString())} />
            <MyTextInput label='Sức chứa học' {...form.getInputProps("sucChuaHoc")} />
            <MyTextInput label='Sức chứa thi' {...form.getInputProps("sucChuaThi")} />
            <Select
                label="Tính chất"
                data={[
                    { value: "1", label: "Vi tính" },
                    { value: "2", label: "Thí nghiệm" },
                ]}
                defaultValue={1?.toString()}
                onChange={(value) => form.setFieldValue("tinhChatPhong", value?.toString())} />
            <MyTextInput label='Diện tích' {...form.getInputProps("dienTich")} />

            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyActionIconUpdate>
    )
}