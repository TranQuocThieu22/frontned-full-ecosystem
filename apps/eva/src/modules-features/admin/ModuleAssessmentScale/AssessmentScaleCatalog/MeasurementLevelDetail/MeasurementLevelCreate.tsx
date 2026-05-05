'use client';

import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { IMeasurementLevelViewModel } from "./interfaces/Interfaces";

export default function MeasurementLevelCreate() {

    const form = useForm<IMeasurementLevelViewModel>({
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

    return (
        <CustomButtonCreateUpdate
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