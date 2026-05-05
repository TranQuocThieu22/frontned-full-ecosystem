'use client';

import { IEvaluationDetail, evaluationDetailService } from "@/shared/APIs/evaluationDetailService";
import { IEvaluation } from "@/shared/APIs/evaluationService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyNumberInput, MyTextArea, MyTextInput } from "aq-fe-framework/components";

export default function EvaluationDetailCreate({ data }: { data: IEvaluation }) {

    const form = useForm<IEvaluationDetail>({
        initialValues: {
            code: "",
            name: "",
            density: 0,
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
                title: "Chi tiết mức độ đo"
            }}
            form={form}
            onSubmit={
                () => {
                    const body: IEvaluationDetail = {
                        id: 0,
                        code: form.values.code,
                        name: form.values.name,
                        concurrencyStamp: 'string',
                        note: form.values.note,
                        density: form.values.density,
                        isEnabled: true,
                        evaEvaluationId: data.id,
                        // evaluation: any | null, // replace `any` with `Evaluation` if available
                    }

                    return evaluationDetailService.create(body);
                }
            }
        >
            <MyTextInput label="Mã mức độ đo" {...form.getInputProps("code")} />
            <MyTextInput label="Tên mức độ đo" {...form.getInputProps("name")} />
            <MyNumberInput hideControls max={100} label="Tỷ lệ điểm"  {...form.getInputProps("density")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}