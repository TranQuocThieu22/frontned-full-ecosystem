import { branchService } from "@/shared/APIs/branchService";
import { skillCenterService } from "@/shared/APIs/skillCenterService";
import { Branch } from "@/shared/interfaces/branch";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function BranchCatalogCreateUpdate({ values }: { values?: Branch }) {
    const form = useForm<Branch>({
        mode: "uncontrolled",
        validate: {
            name: (value) => value ? null : "không được để trống",
            location: (value) => value ? null : "không được để trống",
            skillCenterId: (value) => value ? null : "không được để trống"
        }
    });
    const skillCentersQuery = useCustomReactQuery({
        queryKey: ["skillCentersQuery"],
        axiosFn: () => skillCenterService.getAll()
    })
    function handleSubmit(formValues: Branch) {
        if (values) return branchService.update(formValues)
        return branchService.create(formValues)
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
            <Stack>
                <TextInput
                    label="Mã Chi Nhánh"
                    disabled={!!values}
                    withAsterisk
                    {...form.getInputProps("code")}
                />
                <TextInput
                    label="Tên Chi Nhánh"
                    withAsterisk
                    {...form.getInputProps("name")}
                />
                {skillCentersQuery.data &&
                    <Select
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
                <TextInput
                    label="Địa Chỉ"
                    withAsterisk
                    {...form.getInputProps("location")}
                />
                <Textarea
                    label="Ghi Chú"
                    {...form.getInputProps("note")}
                />
            </Stack>
        </CustomButtonCreateUpdate>
    )
}
