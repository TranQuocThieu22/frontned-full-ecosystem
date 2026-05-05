"use client"
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { I_ngv9nvudz2_LoaiThoiGian } from './F_ngv9nvudz2_Read';

export default function F_ngv9nvudz2_Update({ data }: { data: I_ngv9nvudz2_LoaiThoiGian }) {
    const form = useForm<I_ngv9nvudz2_LoaiThoiGian>({
        initialValues: data,
        validate: {
            maThoiGian: (value) => value ? null : 'Không được để trống',
            tenThoiGian: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={() => { }}
            >
                <MyTextInput label='Mã thời gian' {...form.getInputProps("maThoiGian")} />
                <MyTextInput label='Tên thời gian' {...form.getInputProps("tenThoiGian")} />
                <MyNumberInput label='Sáng' min={0} hideControls {...form.getInputProps("sang")} />
                <MyNumberInput label='Chiều' min={0} hideControls {...form.getInputProps("chieu")} />
                <MyNumberInput label='Tối' min={0} hideControls {...form.getInputProps("toi")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyActionIconUpdate>
        </Group>
    );
}