'use client'
import { MultiSelect, SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendarWeek } from "@tabler/icons-react";
import { MyActionIconUpdate, MyDateInput, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { CollaborationOpportunity } from "./PotentialOpportunitiesLayout";

export default function PotentialOpportunitiesUpdate({ values }: { values: CollaborationOpportunity }) {

    const form = useForm<CollaborationOpportunity>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            title="Chi tiết cơ hội"
            form={form} onSubmit={() => { }}
            modalSize={"60%"}
        >
            <SimpleGrid cols={2}>
                <MyTextInput
                    label="Mã cơ hội"
                    {...form.getInputProps("code")}
                />

                <MyDateInput
                    label="Ngày phát sinh"
                    rightSection={<IconCalendarWeek />}
                    {...form.getInputProps("startDate")}
                />
                <MyTextInput
                    label="Tên cơ hội"
                    {...form.getInputProps("title")}
                />
                <MySelect
                    label="Người phụ trách"
                    defaultValue={"Tô Ngọc Lan"}
                    data={[
                        "GV005 - TS. Trần Bình",
                        "CB010 - ThS. Lê Hoa",
                        "GV015 - PGS. Lê Anh",
                        "Tô Ngọc Lan",
                    ]}
                    {...form.getInputProps("internalManager")}
                />

                <MySelect
                    label="Loại cơ hội"
                    defaultValue={"Trao đổi sinh viên"}
                    data={[
                        "Nghiên cứu",
                        "Trao đổi sinh viên",
                        "Nghiên cứu & Chuyển giao",
                    ]}
                    {...form.getInputProps("type")}
                />

                <MySelect
                    label="Trạng thái cơ hội"
                    defaultValue={"Đang thảo luận"}
                    data={[
                        "Đang thảo luận",
                        "Đã gửi đề xuất",
                        "Đang tìm hiểu",
                    ]}
                    {...form.getInputProps("status")}
                />

                <MultiSelect
                    label="Lĩnh vực"
                    defaultValue={values.field.split(";").map((s) => s.trim())}
                    data={[
                        "Y sinh",
                        "Trí tuệ nhân tạo",
                        "Kỹ thuật",
                        "Khoa học vật liệu",
                        "Kỹ thuật nano",
                    ]}
                />

                <MySelect
                    label="Đối tác tiềm năng"
                    defaultValue={"DTQT-003 - Siemens AG"}
                    data={[
                        { label: "DTQT-002 - NUS", value: "DTQT-002 (NUS)" },
                        { label: "DTQT-003 - Siemens AG", value: "DTQT-003 (Siemens AG)" },
                        { label: "DTQT-006 - MIT", value: "DTQT-006 (MIT)" },
                    ]}
                    {...form.getInputProps("potentialPartner")}
                />
            </SimpleGrid>

            <MyTextArea
                label="Ghi chú"
                {...form.getInputProps("notes")}
            />
        </MyActionIconUpdate>
    )
}
