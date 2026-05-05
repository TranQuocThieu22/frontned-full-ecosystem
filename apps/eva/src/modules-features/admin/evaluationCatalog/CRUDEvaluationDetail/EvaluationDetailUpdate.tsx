'use client';

import { IEvaluationDetail, evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyNumberInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";

export default function EvaluationDetailUpdate({ data }: { data: IEvaluationDetail }) {

    const form = useForm<IEvaluationDetail>({

        validate: {
            code: (value: any) => value ? null : 'Không được để trống',
            name: (value: any) => value ? null : 'Không được để trống',
        }
    });

    useEffect(() => {
        form.setValues(data);
    }, [data]);

    return (
        <CustomButtonCreateUpdate
            isUpdate
            modalProps={{
                title: "Chi tiết mức độ đo"
            }}
            form={form}
            onSubmit={
                () => {
                    const body: IEvaluationDetail = {
                        id: data.id,
                        code: form.values.code,
                        name: form.values.name,
                        density: form.values.density,
                        evaEvaluationId: data.evaEvaluationId,
                        concurrencyStamp: data.concurrencyStamp,
                        note: form.values.note,
                        isEnabled: true,
                        // evaluation: any | null, // replace `any` with `Evaluation` if available
                    }
                    return evaluationDetailService.update(body);
                }
            }
        >
            <MyTextInput readOnly label="Mã mức độ đo" {...form.getInputProps("code")} />
            <MyTextInput label="Tên mức độ đo" {...form.getInputProps("name")} />
            <MyNumberInput hideControls max={100} label="Tỷ lệ điểm" {...form.getInputProps("density")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}