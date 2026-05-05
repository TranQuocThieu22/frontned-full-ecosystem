'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { I_sviddivwkl } from './F_sviddivwkl_Read';




export default function F_sviddivwkl_Update({ data }: { data: I_sviddivwkl }) {
    const form = useForm<I_sviddivwkl>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput disabled
                label="Mã diện chính sách"
                placeholder="Nhập mã diện chính sách"
                {...form.getInputProps("policyCode")}
            />

            <MyTextInput
                label="Tên diện chính sách"
                placeholder="Nhập tên diện chính sách"
                {...form.getInputProps("policyName")}
            />

            <MyTextInput
                label="Tên diện chính sách Eg"
                placeholder="Nhập tên diện chính sách Eg"
                {...form.getInputProps("policyNameEg")}
            />

            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />
        </MyActionIconUpdate>
    )
}


