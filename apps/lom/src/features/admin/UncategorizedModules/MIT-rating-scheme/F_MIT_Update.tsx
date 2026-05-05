"use client"
import MyActionIconUpdate from '@/components/ui/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextArea from '@/components/ui/Inputs/TextArea/MyTextArea';
import MyTextInput from '@/components/ui/Inputs/TextInput/MyTextInput';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { Group } from '@mantine/core';
import { useForm } from '@mantine/form';

interface IUpdateMIT {
    id: number;
    code: string;
    name: string;
    concurrencyStamp: string;
    isEnabled: boolean;
    knowledge?: string;
    skill?: string;
    autonomy?: string;
    description?: string;
}

export default function F_MIT_Update({ data }: { data: IUpdateMIT }) {
    const form = useForm<IUpdateMIT>({
        initialValues: data,
        validate: {
            name: (value) => value ? null : 'Không được để trống',
            code: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <Group>
            <MyActionIconUpdate
                form={form}
                onSubmit={async () => {
                    await baseAxios.post("COEMITScale/Update", form.values)
                }}
            >
                <MyTextInput label="Mức độ" {...form.getInputProps("code")} />
                <MyTextInput label="Mô tả" {...form.getInputProps("description")} />
                <MyTextArea label="Kiến thức" {...form.getInputProps("knowledge")} />
                <MyTextArea label="Kỹ năng" {...form.getInputProps("skill")} />
                <MyTextArea label="Tự chủ" {...form.getInputProps("autonomy")} />
            </MyActionIconUpdate>
        </Group>
    );
}