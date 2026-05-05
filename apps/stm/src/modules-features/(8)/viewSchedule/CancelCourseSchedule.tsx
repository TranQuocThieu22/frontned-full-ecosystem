"use client"
import { MyButtonModal } from '@/components/Buttons/ButtonModal/MyButtonModal';
import MyFlexColumn from '@/components/Layouts/FlexColumn/MyFlexColumn';
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';


export default function CancelCourseSchedule(
    { courseScheduleId }: { courseScheduleId: number }
) {

    const disc = useDisclosure(false)
    const form = useForm({
        initialValues: {
            // isEnabled: data.isEnabled,
            // Note: data.Note
        }
    })
    return (
        <>
            <MyButtonModal
                variant='light'
                color='red'
                label="Hủy"
                title="Hủy lịch học"
                disclosure={disc}>
                <form onSubmit={form.onSubmit((values) => {
                    // todo

                    disc[1].close()
                })}>
                    <MyFlexColumn>
                        Xác nhận hủy lịch học này
                        {/* <Switch
                            label="Duyệt / Không duyệt"
                            {...form.getInputProps("isEnabled")}

                        ></Switch>
                        <Textarea
                            label="Đánh giá"
                            {...form.getInputProps("Note")}
                            placeholder="nhập thông tin"
                        /> */}
                        <Button color='teal' type='submit'>Xác nhận</Button>
                    </MyFlexColumn>
                </form>
            </MyButtonModal>
        </>
    )
}



