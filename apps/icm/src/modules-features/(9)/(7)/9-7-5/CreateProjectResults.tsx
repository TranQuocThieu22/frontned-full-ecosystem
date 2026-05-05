'use client'
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyButtonCreate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ProjectResults } from "./ReadProjectResults";
export default function ProjectResultsCreate() {
    const form = useForm<ProjectResults>({
    
        })

    return (
        <MyButtonCreate
            title="Chi tiết kết quả dự án"
            form={form} onSubmit={() => { }}
            modalSize={"60%"}
        >
            <SimpleGrid cols={2}>
                <MyTextInput
                    label="Mã kết quả"
                    {...form.getInputProps("code")}
                />

                <MyDateInput
                    label="Tên kết quả"
                    rightSection={<IconCalendarWeek />}
                    {...form.getInputProps("startDate")}
                />
                <MyTextInput
                    label="Tên kết quả"
                    {...form.getInputProps("title")}
                />
                <MySelect
                    label="Dự án"
                    defaultValue={"Tô Ngọc Lan"}
                    data={[
                        "GV005 - TS. Trần Bình",
                        "CB010 - ThS. Lê Hoa",
                        "GV015 - PGS. Lê Anh",
                        "Tô Ngọc Lan",
                    ]}
                    {...form.getInputProps("internalManager")}
                />
                <MyTextInput label="Loại kết quả" {...form.getInputProps("title")} />
                <MyTextInput label="Ngày đạt" {...form.getInputProps("title")} />
                <MyFileInput label="File minh chứng" />
            </SimpleGrid>
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("notes")}
            />
        </MyButtonCreate>
    )
}