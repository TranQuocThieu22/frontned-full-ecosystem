'use client';

import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export interface I_bvtcrhafda_Create {
    maDanToc?: string // mã dân tộc
    tenDanToc?: string // tên dân tộc
    thuTu?: number // thứ tự
    ghiChu?: string // ghi chú
}

export default function F_bvtcrhafda_Create() {
    const form = useForm<I_bvtcrhafda_Create>({
        initialValues: {
            maDanToc: '',
            tenDanToc: '',
            thuTu: undefined,
            ghiChu: '',
        },
        validate: {
            maDanToc: (value) => (value ? null : 'Mã dân tộc bắt buộc nhập'),
            tenDanToc: (value) => (value ? null : 'Tên dân tộc bắt buộc nhập'),
            thuTu: (value) => (value ? null : 'Thứ tự bắt buộc nhập'),
        },
    });

    return (
        <MyButtonCreate modalSize={"40%"} form={form} onSubmit={() => { }} objectName='chi tiết dân tộc'>
            <MyTextInput
                label="Mã dân tộc"
                placeholder="Nhập mã dân tộc"
                {...form.getInputProps('maDanToc')}
            />
            <MyTextInput
                label="Tên dân tộc"
                placeholder="Nhập tên dân tộc"
                {...form.getInputProps('tenDanToc')}
            />
            <NumberInput
                label="Thứ tự"
                min={1}
                placeholder="Nhập thứ tự"
                {...form.getInputProps('thuTu')}
            />
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('ghiChu')}
            />
        </MyButtonCreate>
    );
}
