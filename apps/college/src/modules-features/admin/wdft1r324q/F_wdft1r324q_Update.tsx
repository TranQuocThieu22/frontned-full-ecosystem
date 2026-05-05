'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { I_wdft1r324q } from './F_wdft1r324q_Create';




export default function F_wdft1r324q_Update({ data }: { data: I_wdft1r324q }) {
    const form = useForm<I_wdft1r324q>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            {/* Form Fields */}
            <MyTextInput
                label="Mã số sinh viên"
                placeholder="Nhập mã số sinh viên"
                {...form.getInputProps("studentId")}
            />

            <MyTextInput
                label="Mã chứng chỉ"
                placeholder="Nhập Mã chứng chỉ"
                {...form.getInputProps("certificate")}
            />

            <MyTextInput
                label="Số văn bằng"
                placeholder="Nhập số văn bằng"
                {...form.getInputProps("diplomaNumber")}
            />

            <MyTextInput
                label="Ngày cấp"
                placeholder="Nhập Ngày cấp"
                {...form.getInputProps("issueDate")}
            />

            <MyTextInput
                label="Ngày hết hạn"
                placeholder="Nhập ngày hết hạn "
                {...form.getInputProps("expiryDate")}
            />

            <MyTextInput
                label="Số nộp"
                placeholder="Nhập nộp"
                {...form.getInputProps("submissionDate")}
            />

            <MyTextInput
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps("note")}
            />

        </MyActionIconUpdate>
    )
}


