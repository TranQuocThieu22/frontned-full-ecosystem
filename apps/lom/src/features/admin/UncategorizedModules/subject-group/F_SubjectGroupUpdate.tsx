"use client"
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface IUpdateSubjectGroup {
    code?: string; // Mã nhóm môn học
    name?: string; // Tên nhóm môn học
    note?: string; // Ghi chú
}

export default function F_SubjectGroupUpdate({ data }: { data: IUpdateSubjectGroup }) {
    const form = useForm<IUpdateSubjectGroup>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống'
        }
    });

    useEffect(() => {
        form.setValues({ ...data });
    }, [data]);

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={async (values) => {
                    await baseAxios.post(`/COESubjectGroup/Update`, { ...values });
                }}
            >
                <MyTextInput disabled label="Mã nhóm môn học" {...form.getInputProps("code")} />
                <MyTextInput label="Tên nhóm môn học" {...form.getInputProps("name")} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyActionIconUpdate>
        </Group>
    );
}