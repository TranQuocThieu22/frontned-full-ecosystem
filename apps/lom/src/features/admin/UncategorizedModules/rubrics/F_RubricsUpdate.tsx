"use client"
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyNumberInput from '@/components/ui/Inputs/NumberInput/MyNumberInput';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Checkbox, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

interface I_RubricsUpdate {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    nameEg: string;
    point: number;
    isStorage: boolean;
    note: string;
    order?: number | null;
    isFailed?: boolean | null;
}

export default function F_RubricsUpdate({ data }: { data: I_RubricsUpdate }) {
    const form = useForm<I_RubricsUpdate>({
        initialValues: data,
        validate: {
            // id:(value)=>value ? null : 'Không được để trống', 
            name: (value) => value ? null : 'Không được để trống',
            order: (value) => value ? null : 'Không được để trống',
            point: (value) => value ? null : 'Không được để trống',
        }
    });
    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
    }, [data]);

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={async (values) => {
                    // console.log("Cập nhập thành công: ", form.values);
                    return await baseAxios.post("/COERubricsMethod/Update", values);
                    // baseAxios.post("rubric", form.values)
                }}
            >
                <MyTextInput label="Thứ tự" {...form.getInputProps("order")} />
                <MyTextInput label="Mức đánh giá" {...form.getInputProps("name")} />
                <MyTextInput label="Mức đánh giá (Eg)" {...form.getInputProps("nameEg")} />
                <MyNumberInput min={0} step={0.1} label="Điểm >= " {...form.getInputProps("point")} />
                <Checkbox label="Không đạt" {...form.getInputProps("isFailed", { type: 'checkbox' })} />
                <Textarea label="Ghi chú" {...form.getInputProps("note")} />
            </MyActionIconUpdate>
        </Group>
    );
}
