'use client'
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MySelect from '@/components/Combobox/Select/MySelect';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import MyCheckbox from '@/components/Checkbox/MyCheckbox';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

interface I_F_kuqexcsxep_Create {
    id?: number; // STT
    unitCode?: string; // Mã nhóm thu VL
    unitName?: string; // Tên nhóm thu VL
    unitInvoice?: string; // Mẫu hóa đơn
    unitInvoiceSign?: string; // Ký hiệu hóa đơn
    note?: string; // Ghi chú
}

interface F_kuqexcsxep_CreateProps {
    onSubmit: (values: I_F_kuqexcsxep_Create) => void;
}

export default function F_kuqexcsxep_Create({ onSubmit }: F_kuqexcsxep_CreateProps) {

    const form = useForm<I_F_kuqexcsxep_Create>({
        initialValues: {
            unitCode: '', // Mã nhóm thu VL
            unitName: '', // Tên nhóm thu VL
            unitInvoice: '', // Mẫu hóa đơn
            unitInvoiceSign: '', // Ký hiệu hóa đơn
            note: '', // Ghi chú
        },
    });

    return (
        <MyButtonCreate form={form} onSubmit={() => onSubmit(form.values)}
         title='Tạo chi tiết Danh mục nhóm thu VL mới' >
            <MyTextInput label='Mã nhóm thu VL *' {...form.getInputProps("unitCode")} />
            <MyTextInput label='Tên nhóm thu VL *' {...form.getInputProps("unitName")} />
            <MyTextInput label='Mẫu hóa đơn' {...form.getInputProps("unitInvoice")} />
            <MyTextInput label='Ký hiệu hóa đơn' {...form.getInputProps("unitInvoiceSign")} />
            <MyTextInput label='Ghi chú' {...form.getInputProps("note")} />
        </MyButtonCreate>
    );
}
