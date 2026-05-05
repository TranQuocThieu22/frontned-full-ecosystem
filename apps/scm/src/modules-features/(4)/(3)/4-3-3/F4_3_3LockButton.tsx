"use client"
import MyActionIconUpdate from '@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate';
import { Button, Switch, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';

interface ICreateUserViewModel {
    Note?: string;
    isEnabled?: string;
}

export default function F4_3_3LockButton(
    { data }: { data: ICreateUserViewModel }) {
    const form = useForm<ICreateUserViewModel>({
        initialValues: {
            isEnabled: data.isEnabled,
            Note: data.Note
        }
    })
    return (
        <>
            <MyActionIconUpdate
                title='Mở khóa'
                form={form}
                icon={<IconLock />}
                modalSize={"xl"}
                onSubmit={() => { }}
                submitButton={
                    <Button color='teal' type='submit'>Xác nhận</Button>
                }
            >
                <Switch label="Mở khóa"
                    {...form.getInputProps("isEnabled")}
                ></Switch>
                <Textarea
                    label="Ghi chú"
                    {...form.getInputProps("Note")}
                    placeholder="nhập thông tin"
                />
            </MyActionIconUpdate>
        </>
    )
}

