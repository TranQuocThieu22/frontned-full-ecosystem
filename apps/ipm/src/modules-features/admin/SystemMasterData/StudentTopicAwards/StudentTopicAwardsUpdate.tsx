'use client'
import { Checkbox, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MyActionIconUpdate, MyNumberInput, MySelect, MyTextInput } from "aq-fe-framework/components";
import { StudentTopicAward } from "./StudentTopicAwardsLayout";

const awardOptions = [
    { label: "1 - Giải nhất", value: "Giải nhất" },
    { label: "2 - Giải nhì", value: "Giải nhì" },
    { label: "3 - Giải ba", value: "Giải ba" },
    { label: "4 - Giải khuyến khích", value: "Giải khuyến khích" },
];

export default function StudentTopicAwardsUpdate({ values }: { values: StudentTopicAward }) {
    const form = useForm<StudentTopicAward>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate title="Cập nhật loại giải thưởng đề tài sinh viên" form={form} onSubmit={() => { }}>
            <MyTextInput label="Mã loại giải thưởng" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại giải thưởng" {...form.getInputProps("name")} />
            <MySelect data={awardOptions} label="Xếp hạng" {...form.getInputProps("rating")} />
            <MyNumberInput label="Số giờ" {...form.getInputProps("hours")} />
            <MyNumberInput label="Số điểm" {...form.getInputProps("score")} />
            <Textarea label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label="Ngừng sử dụng" />
        </MyActionIconUpdate>
    )
}
