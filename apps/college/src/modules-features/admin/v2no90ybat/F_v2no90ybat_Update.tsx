'use client'
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { useForm } from '@mantine/form';


interface I_v2no90ybat {
    sothutu?: number; // STT
    makhoi?: string; // Mã khối
    tenkhoi?: string; // Tên khối
    tenkhoiEg?: string; // Tên hồ sơ Eg
    ghiChu?: string; // Ghi chú
}

export default function F_v2no90ybat_Update({ data }: { data: I_v2no90ybat }) {
    const form = useForm<I_v2no90ybat>({
        initialValues: data
    })

    return (
        <MyActionIconUpdate form={form} onSubmit={() => { }} >
            <MyTextInput
                disabled
                label="Mã khối"
                placeholder="Nhập mã khối"
                {...form.getInputProps('makhoi')}
            />
            <MyTextInput
                label="Tên khối"
                placeholder="Nhập tên khối"
                {...form.getInputProps('tenkhoi')}
            />
            <MyTextInput
                label="Tên khối Eg"
                placeholder="Nhập tên khối Eg"
                {...form.getInputProps('tenkhoiEg')}
            />
            <MyTextArea
                label="Ghi chú"
                placeholder="Nhập ghi chú"
                {...form.getInputProps('ghiChu')}
            />

        </MyActionIconUpdate>
    )
}


