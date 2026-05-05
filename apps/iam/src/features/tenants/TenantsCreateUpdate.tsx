import { tenantService } from "@aq-fe/aq-core-framework/shared/APIs/tenantService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-core-framework/shared/components/button/CustomButtonCreateUpdate";
import { Tenant } from "@aq-fe/aq-core-framework/shared/interfaces/Tenant";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function TenantsCreateUpdate({ values }: { values?: Tenant }) {
    const isUpdate = !!values
    const form = useForm<Tenant>({
        mode: "uncontrolled"
    })

    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])
    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            modalProps={{
                title: "Chi tiết tenants",
                description: "Nhập thông tin để tạo tenant mới.",
            }}
            form={form}
            onSubmit={(formValues) => {
                if (isUpdate) return tenantService.update(formValues.id, formValues.name)
                return tenantService.create({
                    body: {
                        code: formValues.code,
                        name: formValues.name
                    }
                })
            }}>
            <CustomTextInput readOnly={isUpdate} label="Mã tenant"  {...form.getInputProps("code")} />
            <CustomTextInput label="Tên tenant" {...form.getInputProps("name")} />
            {/* <CustomTextInput label="Admin email" />
                <CustomTextInput label="Domain" /> */}
            {/* <CustomTextArea label="Ghi chú" /> */}
        </CustomButtonCreateUpdate>
    )
}
