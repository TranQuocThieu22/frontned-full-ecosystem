import { roleService } from "@aq-fe/aq-legacy-framework/shared/APIs/roleService";
import { CustomButtonCreateUpdate } from "@aq-fe/aq-legacy-framework/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextArea } from "@aq-fe/core-ui/shared/components/input/CustomTextArea";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { CustomTabs } from "@aq-fe/core-ui/shared/components/navigation/CustomTabs/CustomTabs";
import { Role } from "@aq-fe/aq-legacy-framework/shared/interfaces/Role";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import RoleManagementUserByRoleTable from "./RoleManagementUserByRoleTable";

export default function RoleManagementCreateUpdate({ values }: { values?: Role }) {
    const activeTabState = useState<string | null>('Thông tin chung')
    const isUpdate = values != undefined
    const form = useForm<Role>({
        mode: "uncontrolled",
    })

    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])

    return (
        <CustomButtonCreateUpdate
            submitButtonProps={{
                hidden: activeTabState[0] == "Danh sách thành viên"
            }}
            isUpdate={isUpdate}
            modalProps={{
                size: "70em"
            }}
            form={form}
            onSubmit={(formValues) => {
                if (isUpdate) return roleService.update(formValues)
                return roleService.create(formValues)
            }}>
            <CustomTabs
                value={activeTabState[0]}
                onChange={activeTabState[1]}
                tabs={[
                    {
                        label: "Thông tin chung",
                        children: (
                            <Stack>
                                <CustomTextInput label="Mã nhóm tài khoản" readOnly={isUpdate} {...form.getInputProps("code")} />
                                <CustomTextInput label="Tên nhóm tài khoản" {...form.getInputProps("name")} />
                                <CustomSelect label="Trạng thái nhóm tài khoản"
                                    data={[
                                        { value: "0", label: "Khóa nhóm tài khoản" },
                                        { value: "1", label: "Đang hoạt động" }
                                    ]}
                                    {...form.getInputProps("isActive")}
                                    value={form.getValues().isActive ? "1" : "0"}
                                    onChange={(e) => form.setFieldValue("isActive", Number(e) == 1 ? true : false)}
                                />
                                <CustomTextArea label="Ghi chú" {...form.getInputProps("note")} />
                            </Stack>
                        )
                    },
                    {
                        label: "Danh sách thành viên",
                        disabled: !isUpdate,
                        children: <RoleManagementUserByRoleTable roleId={values?.id} />,
                        toolTipProps: {
                            label: "Vui lòng tạo trước nhóm tài khoản",
                            hidden: isUpdate
                        }
                    },
                ]}
            />
        </CustomButtonCreateUpdate>
    )
}
