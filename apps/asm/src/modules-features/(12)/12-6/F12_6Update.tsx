'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface I_F12_6Update {
    unitCode?: string; // Mã đơn vị
    unitName?: string; // Tên đơn vị
    unitType?: string; // Loại đơn vị
    affiliated?: string; // Trực thuộc
    note?: string; // Ghi chú
}

export default function F12_6Update({data}:{data:I_F12_6Update}) {
    const form = useForm<I_F12_6Update>({
        initialValues: data
    });

    

    return (
        <MyActionIconUpdate form={form} onSubmit={() => {}} >
            <MyTextInput label='Mã đơn vị' {...form.getInputProps("unitCode")} />
            <MyTextInput label='Tên đơn vị' {...form.getInputProps("unitName")} />
            <MySelect data={['Khoa','Bộ môn','Phòng','Trung tâm']} label='Loại đơn vị' {...form.getInputProps("unitType")} />
            <MySelect data={['Khoa Công nghệ thông tin','Khoa kinh tế']} label='Trực thuộc'  {...form.getInputProps("affiliated")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>
    );
}
