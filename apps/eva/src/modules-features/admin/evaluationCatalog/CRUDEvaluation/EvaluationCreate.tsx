'use client';

import { IEvaluation, evaluationService } from "@/shared/APIs/evaluationService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";

export default function EvaluationCreate() {

    const form = useForm<IEvaluation>({
        initialValues: {
            code: "",
            name: "",
            note: ""
        },
        validate: {
            code: (value: any) => value ? null : 'Không được để trống',
            name: (value: any) => value ? null : 'Không được để trống',
        }
    });

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết thang đo đánh giá"
            }}
            form={form}
            onSubmit={
                () => {
                    const body: IEvaluation = {
                        id: 0,
                        code: form.values.code,
                        name: form.values.name,
                        concurrencyStamp: 'string',
                        isEnabled: true,
                        note: form.values.note,
                    }
                    return evaluationService.create(body)
                }
            }
        >
            <MyTextInput withAsterisk label="Mã thang đo" {...form.getInputProps("code")} />
            <MyTextInput withAsterisk label="Tên thang đo" {...form.getInputProps("name")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate >
    );
}