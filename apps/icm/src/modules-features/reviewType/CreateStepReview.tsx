'use client'
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IInfoViewModel } from "./ReadStepReview";
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
export default function CreateStepReview({ values }: { values: IInfoViewModel }) {
    const form = useForm<IInfoViewModel>({
        initialValues: values
    })

    return (
        <MyButtonCreate
            title="Chi tiết bước xét duyệt"
            form={form} onSubmit={() => { }}
            modalSize={"60%"}
        >
            <SimpleGrid cols={2}>
                <MyTextInput
                    label="Mã bước"
                    {...form.getInputProps("code")}
                />

                <MyDateInput
                    label="Đơn vị phụt trách"
                    rightSection={<IconCalendarWeek />}
                    {...form.getInputProps("startDate")}
                />
                <MyTextInput
                    label="Thứ tự"
                    {...form.getInputProps("title")}
                />
                <MySelect
                    label="Loại tiêu chí"
                    defaultValue={"Tô Ngọc Lan"}
                    data={[
                        "GV005 - TS. Trần Bình",
                        "CB010 - ThS. Lê Hoa",
                        "GV015 - PGS. Lê Anh",
                        "Tô Ngọc Lan",
                    ]}
                    {...form.getInputProps("internalManager")}
                />
                <MyTextInput label="Tên bước" {...form.getInputProps("title")} />
                <MyTextInput label="Thang điểm" {...form.getInputProps("title")} />
                <MyFileInput label="Trạng thái hồ sơ" />
            </SimpleGrid>
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("notes")}
            />
        </MyButtonCreate>
    )
}