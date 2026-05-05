import { permissionService } from "@aq-fe/aq-core-framework/shared/APIs/permissionService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-core-framework/shared/components/button/CustomButtonCreateUpdate";
import {
    CreatePermissionRequest,
    UpdatePermissionRequest,
} from "@aq-fe/aq-core-framework/shared/interfaces/Permission";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { SimpleGrid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export default function PermissionsCreateUpdate({ values }: { values?: CreatePermissionRequest }) {
    const isUpdate = !!values;
    const form = useForm<CreatePermissionRequest & { id?: string }>({
        mode: "uncontrolled",
    });

    useEffect(() => {
        if (!values) return;
        form.setValues(values);
        form.setInitialValues(values);
    }, [values]);

    const handleSubmit = () => {
        if (isUpdate && values?.id) {
            return permissionService.update(values.id, {
                description: form.getValues().description ?? null,
            } as UpdatePermissionRequest);
        }
        return permissionService.create({
            code: form.getValues().code ?? null,
            category: form.getValues().category ?? null,
            description: form.getValues().description ?? null,
        });
    };

    return (
        <CustomButtonCreateUpdate
            isUpdate={isUpdate}
            modalProps={{
                title: isUpdate ? "Cập nhật quyền" : "Tạo quyền mới",
                description: isUpdate
                    ? "Cập nhật thông tin quyền."
                    : "Nhập thông tin để tạo quyền mới.",
                size: "50em",
            }}
            form={form}
            onSubmit={handleSubmit}
        >
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <CustomTextInput
                    label="Mã quyền (code)"
                    placeholder=" Ví dụ: user:read"
                    {...form.getInputProps("code")}
                />
                <CustomTextInput
                    label="Danh mục (category)"
                    placeholder=" Ví dụ: User Management"
                    {...form.getInputProps("category")}
                />
            </SimpleGrid>
            <CustomTextArea
                label="Mô tả"
                placeholder="Mô tả chi tiết về quyền này..."
            />
        </CustomButtonCreateUpdate>
    );
}
