'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Fieldset } from '@mantine/core';
import { useForm } from '@mantine/form';

// Interface dữ liệu
export interface I_w0d4wkrvnn_sample {
    id?: number;
    tieude: string;
    noidung: string;

}


export default function F_w0d4wkrvnn_Create() {
    const form = useForm<I_w0d4wkrvnn_sample>({
        initialValues: {
            tieude: "",
            noidung: "",
        },
        validate: {},
    });

    return (
        <Fieldset>
            <MyTextInput label='Tiêu đề thông báo' {...form.getInputProps('tieude')}/>
            <MyTextArea label='Nội dung thông báo' {...form.getInputProps('noidung')} />
        </Fieldset>
    );
}
