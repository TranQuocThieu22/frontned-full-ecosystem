'use client'
import { documentAttributeService } from "@aq-fe/aq-legacy-framework/shared/APIs/documentAttributeService"
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate"
import { MyButtonCreate } from "@aq-fe/aq-legacy-framework/shared/components/button/MyButtonCreate"
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput"
import { useForm } from "@mantine/form"
interface I {
    name?: string,
    code?: string,
    documentType?: number
}

export function F_documentCategories_Create(
    { documentType }: { documentType: number }
) {
    const form = useForm<I>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            code: "",
            documentType: documentType
        },
        validate: {
            code: (value) => value ? null : "Không được để trống",
            name: (value) => value ? null : 'Không được để trống'
        }
    })
    return (
        <CustomButtonCreateUpdate
            modalProps={{
                title: "Chi tiết loại văn bản"
            }}
            form={form}
            onSubmit={(values) => documentAttributeService.create(values)}
        >
            <CustomTextInput label="Mã loại văn bản" {...form.getInputProps("code")} />
            <CustomTextInput label="Tên loại văn bản" {...form.getInputProps("name")} />
        </CustomButtonCreateUpdate>
    )
}


