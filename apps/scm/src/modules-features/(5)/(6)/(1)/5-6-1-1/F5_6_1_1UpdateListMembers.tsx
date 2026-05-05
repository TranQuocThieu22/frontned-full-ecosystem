'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import { useForm } from "@mantine/form"
import { I6_5_1_1ListOfMember } from "./F5_6_1_1CreateProjectReviewCommitteeMembers"

export default function F6_5_1_1UpdateListOfMembers({ values }: { values: I6_5_1_1ListOfMember }) {
    const form = useForm<I6_5_1_1ListOfMember>({
        initialValues: {
            ...values,
        }
    })
    return (
        <MyActionIconUpdate onSubmit={() => { }} modalSize={"100%"} form={form} >
            <MyTextInput label="Mã giảng viên" {...form.getInputProps("code")} />
            <MyTextInput label="Họ tên" {...form.getInputProps("name")} />
            <MyTextInput label="Học hàm - học vị" {...form.getInputProps("title")} />
            <MyTextInput label="Đơn vị cộng tác" {...form.getInputProps("collaborationUnit")} />
            <MyTextInput label="Vai trò" {...form.getInputProps("role")} />
        </MyActionIconUpdate>
    )
}