'use client'
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { ProjectResults } from "./ReadProjectResults";
export default function ProjectResultsUpdate({ values }: { values: ProjectResults }) {
    const form = useForm<ProjectResults>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            title="Chi tiết kết quả dự án"
            form={form} onSubmit={() => { }}
            modalSize={"60%"}
        >
            <SimpleGrid cols={2}>
                <MyTextInput
                    label="Mã kết quả"
                    {...form.getInputProps("codeResults")}
                />

                <MyTextInput label="Loại kết quả" {...form.getInputProps("codeOpportunity")} />

                <MyTextInput
                    label="Tên kết quả"
                    {...form.getInputProps("name")}
                />
                <MyDateInput label="Ngày đạt" {...form.getInputProps("date")} />
                <MySelect
                    label="Dự án"
                    defaultValue={"Tô Ngọc Lan"}
                    data={[
                        "GV005 - TS. Trần Bình",
                        "CB010 - ThS. Lê Hoa",
                        "GV015 - PGS. Lê Anh",
                        "Tô Ngọc Lan",
                    ]}
                    {...form.getInputProps("type")}
                />
                
                
                <MyFileInput label="File minh chứng" />
            </SimpleGrid>
            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("notes")}
            />
        </MyActionIconUpdate>
    )
}