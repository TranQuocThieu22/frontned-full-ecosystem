'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import { showNotification } from '@mantine/notifications';
import { SimpleGrid } from '@mantine/core';

interface I_F_kuqexcsxep_Update {
    unitCode?: string; // Mã đơn vị
    unitName?: string; // Tên đơn vị
    unitType?: string; // Loại đơn vị
    affiliated?: string; // Trực thuộc
    note?: string; // Ghi chú
}

export default function F_kuqexcsxep_Update({ data }: { data: I_F_kuqexcsxep_Update }) {
    const form = useForm<I_F_kuqexcsxep_Update>({
        initialValues: data
    });

    return (
        <MyActionIconUpdate  form={form} title='Chi tiết Danh mục nhóm thu VL' onSubmit={() => { }} >
            <MyTextInput disabled={true} label='Mã nhóm thu VL *' {...form.getInputProps("unitCode")} />
            <MyTextInput label='Tên nhóm thu VL *' {...form.getInputProps("unitName")} />
            <MyTextInput label='Mẫu hóa đơn' {...form.getInputProps("unitInvoice")} />
            <MyTextInput label='Ký hiệu hóa đơn' {...form.getInputProps("unitInvoiceSign")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
        </MyActionIconUpdate>
    );
}
