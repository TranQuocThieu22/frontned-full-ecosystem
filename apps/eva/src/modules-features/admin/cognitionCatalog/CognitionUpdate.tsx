'use client'
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";
import { ICognition, cognitionService } from "../../../shared/APIs/cognitionService";
export default function CognitionUpdate({ cognition }: { cognition: ICognition }) {
    const form = useForm<ICognition>({
        validate: {
            name: (value: any) => value ? null : 'Không được để trống',
            code: (value: any) => value ? null : 'Không được để trống',

        }
    })
    useEffect(() => {
        if (!cognition) return;
        form.setValues(cognition);
    }, [cognition])
    return (
        <CustomButtonCreateUpdate
            isUpdate
            form={form}
            onSubmit={(value) => {
                const body = {
                    id: form.values.id,
                    code: form.values.code,
                    name: form.values.name,
                    note: form.values.note,
                    concurrencyStamp: cognition.concurrencyStamp,
                    isEnabled: true,
                }
                return cognitionService.update(body)
            }}>
            <MyTextInput withAsterisk readOnly label="Mã mức độ" {...form.getInputProps("code")} ></MyTextInput>
            <MyTextInput withAsterisk label="Tên mức độ" {...form.getInputProps("name")} ></MyTextInput>
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} ></MyTextArea>
        </CustomButtonCreateUpdate>
    );
}