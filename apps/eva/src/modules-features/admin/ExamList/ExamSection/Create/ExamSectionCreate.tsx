import { IExamSection } from "@/shared/APIs/examSectionService";
import { ISubject } from "@/shared/APIs/subjectService";
import { utils_notification_show } from "@aq-fe/core-ui/shared/utils/notificationUtils";
import { Group, Select, SimpleGrid, Textarea, TextInput } from "@mantine/core";
import { TimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconClock } from "@tabler/icons-react";
import { MyButton, MyButtonModal, MyDateInput, MyNumberInput } from "aq-fe-framework/components";
interface Props {
    onCreate: (section: IExamSection) => void;
    subjectQuery: ISubject[]
}

export default function ExamSectionCreate({ onCreate, subjectQuery }: Props) {
    const disc = useDisclosure()

    const form = useForm<IExamSection>({
        mode: 'uncontrolled',
        initialValues: {
            evaSubjectId: 1,
            group: "",
            startDate: new Date().toString(),
            startTime: "09:00:00",
            duration: 45,
            note: "",
            roundRule: 1,
            evaExamId: 0 // or pass in from props
        },
        validate: {
            group: (value) => value ? null : "Vui lòng nhập nhóm thi",
            // evaSubjectId: (value) => value ? null : "Vui lòng chọn môn học",
            // startDate: (value) => value ? null : "Vui lòng chọn ngày thi",
            // startTime: (value) => value && /^\d{1,2}:\d{2}$/.test(value) ? null : "Vui lòng nhập giờ thi hợp lệ (hh:mm)",
            // duration: (value) => value ? null : "Thời gian thi phải lớn hơn 0",
            // roundRule: (value) => value ? null : "Vui lòng chọn quy tắc làm tròn",
        }
    });

    const handleSubmit = () => {
        console.log(form.getValues());

        const body: IExamSection = {
            id: Math.floor(Math.random() * 1000000) + 1, // Random id > 0
            evaSubjectId: form.getValues().evaSubjectId,
            group: form.getValues().group,
            startDate: new Date(form.getValues().startDate || '').toISOString(),
            startTime: form.getValues().startTime,
            duration: form.getValues().duration,
            roundRule: form.getValues().roundRule,
            note: form.getValues().note,
            evaExamId: 0, // or pass in from props
            isTemp: true
        }
        onCreate(body); // Call parent handler
        utils_notification_show({ crudType: "create" })
        form.reset(); // Reset form if needed
        disc[1].close()
    };

    return (
        <MyButtonModal
            disclosure={disc}
            title="Chi tiết nhóm thi"
            label="Thêm"
            modalSize={"80%"}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <SimpleGrid cols={{ base: 1, md: 2, lg: 2, xl: 2 }}>
                    <Select
                        withAsterisk
                        clearable={false}
                        // clearable
                        placeholder='Chọn môn học'
                        label='Mã môn học'
                        data={subjectQuery?.map((item: any) => ({
                            value: item.id?.toString()!,
                            label: item.name! == null ? "" : item.name!
                        }))}
                        defaultValue={subjectQuery?.[0]?.id?.toString()}
                        onChange={value => form.setFieldValue("evaSubjectId", value ? Number(value) : undefined)}
                    />
                    <TextInput
                        withAsterisk
                        label="Nhóm thi"
                        // description="Nhập mã kỳ thi"
                        placeholder="Nhập nhóm thi"
                        {...form.getInputProps('group')}

                    />
                    <MyDateInput
                        withAsterisk
                        clearable={false}
                        label="Ngày thi"
                        value={form.getValues().startDate}
                        onChange={(value) => form.setFieldValue('startDate', value ?? undefined)}
                    />

                    <TimePicker
                        label="Giờ thi"
                        rightSection={<IconClock />}
                        defaultValue={form.getValues().startTime}
                        // value={utils_time_extractHourMinute(duration)}
                        onChange={(e) => {
                            if (!e) return;
                            console.log(e);
                            form.setFieldValue('startTime', e ?? undefined)
                            // const [hours, minutes] = e.split(":").map(Number);
                            // const newDate = new Date(duration);
                            // newDate.setUTCHours(hours);
                            // newDate.setUTCMinutes(minutes);
                        }}
                    />
                    <MyNumberInput
                        withAsterisk
                        label="Thời gian thi (phút)"
                        defaultValue={45}
                        {...form.getInputProps('duration')}
                    />
                    <Select
                        withAsterisk
                        clearable={false}
                        searchable={false}
                        placeholder='Chọn Quy tắc làm tròn'
                        label='Quy tắc làm tròn'
                        data={quyTacLamTron?.map((item: any) => ({
                            value: item.id?.toString()!,
                            label: item.name! == null ? "" : item.name!
                        }))}
                        defaultValue={quyTacLamTron?.[0]?.id?.toString()}
                        onChange={value => form.setFieldValue("roundRule", value ? Number(value) : undefined)}

                    />
                </SimpleGrid>
                <Textarea
                    label="Ghi chú"
                    // description="Input description"
                    placeholder="Nhập ghi chú"
                    {...form.getInputProps('note')}
                />
                <Group mt={10} grow>
                    <MyButton type="submit" title="Lưu" >Lưu</MyButton>
                </Group>
            </form>
        </MyButtonModal>

    )
}
const quyTacLamTron = [
    { id: 1, name: '0.25' },
    { id: 2, name: '0.5' },
    { id: 3, name: '0.1' },
]