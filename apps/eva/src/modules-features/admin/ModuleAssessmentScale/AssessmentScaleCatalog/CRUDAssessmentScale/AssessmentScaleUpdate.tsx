'use client';

import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { IAssessmentScaleInfoViewModel } from "./interfaces/InfoInterfaces";

export default function AssessmentScaleUpdate({ data }: { data: IAssessmentScaleInfoViewModel }) {

    const form = useForm<IAssessmentScaleInfoViewModel>({
        initialValues: {
            maThangDo: "",
            tenThangDo: "",
            ghiChu: ""
        },
        validate: {
            maThangDo: (value: any) => value ? null : 'Không được để trống',
            tenThangDo: (value: any) => value ? null : 'Không được để trống',
        }
    });

    useEffect(() => {
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
                () => { }
            }
        >
            <CustomTextInput label="Mã thang đo" {...form.getInputProps("maThangDo")} />
            <CustomTextInput label="Tên thang đo" {...form.getInputProps("tenThangDo")} />
            <CustomTextArea label="Ghi chú" {...form.getInputProps("ghiChu")} />
        </CustomButtonCreateUpdate>
    );
}