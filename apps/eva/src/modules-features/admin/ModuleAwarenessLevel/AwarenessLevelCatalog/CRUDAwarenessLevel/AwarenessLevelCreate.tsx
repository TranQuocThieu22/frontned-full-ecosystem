'use client';

import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { AwarenessLevelViewModel } from "./Interfaces/Interfaces";

export default function AwarenessLevelCreate() {

    const form = useForm<AwarenessLevelViewModel>({
        initialValues: {
            maMucDo: "",
            tenMucDo: "",
            ghiChu: ""
        },
        validate: {
            maMucDo: (value: any) => value ? null : 'Không được để trống',
            tenMucDo: (value: any) => value ? null : 'Không được để trống',
        }
    });

    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết độ khó"
            }}
            form={form}
            onSubmit={
                () => { }
            }
        >
            <MyTextInput label="Mã mức độ" {...form.getInputProps("maMucDo")} />
            <MyTextInput label="Tên mức độ" {...form.getInputProps("tenMucDo")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </CustomButtonCreateUpdate>
    );
}