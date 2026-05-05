'use client'
import { ICognition, cognitionService } from "@/shared/APIs/cognitionService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
export default function CognitionCreate() {
    const form = useForm<ICognition>({
        initialValues: {
            code: "",
            name: "",
            note: "",
        },
        validate: {
            name: (value: any) => value ? null : 'Không được để trống',
            code: (value: any) => value ? null : 'Không được để trống',

        }
    })

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết độ khó"
            }}
            form={form}
            onSubmit={(value) => {
                const body = {
                    id: 0,
                    code: form.values.code,
                    name: form.values.name,
                    note: form.values.note,
                    concurrencyStamp: 'string',
                    isEnabled: true,
                }
                return cognitionService.create(body)
            }}>
            <CustomTextInput withAsterisk label="Mã mức độ" {...form.getInputProps("code")} ></CustomTextInput>
            <CustomTextInput withAsterisk label="Tên mức độ" {...form.getInputProps("name")} ></CustomTextInput>
            <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} ></CustomTextArea>
        </CustomButtonCreateUpdate>
    );
}