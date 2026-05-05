'use client'
import { MyButton } from '@/components/Buttons/Button/MyButton';
import MyButtonCreate from '@/components/Buttons/ButtonCRUD/MyButtonCreate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';

interface I_F_jpsfdbcmfp_Create {
    id?: number; // STT
    unitCode?: string; // Mã đợt xét
    unitName?: string; // Tên đợt xét
    unitDecisionNo?: string; // Số quyết định
    unitSignedDate?: Date; // Ngày kí
}

interface F_jpsfdbcmfp_CreateProps {
    onSubmit: (values: I_F_jpsfdbcmfp_Create) => void;
}

export default function F_jpsfdbcmfp_Create({ onSubmit }: F_jpsfdbcmfp_CreateProps) {
    const [value, setValue] = useState(new Date());

    const form = useForm<I_F_jpsfdbcmfp_Create>({
        initialValues: {
            unitCode: '', // Mã đợt xét
            unitName: '', // Tên đợt xét
            unitDecisionNo: '', // Số quyết định
            unitSignedDate: new Date(), // Ngày kí
        },
    });

    return (
        <MyButtonCreate submitButton={<MyButton type="submit" crudType="create" color="green" />}
            title='Chi tiết đợt xét' form={form} onSubmit={() => onSubmit(form.values)} objectName='Chi tiết loại tài sản' >
            <MyTextInput label='Mã đợt xét *' {...form.getInputProps("unitCode")} />
            <MyTextInput label='Tên đợt xét *' {...form.getInputProps("unitName")} />
            <MyTextInput label='Số quyết định' {...form.getInputProps("unitDecisionNo")} />
            <DateInput
                label="Ngày kí"
                {...form.getInputProps("unitSignedDate")}
                value={value}
                onChange={(date) => setValue(new Date(date!))}
                rightSection={<IconCalendar size={16} />}
                popoverProps={{ withinPortal: true, position: 'bottom-end' }}
            />
        </MyButtonCreate>
    );
}
