
'use client'
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate"
import MyTextInput from "@/components/Inputs/TextInput/MyTextInput"
import MyFlexColumn from "@/components/Layouts/FlexColumn/MyFlexColumn"
import { ISystemCatalogRoleActivity } from "@/interfaces/global-interface/ISystemCatalogRoleActivity"
import { useForm, UseFormReturnType } from "@mantine/form"
import MyDateInput from "@/components/Inputs/DateInput/MyDateInput"
import MyFileInput from "@/components/Inputs/FileInput/MyFileInput"
import { I7_2_2_1Proposal } from "./F7_2_2_1CreateConfirmation"

export default function F7_2_2_1UpdateProposal(
    { values }: { values: I7_2_2_1Proposal }
) {
    const form = useForm<I7_2_2_1Proposal>({
        initialValues: values
    })

    return (
        <MyActionIconUpdate
            form={form as unknown as UseFormReturnType<Record<string, any>>}
            onSubmit={() => { }}
        >
            <MyFlexColumn>
                <MyTextInput
                    label="Mã đề tài"
                    {...form.getInputProps("researchCode")}  // Field from the interface
                />
                <MyTextInput
                    label="Tên đề tài"
                    {...form.getInputProps("researchName")}  // Field from the interface
                />
                <MyTextInput
                    label="Chủ nhiệm đề tài"
                    {...form.getInputProps("researchLeader")}  // Field from the interface
                />
                <MyTextInput
                    label="Lớp"
                    {...form.getInputProps("class")}  // Field from the interface
                />
                <MyTextInput
                    label="Khoa"
                    {...form.getInputProps("department")}  // Field from the interface
                />
            </MyFlexColumn>
        </MyActionIconUpdate>
    )
}

