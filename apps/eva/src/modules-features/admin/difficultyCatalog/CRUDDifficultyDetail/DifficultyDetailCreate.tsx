'use client';

import { IDifficultyDetail, difficultyDetailService } from "@/shared/APIs/difficultyDetailService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";

export default function DifficultyDetailCreate({ evaDifficultyId }: { evaDifficultyId: number; }) {
    const form = useForm<IDifficultyDetail>({
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
                title: "Chi tiết mức độ khó"
            }}
            form={form}
            onSubmit={
                () => {
                    const body: IDifficultyDetail = {

                        id: 0,
                        code: form.values.code,
                        name: form.values.name,
                        concurrencyStamp: 'string',
                        isEnabled: true,
                        note: form.values.note,
                        evaDifficultyId: evaDifficultyId,
                    }

                    return difficultyDetailService.create(body);
                }
            }

        >
            <MyTextInput label="Mã mức" {...form.getInputProps("code")} />
            <MyTextInput label="Tên độ khó" {...form.getInputProps("name")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}