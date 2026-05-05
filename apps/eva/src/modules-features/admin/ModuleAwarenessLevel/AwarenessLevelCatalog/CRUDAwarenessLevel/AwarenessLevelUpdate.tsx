'use client';

import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";
import { AwarenessLevelInfoViewModel } from "./Interfaces/InfoInterfaces";

export default function AwarenessLevelUpdate({ data }: { data: AwarenessLevelInfoViewModel }) {

    const form = useForm<AwarenessLevelInfoViewModel>({
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

    useEffect(() => {
        form.setValues(data);
    }, [data]);

    return (
        <CustomButtonCreateUpdate
            isUpdate
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