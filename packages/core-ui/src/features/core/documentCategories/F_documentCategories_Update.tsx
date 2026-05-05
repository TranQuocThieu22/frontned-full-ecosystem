'use client'
import { documentAttributeService } from "@aq-fe/core-ui/shared/APIs/documentAttributeService"
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { useForm } from "@mantine/form"
interface I {
    id?: number, name?: string, code?: string
}
export function F_documentCategories_Update(
    { values }: { values: I }
) {
    const form = useForm({
        initialValues: values,
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : 'Không được để trống'
        }
    })

    return (
        <CustomButtonCreateUpdate
            isUpdate
            form={form}
            onSubmit={async (values) => documentAttributeService.update(values)}
        >
            <CustomTextInput readOnly label="Mã loại văn bản" {...form.getInputProps("code")} />
            <CustomTextInput label="Tên loại văn bản" {...form.getInputProps("name")} />
        </CustomButtonCreateUpdate>
    )
}
