'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface I_F12_6Create {
    unitCode?: string; // Mã đơn vị
    unitName?: string; // Tên đơn vị
    unitType?: string; // Loại đơn vị
    affiliated?: string; // Trực thuộc
    note?: string; // Ghi chú
}

export default function F12_6Create() {
    const form = useForm<I_F12_6Create>({
        initialValues: {
            unitCode: '', // Mã đơn vị
            unitName: '', // Tên đơn vị
            unitType: 'Khoa', // Loại đơn vị
            affiliated: 'Khoa Công nghệ thông tin', // Trực thuộc
            note: '', // Ghi chú
        },
    });

    

    return (
        <MyButtonCreate form={form} onSubmit={() => {}} objectName='Chi tiết đơn vị'>
            <MyTextInput label='Mã đơn vị' {...form.getInputProps("unitCode")} />
            <MyTextInput label='Tên đơn vị' {...form.getInputProps("unitName")} />
            <MySelect data={['Khoa','Bộ môn','Phòng','Trung tâm']} label='Loại đơn vị' {...form.getInputProps("unitType")} />
            <MySelect data={['Khoa Công nghệ thông tin','Khoa kinh tế']} label='Trực thuộc'  {...form.getInputProps("affiliated")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    );
}
