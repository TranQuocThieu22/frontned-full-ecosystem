'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { I11_12ConferenceType } from "./StudentAwardRankingTable";

export default function StudentAwardRankingUpdateButton({ values }: { values: I11_12ConferenceType }) {
    const form = useForm<I11_12ConferenceType>({
        initialValues: values
    })
    return (
        <MyActionIconUpdate title="Chi tiết loại giải thưởng đề tài sinh viên" form={form} onSubmit={() => {

        }}>
            <MyTextInput label="Mã xếp hạng" {...form.getInputProps("code")} />
            <MyTextInput label="Tên xếp hạng" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label='Ngừng sử dụng'></Checkbox>
        </MyActionIconUpdate>
    )
}
