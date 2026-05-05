'use client'
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyDateInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { MySelect } from "aq-fe-framework/core";
import ChoosePotentialCustomerButton from "./ChoosePotentialCustomerButton";
import { TestSchedule } from "./ScheduleTestTable";


export default function ScheduleTestUpdateButton({ values }: { values: TestSchedule }) {

    const form = useForm<TestSchedule>({
        mode: "uncontrolled",
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            title="Chi tiết hẹn test"
            form={form}
            modalSize="100%"
            onSubmit={() => { }}
        >

            <SimpleGrid cols={2}>
                <Stack>
                    <ChoosePotentialCustomerButton defautValue={form.values.potentialStudentCode} />
                    <MyDateInput
                        label="Ngày hẹn Test"
                        {...form.getInputProps("testDate")}
                    />
                    <MyTextInput
                        label="Giờ hẹn Test"
                        {...form.getInputProps("testTime")}
                    />
                    <MyTextInput
                        label="Địa điểm Test"
                        {...form.getInputProps("testLocation")}
                    />
                    <MySelect
                        label="Trạng thái Lịch hẹn"
                        data={["Đã hẹn", "Đã hẹn lại", "Đã hủy", "Đã test"]}
                        {...form.getInputProps("status")}
                    />
                </Stack>

                <Stack>
                    <MySelect
                        label="Hình thức Test"
                        data={["Online", "Offline"]}
                        {...form.getInputProps("testFormat")}
                    />
                    <MySelect
                        label="Người phụ trách Test"
                        data={["Thầy Long", "Cô Mai Anh"]}
                        {...form.getInputProps("assignedStaff")}
                    />
                    <MyTextArea
                        label="Ghi chú"
                        {...form.getInputProps("note")}
                    />
                    <MyTextArea
                        label="Lý do hủy"
                        {...form.getInputProps("cancelReason")}
                    />
                </Stack>
            </SimpleGrid>
        </MyActionIconUpdate>
    )
}