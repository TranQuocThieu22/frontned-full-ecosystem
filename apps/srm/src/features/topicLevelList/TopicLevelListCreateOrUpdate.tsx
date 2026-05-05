import { levelService } from "@/shared/APIs/levelService";
import { SRMLevel } from "@/shared/interfaces/SRMLevel";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function TopicLevelListCreateOrUpdate({ initValues }: { initValues?: SRMLevel }) {
    const form = useForm<SRMLevel>({
        mode: "uncontrolled",
        validate: {
            code: (value) => value ? null : 'Vui lòng nhập mã cấp đề tài',
            name: (value) => value ? null : 'Vui lòng nhập tên cấp đề tài',
        }
    });
    function handleSubmit(formValues: SRMLevel) {
        if (initValues) return levelService.update(formValues)
        return levelService.create(formValues)
    }

    useEffect(() => {
        form.setInitialValues({
            ...initValues,
            note: initValues?.note || "",
        })
        form.setValues({
            ...initValues,
            note: initValues?.note || "",
        })
    }, [initValues])


    return (
        <CustomButtonCreateUpdate
            onSubmit={handleSubmit}
            form={form}
            isUpdate={!!initValues}
        >
            <CustomTextInput
                label="Mã cấp đề tài"
                withAsterisk
                readOnly={!!initValues}
                {...form.getInputProps("code")}
            />
            <CustomTextInput
                label="Tên cấp đề tài"
                withAsterisk
                {...form.getInputProps("name")}
            />
            <CustomTextArea
                label="Ghi chú"
                {...form.getInputProps("note")}
            />
            <CustomCheckbox
                label="Không sử dụng"
                defaultChecked={form.values.isDeactivate || false}
                {...form.getInputProps("isDeactivate")}
            />
        </CustomButtonCreateUpdate >
    );
}