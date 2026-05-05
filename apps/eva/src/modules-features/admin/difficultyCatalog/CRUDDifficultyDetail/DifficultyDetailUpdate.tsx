'use client';

import { IDifficultyDetail, difficultyDetailService } from "@/shared/APIs/difficultyDetailService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";

export default function DifficultyDetailUpdate({ data }: { data: IDifficultyDetail }) {
    const form = useForm<IDifficultyDetail>({

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
            modalProps={{
                title: "Chi tiết thang đo đánh giá"
            }}
            isUpdate
            form={form}
            onSubmit={
                () => {
                    const body: IDifficultyDetail = {
                        id: data.id,
                        evaDifficultyId: data.evaDifficultyId,
                        code: form.values.code,
                        name: form.values.name,
                        concurrencyStamp: data.concurrencyStamp,
                        isEnabled: true,
                        note: form.values.note,
                    }
                    return difficultyDetailService.update(body)
                }
            }
        >
            <MyTextInput readOnly label="Mã thang đo" {...form.getInputProps("code")} />
            <MyTextInput label="Tên thang đo" {...form.getInputProps("name")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}