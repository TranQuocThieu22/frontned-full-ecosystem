'use client'
import MyButtonCreate from "@/components/Buttons/ButtonCRUD/MyButtonCreate";
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput";
import { Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { I11_12ConferenceType } from "./StudentAwardRankingTable";

export default function StudentAwardRankingCreateButton() {
    const form = useForm<I11_12ConferenceType>({
        initialValues: {
            code: "",
            name: "",
            notes: "",
            isStop: false
        }
    })
    return (
        <MyButtonCreate objectName="xếp hạng giải thưởng" form={form} onSubmit={() => {
        }}>
            <MyTextInput label="Mã xếp hạng" {...form.getInputProps("code")} />
            <MyTextInput label="Tên xếp hạng" {...form.getInputProps("name")} />
            <MyTextInput label="Ghi chú" {...form.getInputProps("notes")} />
            <Checkbox label='Ngừng sử dụng'></Checkbox>
        </MyButtonCreate>
    )
}
