'use client';

import { IEvaluation, evaluationService } from "@/shared/APIs/evaluationService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";

export default function EvaluationUpdate({ data }: { data: IEvaluation }) {
    const form = useForm<IEvaluation>({
        validate: {
            code: (value: any) => value ? null : 'Không được để trống',
            name: (value: any) => value ? null : 'Không được để trống',
        }
    });

    useEffect(() => {
        if (!data) return;
        form.setValues(data);
    }, [data]);

    return (
        <CustomButtonCreateUpdate
            isUpdate
            modalProps={{
                title: "Chi tiết thang đo đánh giá"
            }}
            form={form}
            onSubmit={
                () => {
                    const body: IEvaluation = {
                        id: data.id,
                        code: form.values.code,
                        name: form.values.name,
                        concurrencyStamp: data.concurrencyStamp,
                        isEnabled: true,
                        note: form.values.note,
                    }
                    return evaluationService.update(body)
                }
            }
        >
            <MyTextInput withAsterisk readOnly label="Mã thang đo" {...form.getInputProps("code")} />
            <MyTextInput withAsterisk label="Tên thang đo" {...form.getInputProps("name")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}