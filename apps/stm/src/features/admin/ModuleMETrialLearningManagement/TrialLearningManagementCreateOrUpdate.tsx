import { CustomButtonCreateUpdate } from '@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate'
import { SimpleGrid, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { MySelect, MyTextArea, MyTextInput } from 'aq-fe-framework/components'

export default function TrialLearningManagementCreateOrUpdate({ data }: { data?: any }) {
    const form = useForm<any>(
        { initialValues: data ?? {} }
    )
    return (
        <CustomButtonCreateUpdate onSubmit={() => { }} form={form} isUpdate={!!data} modalProps={{ size: "70%" }}>
            <SimpleGrid cols={2} spacing="md">
                <Stack>
                    <MyTextInput label="Mã KH Tiềm năng:" {...form.getInputProps("customerCode")} />
                    <MyTextInput label="Họ và tên HS:" {...form.getInputProps("studentName")} />


                </Stack>
                <Stack>
                    <MySelect label="Trạng thái Học thử:" data={[
                        "Đã đăng ký",
                        "Đã tham gia",
                        "Không tham gia",
                        "Đã hủy"
                    ]} {...form.getInputProps("trialStatus")} />
                    <MySelect label="Lớp Học thử:" data={[
                        "Starters A - Buổi 1",
                        "Lớp Giao tiếp cơ bản - Tối T3/5",
                        "Flyers B - Buổi sáng T7",
                        "IELTS Foundation - Buổi 1"
                    ]} {...form.getInputProps("className")} />
                    <MySelect label="Buổi Học thử:" data={[
                        "Buổi 1",
                        "Buổi sáng T7"
                    ]} {...form.getInputProps("sessionName")} />

                </Stack>
            </SimpleGrid>
            <MyTextArea label="Nhận xét của GV:" {...form.getInputProps("teacherComment")} />
        </CustomButtonCreateUpdate>
    )
}
