import { service_branch } from "@/api/services/service_branch";
import { service_skillCenter } from "@/api/services/service_skillCenter";
import { IBranch } from "@/interfaces/branch";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useForm } from "@mantine/form";
import { MyFlexColumn, MySelect, MyTextArea, MyTextInput } from "aq-fe-framework/components";
import { useMyReactQuery } from "aq-fe-framework/hooks";
import { useEffect } from "react";

export default function F_branchCatalog_CreateUpdate({ values }: { values?: IBranch }) {
    const form = useForm<IBranch>({
        mode: "uncontrolled",
        validate: {
            name: (value) => value ? null : "không được để trống",
            location: (value) => value ? null : "không được để trống",
            skillCenterId: (value) => value ? null : "không được để trống"
        }
    });
    const skillCentersQuery = useMyReactQuery({
        queryKey: ["skillCentersQuery"],
        axiosFn: () => service_skillCenter.getAll()
    })
    function handleSubmit(formValues: IBranch) {
        if (values) return service_branch.update(formValues)
        return service_branch.create(formValues)
    }
    useEffect(() => {
        if (!values) return
        form.setValues({
            ...values,
            note: values.note || ""
        })
    }, [values])
    return (
        <CustomButtonCreateUpdate form={form} isUpdate={!!values} onSubmit={handleSubmit}>
            <MyFlexColumn>
                <MyTextInput
                    label="Mã Chi Nhánh"
                    disabled={!!values}
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
        </CustomButtonCreateUpdate>
    )
}