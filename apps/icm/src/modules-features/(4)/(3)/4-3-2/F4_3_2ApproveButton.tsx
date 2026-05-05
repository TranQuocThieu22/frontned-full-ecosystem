"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Button, Switch, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

interface IApproveProgessionViewModel {
    Note?: string;
    isEnabled?: string;
}

export default function F4_3_2ApproveButton(
    { data }: { data: IApproveProgessionViewModel }) {

    const disc = useDisclosure(false)
    const form = useForm<IApproveProgessionViewModel>({
        initialValues: {
            isEnabled: data.isEnabled,
            Note: data.Note
        }
    })
    return (
        <>
            <MyButtonModal
                modalSize={'xl'}
                label="Duyệt"
                title="Duyệt"
                disclosure={disc}>
                <form onSubmit={form.onSubmit((values) => {
                    // todo

                    disc[1].close()
                })}>
                    <MyFlexColumn>
                        <Switch
                            label="Duyệt"
                            {...form.getInputProps("isEnabled")}

                        ></Switch>
                        <Textarea
                            label="Đánh giá"
                            {...form.getInputProps("Note")}
                            placeholder="nhập thông tin"
                        />
                        <Button color='teal' type='submit'>Xác nhận</Button>
                    </MyFlexColumn>
                </form>
            </MyButtonModal>
        </>
    )
}

