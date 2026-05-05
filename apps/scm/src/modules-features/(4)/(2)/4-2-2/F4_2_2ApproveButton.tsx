import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Button, Switch, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
interface ICreateUserViewModel {
    isEnabled?: string;
    Note?: string

}
export default function F4_2_2ApproveButton({ data }: { data: ICreateUserViewModel }) {

    const disc = useDisclosure(false)
    const form = useForm<ICreateUserViewModel>({
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
                title="Phê duyệt đăng ký"
                disclosure={disc}>
                <form onSubmit={form.onSubmit((values) => {
                    // todo

                    disc[1].close()
                })}>
                    <MyFlexColumn>
                        <Switch
                            label="Duyệt / Không duyệt"
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
