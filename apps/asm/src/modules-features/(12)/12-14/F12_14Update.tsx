'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import { showNotification } from '@mantine/notifications';
import { SimpleGrid } from '@mantine/core';

interface I_F12_6Update {
    unitCode?: string; // Mã đơn vị
    unitName?: string; // Tên đơn vị
    unitType?: string; // Loại đơn vị
    affiliated?: string; // Trực thuộc
    note?: string; // Ghi chú
}

export default function F12_14Update({ data }: { data: I_F12_6Update }) {
    const form = useForm<I_F12_6Update>({
        initialValues: data
    });



    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <SimpleGrid cols={{ base: 1, md: 2, xl: 2 }}>
                <MyTextInput label='Mã loại công cụ *' {...form.getInputProps("unitCode")} />
                <MyTextInput label='Tên loại công cụ *' {...form.getInputProps("unitName")} />
                <MySelect data={['Máy văn phòng']} label='Thuộc loại'  {...form.getInputProps("unitType")} />
                <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
            </SimpleGrid>
            <MyCheckbox label='Sử dụng' {...form.getInputProps("isUsed", { type: 'checkbox' })} />
        </MyActionIconUpdate>
    );
}
