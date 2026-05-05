"use client";

import { service_EAQRule } from "@/shared/APIs/service_EAQRule";
import { IRule } from "@/shared/interfaces/rule/IRule";
import { useForm } from "@mantine/form";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import {
    CustomButtonCreateUpdate
} from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";

interface Props {
    values?: IRule,
    clearSelection: Function
}

export default function RuleCreateUpdateButton({ values, clearSelection }: Props) {

    const form = useForm<IRule>({
        mode: "uncontrolled",
        initialValues: values ? values : {
            note: ""
        },
        validate: {
            code: (value) => value?.trim() ? null : "Mã vai trò là bắt buộc",
            name: (value) => value?.trim() ? null : "Tên vai trò là bắt buộc",
        }
    });

    return (
        <CustomButtonCreateUpdate
            isUpdate={values ? true : false}
            modalProps={{
                title: "Chi tiết vai trò trong hội đồng",
                size: "50%"

            }}
            form={form}
            onSubmit={async (data) => {
                clearSelection();
                if (!values) return await service_EAQRule.create(data)
                return await service_EAQRule.update(data);
            }}
        >
            <CustomTextInput label="Mã vai trò" {...form.getInputProps("code")} disabled={!!values} withAsterisk />
            <CustomTextInput label="Tên vai trò" {...form.getInputProps("name")} withAsterisk />
            <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    );
}
