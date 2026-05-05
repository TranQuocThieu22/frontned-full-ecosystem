import { publicationService } from "@/shared/APIs/publicationService";
import { SRMPublication } from "@/shared/interfaces/SRMPublication";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { formValuesType } from "@aq-fe/core-ui/shared/types/types";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";

export default function PublicationGroupCreateUpdate({ values }: { values?: SRMPublication }) {
    const isUpdate = values != undefined
    const form = useForm<formValuesType<SRMPublication>>({
        initialValues: {
            code: "",
            name: "",
            note: ""
        },
        validate: {
            code: isNotEmpty("Mã không được để trống"),
            name: isNotEmpty("Tên khong được để trống")
        }
    })
    useEffect(() => {
        if (!values) return
        form.setValues(values)
    }, [values])

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            modalProps={{
                title: "Chi tiết nhóm công bố",
                size: "xl"
            }} form={form}
            onSubmit={(formValues) => {
                if (isUpdate) return publicationService.update(formValues)
                return publicationService.create(formValues)
            }}>
            <CustomTextInput label="Mã nhóm công bố"{...form.getInputProps("code")} />
            <CustomTextInput label="Tên nhóm công bố" {...form.getInputProps("name")} />
            <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    )
}


