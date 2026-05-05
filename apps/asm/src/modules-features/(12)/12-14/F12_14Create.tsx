'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface I_F12_13Create {
    id?: number; // STT
    unitCode?: string; // Mã nguồn kinh phí
    unitName?: string; // Tên nguồn kinh phí
    unitType?: string; // Thuộc loại
    isUsed?: boolean; // Sử dụng
    note?: string; // Ghi chú
}

interface F12_13CreateProps {
    onSubmit: (values: I_F12_13Create) => void;
}

export default function F12_14Create({ onSubmit }: F12_13CreateProps) {

    const form = useForm<I_F12_13Create>({
        initialValues: {
            unitCode: '', // Mã nguồn kinh phí
            unitName: '', // Tên nguồn kinh phí
            unitType: 'Máy văn phòng', // Thuộc loại
            isUsed: false, // Sử dụng
            note: '', // Ghi chú
        },
    });

    return (
        <MyButtonCreate title='Chi tiết loại tài sản' form={form} onSubmit={() => onSubmit(form.values)} objectName='Chi tiết loại tài sản' >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <MyTextInput label='Mã loại công cụ *' {...form.getInputProps("unitCode")} />
                <MyTextInput label='Tên loại công cụ *' {...form.getInputProps("unitName")} />
                <MySelect data={['Máy văn phòng']} label='Thuộc loại'  {...form.getInputProps("unitType")} />
                <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
            </div>
            <MyCheckbox label='Sử dụng' {...form.getInputProps("isUsed", { type: 'checkbox' })} />
        </MyButtonCreate>
    );
}
