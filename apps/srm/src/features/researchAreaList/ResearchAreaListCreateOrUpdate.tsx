import { areaService } from "@/shared/APIs/areaService";
import { SRMArea } from "@/shared/interfaces/SRMArea";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomCheckbox } from "@aq-fe/core-ui/shared/components/input/CustomCheckbox";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";


export default function ResearchAreaListCreateOrUpdate(
    {
        data,
    }: {
        data?: SRMArea,
    }
) {
    const disclosure = useDisclosure();
    const form = useForm<SRMArea>({
        initialValues: data ? {
            ...data,
            code: data?.code ?? "",
            name: data?.name ?? "",
            note: data?.note === null ? "" : data?.note,
            isDeactivate: data?.isDeactivate ?? false
        } : {
            code: "",
            name: "",
            note: "",
            isDeactivate: false
        },
        validate: {
            code: (value) => {
                if (value === null || value === undefined || value === "") return "Mã lĩnh vực không được để trống!";
                if (value.length > 50) return "Mã lĩnh vực quá dài!";
            },
            name: (value) => {
                if (value === null || value === undefined || value === "") return "Tên lĩnh vực không được để trống!";
                if (value.length > 150) return "Tên lĩnh vực quá dài!";
            },
            note: (value) => {
                if (!!value && value.length > 1000) return "Nội dung quá dài!";
            },
        },
    });

    const handleSubmit = () => {
        if (data) {
            return areaService.update(form.getValues());
        } else {
            return areaService.create(form.getValues());
        }
    }

    return (
        <CustomButtonCreateUpdate
            isUpdate={!!data}
            onSubmit={handleSubmit}
            form={form}
            modalProps={{
                size: "lg",
            }}
            disclosure={disclosure}
        >
            <Stack>
                <SimpleGrid cols={2}>
                    <CustomTextInput
                        label="Mã lĩnh vực"
                        {...form.getInputProps("code")}
                        withAsterisk
                        readOnly={!!data}
                        maxLength={50}
                    />
                    <CustomTextInput
                        label="Tên lĩnh vực"
                        {...form.getInputProps("name")}
                        withAsterisk
                        maxLength={150}
                    />
                </SimpleGrid>
                <CustomTextArea
                    label="Mô tả"
                    {...form.getInputProps("note")}
                    maxLength={1000}
                />
                <CustomCheckbox pb={"xl"}
                    {...form.getInputProps("isDeactivate")}
                    checked={form.values.isDeactivate ?? false}
                    onChange={(value) => form.setFieldValue("isDeactivate", value.currentTarget.checked)}
                    label="Không sử dụng"
                />
            </Stack>
        </CustomButtonCreateUpdate>
    )
}