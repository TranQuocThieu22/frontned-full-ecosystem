'use client';

import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useEffect } from "react";
import { IMeasurementLevelInfoViewModel } from "./interfaces/InfoInterfaces";

export default function MeasurementLevelUpdate({ data }: { data: IMeasurementLevelInfoViewModel }) {

    const form = useForm<IMeasurementLevelInfoViewModel>({
        initialValues: {
            maMucDo: "",
            tenMucDo: "",
            tyLeDiem: 0,
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
                title: "Chi tiết mức độ đo"
            }}
            form={form}
            onSubmit={
                () => { }
            }
        >
            <MyTextInput label="Mã mức độ đo" {...form.getInputProps("maMucDo")} />
            <MyTextInput label="Tên mức độ đo" {...form.getInputProps("tenMucDo")} />
            <MyTextInput label="Tỷ lệ điểm" type="number" {...form.getInputProps("tyLeDiem")} />
            <MyTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </CustomButtonCreateUpdate>
    );
}