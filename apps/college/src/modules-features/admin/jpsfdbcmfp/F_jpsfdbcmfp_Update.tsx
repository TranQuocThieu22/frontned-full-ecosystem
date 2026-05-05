'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import { useState } from 'react';

interface I_F_jpsfdbcmfp_Update {
    id?: number; // STT
    unitCode?: string; // Mã đợt xét
    unitName?: string; // Tên đợt xét
    unitDecisionNo?: string; // Số quyết định
    unitSignedDate?: string; // Ngày kí
}

export default function F_jpsfdbcmfp_Update({ data }: { data: I_F_jpsfdbcmfp_Update }) {
    const [value, setValue] = useState(new Date());

    const form = useForm<I_F_jpsfdbcmfp_Update>({
        initialValues: data
    });



    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} title="Chi tiết đợt xét" >
            <MyTextInput label='Mã đợt xét *' disabled={true} {...form.getInputProps("unitCode")} />
            <MyTextInput label='Tên đợt xét *' {...form.getInputProps("unitName")} />
            <MyTextInput label='Số quyết định' {...form.getInputProps("unitDecisionNo")} />
            <DateInput
                label="Ngày kí"
                {...form.getInputProps("unitSignedDate")}
                value={form.values.unitSignedDate}
                onChange={(date) => {
                    if (date !== null) {
                        form.setFieldValue("unitSignedDate", date);
                    }
                }}
                rightSection={<IconCalendar size={16} />}
                popoverProps={{ withinPortal: true, position: 'bottom-end' }}
            />
        </MyActionIconUpdate>
    );
}
