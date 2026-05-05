'use client';

import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { IAssessmentScaleViewModel } from "./interfaces/Interfaces";

export default function AssessmentScaleCreate() {

    const form = useForm<IAssessmentScaleViewModel>({
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

    return (
        <CustomButtonCreateUpdate
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