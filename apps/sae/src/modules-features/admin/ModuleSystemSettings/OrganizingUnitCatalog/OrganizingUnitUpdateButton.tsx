import { service_department } from "@/api/services/service_department";
import { Department } from "@/interfaces/department";
import { CustomActionIconUpdate } from "@aq-fe/core-ui/shared/components/button/CustomActionIconUpdate";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { Group } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function OrganizingUnitUpdateButton({ data }: { data: Department }) {
    const form = useForm<Department>({
        initialValues: data,
        validate: {
            code: (value) => value ? null : 'Không được để trống',
            name: (value) => value ? null : 'Không được để trống',
        }
    });

    return (
        <Group>
            <CustomButtonCreateUpdate
                isUpdate
                form={form}
                onSubmit={async (values) => await service_department.update(values)}
            >
                <CustomTextInput description="Không được chỉnh sửa mã đơn vị" readOnly label="Mã đơn vị" {...form.getInputProps("code")} />
                <CustomTextInput label="Tên đơn vị" {...form.getInputProps("name")} />
            </CustomButtonCreateUpdate>
        </Group>
    );
}
