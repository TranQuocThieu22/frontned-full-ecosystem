import { accountService } from "@/APIs/accountService";
import { departmentService } from "@/APIs/departmentService";
import { MyButtonCreateUpdate, MySelect, MyTextInput } from "@/core";
import { useMyReactQuery } from "@/hooks";
import { IAccount } from "@/interfaces";
import { useStore_ProjectInfo } from "@/stores/useStore_ProjectInfo";
import { PasswordInput, SimpleGrid, Textarea } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useEffect } from "react";

export default function AccountManagement_CreateUpdateUser({ values }: { values?: IAccount }) {
    // const form = useForm<IAccount & { confirmPassword?: string }>({
    const projectInfoStore = useStore_ProjectInfo()
    const form = useForm<IAccount & { accountStatus?: string }>({
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
    const workingUnit = useMyReactQuery({
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
        <MyButtonCreateUpdate
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
                <MyTextInput readOnly={values ? true : false} label="Mã tài khoản" {...form.getInputProps("userName")} withAsterisk />
                {!values && <PasswordInput label="Mật khẩu" placeholder="Nhập mật khẩu" {...form.getInputProps("password")} withAsterisk />}
                <MyTextInput label="Họ tên" {...form.getInputProps("fullName")} withAsterisk />
                <MyTextInput label="Email"  {...form.getInputProps("email")} withAsterisk />
                <MySelect label="Đơn vị"
                    data={workingUnit.data?.map(item => ({
                        label: item.name!,
                        value: item.id?.toString()!
                    }))}
                    value={form.getValues().workingUnitId?.toString()}
                    onChange={val => form.setFieldValue("workingUnitId", Number(val))}
                />
                <MyTextInput label="Số điện thoại"  {...form.getInputProps("phoneNumber")} />
                <MySelect label="Trạng thái tài khoản"
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
        </MyButtonCreateUpdate>
    )
}
