'use client'
import { documentAttributeService } from "@/APIs/documentAttributeService"
import { MyButtonCreate } from "@/components"
import { MyTextInput } from "@/components/Inputs/TextInput/MyTextInput"
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
        <MyButtonCreate objectName="Loại văn bản" form={form} onSubmit={(values) => documentAttributeService.create(values)}>
            <MyTextInput label="Mã loại văn bản" {...form.getInputProps("code")} />
            <MyTextInput label="Tên loại văn bản" {...form.getInputProps("name")} />
        </MyButtonCreate>
    )
}


