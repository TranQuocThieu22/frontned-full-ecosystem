import { accountService } from "@aq-fe/core-ui/shared/APIs/accountService";
import { departmentService } from "@aq-fe/core-ui/shared/APIs/departmentService";
import { CustomButtonCreateUpdate } from "@aq-fe/core-ui/shared/components/button/CustomButtonCreateUpdate/CustomButtonCreateUpdate";
import { CustomSelect } from "@aq-fe/core-ui/shared/components/input/CustomSelect";
import { CustomTextInput } from "@aq-fe/core-ui/shared/components/input/CustomTextInput";
import { useCustomReactQuery } from "@aq-fe/core-ui/shared/hooks/useCustomReactQuery";
import { User } from "@aq-fe/core-ui/shared/interfaces/User";
import { useProjectInfoStore } from "@aq-fe/core-ui/shared/stores/useProjectInfoStore";
import { PasswordInput, SimpleGrid, Textarea } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useEffect } from "react";

export default function AccountManagement_CreateUpdateUser({ values }: { values?: User }) {
    // const form = useForm<IAccount & { confirmPassword?: string }>({
    const projectInfoStore = useProjectInfoStore()
    const form = useForm<User & { accountStatus?: string }>({
        mode: "uncontrolled",
        validate: {
            userName: (value) => value ? null : "Không được để trống",
            password: (value) => {
                if (values) return null
                if (!value) return "Không được để trống!";
                if (value.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
                if (!/[A-Z]/.test(value)) return "Mật khẩu phải chứa ít nhất 1 chữ hoa";
                if (!/[a-z]/.test(value)) return "Mật khẩu phải chứa ít nhất 1 chữ thường";
                if (!/[0-9]/.test(value)) return "Mật khẩu phải chứa ít nhất 1 số";
                if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) return "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt";
                return null;
            },
            fullName: (value) => value ? null : "Không được để trống",
            email: isEmail("Email không đúng định dạng"),
        }
    })
    const workingUnit = useCustomReactQuery({
        queryKey: ['workingUnits'],
        axiosFn: () => departmentService.getWorkingUnit()
    })

    useEffect(() => {
        if (!values) return
        const valueSetter = {
            ...values,
            accountStatus: values.isBlocked ? "0" : "1"
        }
        form.setValues(valueSetter)
        form.setInitialValues(valueSetter)
    }, [values])

    return (
        <CustomButtonCreateUpdate
            isUpdate={!!values}
            modalProps={{ size: "xl" }}
            scrollAreaAutosizeProps={{ h: "auto" }}
            form={form} onSubmit={(formValues) => {
                const { accountStatus, ...finalFormValues } = formValues
                const finalValues = {
                    ...finalFormValues,
                    code: finalFormValues.userName,
                    isBlocked: accountStatus == "0" ? true : false,
                    aqModuleId: projectInfoStore.state.aqModuleId,
                }
                if (values) return accountService.update(finalValues)
                return accountService.create(finalValues)

            }}>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
                <CustomTextInput readOnly={values ? true : false} label="Mã tài khoản" {...form.getInputProps("userName")} withAsterisk />
                {!values && <PasswordInput label="Mật khẩu" placeholder="Nhập mật khẩu" {...form.getInputProps("password")} withAsterisk />}
                <CustomTextInput label="Họ tên" {...form.getInputProps("fullName")} withAsterisk />
                <CustomTextInput label="Email"  {...form.getInputProps("email")} withAsterisk />
                <CustomSelect label="Đơn vị"
                    data={workingUnit.data?.map(item => ({
                        label: item.name!,
                        value: item.id?.toString()!
                    }))}
                    value={form.getValues().workingUnitId?.toString()}
                    onChange={val => form.setFieldValue("workingUnitId", Number(val))}
                />
                <CustomTextInput label="Số điện thoại"  {...form.getInputProps("phoneNumber")} />
                <CustomSelect label="Trạng thái tài khoản"
                    data={[
                        {
                            label: "Đang hoạt động",
                            value: "1",
                        },
                        {
                            label: "Khóa tài khoản",
                            value: "0",
                        }
                    ]}
                    {...form.getInputProps("accountStatus")}
                />

            </SimpleGrid>
            <Textarea label="Ghi chú" placeholder="Nhập ghi chú"  {...form.getInputProps("note")} />
        </CustomButtonCreateUpdate>
    )
}
