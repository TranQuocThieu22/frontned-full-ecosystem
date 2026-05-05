import { roleService } from "@/APIs/roleService";
import { MyTextArea } from "@/components";
import { CustomTabs, MyButtonCreateUpdate, MySelect, MyTextInput } from "@/core";
import { IRole } from "@/interfaces";
import { Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import RoleManagementUserByRoleTable from "./RoleManagementUserByRoleTable";

export default function RoleManagementCreateUpdate({ values }: { values?: IRole }) {
    const activeTabState = useState<string | null>('Thông tin chung')
    const isUpdate = values != undefined
    const form = useForm<IRole>({
        mode: "uncontrolled",
    })

    useEffect(() => {
        if (!values) return
        form.setValues(values)
        form.setInitialValues(values)
    }, [values])

    return (
        <MyButtonCreateUpdate
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
                                <MyTextInput label="Mã nhóm tài khoản" readOnly={isUpdate} {...form.getInputProps("code")} />
                                <MyTextInput label="Tên nhóm tài khoản" {...form.getInputProps("name")} />
                                <MySelect label="Trạng thái nhóm tài khoản"
                                    data={[
                                        { value: "0", label: "Khóa nhóm tài khoản" },
                                        { value: "1", label: "Đang hoạt động" }
                                    ]}
                                    {...form.getInputProps("isActive")}
                                    value={form.getValues().isActive ? "1" : "0"}
                                    onChange={(e) => form.setFieldValue("isActive", Number(e) == 1 ? true : false)}
                                />
                                <MyTextArea label="Ghi chú" {...form.getInputProps("note")} />
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
        </MyButtonCreateUpdate>
    )
}
