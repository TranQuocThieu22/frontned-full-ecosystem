import { service_department } from "@/api/services/service_department";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Department } from "@aq-fe/core-ui/shared/interfaces/Department";
import { Group } from '@mantine/core';
import { useForm } from "@mantine/form";

export default function OrganizingUnitCreateButton() {
    const form = useForm<Department>({
        initialValues: {
            code: "",
            name: "",
        },
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <Group>
            <CustomButtonCreateUpdate
                modalProps={{
                    title: "Tạo mới đơn vị tổ chức"

                }}
                onSubmit={async (values) => await service_department.create({
                    isWorkingUnit: false,
                    ...values
                })}
                form={form}
            >
                <CustomTextInput label="Mã đơn vị" {...form.getInputProps("code")} />
                <CustomTextInput label="Tên đơn vị" {...form.getInputProps("name")} />
            </CustomButtonCreateUpdate>
        </Group >
    );
}
