'use client';

import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';

export interface I_drcwtvzsom_Create {
    maNganHang?: string; // Mã ngân hàng
    tenNganHang?: string; // Tên ngân hàng
    tenNganHangEg?: string; // Tên ngân hàng english
    ghiChu?: string; // Ghi chú

}

export default function F_drcwtvzsom_Create() {
    const form = useForm<I_drcwtvzsom_Create>({
        initialValues: {
            maNganHang: '',
            tenNganHang: '',
            tenNganHangEg: '',
            ghiChu: '',
        },
        validate: {
            maNganHang: (value) => (!value ? 'Mã ngân hàng không được để trống' : null),
            tenNganHang: (value) => (!value ? 'Tên ngân hàng không được để trống' : null),
            tenNganHangEg: (value) => (!value ? 'Tên ngân hàng english không được để trống' : null),

        },
    });

    return (
        <MyButtonCreate  modalSize={"40%"} form={form} onSubmit={() => { }} objectName='Chi tiết ngân hàng'>
            <MyTextInput
                label='Mã ngân hàng'
                placeholder='Nhập mã ngân hàng'
                {...form.getInputProps('maNganHang')}

            />
            <MyTextInput
                label='Tên ngân hàng'
                placeholder='Nhập tên ngân hàng'
                {...form.getInputProps('tenNganHang')}
            />
            <MyTextInput
                label='Tên ngân hàng Eg'
                placeholder='Nhập tên ngân hàng english'
                {...form.getInputProps('tenNganHangEg')}
            />
            <MyTextArea
                label='Ghi chú'
                placeholder='Nhập ghi chú'
                {...form.getInputProps('ghiChu')}
            />
        </MyButtonCreate>
    );
}
