"use client"
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import MyTextInput from '@/components/Inputs/TextInput/MyTextInput';
import { Switch } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';

interface ICreateUserViewModel {
    rate?: string;
    isEnabled?: string;

}

export default function F4_2_3LockButton(
    { data }: { data: ICreateUserViewModel }) {
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            isEnabled: "",
            rate: ""
        }
    })
    return (
        <>
            <MyActionIconUpdate title='Mở khóa'
                form={form}
                icon={<IconLock />}
                onSubmit={() => { }}
            >
                <Switch label="Mở khóa"></Switch>
                <MyTextInput label="Ghi chú" />
            </MyActionIconUpdate>
        </>
    )
}

