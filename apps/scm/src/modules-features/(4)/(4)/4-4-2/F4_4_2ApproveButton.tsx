"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Button, Switch, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

interface IApproveProgessionViewModel {
    ratingNote?: string;
    isEnabled?: string;
}

export default function F4_3_2ApproveButton(
    { data }: { data: IApproveProgessionViewModel }) {

    const disc = useDisclosure(false)
    const form = useForm<IApproveProgessionViewModel>({
        initialValues: {
            isEnabled: data.isEnabled,
            ratingNote: data.ratingNote
        }
    })
    return (
        <>
            <MyButtonModal
                modalSize={'xl'}
                label="Duyệt"
                title="Phê duyệt đăng ký"
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
                            {...form.getInputProps("ratingNote")}
                            placeholder="nhập thông tin"
                        />
                        <Button color='teal' type='submit'>Xác nhận</Button>
                    </MyFlexColumn>
                </form>
            </MyButtonModal>
        </>
    )
}

