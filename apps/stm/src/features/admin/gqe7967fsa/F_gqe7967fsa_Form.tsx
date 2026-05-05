import { branchService } from "@/shared/APIs/branchService";
import { skillCenterService } from "@/shared/APIs/skillCenterService";
import MyActionIconUpdate from "@/components/ActionIcons/ActionIconCRUD/MyActionIconUpdate";
import { Branch } from "@/shared/interfaces/branch";
import { Certificate } from "@/shared/interfaces/certificate";
import { MyButtonCreate } from "@aq-fe/core-ui/shared/components/button/MyButtonCreate";
import { useForm } from "@mantine/form";
import { MyFlexColumn, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { useEffect } from "react";

export default function F_gqe7967fsa_Form({ values }: { values?: Branch }) {
    const form = useForm<Branch>({
        mode: "uncontrolled",
        validate:
        {
            name: (value) => value ? null : "không được để trống",
            location: (value) => value ? null : "không được để trống",
            skillCenterId: (value) => value ? null : "không được để trống"
        }
    });


    useEffect(() => {
        if (!values) return
        form.setValues({
            ...values,
            note: values.note == null ? "" : values.note
        })
    }, [values])

    if (values) return (
        <MyActionIconUpdate form={form} onSubmit={(values) => branchService.update(values)}>
            <FormFields form={form} />
        </MyActionIconUpdate>
    );
    return (
        <MyButtonCreate form={form} onSubmit={(values) => branchService.create(values)}>
            <FormFields form={form} />
        </MyButtonCreate>
    )
}


function FormFields({
    form,
    isUpdate
}: {
    form: ReturnType<typeof useForm<Certificate>>,
    isUpdate?: boolean
}) {
    const skillCentersQuery = useMyReactQuery({
        queryKey: ["skillCentersQuery"],
        axiosFn: () => skillCenterService.getAll()
    })

    return (
        <MyFlexColumn>
            <MyTextInput
                label="Mã Chi Nhánh"
                disabled={isUpdate}
                withAsterisk
                {...form.getInputProps("code")}
            />
            <MyTextInput
                label="Tên Chi Nhánh"
                withAsterisk
                {...form.getInputProps("name")}
            />
            {skillCentersQuery.data &&
                <MySelect
                    label="Trung Tâm"
                    withAsterisk
                    data={skillCentersQuery.data?.map(item => ({
                        value: item.id?.toString()!,
                        label: item.name!
                    }))}
                    value={form.getValues().skillCenterId?.toString()}
                    onChange={e => form.setFieldValue("skillCenterId", parseInt(e!))}
                />
            }
            <MyTextInput
                label="Địa Chỉ"
                withAsterisk
                {...form.getInputProps("location")}
            />
            <MyTextArea
                label="Ghi Chú"
                {...form.getInputProps("note")}
            />
        </MyFlexColumn>
    )
}