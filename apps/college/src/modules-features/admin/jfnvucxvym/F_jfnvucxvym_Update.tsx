'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { I_jfnvucxvym } from './F_jfnvucxvym_Read';




export default function F_jfnvucxvym_Update({ data }: { data: I_jfnvucxvym }) {
    const form = useForm<I_jfnvucxvym>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} modalSize={"50%"} onSubmit={() => { }} >
            <MyTextInput
                disabled
                label="Mã tính chất"
                placeholder="Nhập mã tính chất"
                {...form.getInputProps("code")}
            />
            <MyTextInput
                label="Tên tính chất"
                placeholder="Nhập tên tính chất"
                {...form.getInputProps("name")}
            />
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />

        </MyActionIconUpdate>
    )
}


