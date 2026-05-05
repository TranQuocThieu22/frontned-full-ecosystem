'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyDateInput from '@/components/Inputs/DateInput/MyDateInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import { useForm } from '@mantine/form';


interface I {
    id?: number;
    ngay?: string;
    ghiChu?: string;
}
export default function F_rrpuknsaqr_Create() {
    const form = useForm<I>({
        initialValues: {
            ngay: '',
            ghiChu: ''
        },
    })

    return (
        <MyButtonCreate form={form} onSubmit={() => { }} objectName='Chi tiết ngày nghỉ lễ'>
            <MyDateInput label='Ngày' {...form.getInputProps("ngay")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />

        </MyButtonCreate>
    )
}


